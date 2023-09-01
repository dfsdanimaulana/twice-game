import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Fireworks } from '@fireworks-js/react'
import { db } from '@config/firebase'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

// icons
import { BiSolidHelpCircle, BiListUl } from 'react-icons/bi'
import { GoUnmute, GoMute } from 'react-icons/go'

// hooks
import useFirebaseAuth from '@hooks/useFirebaseAuth'
import useAudioPlayer from '@hooks/useAudioPlayer'
import useDocument from '@hooks/useDocument'

// utils & datas
import getRandomValuesFromArray from '@utils/getRandomValuesFromArray'
import images from '@data/levelImages'

// components
import ToggleDarkMode from '@components/ToggleDarkMode'
import BackButton from '@components/BackButton'
import LevelCompleteModal from './LevelCompleteModal'
import RecordListModal from './RecordListModal'
import HelpButtonModal from './HelpButtonModal'
import LevelNavigator from './LevelNavigator'
import SingleCard from './SingleCard'
import GameRecord from './GameRecord'

// audio path
const matchAudioPath = '/audio/match.mp3'
const flipAudioPath = '/audio/flipcard.mp3'
const successAudioPath = '/audio/success.mp3'
const failAudioPath = '/audio/fail.mp3'

function Game() {
    // data
    const { user } = useFirebaseAuth()
    const { document } = useDocument('Users', user?.uid) // [{{},{},{}}]
    
    // function
    const navigate = useNavigate()
    const { playAudio, muted, setMuted } = useAudioPlayer()
    
    // modal state
    const [helpOpen, setHelpOpen] = useState(false)
    const [recordListOpen, setRecordListOpen] = useState(false)
    
    // card state
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    
    // game state
    const [incorrectGuess, setIncorrectGuess] = useState(0)
    const [levelComplete, setLevelComplete] = useState(false)
    const [gamePoint, setGamePoint] = useState(0)
    const [stars, setStars] = useState({
        star1: false,
        star2: false,
        star3: false
    })
    
   // level state
    const { level: levelString } = useParams()
    const levelNumber = parseInt(levelString)
    const levels = document?.levels || []
    const levelsCount = levels.length
    const currentLevel = levels.find(
        (level) => level.level === levelNumber
    )
    const isLevelCompleted = currentLevel?.completed || false

    // time state
    const time = 60 + levelNumber * 5
    const [timer, setTimer] = useState(time)
    const [timeCount, setTimeCount] = useState(0)
 
    const fireRef = useRef(null)
    const intervalTimer = useRef(null)
    const countTimer = useRef(null)
    
    const goToNextLevel = () => {
        navigate('/game/' + `${levelNumber !== levelsCount ? levelNumber + 1 : levelsCount}`)
    }

    const goToPrevLevel = () => {
        navigate('/game/' + `${levelNumber - 1}`)
    }

    const updateUserData = async () => {
        const docRef = doc(db, 'Users/' + user?.uid)
        try {
            const documentSnapshot = await getDoc(docRef)
            const data = documentSnapshot.data() // Object
            const levelsArray = data.levels // Arrays

            const updatedLevelsArray = levelsArray.map((level) => {
                if (level.level === levelNumber) {
                    // count how many game have completed
                    const completedCount = level.completedCount + 1

                    // condition
                    const bestTime =
                        level.bestTime > timeCount ? timeCount : (level.bestTime === 60 ? timeCount : level.bestTime)
                    const bestTurns =
                        level.bestTurns > turns ? turns : level.bestTurns

                    // level completed
                    const star1 = true

                    // finish in time/2 or less
                    const star2 = level.star2
                        ? level.star2
                        : timeCount <= Math.round(time*2/3)
                        ? true
                        : false

                    // complete game 3 times
                    const star3 = completedCount >= 3 ? true : false

                    setStars({
                        star1,
                        star2,
                        star3
                    })

                    return {
                        ...level,
                        completed: true, // Update the specific field you want to modify
                        completedCount,
                        bestTime,
                        bestTurns,
                        star1,
                        star2,
                        star3
                    }
                }
                // if completed level n, set locked in level n+1 to false
                if (level.level === levelNumber + 1) {
                    return {
                        ...level,
                        locked: false
                    }
                }

                return level
            })
            
            // calculate user point
            const point = Math.round(levelNumber * timer * 10 - incorrectGuess)
            setGamePoint(point)
            const exp = data.exp + point
            
            // update user data
            await updateDoc(docRef, {
                levels: updatedLevelsArray,
                exp
            })
            setLevelComplete(true)
        } catch (error) {
            toast.error('Something went wrong!')
            console.log('Error updating array field:', error)
        }
    }

    const stopFireworks = () => {
        fireRef.current.stop()
    }

    const launchFireworks = () => {
        fireRef.current.launch(20)
    }

    // start time counter decreased
    const timeStart = () => {
        if (intervalTimer.current) clearInterval(intervalTimer.current)
        intervalTimer.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1)
        }, 1000)
    }

    // stop time counter decreased
    const timeStop = () => {
        clearInterval(intervalTimer.current)
    }

    // start time counter increased
    const countTimeStart = () => {
        if (countTimer.current) clearInterval(countTimer.current)
        countTimer.current = setInterval(() => {
            setTimeCount((prevTimer) => prevTimer + 1)
        }, 1000)
    }

    // stop time counter increased
    const countStop = () => {
        clearInterval(countTimer.current)
    }

    // shuffle cards for new game
    const shuffleCards = () => {
        const currentLevelImages = images[`lv${levelString}`]
        if (!currentLevelImages) return
        const randomImages = getRandomValuesFromArray(
            images[`lv${levelString}`].images,
            7 + levelNumber
        )
        const cardImages = randomImages
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)

        setDisabled(false)
        timeStop()
        countStop()
        setTimeCount(0)
        setTimer(time)
        stopFireworks()
        setIncorrectGuess(0)
        setLevelComplete(false)
        setGamePoint(0)
        
    }

    // handle a choice
    const handleChoice = (card) => {
        if (card.id === choiceOne?.id) return
        if (timer === time) {
            timeStart()
        }
        if (timeCount === 0) {
            countTimeStart()
        }
        playAudio(flipAudioPath)
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }


    // reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns((prevTurns) => prevTurns + 1)
        setDisabled(false)
    }

    const updateCollectionArray = async () => {
        const levelArray = document?.levels
        const collections = document?.collections

        levelArray.map((level) => {
            const star1 = level.star1
            const star2 = level.star2
            const star3 = level.star3
            const completedCount = level.completedCount

            collections[level.level - 1].images[0].locked = !star1
            collections[level.level - 1].images[1].locked = !star2
            collections[level.level - 1].images[2].locked = !star3
            collections[level.level - 1].images[3].locked =
                completedCount >= 5 ? false : true
        })

        // update document
        const docRef = doc(db, 'Users/' + user?.uid)
        try {
            await updateDoc(docRef, { collections })
        } catch (err) {
            toast.error('Something went wrong!')
            console.log('Error updating document: ', err)
        }
    }
    
    // compare 2 selected cards
    useEffect(() => {
        // game finished if all matched
        if (
            cards.length !== 0 &&
            cards.filter((card) => card.matched === false).length < 1
        ) {
            playAudio(successAudioPath)
            launchFireworks()
            updateUserData()
            timeStop()
            countStop()
            setIncorrectGuess(0)
        }
        if (choiceOne && choiceTwo) {
            setDisabled(true)

            if (choiceOne.src === choiceTwo.src) {
                // cards matched
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                playAudio(matchAudioPath)
                resetTurn()
            } else {
                // not matched
                setIncorrectGuess((prev) => prev + 1)
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo, cards])
    
    // start new game automatically
    useEffect(() => {
        shuffleCards()
    }, [levelString])

    // time out handler
    useEffect(() => {
        if (timer < 1) {
            timeStop()
            setDisabled(true)
            playAudio(failAudioPath)
            Swal.fire({
                title: 'Time Out ☹',
                allowOutsideClick: false
            })
        }
    }, [timer])
    
    // prevent user writing level in url more than available level
    useEffect(() => {
        // Check if the levelNumber is a valid number within the desired range
        const isValidLevel =
            !isNaN(levelNumber) && levelNumber >= 1 && levelNumber <= 9

        // Redirect to the appropriate page if the level is invalid
        if (!isValidLevel) {
            navigate('/')
        }
    }, [levelNumber])

    // update user collection 
    useEffect(() => {
        document && updateCollectionArray()
    }, [document])

    return (
        <>
            <div className='full-centered text-center py-12'>
                <div>
                    <span className='indicator-box'>Turns: {turns}</span>
                    <button className='btn-primary' onClick={shuffleCards}>
                        New Game
                    </button>
                    <span className='indicator-box'>Timer: {timer}</span>
                    <span className='indicator-box hidden'>
                        Time: {timeCount}
                    </span>
                    <span className='indicator-box hidden'>
                        Incorrect Guess: {incorrectGuess}
                    </span>
                </div>
                <div className='flex flex-wrap justify-center lg:w-4/5 gap-1 my-3 lg:my-2'>
                    {cards.map((card) => (
                        <SingleCard
                            key={card.id}
                            card={card}
                            handleChoice={handleChoice}
                            level={levelNumber}
                            flipped={
                                card === choiceOne ||
                                card === choiceTwo ||
                                card.matched
                            }
                            disabled={disabled}
                        />
                    ))}
                </div>
                <GameRecord level={currentLevel} />
                {isLevelCompleted && <LevelNavigator levelNumber={levelNumber} next={goToNextLevel} prev={goToPrevLevel} max={levelsCount}/>}
            </div>
            <div className='fixed bottom-3 right-3'>
                <BiSolidHelpCircle
                    className='text-pink-700 dark:text-dark-blue w-10 h-10 transition duration-150 ease-in-out hover:scale-[1.2] cursor-pointer'
                    onClick={() => setHelpOpen(true)}
                />
            </div>
            <div className='fixed bottom-3 left-3'>
                <BiListUl
                    className='border rounded-md border-pink-700 dark:border-dark-blue text-pink-700 dark:text-dark-blue w-9 h-9 transition duration-150 ease-in-out hover:scale-[1.2] cursor-pointer'
                    onClick={() => setRecordListOpen(true)}
                />
            </div>
            <div className='absolute top-3 right-3 flex items-center gap-3'>
                <div
                    className='border border-tw-5 dark:border-light rounded-full p-1 cursor-pointer hover:bg-semi-transparent'
                    onClick={() => setMuted(!muted)}>
                    {muted ? (
                        <GoMute className='text-tw-5 dark:text-light' />
                    ) : (
                        <GoUnmute className='text-tw-5 dark:text-light' />
                    )}
                </div>
                <ToggleDarkMode />
            </div>

            <HelpButtonModal
                time={time}
                helpOpen={helpOpen}
                setHelpOpen={setHelpOpen}
            />
            <RecordListModal
                level={levelNumber}
                recordListOpen={recordListOpen}
                setRecordListOpen={setRecordListOpen}
            />
            
            <LevelCompleteModal
                levelComplete={levelComplete}
                gamePoint={gamePoint}
                setLevelComplete={setLevelComplete}
                goToNextLevel={goToNextLevel}
                shuffleCards={shuffleCards}
                level={levelString}
                collections={
                    document?.collections[levelNumber - 1].images
                }
                stars={stars}
                turns={turns}
                timeCount={timeCount}
            />
            <BackButton to='/level' />

            {/* https://fireworks.js.org/ */}
            <Fireworks
                ref={fireRef}
                options={{
                    opacity: 0.1
                }}
                style={{
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    background: 'rgba(0,0,0,0.1)',
                    zIndex: -1
                }}
            />
        </>
    )
}

export default Game
