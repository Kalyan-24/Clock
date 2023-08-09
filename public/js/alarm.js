const newAlarmBtn = document.querySelector('.new-alarm')
const setAlarmContainer = document.querySelector('.set-alarm-container')
const container = document.querySelector('.container')
const backBtn = document.querySelector('.set-alarm-container .nav-bar img')
const timePickerSelect = document.querySelectorAll('.set-alarm-container .time-picker-container .time-picker-select')
const saveBtn = document.getElementById('save-btn')
const updateBtn = document.getElementById('update-btn')
const welcome = document.querySelector('.welcome')
const closeBtn = document.querySelector('.welcome button')
const alarmContainer = document.querySelector('.alarm-container')
const alarmTime = document.querySelector('.alarm-time')
const alarmTimeAMPM = document.querySelector('.alarm-time .alarm-AMPM')

const snoozeAlarmBtn = document.getElementById('snooze-alarm-btn')
const stopAlarmBtn = document.getElementById('stop-alarm-btn')

const deleteContainer = document.querySelector('.delete-container')
const deleteBtn = document.getElementById('delete')
const cancelBtn = document.getElementById('cancel')


const hourInput = document.querySelector('select[name="hour"]')
const minuteInput = document.querySelector('select[name="minute"]')
const meridianInput = document.querySelector('select[name="meridian"]')
const labelInput = document.querySelector('input[name="label"]')

const alarmSound = new Audio('./assets/sounds/alarm_sound.wav')

var alarmsWidget = document.querySelector('.alarms')

closeBtn.onclick = () => {
    welcome.style.display = 'none'
    container.style.opacity = 1
    newAlarmBtn.style.opacity = 1
    newAlarmBtn.style.cursor = 'pointer'
}

const displaySavedAlarms = () => {
    if (document.querySelector('.alarms')) {
        container.removeChild(document.querySelector('.alarms'))
    }
    alarmsWidget = document.createElement('div')
    alarmsWidget.classList = 'alarms'
    container.append(alarmsWidget)
    tempAlarms = []
    tempAlarms2 = []
    const time = new Date()

    for (var i = 0; i < alarms.length; i++) {
        const times = alarms[i].split(' ')

        if (times[2] === 'PM') {
            if (times[0] === '12') {
                tempAlarms2.push([parseInt(times[0]), parseInt(times[1]), times[2], times[3], times[4]])
            }
            else {
                tempAlarms2.push([parseInt(times[0]) + 12, parseInt(times[1]), times[2], times[3], times[4]])
            }
        }
        else if (times[2] === 'AM') {
            if (times[0] === '12') {
                tempAlarms2.push([0, parseInt(times[1]), times[2], times[3], times[4]])
            }
            else {
                tempAlarms2.push([parseInt(times[0]), parseInt(times[1]), times[2], times[3], times[4]])
            }
        }

        if (times[4] === 'checked') {
            if (times[2] === 'PM') {
                if (times[0] === '12') {
                    tempAlarms.push([parseInt(times[0]), parseInt(times[1])])
                }
                else {
                    tempAlarms.push([parseInt(times[0]) + 12, parseInt(times[1])])
                }
            }
            else if (times[2] === 'AM') {
                if (times[0] === '12') {
                    tempAlarms.push([0, parseInt(times[1])])
                }
                else {
                    tempAlarms.push([parseInt(times[0]), parseInt(times[1])])
                }
            }
        }
    }

    tempAlarms.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]))

    tempAlarms2.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]))

    alarms = []
    for (var i = 0; i < tempAlarms2.length; i++) {

        if (tempAlarms2[i][0] === 0) {
            tempAlarms2[i][0] = 12
        }
        else if (tempAlarms2[i][0] > 12) {
            tempAlarms2[i][0] -= 12
        }
        if (tempAlarms2[i][0] < 10) {
            tempAlarms2[i][0] = '0' + tempAlarms2[i][0]
        }
        if (tempAlarms2[i][1] < 10) {
            tempAlarms2[i][1] = '0' + tempAlarms2[i][1]
        }


        alarms.push(`${tempAlarms2[i][0]} ${tempAlarms2[i][1]} ${tempAlarms2[i][2]} ${tempAlarms2[i][3]} ${tempAlarms2[i][4]}`)

        localStorage.setItem('alarms', alarms.join(':'))

        if (tempAlarms2[i][3] === '') {
            tempAlarms2[i][3] = `Alarm ${i + 1}`
        }

        if (tempAlarms2[i][4] === 'checked') {

            alarmsWidget.innerHTML +=
                `
            <div class="alarm-holder">
                <div class="alarm" id="alarm-${i}">
                    <div class="alarm-time">${tempAlarms2[i][0]}:${tempAlarms2[i][1]} ${tempAlarms2[i][2]}</div>
                    <div class="alarm-label">${tempAlarms2[i][3]}</div>
                    <input type="checkbox" id="switch-${i}" ${tempAlarms2[i][4]}/>
                    <label for="switch-${i}">Toggle</label>
                </div>
                <span id="delete-btn-${i}" class="delete_alarm"><img src="./assets/images/delete_icon.svg" alt=""></span>
            </div>
            `
        }
        else {
            alarmsWidget.innerHTML +=
                `
            <div class="alarm-holder">
                <div class="alarm" id="alarm-${i}">
                    <div class="alarm-time off">${tempAlarms2[i][0]}:${tempAlarms2[i][1]} ${tempAlarms2[i][2]}</div>
                    <div class="alarm-label off">${tempAlarms2[i][3]}</div>
                    <input type="checkbox" id="switch-${i}" ${tempAlarms2[i][4]}/>
                    <label for="switch-${i}">Toggle</label>
                </div>
                <span id="delete-btn-${i}" class="delete_alarm"><img src="./assets/images/delete_icon.svg" alt=""></span>
            </div>
            `
        }

    }

    for (var i = 0; i < tempAlarms.length; i++) {
        if ((parseInt(tempAlarms[0][0]) > time.getHours()) || ((parseInt(tempAlarms[0][0]) === time.getHours()) && (parseInt(tempAlarms[0][1]) > time.getMinutes()))) {
            break
        }
        else {
            tempAlarms.push(tempAlarms.shift())
        }
    }

}

let savedAlarms = localStorage.getItem('alarms')

var alarms = []

let tempAlarms = []
let tempAlarms2 = []

if (savedAlarms) {
    alarms = savedAlarms.split(':')

    displaySavedAlarms()
}

var switches = document.querySelectorAll('.alarm input[type="checkbox"]')
var deleteBtns = document.querySelectorAll('.alarm-holder .delete_alarm')

const closeNewAlarmContainer = ({ target }) => {

    if (target === setAlarmContainer || setAlarmContainer.contains(target) || target === newAlarmBtn || newAlarmBtn.contains(target)) {
        return
    }
    setAlarmContainer.style.display = 'none'
    container.style.opacity = 1
    newAlarmBtn.style.opacity = 1
    newAlarmBtn.style.cursor = 'pointer'
    document.removeEventListener('mousedown', closeNewAlarmContainer)
}

newAlarmBtn.onclick = ({ target }) => {

    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    setCurrentTimeInPicker(hours, minutes, '')

    if (welcome.style.display === 'flex' || alarmContainer.style.display === 'flex' || deleteContainer.style.display === 'flex') {
    }

    else if (setAlarmContainer.style.display === 'block') {
        if (target === setAlarmContainer || setAlarmContainer.contains(target)) {
            return
        }
        setAlarmContainer.style.display = 'none'
        container.style.opacity = 1
        newAlarmBtn.style.opacity = 1
        newAlarmBtn.style.cursor = 'pointer'
    }
    else if (setAlarmContainer.style.display === 'none' || !setAlarmContainer.style.display) {
        setAlarmContainer.style.display = 'block'
        saveBtn.style.display = 'block'
        updateBtn.style.display = 'none'
        container.style.opacity = 0.5
        newAlarmBtn.style.opacity = 0
        newAlarmBtn.style.cursor = 'default'
        document.addEventListener('mousedown', closeNewAlarmContainer,)
    }
}

backBtn.onclick = () => {
    setAlarmContainer.style.display = 'none'
    container.style.opacity = 1
    newAlarmBtn.style.opacity = 1
    newAlarmBtn.style.cursor = 'pointer'
}

const numberToOption = (num) => {
    num = num.toString().padStart(2, '0')

    return `<option value='${num}'>${num}</option>`
}

const hrOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(numberToOption)
const minOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60].map(numberToOption)

timePickerSelect[0].innerHTML = `${hrOptions.join('')}`
timePickerSelect[1].innerHTML = `${minOptions.join('')}`

const setCurrentTimeInPicker = (hours, minutes, alarmName) => {

    if (hours == 0) {
        timePickerSelect[0][11].selected = 'selected'
        timePickerSelect[2][0].selected = 'selected'
    }
    else if (hours <= 12) {
        timePickerSelect[0][hours - 1].selected = 'selected'
        timePickerSelect[2][0].selected = 'selected'
    }
    else {
        timePickerSelect[0][hours - 12 - 1].selected = 'selected'
        timePickerSelect[2][1].selected = 'selected'
    }
    timePickerSelect[1][minutes].selected = 'selected'

    document.querySelector('.set-alarm-container input').value = alarmName
}


const hours = new Date().getHours()
const minutes = new Date().getMinutes()
setCurrentTimeInPicker(hours, minutes, '')

saveBtn.onclick = () => {
    if (alarms.length != 0) {
        if (labelInput.value === '') {
        }
        localStorage.setItem("alarms", `${localStorage.getItem('alarms')}:${hourInput.value} ${minuteInput.value} ${meridianInput.value} ${labelInput.value} checked`);
    }
    else {
        localStorage.setItem("alarms", `${hourInput.value} ${minuteInput.value} ${meridianInput.value} ${labelInput.value} checked`);
    }

    alarms = localStorage.getItem('alarms').split(':')

    displaySavedAlarms()


    switches = document.querySelectorAll('.alarm input[type="checkbox"]')
    switches.forEach(e => {
        e.onchange = () => {
            if (welcome.style.display === 'none' && deleteContainer.style.display === 'none') {
                const switchId = e.id.split('-')[1]
                const times = alarms[switchId].split(' ')

                document.querySelector('.alarms').children[switchId].children[0].children[0].classList.toggle('off')
                document.querySelector('.alarms').children[switchId].children[0].children[1].classList.toggle('off')


                if (times[4] === '') {
                    alarms[switchId] = `${times[0]} ${times[1]} ${times[2]} ${times[3]} checked`
                }
                else if (times[4] === 'checked') {
                    alarms[switchId] = `${times[0]} ${times[1]} ${times[2]} ${times[3]} `
                }


                localStorage.setItem('alarms', alarms.join(':'))
            }
            else{
                if(e.checked){
                    e.checked = false
                }
                else{
                    e.checked = true
                }
            }
        }
    })

    deleteBtns = document.querySelectorAll('.alarm-holder .delete_alarm')
    deleteBtns.forEach(e => {
        e.onclick = () => {
            if (welcome.style.display === 'none') {
                deleteContainer.style.display = 'flex'
                container.style.opacity = 0.5
                newAlarmBtn.style.opacity = 0
                newAlarmBtn.style.cursor = 'default'

                deleteBtn.onclick = () => {
                    const deleteBtnId = e.id.charAt(e.id.length - 1)

                    alarms.splice(deleteBtnId, 1)
                    localStorage.setItem('alarms', alarms.join(':'))

                    displaySavedAlarms()

                    deleteBtns = document.querySelectorAll('.alarm-holder .delete_alarm')
                    deleteContainer.style.display = 'none'
                    container.style.opacity = 1
                    newAlarmBtn.style.opacity = 1
                    newAlarmBtn.style.cursor = 'pointer'
                }

                cancelBtn.onclick = () => {
                    deleteContainer.style.display = 'none'
                    container.style.opacity = 1
                    newAlarmBtn.style.opacity = 1
                    newAlarmBtn.style.cursor = 'pointer'
                }
            }
        }
    })

    backBtn.click()
}

switches.forEach(e => {
    e.onchange = () => {
        if (welcome.style.display === 'none' && deleteContainer.style.display === 'none') {
            const switchId = e.id.split('-')[1]
            const times = alarms[switchId].split(' ')

            document.querySelector('.alarms').children[switchId].children[0].children[0].classList.toggle('off')
            document.querySelector('.alarms').children[switchId].children[0].children[1].classList.toggle('off')


            if (times[4] === '') {
                alarms[switchId] = `${times[0]} ${times[1]} ${times[2]} ${times[3]} checked`
            }
            else if (times[4] === 'checked') {
                alarms[switchId] = `${times[0]} ${times[1]} ${times[2]} ${times[3]} `
            }


            localStorage.setItem('alarms', alarms.join(':'))
        }
        else{
            if(e.checked){
                e.checked = false
            }
            else{
                e.checked = true
            }
        }
    }
})

snoozeAlarmBtn.onclick = () => {
    alarmContainer.style.display = 'none'
    alarmSound.pause()
    alarmSound.currentTime = 0

    const tempHr = alarmTime.childNodes[0].innerHTML
    const tempMin = alarmTime.childNodes[2].innerHTML

    var timeInMin = (parseInt(tempHr) * 60) + parseInt(tempMin)

    if (alarmTime.childNodes[3].innerHTML === 'PM') {
        timeInMin += 720
    }

    if (timeInMin >= 1440) {
        timeInMin -= 1440
    }

    timeInMin += 5


    tempAlarms.push([Math.floor(timeInMin / 60), Math.round((timeInMin / 60 - Math.floor(timeInMin / 60)) * 60), 'snooze'])

}
stopAlarmBtn.onclick = () => {
    alarmContainer.style.display = 'none'
    alarmSound.pause()
    alarmSound.currentTime = 0
}

setInterval(() => {
    const time = new Date()

    tempAlarms.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]))

    let ind = 0
    while (ind + 1 < tempAlarms.length) {
        if (tempAlarms[ind][0] === tempAlarms[ind + 1][0] && tempAlarms[ind][1] === tempAlarms[ind + 1][1]) {
            if (tempAlarms[ind][3]) {
                tempAlarms.splice(ind, 1)
            }
            else {
                tempAlarms.splice(ind + 1, 1)
            }
        }
        else {
            ind += 1
        }
    }


    for (var i = 0; i < tempAlarms.length; i++) {
        if ((parseInt(tempAlarms[0][0]) > time.getHours()) || ((parseInt(tempAlarms[0][0]) === time.getHours()) && (parseInt(tempAlarms[0][1]) > time.getMinutes()))) {
            break
        }
        else if (parseInt(tempAlarms[0][0]) === time.getHours() && (parseInt(tempAlarms[0][1]) === time.getMinutes()) && (time.getSeconds() === 0)) {

            if (welcome.style.display === 'none') {
                alarmContainer.style.display = 'flex'


                if (tempAlarms[0][0] === 0) {
                    alarmContainer.childNodes[3].innerHTML = `<span>12</span>`
                }
                else if (tempAlarms[0][0] < 10) {
                    alarmContainer.childNodes[3].innerHTML = `<span>0${tempAlarms[0][0]}</span>`
                }
                else if ((tempAlarms[0][0] >= 10) && (tempAlarms[0][0] <= 12)) {
                    alarmContainer.childNodes[3].innerHTML = `<span>${tempAlarms[0][0]}</span>`
                }
                else {
                    alarmContainer.childNodes[3].innerHTML = `<span>${tempAlarms[0][0] - 12}</span>`
                }

                if (tempAlarms[0][1] < 10) {
                    alarmContainer.childNodes[3].innerHTML += `:<span>0${tempAlarms[0][1]}</span>`
                }
                else {
                    alarmContainer.childNodes[3].innerHTML += `:<span>${tempAlarms[0][1]}</span>`
                }
                if (tempAlarms[0][0] < 12) {
                    alarmContainer.childNodes[3].innerHTML += `<span class="alarm-AMPM">AM</span>`
                }
                else {
                    alarmContainer.childNodes[3].innerHTML += `<span class="alarm-AMPM">PM</span>`
                }

                if (tempAlarms[0][2]) {
                    tempAlarms.shift()
                }
                else {
                    const currentAlarm = tempAlarms.shift()
                    setTimeout(() => {
                        tempAlarms.push(currentAlarm)
                    }, 60000)
                }

                alarmSound.loop = true
                alarmSound.play()
            }

        }
        else {
            tempAlarms.push(tempAlarms.shift())
        }
    }

    switches = document.querySelectorAll('.alarm input[type="checkbox"]')
    switches.forEach(e => {
        e.onchange = () => {
            if (welcome.style.display === 'none' && deleteContainer.style.display === 'none') {
                const switchId = e.id.split('-')[1]
                const times = alarms[switchId].split(' ')

                document.querySelector('.alarms').children[switchId].children[0].children[0].classList.toggle('off')
                document.querySelector('.alarms').children[switchId].children[0].children[1].classList.toggle('off')


                if (times[4] === '') {
                    alarms[switchId] = `${times[0]} ${times[1]} ${times[2]} ${times[3]} checked`
                }
                else if (times[4] === 'checked') {
                    alarms[switchId] = `${times[0]} ${times[1]} ${times[2]} ${times[3]} `
                }


                localStorage.setItem('alarms', alarms.join(':'))
            }
            else{
                if(e.checked){
                    e.checked = false
                }
                else{
                    e.checked = true
                }
            }
        }
    })

    deleteBtns = document.querySelectorAll('.alarm-holder .delete_alarm')
    deleteBtns.forEach(e => {
        e.onclick = () => {
            if (welcome.style.display === 'none') {
                deleteContainer.style.display = 'flex'
                container.style.opacity = 0.5
                newAlarmBtn.style.opacity = 0
                newAlarmBtn.style.cursor = 'default'
                deleteBtn.onclick = () => {
                    const deleteBtnId = e.id.charAt(e.id.length - 1)

                    alarms.splice(deleteBtnId, 1)
                    localStorage.setItem('alarms', alarms.join(':'))

                    displaySavedAlarms()

                    deleteBtns = document.querySelectorAll('.alarm-holder .delete_alarm')
                    deleteContainer.style.display = 'none'
                    container.style.opacity = 1
                    newAlarmBtn.style.opacity = 1
                    newAlarmBtn.style.cursor = 'pointer'
                }

                cancelBtn.onclick = () => {
                    deleteContainer.style.display = 'none'
                    container.style.opacity = 1
                    newAlarmBtn.style.opacity = 1
                    newAlarmBtn.style.cursor = 'pointer'
                }
            }
        }
    })

    var alarmsWidgets = document.querySelectorAll('.alarm')

    alarmsWidgets.forEach(e => {
        e.onclick = () => {
            if (setAlarmContainer.style.display === 'none') {
                const AMPM = e.children[0].innerHTML.substring(6, 8)

                var hours = parseInt(e.children[0].innerHTML.substring(0, 2))
                if (AMPM === 'PM') {
                    hours += 12
                }
                const minutes = parseInt(e.children[0].innerHTML.substring(3, 5))
                newAlarmBtn.click()

                saveBtn.style.display = 'none'
                updateBtn.style.display = 'block'

                updateBtn.onclick = () => {

                    alarms[e.id.split('-')[1]] = `${hourInput.value} ${minuteInput.value} ${meridianInput.value} ${labelInput.value} checked`

                    localStorage.setItem('alarms', alarms.join(':'))

                    switches = document.querySelectorAll('.alarm input[type="checkbox"]')
                    switches.forEach(e => {
                        e.onchange = () => {
                            if (welcome.style.display === 'none' && deleteContainer.style.display === 'none') {
                                const switchId = e.id.split('-')[1]
                                const times = alarms[switchId].split(' ')

                                document.querySelector('.alarms').children[switchId].children[0].children[0].classList.toggle('off')
                                document.querySelector('.alarms').children[switchId].children[0].children[1].classList.toggle('off')


                                if (times[4] === '') {
                                    alarms[switchId] = `${times[0]} ${times[1]} ${times[2]} ${times[3]} checked`
                                }
                                else if (times[4] === 'checked') {
                                    alarms[switchId] = `${times[0]} ${times[1]} ${times[2]} ${times[3]} `
                                }


                                localStorage.setItem('alarms', alarms.join(':'))
                            }
                            else{
                                if(e.checked){
                                    e.checked = false
                                }
                                else{
                                    e.checked = true
                                }
                            }
                        }
                    })

                    deleteBtns = document.querySelectorAll('.alarm-holder .delete_alarm')
                    deleteBtns.forEach(e => {
                        e.onclick = () => {
                            if (welcome.style.display === 'none') {
                                deleteContainer.style.display = 'flex'
                                container.style.opacity = 0.5
                                newAlarmBtn.style.opacity = 0
                                newAlarmBtn.style.cursor = 'default'
                                deleteBtn.onclick = () => {
                                    const deleteBtnId = e.id.charAt(e.id.length - 1)

                                    alarms.splice(deleteBtnId, 1)
                                    localStorage.setItem('alarms', alarms.join(':'))

                                    displaySavedAlarms()

                                    deleteBtns = document.querySelectorAll('.alarm-holder .delete_alarm')
                                    deleteContainer.style.display = 'none'
                                    container.style.opacity = 1
                                    newAlarmBtn.style.opacity = 1
                                    newAlarmBtn.style.cursor = 'pointer'
                                }

                                cancelBtn.onclick = () => {
                                    deleteContainer.style.display = 'none'
                                    container.style.opacity = 1
                                    newAlarmBtn.style.opacity = 1
                                    newAlarmBtn.style.cursor = 'pointer'
                                }
                            }
                        }
                    })

                    backBtn.click()

                    displaySavedAlarms()

                }

                setCurrentTimeInPicker(hours, minutes, alarms[e.id.split('-')[1]].split(' ')[3])
            }
            else {
                setAlarmContainer.style.display = 'none'
                container.style.opacity = 1
                newAlarmBtn.style.opacity = 1
                newAlarmBtn.style.cursor = 'pointer'
            }
        }
    })

})
