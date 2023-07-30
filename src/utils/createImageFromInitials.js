export const getRandomColor = () => {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

const getInitials = (name) => {
    let initials
    const nameSplit = name.split(' ')
    const nameLength = nameSplit.length
    if (nameLength > 1) {
        initials =
            nameSplit[0].substring(0, 1) +
            nameSplit[nameLength - 1].substring(0, 1)
    } else if (nameLength === 1) {
        initials = nameSplit[0].substring(0, 1)
    } else return

    return initials.toUpperCase()
}

const createImageFromInitials = (size, name) => {
    if (name == null) return
    name = getInitials(name)
    const color = getRandomColor()

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = canvas.height = size

    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, size, size)

    context.fillStyle = `${color}50`
    context.fillRect(0, 0, size, size)

    context.fillStyle = color
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    context.font = `${size / 2}px Roboto`
    context.fillText(name, size / 2, size / 2)

    // Convert canvas to data URL
    const dataURL = canvas.toDataURL('image/jpeg')

    // Convert data URL to Blob
    const base64String = atob(dataURL.split(',')[1])
    const arrayBuffer = new ArrayBuffer(base64String.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < base64String.length; i++) {
        uint8Array[i] = base64String.charCodeAt(i)
    }

    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' })

    return { dataURL, blob }
}

export default createImageFromInitials
