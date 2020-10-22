const themeBtn = document.getElementById('themeBtn');
const themeCont = document.getElementById('theme');
const divisorTab = document.getElementById('divisorTab');
const calcTab = document.getElementById('calcTab');
const calculator = document.getElementById('calculator');
let themeCounter = 0;

//Select Function
divisorTab.addEventListener('click', selectDivisor);
calcTab.addEventListener('click', selectCalc);

//Switch Theme
themeBtn.addEventListener('click', switchTheme);

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

function switchTheme() {
    themeCounter++;
    if (themeCont.className === 'light') {
        themeCont.className = 'dark';
        window.localStorage.setItem('theme',themeCont.className);
    } else {
        themeCont.className = 'light';
        window.localStorage.setItem('theme',themeCont.className);
    }
};

//Select Function

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