const stopwatch = document.querySelector('.stopwatch-container .stopwatch')
const stopwatchTime = document.querySelector('.stopwatch-container .stopwatch .stopwatch-time')
const hr = document.querySelector('.stopwatch-container .stopwatch #hr')
const min = document.querySelector('.stopwatch-container .stopwatch #min')
const sec = document.querySelector('.stopwatch-container .stopwatch #sec')
const mls = document.querySelector('.stopwatch-container .stopwatch #mls')

const resetBtn = document.querySelector('.stopwatch-btns .reset_btn')
const playPauseBtn = document.querySelector('.stopwatch-btns .play_pause_btn')
const lapBtn = document.querySelector('.stopwatch-btns .lap_btn')

const lapsContainer = document.querySelector('.laps-container')

var hrTime = 0
var minTime = 0
var secTime = 0
var mlsTime = 0

var myInterval = 1

var sNo = 1
var temHrTime = 0
var temMinTime = 0
var temSecTime = 0
var temMlsTime = 0

playPauseBtn.onclick = () => {

    resetBtn.style.display = 'flex'
    lapBtn.style.display = 'flex'

    const playPauseBtnIcon = playPauseBtn.children[0].src.split('/')[playPauseBtn.children[0].src.split('/').length - 1]
    if (playPauseBtnIcon === 'play_icon.svg') {
        playPauseBtn.children[0].src = './assets/images/pause_icon.svg'
    }
    else {
        playPauseBtn.children[0].src = './assets/images/play_icon.svg'
    }

    if (playPauseBtnIcon === 'play_icon.svg') {
        lapBtn.style.opacity = 1
        myInterval = setInterval(() => {
            mlsTime += 1
            if (mlsTime > 100) {
                secTime += 1
                mlsTime -= 100
            }
            if (secTime > 59) {
                minTime += 1
                secTime -= 60
            }
            if (minTime > 59) {
                hrTime += 1
                minTime -= 60
            }

            if (hrTime < 10) {
                hr.innerHTML = `0${hrTime}`
            }
            else {
                hr.innerHTML = `${hrTime}`
            }
            if (minTime < 10) {
                min.innerHTML = `0${minTime}`
            }
            else {
                min.innerHTML = `${minTime}`
            }
            if (secTime < 10) {
                sec.innerHTML = `0${secTime}`
            }
            else {
                sec.innerHTML = `${secTime}`
            }
            if (mlsTime < 10) {
                mls.innerHTML = `0${mlsTime}`
            }
            else {
                mls.innerHTML = `${mlsTime}`
            }
        }, 10)
        stopwatchTime.classList.remove('blink-animate')
    }
    else {
        stopwatchTime.classList.add('blink-animate')
        lapBtn.style.opacity = 0
        clearInterval(myInterval)
        myInterval += 1
    }
}

resetBtn.onclick = () => {
    clearInterval(myInterval)

    lapsContainer.innerHTML = ''

    myInterval += 1

    resetBtn.style.display = 'none'
    lapBtn.style.display = 'none'

    playPauseBtn.children[0].src = './assets/images/play_icon.svg'

    hrTime = 0
    minTime = 0
    secTime = 0
    mlsTime = 0

    hr.innerHTML = '00'
    min.innerHTML = '00'
    sec.innerHTML = '00'
    mls.innerHTML = '00'

    sNo = 1
    temHrTime = 0
    temMinTime = 0
    temSecTime = 0
    temMlsTime = 0

}

lapBtn.onclick = () => {

    if (lapBtn.style.opacity === '1') {
        if (mlsTime < temMlsTime) {
            temMlsTime = mlsTime + 100 - temMlsTime
            temSecTime += 1
        }
        else {
            temMlsTime = mlsTime - temMlsTime
        }

        var thrt = 0
        var tmint = 0
        var tsect = 0
        var tmlst = 0

        var hrt = 0
        var mint = 0
        var sect = 0
        var mlst = 0


        if (hrTime - temHrTime < 10) {
            thrt = `0${hrTime - temHrTime}`
        }
        else {
            thrt = `${hrTime - temHrTime}`
        }
        if (minTime - temMinTime < 10) {
            tmint = `0${minTime - temMinTime}`
        }
        else {
            tmint = `${minTime - temMinTime}`
        }
        if (secTime - temSecTime < 10) {
            tsect = `0${secTime - temSecTime}`
        }
        else {
            tsect = `${secTime - temSecTime}`
        }
        if (temMlsTime < 10) {
            tmlst = `0${temMlsTime}`
        }
        else {
            tmlst = `${temMlsTime}`
        }

        if (hrTime < 10) {
            hrt = `0${hrTime}`
        }
        else {
            hrt = `${hrTime}`
        }
        if (minTime < 10) {
            mint = `0${minTime}`
        }
        else {
            mint = `${minTime}`
        }
        if (secTime < 10) {
            sect = `0${secTime}`
        }
        else {
            sect = `${secTime}`
        }
        if (mlsTime < 10) {
            mlst = `0${mlsTime}`
        }
        else {
            mlst = `${mlsTime}`
        }

        lapsContainer.innerHTML =
            `
                <div class="laps">
                    <div class="sno">${sNo}.</div>
                    <div class="lap-time">${thrt}:${tmint}:${tsect}.${tmlst}</div>
                    <div class="total-time">${hrt}:${mint}:${sect}.${mlst}</div>
                </div>
            ` + lapsContainer.innerHTML
        temHrTime = hrTime
        temMinTime = minTime
        temSecTime = secTime
        temMlsTime = mlsTime

        sNo += 1
    }
}
