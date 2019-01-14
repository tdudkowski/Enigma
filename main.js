class Maschine {
 constructor() {
  this.simpleTransposition = new SimpleTransposition();

  this.buttonTable = document.querySelectorAll("div.keyboard button");
  this.buttonReset = document.querySelector("button.reset-button");
  this.buttonSend = document.querySelector("button.send-button");
  this.buttonCipher = document.querySelector("button.cipher-button");
  this.buttonDelete = document.querySelector("button.delete-button");
  this.typeStrip = document.querySelector("div.typein>span");
  this.sendStrip = document.querySelector("div.sendin>span");
  this.Alphabet = ["q", "w", "e", "r", "t", "z", "u", "i", "o", "a", "s", "d", "f", "g", "h", "j", "k", "p", "y", "x", "c", "v", "b", "n", "m", "l"];
  this.plainTextArray = [];
  this.numberText = [];

  this.render();
  this.inputAPI();
 }

 render() {
  const that = this;

  // KEYBOARD INPUT
  this.buttonTable.forEach(function (button) {
   button.addEventListener(
    "click",
    () => (that.typeStrip.textContent += button.value)
   );
  });

  // SEND BUTTON
  this.buttonSend.addEventListener("click", () => {
   const plainText = this.typeStrip.textContent; // make a plaintext from input
   this.plainTextArray = plainText.split(""); // make an array from plaintext
   this.sendStrip.textContent = plainText; // send array into sendStrip
   this.typeStrip.textContent = ""; // delete typeStrip
  });

  // RESET BUTTON
  this.buttonReset.addEventListener(
   "click",
   () => (this.typeStrip.textContent = "")
  );

  // DELETE BUTTON
  this.buttonDelete.addEventListener("click", () => {
   this.typeStrip.textContent = "";
   this.sendStrip.textContent = "";
   this.plainTextArray = []; // test if works
  });
 }

 inputAPI() {
  const that = this;

  // CIPHER BUTTON
  this.buttonCipher.addEventListener("click", () => {
   this.numberText = []; // reset numbers
   this.plainTextArray.forEach(function (item) {
    that.numberText.push(that.Alphabet.indexOf(item));
   }); // change input into numbers of letters in Alphabet array
   this.simpleTransposition.ceasarSchift(this.numberText); // send data to cipher module
  });
 }
}

class SimpleTransposition {
 constructor() {
  this.inputFactor = document.querySelector("input.factor");
  this.cipherStrip = document.querySelector("div.cipher>span");
  this.Alphabet = ["q", "w", "e", "r", "t", "z", "u", "i", "o", "a", "s", "d", "f", "g", "h", "j", "k", "p", "y", "x", "c", "v", "b", "n", "m", "l"];
 }

 ceasarSchift(numberText) {
  const y = this.inputFactor.value;
  numberText = numberText.map(numbers => Number(numbers) + Number(y)); // adding a value of inputFactor
  numberText = numberText.map(numbers => Math.floor(numbers % 26)); // reseting number higher than 26
  numberText = numberText.map(numbers => this.Alphabet[numbers]); // change numbers into characters from Alphabet
  numberText = numberText.toString(); // to string
  numberText = numberText.replace(/,/g, ""); // clean string
  this.cipherStrip.textContent = numberText; // send numbers to strip
 }
}

const maszyna = new Maschine();
