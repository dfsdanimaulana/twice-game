export default function getRandomValuesFromArray(arr, numValues = 0) {
    if (numValues >= arr.length || numValues === 0) {
        return arr // Return all values if requested count is more than or equal to array length
    }

    const result = []
    const usedIndices = new Set()

    while (result.length < numValues) {
        const randomIndex = Math.floor(Math.random() * arr.length)

        if (!usedIndices.has(randomIndex)) {
            result.push(arr[randomIndex])
            usedIndices.add(randomIndex)
        }
    }

    return result
}
