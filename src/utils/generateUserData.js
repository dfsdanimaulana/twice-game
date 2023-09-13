import { serverTimestamp } from 'firebase/firestore'

import collectionImages from '../data/collectionImages'

export const generateLevelData = () => {
    const data = []
    for (let i = 1; i <= 9; i++) {
        data.push({
            level: i,
            completed: false,
            completedCount: 0,
            locked: i === 1 ? false : true,
            bestTime: 60,
            bestTurns: 100,
            star1: false,
            star2: false,
            star3: false,
        })
    }
    return data
}

export const generateUserData = (user) => {
    const userData = {
        exp: 0,
        displayName: user.displayName,
        photoURL: user.photoURL,
        levels: generateLevelData(),
        collections: collectionImages,
        createdAt: serverTimestamp(),
    }

    return userData
}
