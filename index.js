// BASIC INTERFACE
const input = document.getElementById("input");
const button = document.getElementById("button");
const output = document.getElementById("output");
const counter = document.getElementById("counter");

// GET SETTIING FROM PAGE
const buttonSettings = document.getElementById("buttonSettings");
const formRotorsSequence = document.getElementById("formRotorsSequence");
const firstRotor = document.getElementById("firstRotor");
const secondRotor = document.getElementById("secondRotor");
const thirdRotor = document.getElementById("thirdRotor");
const mirrorRotor = document.getElementById("mirrorRotor");
const firstRotorStart = document.getElementById("firstRotorStart");
const secondRotorStart = document.getElementById("secondRotorStart");
const thirdRotorStart = document.getElementById("thirdRotorStart");
const steckerbrett = document.getElementById("steckerbrett");

// SHOW SETTINGS ON PAGE
const showInfo = document.getElementById("info");
const showRotorsSettings = document.getElementById("settings-rotorsSequence");
const showMirrorRotor = document.getElementById("settings-mirrorRotor");
const showRotorsStart = document.getElementById("settings-rotorsStart");
const showSteckerbrett = document.getElementById("settings-steckerbrett");

// ROTORS
const ETW = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const I = { sequence: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q", shift: 0, name: "I" };
const II = { sequence: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E", shift: 0, name: "II" };
const III = { sequence: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V", shift: 0, name: "III" };
const IV = { sequence: "ESOVPZJAYQUIRHXLNFTGKDCMWB", notch: "J", shift: 0, name: "IV" };
const V = { sequence: "VZBRGITYUPSDNHLXAWMJQOFECK", notch: "Z", shift: 0, name: "V" };
const UKW_A = { sequence: "EJMZALYXVBWFCRQUONTSPIKHGD", name: "UKW A" };
const UKW_B = { sequence: "YRUHQSLDPXNGOKMIEBFZCWVJAT", name: "UKW B" };
const UKW_C = { sequence: "FVPJIAOYEDRZXWGCTKUQSBNMHL", name: "UKW C" };

// DATASETS
const mirrorRotorsArr = [UKW_A, UKW_B, UKW_C]
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const digitsToChars = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"]
const diacriticPL = ["Ą", "Ć", "Ę", "Ł", "Ń", "Ó", "Ś", "Ź", "Ż"]
const diacriticASCII = ["A", "C", "E", "L", "N", "O", "S", "Z", "Z"]
let steckerbrettMiddle = ""
let steckerbrettRaw = ""
const steckerbrettFinal = []

// SETTINGS
let mirror = UKW_A;
const rotorSequence = [I, II, III];
const rotorLength = mirror.sequence.length;
const shiftParam = rotorLength * 25;
let ifClicked;

// DOUBLE STEP (notchZeroFinder) FACTOR
let notchZeroFinder;
let notchOneFinder;
let DoppelschrittFaktor;

// MOVING ROTORS
const moveRotors = (i) => {

    rotorSequence[0].sequence = rotorSequence[0].sequence.slice(1) + rotorSequence[0].sequence.slice(0, 1);
    rotorSequence[0].shift++;

    if ((((i + 1) - notchZeroFinder - 1) % 26 === 0) || (i + 1) % shiftParam === DoppelschrittFaktor) {
        rotorSequence[1].sequence = rotorSequence[1].sequence.slice(1) + rotorSequence[1].sequence.slice(0, 1);
        rotorSequence[1].shift++;
    }

    if ((i + 1) % shiftParam === DoppelschrittFaktor) {
        rotorSequence[2].sequence = rotorSequence[2].sequence.slice(1) + rotorSequence[2].sequence.slice(0, 1);
        rotorSequence[2].shift++;
        if (rotorSequence[2].shift === 27) { rotorSequence[2].shift = 1 }
    }
};

// MAKE ROTORS SEQUENCE & SUBSTITUTION LETTER THROUGH THEM
const letCipher = (itemValue, i) => {
    moveRotors(i);

    // STECKERBRETT
    for (let i = 0; i < steckerbrettFinal.length; i++) {
        if (steckerbrettFinal[i].includes(itemValue)) {
            const tempValue = itemValue
            if (itemValue === steckerbrettFinal[i][0]) { itemValue = steckerbrettFinal[i][1]; }
            if (tempValue === steckerbrettFinal[i][1]) { itemValue = steckerbrettFinal[i][0]; }
        }
    }

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
    itemValue = mirror.sequence[inMirrorNumber];
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

    // STECKERBRETT
    for (let i = 0; i < steckerbrettFinal.length; i++) {
        if (steckerbrettFinal[i].includes(itemValue)) {
            const tempValue = itemValue
            if (itemValue === steckerbrettFinal[i][0]) { itemValue = steckerbrettFinal[i][1]; }
            if (tempValue === steckerbrettFinal[i][1]) { itemValue = steckerbrettFinal[i][0]; }
        }
    }

    return itemValue;
};

// SET A ROTORS SET
const setRotorsSet = (rotorsSet) => {

    for (let i = 0; i < rotorSequence.length; i++) {
        switch (rotorsSet[i]) {
            case 'I':
                rotorSequence[i] = I;
                break;
            case 'II':
                rotorSequence[i] = II;
                break;
            case 'III':
                rotorSequence[i] = III;
                break;
            case 'IV':
                rotorSequence[i] = IV;
                break;
            case 'V':
                rotorSequence[i] = V;
                break;
        }
    }
    if (rotorSequence[0].name === rotorSequence[1].name || rotorSequence[0].name === rotorSequence[2].name || rotorSequence[1].name === rotorSequence[2].name) {
        alert("Nie możesz wybrać dwukrotnie tego samego walca!");
        location.reload();
    }
}

// SET A MIRROR ROTOR
const setMirrorRotor = () => {
    const selectedItem = mirrorRotor.options[mirrorRotor.selectedIndex].text;
    for (let i = 0; i < mirrorRotorsArr.length; i++) {
        if (mirrorRotorsArr[i].name === selectedItem) {
            mirror = mirrorRotorsArr[i]
        }
    }
}

// USER SETTING - INITIAL LETTER SETTINGS OF ROTORS
const setRotorsStart = (rotorsStart) => {
    const tempRotorSequence = [];
    for (let i = 0; i < rotorSequence.length; i++) {
        let numberToShift = ETW.indexOf(rotorsStart[i].toUpperCase());
        tempRotorSequence[i] = rotorSequence[i].sequence.slice(numberToShift) + rotorSequence[i].sequence.slice(0, numberToShift)
        rotorSequence[i].sequence = tempRotorSequence[i];
        rotorSequence[i].shift += numberToShift
    }
}

// USER SETTINGS - PLUGBOARD
const setSteckerbrett = () => {
    steckerbrettFinal.length = 0;
    steckerbrettRaw = steckerbrett.value
    for (let i = 0; i < steckerbrettRaw.length; i++) {
        if (ETW.includes(steckerbrettRaw[i].toUpperCase()) && !steckerbrettMiddle.includes(steckerbrettRaw[i].toUpperCase())) {
            steckerbrettMiddle = steckerbrettMiddle.concat(steckerbrettRaw[i].toUpperCase())
        }
    }
    while (steckerbrettMiddle.length >= 2) {
        steckerbrettFinal.push(Array.from(steckerbrettMiddle.slice(0, 2)))
        steckerbrettMiddle = steckerbrettMiddle.slice(2)
    }
    steckerbrett.value = ""
}

// SHOW SETTING
const showSetting = () => {

    if (ifClicked === "clicked") { showInfo.innerText = "Aktualne ustawienia: zmienione!"; }
    showRotorsSettings.innerText = rotorSequence[0].name + ", " + rotorSequence[1].name + ", " + rotorSequence[2].name
    showMirrorRotor.innerText = mirror.name
    showRotorsStart.innerText = firstRotorStart.value + ". " + secondRotorStart.value + ", " + thirdRotorStart.value
    let steckerbrettFinalString = ""
    for (let i = 0; i < steckerbrettFinal.length; i++) {
        steckerbrettFinalString = steckerbrettFinalString.concat(steckerbrettFinal[i][0] + " - " + steckerbrettFinal[i][1] + ", ")
    }
    showSteckerbrett.innerText = steckerbrettFinalString ? steckerbrettFinalString : "brak";
}

// SET SETTING
const setSequence = (e) => {
    e.preventDefault();
    // SET ROTROS TO INITIAL
    rotorSequence[0].shift, rotorSequence[1].shift, rotorSequence[2].shift = 0
    const rotorsSet = [firstRotor.value, secondRotor.value, thirdRotor.value]
    const rotorsStart = [firstRotorStart.value, secondRotorStart.value, thirdRotorStart.value]
    setRotorsSet(rotorsSet)
    setMirrorRotor()

    setRotorsStart(rotorsStart)

    notchZeroFinder = ETW.indexOf(rotorSequence[0].notch) - rotorSequence[0].shift
    if (notchZeroFinder < 0) { notchZeroFinder += 26 }
    notchOneFinder = (((ETW.indexOf(rotorSequence[1].notch) - rotorSequence[1].shift - 1) * 26) + 2);

    if (rotorSequence[1].shift - ETW.indexOf(rotorSequence[1].notch) === 0) {
        notchOneFinder = -15;
        DoppelschrittFaktor = notchZeroFinder + notchOneFinder;
    }
    else {
        if (notchOneFinder < 0) { notchOneFinder = notchOneFinder % 26; }
        if (notchOneFinder < 0) { notchOneFinder += 26 * (26 - (rotorSequence[1].shift - ETW.indexOf(rotorSequence[1].notch))) }
        DoppelschrittFaktor = notchOneFinder + notchZeroFinder;
    }

    setSteckerbrett()
    ifClicked = "clicked";
    showSetting(ifClicked)
}

// ITERATE CIPHER FUNCTION LETTER BY LETTER
const sendText = (inputValue) => {
    let resultValue = "";
    for (let i = 0; i < inputValue.length; i++) {
        const itemValue = letCipher(inputValue[i], i);
        resultValue = resultValue.concat(itemValue);
    }
    output.innerText = resultValue;
    counter.innerText = "" + resultValue.length;
};

// VALIDATE INPUT STRING
const getText = (e) => {
    e.preventDefault();
    let inputValueRaw = Array.from(input.value);
    for (let i = 0; i < inputValueRaw.length; i++) {
        if (digits.includes(parseInt(inputValueRaw[i]))) {
            inputValueRaw[i] = digitsToChars[digits.indexOf(inputValueRaw[i] * 1)]
        }
        if (diacriticPL.includes(inputValueRaw[i].toUpperCase())) {
            inputValueRaw[i] = diacriticASCII[diacriticPL.indexOf(inputValueRaw[i].toUpperCase())]
        }
    }
    let inputValue = "";
    for (let i = 0; i < inputValueRaw.length; i++) {

        if (ETW.includes(inputValueRaw[i].toUpperCase())) {
            inputValue = inputValue.concat(inputValueRaw[i].toUpperCase());
        }
    }

    // SEND TEXT TO ITERATION
    sendText(inputValue);
    input.value = "";
};

showSetting()
button.addEventListener("click", (e) => getText(e));
buttonSettings.addEventListener("click", (e) => setSequence(e));
