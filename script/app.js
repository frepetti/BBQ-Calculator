console.log("Hola Mundo");
const themeBtn = document.getElementById('themeBtn');
const themeCont = document.getElementById('theme');

//Calculate Amount per Guest

document.getElementById('calculate').addEventListener('click',calculateAmnt);

function calculateAmnt() {
    const guests = getGuestList();
    const results = document.getElementsByClassName('result')[0];
    console.log(guests);
    let totalAmnt = 0;
    for (let i = 0; i < guests.length; i++) {
        totalAmnt = guests[i].guestAmount + totalAmnt;
    }
    amountPerGuest = totalAmnt/guests.length;
    console.log(totalAmnt, amountPerGuest);
    for (let i = 0; i < guests.length; i++) {
        let amntPay = amountPerGuest-guests[i].guestAmount;
        if (amntPay < 0) {
            let guestResult = document.createElement('span');
            results.appendChild(guestResult);
            guestResult.className = 'guestResult';
            document.getElementsByClassName('guestResult')[i].innerHTML = guests[i].guestName + ' recibe: ' + amntPay * (-1);
        } else {
            let guestResult = document.createElement('span');
            results.appendChild(guestResult);
            guestResult.className = 'guestResult';
            document.getElementsByClassName('guestResult')[i].innerHTML = guests[i].guestName + ' paga: ' + amntPay;
        }
        console.log(amntPay);
    }
}

//Load theme
window.onload = loadTheme();
function loadTheme() {
    let theme;
    if (!window.localStorage.getItem('theme')) {
        theme = 'light'
    } else{
        theme = window.localStorage.getItem('theme');
    }
    themeCont.className = theme;
};

//Switch Theme
themeBtn.addEventListener('click', switchTheme);

function switchTheme() {
    if (themeCont.className === 'light') {
        themeCont.className = 'dark';
        window.localStorage.setItem('theme',themeCont.className);
    } else {
        themeCont.className = 'light';
        window.localStorage.setItem('theme',themeCont.className);
    }
}

console.log(document.getElementsByClassName('guestContainer'));

//Get guest data
let guestList = document.getElementsByClassName('guestContainer')

function getGuestList(){
    let guests = [];
    for (let i = 0; i < guestList.length; i++) {
        let guestName = guestList[i].children[1].value;
        let guestAmnt = parseFloat(guestList[i].children[3].value);
        if (guestName === '' || guestName === ' ') {
            break;
        }
        if (guestAmnt === '' || guestAmnt === ' ') {
            guestAmnt = 0;
        }
        let guest = new Guest(guestName, guestAmnt);
        guests.push(guest);
    }
    //console.log(guests);
    return guests;
}

//Create guest

class Guest{
    constructor(name, amount){
        this.guestName = name;
        this.guestAmount = amount
    }
}