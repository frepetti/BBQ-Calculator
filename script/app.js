console.log("Hola Mundo");
const themeBtn = document.getElementById('themeBtn');
const themeCont = document.getElementById('theme');
const addMoreBtn = document.getElementById('more');
const divisorTab = document.getElementById('divisorTab');
const calcTab = document.getElementById('calcTab');
const divisor = document.getElementById('divisor');
const calculator = document.getElementById('calculator');
let themeCounter = 0;


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
    themeCounter++;
    if (themeCont.className === 'light') {
        themeCont.className = 'dark';
        window.localStorage.setItem('theme',themeCont.className);
    } else {
        themeCont.className = 'light';
        window.localStorage.setItem('theme',themeCont.className);
    }
}

console.log(document.getElementsByClassName('guestContainer'));

//Add More Guests
addMoreBtn.addEventListener('click', addMoreGuests);

function addMoreGuests() {
    let newRow = document.createElement('li');
    let newGuest = document.createElement('input');
    let newAmountCont = document.createElement('div');
    let newAmountLabel = document.createElement('label');
    let newAmount = document.createElement('input');
    
    document.getElementsByClassName('guestList')[0].appendChild(newRow);
    newRow.className ='guestContainer';
    newGuest.className = 'guest';
    newGuest.type = 'text';
    newGuest.name = 'guest';
    newGuest.placeholder = 'Nombre';
    newAmountCont.className = 'amountCont';
    newAmountLabel.className = 'amountLbl';
    newAmountLabel.htmlFor = 'amount';
    newAmount.className = 'amount';
    newAmount.type = 'number';
    newAmount.name = 'amount';
    newAmount.placeholder = '0';
    newAmountLabel.innerHTML = '$ ';
    newAmountCont.innerHTML = newAmountLabel.outerHTML + newAmount.outerHTML;
    newRow.innerHTML = newGuest.outerHTML + newAmountCont.outerHTML;
}

//Calculate Amount per Guest

document.getElementById('calculate').addEventListener('click',calculateAmnt);

function calculateAmnt() {
    const guests = getGuestList();
    const results = document.getElementById('result');
    let totalAmnt = 0;
    for (let i = 0; i < guests.length; i++) {
        totalAmnt = guests[i].guestAmount + totalAmnt;
    }
    amountPerGuest = totalAmnt/guestQty.value;
    amountRounded = Math.round(amountPerGuest);
    let guestsPay = document.createElement('span');
    results.appendChild(guestsPay)
    guestsPay.className = 'guestResult';
    document.getElementsByClassName('guestResult')[0].innerHTML = 'Cada uno paga: ' + amountRounded;
    for (let i = 0; i < guests.length; i++) {
        let amntPay = amountRounded-guests[i].guestAmount;
        if (amntPay < 0) {
            let guestResult = document.createElement('span');
            results.appendChild(guestResult);
            guestResult.className = 'guestResult';
            document.getElementsByClassName('guestResult')[i+1].innerHTML = guests[i].guestName + ' recibe: ' + amntPay * (-1);
        } else {
            let guestResult = document.createElement('span');
            results.appendChild(guestResult);
            guestResult.className = 'guestResult';
            document.getElementsByClassName('guestResult')[i+1].innerHTML = guests[i].guestName + ' paga: ' + amntPay;
        }
        console.log(amntPay);
    }
    results.style.display = "block";
}

//Get guest data
let guestList = document.getElementsByClassName('guestContainer')

function getGuestList(){
    let guests = [];
    for (let i = 1; i < guestList.length; i++) {
        let guestName = guestList[i].children[0].value;
        let guestAmnt = guestList[i].children[1].children[1].value;
        if (guestName === '' || guestName === ' ') {
            break;
        }
        if (guestAmnt === '' || guestAmnt === ' ') {
            guestAmnt = 0;
        }
        let guest = new Guest(guestName, parseFloat(guestAmnt));
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

//Select tab

divisorTab.addEventListener('click', selectDivisor);
calcTab.addEventListener('click', selectCalc);

function selectDivisor() {
    if (calcTab.classList.contains('active')) {
        calcTab.classList.remove('active');
        calculator.classList.remove('active');
    }
    if (!divisorTab.classList.contains('active')) {
        divisorTab.classList.toggle('active');
    }
    if (!divisor.classList.contains('active')) {
        divisor.classList.toggle('active')
    }
}

function selectCalc() {
    if (divisorTab.classList.contains('active') || divisor.classList.contains('active')) {
        divisorTab.classList.remove('active');
        divisor.classList.toggle('active');
    }
    if (!calcTab.classList.contains('active')) {
        calcTab.classList.toggle('active');
        calculator.classList.toggle('active');
    }
    
}