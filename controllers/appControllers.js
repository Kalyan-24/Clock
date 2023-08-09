const clockController = (req, res) => {
    res.render('clock')
}
const alarmController = (req, res) => {
    res.render('alarm')
}
const worldClockController = (req, res) => {
    res.render('world_clock')
}
const timerController = (req, res) => {
    res.render('timer')
}
const stopwatchController = (req, res) => {
    res.render('stopwatch')
}

export { clockController, alarmController, worldClockController, timerController, stopwatchController }