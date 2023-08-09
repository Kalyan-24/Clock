let hr = document.querySelector('.hr');
let min = document.querySelector('.min');
let sec = document.querySelector('.sec');

let digHr = document.querySelector('.digitalHr');
let digMin = document.querySelector('.digitalMin');
let digSec = document.querySelector('.digitalSec');
let digAMPM = document.querySelector('.digitalAMPM');

setInterval(() => {
    let day = new Date();

    currentHr =  day.getHours() * 30;
    currentMin =  day.getMinutes() * 6;
    currentSec =  day.getSeconds() * 6;

    hr.style.transform = `rotateZ(${currentHr + (currentMin / 12) + (currentSec / 60)}deg) translateY(-30%)`;
    min.style.transform = `rotateZ(${currentMin + (currentSec / 60)}deg) translateY(-30%) scaleX(-75%)`;
    sec.style.transform = `rotateZ(${currentSec}deg) translateY(-30%) scaleX(-50%)`;

    const h = day.getHours()
    if(h <= 12){
        if(h == 0){
            digHr.innerHTML = 12
        }
        else if(h < 10){
            digHr.innerHTML = '0' + h
        }
        else{
            digHr.innerHTML = h
        }
        digAMPM.innerHTML = 'AM'
        if(h == 12){
            digAMPM.innerHTML = 'PM'
        }

    }
    else{
        if(h - 12 < 10){
            digHr.innerHTML = '0' + (h - 12)
        }
        else{
            digHr.innerHTML = h - 12
        }
        digAMPM.innerHTML = 'PM'
    }

    const m = day.getMinutes()
    if(m < 10){
        digMin.innerHTML = '0' + m
    }
    else{
        digMin.innerHTML = m
    }

    const s = day.getSeconds()
    if(s < 10){
        digSec.innerHTML = '0' + s
    }
    else{
        digSec.innerHTML = s
    }
})