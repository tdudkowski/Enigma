const input = document.getElementById("input")
const button = document.getElementById("button")
const output = document.getElementById("output")

const ETW = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const I = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"
const UKW_A = "EJMZALYXVBWFCRQUONTSPIKHGD"

// MOVING ROTORS IN CONSOLE.LOG
// console.log(I)
// const shiftParam = 1
// const str = I
// MOVE FORWARD
// console.log(str.slice(-shiftParam) + str.slice(0, -shiftParam))
// MOVE BACK
// console.log(str.slice(shiftParam) + str.slice(0, shiftParam))

const letCipher = (itemValue, i) => {
    if (i >= I.length) { i = i % I.length }
    let rotor = I.slice(i + 1) + I.slice(0, i + 1);
    // console.log(rotor, I.slice(1) + I.slice(0, 1))
    return itemValue = rotor[ETW.indexOf(itemValue)]
}

const sendText = (inputValue) => {
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