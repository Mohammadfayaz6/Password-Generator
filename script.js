const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-Copy]");
const copyMsg = document.querySelector("[data-CopyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbercaseCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBTn = document.querySelector(".GenerateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
uppercaseCheck.checked=true;

setindicator('#ccc');

//set strength circle color to grey;

handleSlider();

function handleSlider() {
    
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;

    inputSlider.style.backgroundSize =
        ((passwordLength - min) * 100) / (max - min) + "% 100%";
}

function setindicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRandInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRandInteger(0, 9);


}
function generateLowercase() {

    return String.fromCharCode(getRandInteger(97, 123));
}
function generateUppercase() {
    return String.fromCharCode(getRandInteger(65, 91));
}

function generatSymbol() {
    const randNum = getRandInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calculatestrength() {

    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbols = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbercaseCheck.checked) hasNumber = true;
    if (symbolsCheck.checked) hasSymbols = true;



    if (hasUpper && hasLower && (hasSymbols || hasNumber) && passwordLength >= 8) {
        setindicator('#0f0');
    }
    else {
        if ((hasLower || hasUpper) && (hasNumber || hasSymbols) && passwordLength >= 6) {
            setindicator('#ff0');
        }
        else {

            setindicator('#f00');

        }
    }


}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } catch (err) {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Find random j
        const j = Math.floor(Math.random() * (i + 1));
        // swapping ith and jth value
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handlecheckboxchange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

}



allCheckBox.forEach((checkbox) => {

    checkbox.addEventListener('change', handlecheckboxchange);
});


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});


copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
});

generateBTn.addEventListener('click', () => {
    if (checkCount <= 0) {
        return;
    }

    if (passwordLength <= checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }


    password = "";

    let arrayfunc = [];

    if (uppercaseCheck.checked) {
        arrayfunc.push(generateUppercase);
    }
    if (lowercaseCheck.checked) {
        arrayfunc.push(generateLowercase);
    }
    if (numbercaseCheck.checked) {
        arrayfunc.push(generateRandomNumber);
    }
    if (symbolsCheck.checked) {
        arrayfunc.push(generatSymbol);
    }

    for (let i = 0; i < arrayfunc.length; i++) {
        password += arrayfunc[i]();
    }

    for (let i = 0; i < passwordLength - arrayfunc.length; i++) {
        let randindex = getRandInteger(0, arrayfunc.length);
        password += arrayfunc[randindex]();
    }

    //shuffling password
    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;

    calculatestrength();
});
