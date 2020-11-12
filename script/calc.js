const addBtn = document.getElementById('addBtn');
const calcDisplay = document.getElementById('display');
const supDisplay = document.getElementById('supDisplay');
const numpad = document.querySelector('.numpad');
const regOperators = document.querySelector('.regOperators');
const advOperators = document.querySelector('.advOperators');
const guestsList = document.getElementsByClassName('guestContainer');
const guestListCont = document.getElementById('guestListCont');
const guestListPop = document.getElementsByClassName('guestListPop');
const guestAmount = document.getElementsByClassName('amount');

//Calculator object

const calc = {
    input: []
};



//Insert number values into input

const insertNumb = (clickedBtn) => {
    const target = clickedBtn.target;
    switch (target.id) {
        case "sig":
            calcDisplay.value = parseFloat(calcDisplay.value)*-1;
            break;
        case "decimal":
            if (calcDisplay.value.includes('.')) {
                return;
            } else {
                calcDisplay.value += '.';
            }
            break;
        default:
            calcDisplay.value += target.value;
            break;
    }
}

numpad.addEventListener('click', insertNumb);

// Regular Operators
const operator = (clickedBtn) => {
    const target = clickedBtn.target;
    let id = evalBtnClick(target);
    let i = calc.input.length;
    switch (id) {
        case "divide":
            if (calc.input[i] === '*' || calc.input[i] === '/' || calc.input[i] === '+' || calc.input[i] === '-' || calcDisplay.value === '') {
                return
            } else{
                calc.input.push(calcDisplay.value);
                supDisplay.innerHTML  += calcDisplay.value + '/';
                calcDisplay.value = '';
                calc.input.push('/');
            }
            break;
        case "mult":
            if (calc.input[i] === '*' || calc.input[i] === '/' || calc.input[i] === '+' || calc.input[i] === '-' || calcDisplay.value === '') {
                return
            } else{
                calc.input.push(calcDisplay.value);
                supDisplay.innerHTML  += calcDisplay.value + '*';
                calcDisplay.value = '';
                calc.input.push('*');
            }
            break;
        case "minus":
            if (calc.input[i] === '*' || calc.input[i] === '/' || calc.input[i] === '+' || calc.input[i] === '-' || calcDisplay.value === '') {
                return
            } else {
                calc.input.push(calcDisplay.value);
                supDisplay.innerHTML  += calcDisplay.value + '-';
                calcDisplay.value = '';
                calc.input.push('-');
            }
            break;
        case "plus":
            if (calc.input[i] === '*' || calc.input[i] === '/' || calc.input[i] === '+' || calc.input[i] === '-' || calcDisplay.value === '') {
                return
            } else {
                calc.input.push(calcDisplay.value);
                supDisplay.innerHTML  += calcDisplay.value + '+';
                calcDisplay.value = '';
                calc.input.push('+');
            }
            break;
        case "result":
            calc.input.push(calcDisplay.value);
            console.log(calc.input.join(''));
            let result = eval(calc.input.join(''));
            supDisplay.innerHTML = '';
            calcDisplay.value = result;
            calc.input = [];
            break;
        case "percent":
            if (calcDisplay.value !== '') {
                calc.input.push(calcDisplay.value/100);
                supDisplay.innerHTML += calcDisplay.value/100;
                calcDisplay.value = '';
            }
            break;
        case "clear":
            supDisplay.innerHTML = '';
            calcDisplay.value = '';
            calc.input = [];
            break;
        case "clear-entry":
            calcDisplay.value = '';
            break;
        case "erase":
            calcDisplay.value = calcDisplay.value.slice(0, -1);
            break;
        case "fraction":
            if (calcDisplay.value !== '') {
                calc.input.push(1/calcDisplay.value);
                supDisplay.innerHTML += "1/" + calcDisplay.value;
                calcDisplay.value = '';
            }
            break;
        case "exponential":
            if (calcDisplay.value !== '') {
                calc.input.push(Math.pow(calcDisplay.value, 2));
                supDisplay.innerHTML += calcDisplay.value + '^2';
                calcDisplay.value = '';
            }
            break;
        case "root":
            if (calcDisplay.value !== '') {
                calc.input.push(Math.sqrt(calcDisplay.value));
                supDisplay.innerHTML += '√'+ calcDisplay.value;
                calcDisplay.value = '';
            }
            break;
        default:
            calcDisplay.value += target.value;
            break;
    }
}

//Listen for button click on operator buttons
regOperators.addEventListener('click', operator);
advOperators.addEventListener('click', operator);

//Function to evaluete clicked button id
function evalBtnClick(node){
    while (node.className !== 'btn') {
        node = node.parentNode;
    }
    return node.id;
}

//Add amount to guest
const guestBox = document.getElementsByClassName('guest');

const addAmntGuest = (clickedGuest) => {
    const target = clickedGuest.target;
    for (let i = 0; i < guestList.length; i++) {
        if (guestList[i].children[0].value === target.innerHTML) {
            guestAmount[i-1].value = calcDisplay.value;
            calcDisplay.value = '';
            return
        }
    }
    selectDivisor();
}

guestListCont.addEventListener('click', addAmntGuest);

//Display Popup Guest List
addBtn.addEventListener('click', getGuests);



//Close Guest List Pop and clear it

guestListPop[0].addEventListener('click',() =>  {
    guestListPop[0].style.display = 'none';
    guestListCont.innerHTML = '';
})

//Function to retrieve guests

function getGuests() {
    let guests = [];
    for (let i = 1; i < guestList.length; i++) {
        let guestName = guestList[i].children[0].value;
        if (guestName === '' || guestName === ' ') {
            break;
        }
        addGuest(guestName);
        guests.push(guestName);
    }
    guestListPop[0].style.display = 'flex';
}

//Add guests to Popup list
function addGuest(guestName) {
    guestBoxC = document.createElement('div');
    guestBoxC.className = 'guest';
    guestBoxC.innerHTML = guestName;
    guestListCont.appendChild(guestBoxC);
}