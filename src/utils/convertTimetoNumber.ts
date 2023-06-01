
// params format is "1:00"
const convertTimeToNumber = (timer: string) => {

    let time = timer.split(':')
    let minutes = Number(time[0])
    let seconds = Number(time[1])

    return (minutes * 60) + seconds

    // let time = String(Math.floor(counter / 60)).padStart(2, '0') + ':' + String(Math.floor(counter % 60)).padStart(2, '0')
    // console.log('converting time', time)
    // return time
}

export default convertTimeToNumber