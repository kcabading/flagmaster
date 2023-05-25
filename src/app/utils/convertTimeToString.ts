

const convertTimeToString = (counter: number) => {
    let time = String(Math.floor(counter / 60)).padStart(2, '0') + ':' + String(Math.floor(counter % 60)).padStart(2, '0')
    return time
}

export default convertTimeToString