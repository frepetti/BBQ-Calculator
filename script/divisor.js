const addMoreBtn = document.getElementById('more');
const clearForm = document.getElementById('clearForm');
const calculateBtn = document.getElementById('calculate');
const results = document.getElementById('result');
const guestList = document.getElementsByClassName('guestContainer');
const guestQty = document.getElementById('guestQty');

//Clear data

function clearData() {
    for (let i = 1; i < guestList.length; i++) {
        guestList[i].children[0].value = '';
        guestList[i].children[1].children[1].value = '';
    }
    guestQty.value = '';
    results.innerHTML = '';
}

clearForm.addEventListener('click',clearData);


//Add More Guests
addMoreBtn.addEventListener('click', addMoreGuests);

//Calculate btn
calculateBtn.addEventListener('click',calculateAmnt);


//Calculate amount per guest

function calculateAmnt() {
    const guests = getGuestList();
    let totalAmnt = 0;
    for (let i = 0; i < guests.length; i++) {
        totalAmnt = guests[i].guestAmount + totalAmnt;
    }
    let amountPerGuest = totalAmnt/guestQty.value;
    let amountRounded = Math.round(amountPerGuest);
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
};

//Get guest data


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

// Create guest
class Guest{
    constructor(name, amount){
        this.guestName = name;
        this.guestAmount = amount
    }
}

//Add More Guests

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
