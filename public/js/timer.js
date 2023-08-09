const addNewTimerBtn = document.querySelector('.new-timer')
const setTimerContainer = document.querySelector('.set-timer-container')
const welcome = document.querySelector('.welcome')
const closeBtn = document.querySelector('.welcome button')
const container = document.querySelector('.container')
var timerContainer = document.querySelector('.timer-container')

const backBtn = document.getElementById('back')
const timeUpContainer = document.querySelector('.time-up-container')
const timeUpTime = document.querySelector('.time-up-time')
const stopTimerBtn = document.getElementById('stop-timer-btn')
const add1MinBtn = document.getElementById('add-1-min-btn')

const deleteContainer = document.querySelector('.delete-container')
const deleteBtn = document.getElementById('delete')
const cancelBtn = document.getElementById('cancel')

const hr = document.getElementById('hr')
const min = document.getElementById('min')
const sec = document.getElementById('sec')

const numbers = document.querySelectorAll('.numbers .nums')
const backSpace = document.querySelector('.numbers .backspace')

const startTimerBtn = document.querySelector('.start-timer .button')

var add1MinBtns = []
var playPauseBtns = []
var stopBtns = []
var deleteBtns = []

const timerSound = new Audio('./assets/sounds/alarm_sound.wav')

var savedTimers = []
var timers = []
var timersArray = []

var hrInput = 0
var minInput = 0
var secInput = 0
var totalInput = 0

closeBtn.onclick = () => {
    welcome.style.display = 'none'
    container.style.opacity = 1
    addNewTimerBtn.style.display = 'grid'
    addNewTimerBtn.style.cursor = 'pointer'
}

const closeSetNewTimer = ({ target }) => {
    if (target === setTimerContainer || setTimerContainer.contains(target) || target === addNewTimerBtn || addNewTimerBtn.contains(target)) {
        return
    }
    setTimerContainer.style.display = 'none'
    container.style.opacity = 1
    addNewTimerBtn.style.opacity = 1
    addNewTimerBtn.style.cursor = 'pointer'
    document.removeEventListener('mousedown', closeSetNewTimer)
}

const displaySavedTimers = () => {

    container.removeChild(document.querySelector('.timer-container'))
    timerContainer = document.createElement('div')
    timerContainer.classList = 'timer-container'
    container.append(timerContainer)

    if (localStorage.getItem('timers')) {
        savedTimers = localStorage.getItem('timers').split(':')
    }

    if (savedTimers.length > 0) {
        timers = []
        for (var i = 0; i < savedTimers.length; i++) {
            timers.push(savedTimers[i].split(','))
            for (var j = 0; j < 3; j++) {
                timers[i][j] = parseInt(timers[i][j])
            }
        }
        timers.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]) || (a[2] - b[2]))

        timersArray = []
        for (var i = 0; i < savedTimers.length; i++) {
            timersArray.push(savedTimers[i].split(','))
            for (var j = 0; j < 3; j++) {
                timersArray[i][j] = parseInt(timersArray[i][j])
            }
        }

        timersArray.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]) || (a[2] - b[2]))

        savedTimers = timers.join(';').split(';')

        for (var i = 0; i < savedTimers.length; i++) {
            const timer = savedTimers[i].split(',')

            for (var j = 0; j < 3; j++) {
                if (timer[j] < 10) {
                    timer[j] = `0${timer[j]}`
                }
            }

            if (timers[i][3] == 'pl') {
                timerContainer.innerHTML +=
                    `
                    <div class="timer-holder">
                        <div class="timer-time-container">
                            <div class="timer-time">${timer[0]}:${timer[1]}:${timer[2]}</div>
                            <div class="add-1-min" id="add-1-min-${i}">+1 min</div>
                        </div>
                        <span id="play-btn-${i}" class="play_pause_timer"><img src="./assets/images/pause_icon.svg" alt=""></span>
                        <span id="stop-btn-${i}" class="stop_timer"><img src="./assets/images/stop_icon.svg" alt=""></span>
                        <span id="delete-btn-${i}" class="delete_timer"><img src="./assets/images/delete_icon.svg"alt=""><span>
                    </div>
                `
            }
            else {
                timerContainer.innerHTML +=
                    `
                    <div class="timer-holder">
                        <div class="timer-time-container">
                            <div class="timer-time">${timer[0]}:${timer[1]}:${timer[2]}</div>
                            <div class="add-1-min" id="add-1-min-${i}">+1 min</div>
                        </div>
                        <span id="play-btn-${i}" class="play_pause_timer"><img src="./assets/images/play_icon.svg" alt=""></span>
                        <span id="stop-btn-${i}" class="stop_timer"><img src="./assets/images/stop_icon.svg" alt=""></span>
                        <span id="delete-btn-${i}" class="delete_timer"><img src="./assets/images/delete_icon.svg"alt=""><span>
                    </div>
                `
            }
        }

        add1MinBtns = document.querySelectorAll('.timer-container .timer-holder .timer-time-container .add-1-min')
        playPauseBtns = document.querySelectorAll('.timer-container .timer-holder .play_pause_timer')
        stopBtns = document.querySelectorAll('.timer-container .timer-holder .stop_timer')
        deleteBtns = document.querySelectorAll('.timer-container .timer-holder .delete_timer')
    }
}

displaySavedTimers()

addNewTimerBtn.onclick = () => {
    if (deleteContainer.style.display === 'none') {
        if (setTimerContainer.style.display === 'block') {
            setTimerContainer.style.display = 'none'
            container.style.opacity = 1
            addNewTimerBtn.style.opacity = 1
            addNewTimerBtn.style.cursor = 'pointer'
        }
        else {
            setTimerContainer.style.display = 'block'
            container.style.opacity = 0.5
            setTimerContainer.style.opacity = 1
            addNewTimerBtn.style.opacity = 0
            addNewTimerBtn.style.cursor = 'pointer'
            document.addEventListener('mousedown', closeSetNewTimer)
        }
        hr.innerHTML = '00'
        hr.style.color = 'rgb(254, 83, 39)'
        min.innerHTML = '00'
        min.style.color = 'rgb(254, 83, 39)'
        sec.innerHTML = '00'
        sec.style.color = 'rgb(254, 83, 39)'
        hrInput = 0
        minInput = 0
        secInput = 0
        totalInput = 0
    }
}

backBtn.onclick = () => {
    setTimerContainer.children[1].scrollTop = 0
    setTimerContainer.style.display = 'none'
    container.style.opacity = 1
    addNewTimerBtn.style.opacity = 1
    addNewTimerBtn.style.cursor = 'pointer'
}

hr.onclick = () => {
    hr.style.color = 'rgb(254, 83, 39)'
    min.style.color = 'rgb(255, 255, 255)'
    sec.style.color = 'rgb(255, 255, 255)'
}
min.onclick = () => {
    hr.style.color = 'rgb(255, 255, 255)'
    min.style.color = 'rgb(254, 83, 39)'
    sec.style.color = 'rgb(255, 255, 255)'
}
sec.onclick = () => {
    hr.style.color = 'rgb(255, 255, 255)'
    min.style.color = 'rgb(255, 255, 255)'
    sec.style.color = 'rgb(254, 83, 39)'
}

numbers.forEach(e => {
    e.onclick = () => {
        if (sec.style.color === 'rgb(254, 83, 39)' && min.style.color === 'rgb(254, 83, 39)' && hr.style.color === 'rgb(254, 83, 39)') {
            if (totalInput.toString().length < 6) {
                totalInput = totalInput * 10 + parseInt(e.innerHTML)

            }
            if (totalInput.toString().length <= 2) {
                if (totalInput.toString().substring(0, 2).length == 1) {
                    sec.innerHTML = '0' + totalInput.toString().substring(0, 2)
                }
                else {

                    sec.innerHTML = totalInput.toString().substring(0, 2)
                }
                secInput = parseInt(sec.innerHTML)
            }
            else if (totalInput.toString().length <= 4) {
                sec.innerHTML = totalInput.toString().substring(totalInput.toString().length - 2, totalInput.toString().length)
                secInput = parseInt(sec.innerHTML)
                if (totalInput.toString().substring(0, totalInput.toString().length - 2).length == 1) {
                    min.innerHTML = '0' + totalInput.toString().substring(0, totalInput.toString().length - 2)
                }
                else {
                    min.innerHTML = totalInput.toString().substring(0, totalInput.toString().length - 2)
                }
                minInput = parseInt(min.innerHTML)
            }
            else {
                sec.innerHTML = totalInput.toString().substring(totalInput.toString().length - 2, totalInput.toString().length)
                secInput = parseInt(sec.innerHTML)
                min.innerHTML = totalInput.toString().substring(totalInput.toString().length - 4, totalInput.toString().length - 2)
                minInput = parseInt(min.innerHTML)
                if (totalInput.toString().substring(0, totalInput.toString().length - 4).length == 1) {
                    hr.innerHTML = '0' + totalInput.toString().substring(0, totalInput.toString().length - 4)
                }
                else {
                    hr.innerHTML = totalInput.toString().substring(0, totalInput.toString().length - 4)
                }
                hrInput = parseInt(hr.innerHTML)
            }
        }

        else {
            if (sec.style.color === 'rgb(254, 83, 39)' && secInput.toString().length < 2) {
                secInput = secInput * 10 + parseInt(e.innerHTML)
                if (secInput < 10) {
                    sec.innerHTML = '0' + secInput
                }
                else {
                    sec.innerHTML = secInput
                }
            }

            else if (min.style.color === 'rgb(254, 83, 39)' && minInput.toString().length < 2) {
                minInput = minInput * 10 + parseInt(e.innerHTML)
                if (minInput < 10) {
                    min.innerHTML = '0' + minInput
                }
                else {
                    min.innerHTML = minInput
                }
            }

            else if (hr.style.color === 'rgb(254, 83, 39)' && hrInput.toString().length < 2) {
                hrInput = hrInput * 10 + parseInt(e.innerHTML)
                if (hrInput < 10) {
                    hr.innerHTML = '0' + hrInput
                }
                else {
                    hr.innerHTML = hrInput
                }
            }
        }


        if (hrInput > 0 || minInput > 0 || secInput > 0) {
            startTimerBtn.style.display = 'flex'
        }
        else {
            startTimerBtn.style.display = 'none'
        }

    }
});

backSpace.onclick = () => {
    if (sec.style.color === 'rgb(254, 83, 39)' && min.style.color === 'rgb(254, 83, 39)' && hr.style.color === 'rgb(254, 83, 39)') {
        if (totalInput.toString().length > 0) {
            totalInput = Math.floor(totalInput / 10)
        }
        if (hrInput > 0) {
            secInput = Math.floor(secInput / 10)
            secInput = (minInput % 10) * 10 + secInput
            minInput = Math.floor(minInput / 10)
            minInput = (hrInput % 10) * 10 + minInput
            hrInput = Math.floor(hrInput / 10)

            hr.innerHTML = '0' + hrInput
            if (minInput.toString().length == 1) {
                min.innerHTML = '0' + minInput
            }
            else {
                min.innerHTML = minInput
            }
            if (secInput.toString().length == 1) {
                sec.innerHTML = '0' + secInput
            }
            else {
                sec.innerHTML = secInput
            }
        }
        else if (minInput > 0) {
            secInput = Math.floor(secInput / 10)
            secInput = (minInput % 10) * 10 + secInput
            minInput = Math.floor(minInput / 10)

            min.innerHTML = '0' + minInput
            if (secInput.toString().length == 1) {
                sec.innerHTML = '0' + secInput
            }
            else {
                sec.innerHTML = secInput
            }
        }
        else if (secInput.toString().length <= 2) {
            secInput = Math.floor(secInput / 10)
            sec.innerHTML = '0' + secInput
        }
    }
    else {
        if (sec.style.color === 'rgb(254, 83, 39)' && secInput > 0) {
            secInput = Math.floor(secInput / 10)
            sec.innerHTML = '0' + secInput
        }

        else if (min.style.color === 'rgb(254, 83, 39)' && minInput > 0) {
            minInput = Math.floor(minInput / 10)
            min.innerHTML = '0' + minInput
        }

        else if (hr.style.color === 'rgb(254, 83, 39)' && hrInput > 0) {
            hrInput = Math.floor(hrInput / 10)
            hr.innerHTML = '0' + hrInput
        }
    }

    if (hrInput > 0 || minInput > 0 || secInput > 0) {
        startTimerBtn.style.display = 'flex'
    }
    else {
        startTimerBtn.style.display = 'none'
    }
}

startTimerBtn.onclick = () => {
    if (hrInput > 0 || minInput > 0 || secInput > 0) {
        if (secInput > 59) {
            secInput -= 60
            minInput += 1
        }
        if (minInput > 59) {
            minInput -= 60
            hrInput += 1
        }


        timers.push([hrInput, minInput, secInput, 'pl'])
        timers.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]) || (a[2] - b[2]))
        savedTimers = timers.join(';').split(';')

        localStorage.setItem('timers', savedTimers.join(':'))

        displaySavedTimers()

        backBtn.click()
    }
}

var timerIndex = []


setInterval(() => {

    if (welcome.style.display === 'none') {
        for (var i = 0; i < timersArray.length; i++) {
            if (timersArray[i][3] == 'pl') {
                if (timersArray[i][2] > 0) {
                    timersArray[i][2] -= 1
                }
                else if (timersArray[i][1] > 0) {
                    timersArray[i][1] -= 1
                    timersArray[i][2] = 59
                }
                else if (timersArray[i][0] > 0) {
                    timersArray[i][0] -= 1
                    timersArray[i][1] = 59
                    timersArray[i][2] = 59
                }
                else {
                    if (timersArray[i][2] > -59) {
                        timersArray[i][2] -= 1
                    }
                    else if (timersArray[i][1] > -59) {
                        timersArray[i][1] -= 1
                        timersArray[i][2] = 0
                    }
                    else {
                        timersArray[i][0] -= 1
                        timersArray[i][1] = 0
                        timersArray[i][2] = 0
                    }
                }

                var timerTime = ''
                var sign = ''

                if (timersArray[i][0] <= -10 || timersArray[i][0] >= 10) {
                    timerTime += `${Math.abs(timersArray[i][0])}:`
                    if (timersArray[i][0] <= -10) {
                        sign = '-'
                    }
                }
                else if (timersArray[i][0] < 0) {
                    timerTime += `0${Math.abs(timersArray[i][0])}:`
                    sign = '-'
                }
                else if (timersArray[i][0] < 10) {
                    timerTime += `0${timersArray[i][0]}:`
                }


                if (timersArray[i][1] <= -10 || timersArray[i][1] >= 10) {
                    timerTime += `${Math.abs(timersArray[i][1])}:`
                    if (timersArray[i][1] <= -10) {
                        sign = '-'
                    }
                }
                else if (timersArray[i][1] < 0) {
                    timerTime += `0${Math.abs(timersArray[i][1])}:`
                    sign = '-'
                }
                else if (timersArray[i][1] < 10) {
                    timerTime += `0${timersArray[i][1]}:`
                }


                if (timersArray[i][2] <= -10 || timersArray[i][2] >= 10) {
                    timerTime += `${Math.abs(timersArray[i][2])}`
                    if (timersArray[i][2] <= -10) {
                        sign = '-'
                    }
                }
                else if (timersArray[i][2] < 0) {
                    timerTime += `0${Math.abs(timersArray[i][2])}`
                    sign = '-'
                }
                else if (timersArray[i][2] < 10) {
                    timerTime += `0${timersArray[i][2]}`
                }

                if (sign == '-') {
                    timerTime = '-' + timerTime
                }

                timerContainer.children[i].children[0].children[0].innerHTML = timerTime

                if (timersArray[i][0] == 0 && timersArray[i][1] == 0 && timersArray[i][2] == 0) {
                    timerIndex.push(i)
                    if (timeUpContainer.style.display == 'none') {
                        timeUpContainer.style.display = 'flex'
                        timeUpTime.innerHTML = timerTime
                        timerSound.loop = true
                        timerSound.play()
                    }
                }

                if (timeUpContainer.style.display == 'flex') {
                    if (i == timerIndex[0]) {
                        timeUpTime.innerHTML = timerTime
                    }
                }
            }

            if (timerIndex.length > 1) {
                add1MinBtn.style.display = 'none'
                stopTimerBtn.innerHTML = `Stop All ${timerIndex.length} timers`
            }
            else {
                add1MinBtn.style.display = ''
            }

            stopTimerBtn.onclick = () => {

                timerSound.pause()

                timerIndex.forEach(e => {

                    timersArray[e][0] = timers[e][0]
                    timersArray[e][1] = timers[e][1]
                    timersArray[e][2] = timers[e][2]

                    var temTime = []
                    for (var j = 0; j < 3; j++) {
                        if (timers[e][j] < 10) {
                            temTime.push(`0${timers[e][j]}`)
                        }
                        else {
                            temTime.push(timers[e][j])
                        }
                    }

                    timerContainer.children[e].children[0].children[0].innerHTML = `${temTime[0]}:${temTime[1]}:${temTime[2]}`
                    timers[e][3] = 'st'

                    savedTimers = timers.join(';').split(';')
                    timersArray[e][3] = 'st'
                    localStorage.setItem('timers', savedTimers.join(':'))

                    timeUpContainer.style.display = 'none'
                    playPauseBtns[e].children[0].src = './assets/images/play_icon.svg'
                });
                timerIndex = []
            }

            add1MinBtn.onclick = () => {
                timersArray[timerIndex[0]][0] = 0
                timersArray[timerIndex[0]][1] = 1
                timersArray[timerIndex[0]][2] = 1

                timeUpContainer.style.display = 'none'
                timerIndex = []
            }
        }
    }
}, 1000);

setInterval(() => {
    deleteBtns.forEach(e => {
        e.onclick = () => {
            if (welcome.style.display === 'none') {
                deleteContainer.style.display = 'flex'
                container.style.opacity = 0.5
                addNewTimerBtn.style.opacity = 0
                addNewTimerBtn.style.cursor = 'default'

                deleteBtn.onclick = () => {
                    timers.splice(e.id.split('-')[2], 1)
                    timersArray.splice(e.id.split('-')[2], 1)
                    savedTimers.splice(e.id.split('-')[2], 1)



                    localStorage.setItem('timers', savedTimers.join(':'))

                    displaySavedTimers()

                    deleteBtns = document.querySelectorAll('.alarm-holder .delete_alarm')
                    deleteContainer.style.display = 'none'
                    container.style.opacity = 1
                    addNewTimerBtn.style.opacity = 1
                    addNewTimerBtn.style.cursor = 'pointer'
                }

                cancelBtn.onclick = () => {
                    deleteContainer.style.display = 'none'
                    container.style.opacity = 1
                    addNewTimerBtn.style.opacity = 1
                    addNewTimerBtn.style.cursor = 'pointer'
                }
            }
        }
    });

    playPauseBtns.forEach(e => {
        e.onclick = () => {
            if (welcome.style.display === 'none' && deleteContainer.style.display === 'none') {
                if (timers[e.id.split('-')[2]][3] == 'pl') {
                    timers[e.id.split('-')[2]][3] = 'pa'
                    timersArray[e.id.split('-')[2]][3] = 'pa'
                    playPauseBtns[e.id.split('-')[2]].children[0].src = './assets/images/play_icon.svg'
                }
                else if (timers[e.id.split('-')[2]][3] == 'pa' || timers[e.id.split('-')[2]][3] == 'st') {
                    timers[e.id.split('-')[2]][3] = 'pl'
                    timersArray[e.id.split('-')[2]][3] = 'pl'
                    playPauseBtns[e.id.split('-')[2]].children[0].src = './assets/images/pause_icon.svg'
                }

                savedTimers = timers.join(';').split(';')

                localStorage.setItem('timers', savedTimers.join(':'))
            }
        }
    });

    stopBtns.forEach(e => {
        e.onclick = () => {
            if (welcome.style.display === 'none' && deleteContainer.style.display === 'none') {
                timers[e.id.split('-')[2]][3] = 'st'
                timersArray[e.id.split('-')[2]][3] = 'st'

                timersArray[e.id.split('-')[2]][0] = timers[e.id.split('-')[2]][0]
                timersArray[e.id.split('-')[2]][1] = timers[e.id.split('-')[2]][1]
                timersArray[e.id.split('-')[2]][2] = timers[e.id.split('-')[2]][2]

                var temTime = []
                for (var j = 0; j < 3; j++) {
                    if (timers[e.id.split('-')[2]][j] < 10) {
                        temTime.push(`0${timers[e.id.split('-')[2]][j]}`)
                    }
                    else {
                        temTime.push(timers[e.id.split('-')[2]][j])
                    }
                }

                timerContainer.children[e.id.split('-')[2]].children[0].children[0].innerHTML = `${temTime[0]}:${temTime[1]}:${temTime[2]}`
                playPauseBtns[e.id.split('-')[2]].children[0].src = './assets/images/play_icon.svg'

                savedTimers = timers.join(';').split(';')

                localStorage.setItem('timers', savedTimers.join(':'))
            }
        }
    });

    add1MinBtns.forEach(e => {
        e.onclick = () => {
            if (welcome.style.display === 'none' && deleteContainer.style.display === 'none') {
                timersArray[e.id.split('-')[3]][1] += 1

                var temTime = []
                for (var j = 0; j < 3; j++) {
                    if (timersArray[e.id.split('-')[3]][j] < 10) {
                        temTime.push(`0${timersArray[e.id.split('-')[3]][j]}`)
                    }
                    else {
                        temTime.push(timersArray[e.id.split('-')[3]][j])
                    }
                }

                timerContainer.children[e.id.split('-')[3]].children[0].children[0].innerHTML = `${temTime[0]}:${temTime[1]}:${temTime[2]}`
            }
        }
    });
})