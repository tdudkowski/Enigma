const input = document.getElementById("input");
const button = document.getElementById("button");
const output = document.getElementById("output");
const counter = document.getElementById("counter");

// ROTORS
const ETW = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const I = { sequence: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q", shift: 0 };
const II = { sequence: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E", shift: 0 };
const III = { sequence: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V", shift: 0 };
const IV = { sequence: "ESOVPZJAYQUIRHXLNFTGKDCMWB", notch: "J", shift: 0 };
const V = { sequence: "VZBRGITYUPSDNHLXAWMJQOFECK", notch: "Z", shift: 0 };
const UKW_A = "EJMZALYXVBWFCRQUONTSPIKHGD";
const UKW_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
const UKW_C = "FVPJIAOYEDRZXWGCTKUQSBNMHL";

// SETTINGS
const mirror = UKW_A;
const rotorSequence = [I, II, III];
const rotorLength = mirror.length;
const shiftParam = rotorLength * 25;

// DOUBLE STEP (DOPPELSCHRITT) FACTOR
const Doppelschritt = ETW.indexOf(rotorSequence[0].notch) - rotorSequence[0].shift
const notchFinder = ((ETW.indexOf(rotorSequence[1].notch) - 1) * 26) + 2;
const DoppelSchrittFaktor = notchFinder + Doppelschritt;

// MOVING ROTORS
const moveRotors = (i) => {

    rotorSequence[0].sequence = rotorSequence[0].sequence.slice(1) + rotorSequence[0].sequence.slice(0, 1);
    rotorSequence[0].shift++;

    if ((((i + 1) - Doppelschritt - 1) % 26 === 0) || (i + 1) % shiftParam === DoppelSchrittFaktor) {
        rotorSequence[1].sequence = rotorSequence[1].sequence.slice(1) + rotorSequence[1].sequence.slice(0, 1);
        rotorSequence[1].shift++;
    }

    if ((i + 1) % shiftParam === DoppelSchrittFaktor) {
        rotorSequence[2].sequence = rotorSequence[2].sequence.slice(1) + rotorSequence[2].sequence.slice(0, 1);
        rotorSequence[2].shift++;
    }
};
// MAKE ROTORS SEQUENCE & SUBSTITUTION LETTER THROUGH THEM
const letCipher = (itemValue, i) => {
    moveRotors(i);

    const rotorSequenceBack = rotorSequence.slice().reverse();
    let numberInOrder = ETW.indexOf(itemValue);

    // RUN TO MIRROR
    for (let j = 0; j < rotorSequence.length; j++) {

        itemValue = rotorSequence[j].sequence[numberInOrder];
        numberInOrder = ETW.indexOf(rotorSequence[j].sequence[numberInOrder]) - rotorSequence[j].shift;

        if (numberInOrder > 25) { numberInOrder = numberInOrder % 26; }
        if (numberInOrder < 0) { numberInOrder = numberInOrder % 26; }
        if (numberInOrder < 0) { numberInOrder += 26; }
    }

    // MIRROR
    let inMirrorNumber = ETW.indexOf(itemValue) - rotorSequence[2].shift
    if (inMirrorNumber < 0) { inMirrorNumber += 26 }
    itemValue = mirror[inMirrorNumber];
    numberInOrder = ETW.indexOf(itemValue);
    numberInOrder += rotorSequence[2].shift;
    if (numberInOrder > 25) { numberInOrder = numberInOrder % 26 }
    itemValue = ETW[numberInOrder]

    // RUN BACK
    for (let j = 0; j < rotorSequence.length; j++) {

        numberInOrder = rotorSequenceBack[j].sequence.indexOf(itemValue) + (rotorSequenceBack[j + 1] ? rotorSequenceBack[j + 1].shift : 0);

        if (numberInOrder > 25) { numberInOrder = numberInOrder % 26; }
        if (numberInOrder < 0) { numberInOrder = numberInOrder % 25; }
        if (numberInOrder < 0) { numberInOrder += 26; }

        itemValue = ETW[numberInOrder];
    }
    return itemValue;
};

// ITERATE CIPHER FUNCTION LETTER BY LETTER
const sendText = (inputValue) => {
    let resultValue = "";
    for (let i = 0; i < inputValue.length; i++) {
        const itemValue = letCipher(inputValue[i], i);
        resultValue = resultValue.concat(itemValue);
    }
    output.innerText = resultValue;
    const counterValue = "Anzahl der Buchstabe: " + resultValue.length;
    // counter.innerText = counterValue;
    // if (resultValue === awaitedCipherText || resultValue === awaitedClearText) { counter.innerText = "GREAT SUCCESS - number of letters: " + resultValue.length }
};

// VALIDATE INPUT STRING
const getText = (e) => {
    e.preventDefault();
    const inputValueRaw = input.value;
    let inputValue = "";
    for (let i = 0; i < inputValueRaw.length; i++) {
        if (ETW.includes(inputValueRaw[i].toUpperCase())) {
            inputValue = inputValue.concat(inputValueRaw[i].toUpperCase());
        }
    }
    sendText(inputValue);
    input.value = "";
};

button.addEventListener("click", (e) => getText(e));