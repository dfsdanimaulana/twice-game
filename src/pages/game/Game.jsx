import { useState, useEffect, useRef } from 'react'
import { Fireworks } from '@fireworks-js/react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase.js'
import useFirebaseAuth from '../../hooks/useFirebaseAuth.js'
import useDocument from '../../hooks/useDocument.js'
import { toast } from 'react-toastify'
import images from './images.js'

// components
import SingleCard from '../../components/SingleCard'
import BackButton from '../../components/BackButton'
import GameRecord from '../../components/GameRecord'
import { AiOutlineLeft } from 'react-icons/ai'
import LevelCompleteModal from '../../components/LevelCompleteModal.jsx'

function Game() {
    const { user } = useFirebaseAuth()
    const { document: currentLevelData } = useDocument('Users', user?.uid) // [{{},{},{}}]
    const { level: currentLevel } = useParams()
    const levelNumber = parseInt(currentLevel)
    const time = 60 + levelNumber * 5
    const navigate = useNavigate()
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [timer, setTimer] = useState(time)
    const [timeCount, setTimeCount] = useState(0)
    const [timeOut, setTimeOut] = useState(false)
    const [incorrectGuess, setIncorrectGuess] = useState(0)
    const [levelComplete, setLevelComplete] = useState(false)
    const [gamePoint, setGamePoint] = useState(0)
    const [stars, setStars] = useState({
        star1: false,
        star2: false,
        star3: false
    })

    const currentLevelDataLevels = currentLevelData?.levels || []
    const currentLevelDataLevel = currentLevelDataLevels.find(
        (level) => level.level === levelNumber
    )
    const isLevelCompleted = currentLevelDataLevel?.completed || false

    const fireRef = useRef(null)
    const intervalTimer = useRef(null)
    const countTimer = useRef(null)

    // prevent user writing level in url more than available level
    useEffect(() => {
        // Check if the levelNumber is a valid number within the desired range
        const isValidLevel =
            !isNaN(levelNumber) && levelNumber >= 1 && levelNumber <= 9

        // Redirect to the appropriate page if the level is invalid
        if (!isValidLevel) {
            navigate('/')
        }
    }, [levelNumber, navigate])

    const goToNextLevel = () => {
        navigate('/game/' + `${levelNumber !== 9 ? levelNumber + 1 : 9}`)
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
                        level.bestTime > timeCount ? timeCount : level.bestTime
                    const bestTurns =
                        level.bestTurns > turns ? turns : level.bestTurns

                    // level completed
                    const star1 = true

                    // finish in time/2 or less
                    const star2 = level.star2
                        ? level.star2
                        : timeCount <= Math.round(time / 2)
                        ? true
                        : false

                    // complete game 5 times
                    const star3 = completedCount >= 5 ? true : false

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

            const point = Math.round(
                (levelNumber * timer - incorrectGuess) * 10
            )

            setGamePoint(point)
            const exp = data.exp + point

            await updateDoc(docRef, {
                levels: updatedLevelsArray,
                exp
            })
            // TODO : Show winning modal
            // point exp, star collected, rematch button, next level, home
            setLevelComplete(true)
        } catch (error) {
            console.error('Error updating array field:', error)
            toast.error('Failed to update user data: ' + error.message)
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
        const currentLevelImages = images[`lv${currentLevel}`]
        if (currentLevelImages) {
            const cardImages = images[`lv${currentLevel}`].images
            const shuffledCards = [...cardImages, ...cardImages]
                .sort(() => Math.random() - 0.5)
                .map((card) => ({ ...card, id: Math.random() }))

            setChoiceOne(null)
            setChoiceTwo(null)
            setCards(shuffledCards)
            setTurns(0)

            setDisabled(false)
            setTimeOut(false)
            timeStop()
            countStop()
            setTimeCount(0)
            setTimer(time)
            stopFireworks()
            setIncorrectGuess(0)
            setLevelComplete(false)
            setGamePoint(0)
        }
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
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare 2 selected cards
    useEffect(() => {
        // game finished if all matched
        if (
            cards.length !== 0 &&
            cards.filter((card) => card.matched === false).length < 1
        ) {
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
                resetTurn()
            } else {
                // not matched
                setIncorrectGuess((prev) => prev + 1)
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo, cards])

    // reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns((prevTurns) => prevTurns + 1)
        setDisabled(false)
    }

    // start new game automatically
    useEffect(() => {
        shuffleCards()
    }, [currentLevel])

    // time out handler
    useEffect(() => {
        if (timer < 1) {
            timeStop()
            setTimeOut(true)
            setDisabled(true)
        }
    }, [timer])

    return (
        <>
            <div className='full-centered text-center py-12'>
                {timeOut && (
                    <div className='text-xl text-red-400'>Time out ☹</div>
                )}
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
                <GameRecord level={currentLevelDataLevel} />
                {isLevelCompleted && (
                    <div className='flex items-center'>
                        {levelNumber !== 1 && (
                            <button
                                onClick={goToPrevLevel}
                                className='border-2 border-tw-5 rounded-lg bg-tw-3 hover:bg-tw-4 -mr-2 py-2 px-1 text-light font-bold transition duration-150 ease-in-out hover:scale-[1.2] dark:bg-navy dark:hover:bg-blue-600 dark:border-dark-blue'>
                                <AiOutlineLeft />
                            </button>
                        )}
                        <button className='btn-primary' onClick={goToNextLevel}>
                            {currentLevel !== '9'
                                ? 'Next Level'
                                : 'Coming Soon'}
                        </button>
                    </div>
                )}
            </div>
            <LevelCompleteModal
                levelComplete={levelComplete}
                gamePoint={gamePoint}
                setLevelComplete={setLevelComplete}
                goToNextLevel={goToNextLevel}
                shuffleCards={shuffleCards}
                level={currentLevel}
                stars={stars}
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
