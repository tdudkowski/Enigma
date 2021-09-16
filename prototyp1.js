const input = document.getElementById("input")
const button = document.getElementById("button")
const output = document.getElementById("output")

const ETW = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const I = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"
const UKW_A = "EJMZALYXVBWFCRQUONTSPIKHGD"

const letCipher = (itemValue, i) => {
    // CLEAN OUTPUT
    // return itemValue;
    // TEST OUTPUT - WITH NUMBERS
    return itemValue += i;
}

const sendText = (inputValue) => {
    // output.innerText = inputValue;
    // TEST IF FUNCTION IS APPLIED TO EVERY LETTER SEPARATELY
    let resultValue = "";
    for (let i = 0; i < inputValue.length; i++) {
        const itemValue = letCipher(inputValue[i], i);
        resultValue = resultValue.concat(itemValue);
    }
    output.innerText = resultValue;
}

const getText = (e) => {
    e.preventDefault();
    // const inputValue = input.value;
    // SANITIZE DATA
    const inputValueRaw = input.value;
    let inputValue = "";
    for (let i = 0; i < inputValueRaw.length; i++) {
        if (ETW.includes(inputValueRaw[i].toUpperCase())) { inputValue = inputValue.concat(inputValueRaw[i].toUpperCase()) }
    }

    sendText(inputValue);
    input.value = "";
}

button.addEventListener("click", (e) => getText(e))