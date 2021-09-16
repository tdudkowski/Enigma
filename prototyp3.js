const input = document.getElementById("input")
const button = document.getElementById("button")
const output = document.getElementById("output")

const ETW = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const I = { sequence: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", shift: 0 }
const UKW_A = { sequence: "EJMZALYXVBWFCRQUONTSPIKHGD", shift: 0 }

let rotor;

const moveRotor = (i) => {
    if (i >= I.sequence.length) { i = i % I.sequence.length }
    I.sequence = I.sequence.slice(1) + I.sequence.slice(0, 1);
    I.shift++;
    rotor = I;
    return rotor;
}

const letCipher = (itemValue, i) => {

    moveRotor(i)
    let number = ETW.indexOf(itemValue);
    // const rotorsList = [rotor, UKW_A, rotor]
    const mirror = UKW_A
    const rotorSequence = [rotor]
    const rotorSequenceBack = rotorSequence.slice().reverse();
    const rotorsList = [...rotorSequence, mirror, ...rotorSequenceBack]

    for (let j = 0; j < rotorsList.length; j++) {

        if (rotor.shift >= 26) { rotor.shift = rotor.shift % 26; }

        if (j < 2) {
            itemValue = rotorsList[j].sequence[number];
            number = ETW.indexOf(itemValue) - rotorsList[j].shift;
            if (number > 25) { number = number % 26; }
            if (number < 0) { number = number % 25; }
            if (number < 0) { number += 26; }
        }
        if (j === 2) {
            number = number + rotor.shift
            if (number > 25) { number = number % 26; }
            if (number < 0) { number = number % 25; }
            if (number < 0) { number += 26; }
            number = rotorsList[j].sequence.indexOf(ETW[number]);
            itemValue = ETW[number];
        }
        console.log(j, itemValue)
    }
    return itemValue;
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