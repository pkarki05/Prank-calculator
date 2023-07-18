// const handleOnButtonClick=()=>{
//     alert("button clicked")
// }
const btns = document.querySelectorAll(".btn");
const displayElm = document.querySelector(".display");
let lastOperator = "";
const operators = ["+", "-", "*", "/", "%"];
let strToDisplay = "";
const audio = new Audio("./audio track/track1.mp3");

// console.log(btns);
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // console.log(btn);
    const val = btn.innerText;
    displayElm.classList.remove("prank");

    if (operators.includes(val)) {
      lastOperator = val;
      const lastChar = strToDisplay.slice(-1);
      if (operators.includes(lastChar)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
    }

    if (val === "AC") {
      strToDisplay = "";
      return display(strToDisplay);
    }
    if (val === "C") {
      strToDisplay = strToDisplay.slice(0, -1);
      return display(strToDisplay);
    }
    if (val === "=") {
      const lastChar = strToDisplay.slice(-1);
      if (operators.includes(lastChar)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
      return total();
    }
    if (val === ".") {
      //find out the index of the last operator
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = strToDisplay.slice(lastOperatorIndex);
      console.log(lastNumberSet);
      if (lastNumberSet.includes(".")) {
        return;
      }
      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }

    strToDisplay += val;
    display(strToDisplay);
  });
});

const display = (str) => {
  displayElm.innerText = str || 0.0;
  //   console.log(strToDisplay);
};
const total = () => {
  // const prankVal=randomNum();
  //   const ttl = eval(strToDisplay);
  const prankVal = randomNum();
  if (prankVal) {
    audio.play();
    displayElm.classList.add("prank");
  }
  const ttl = eval(strToDisplay) + prankVal;
  strToDisplay = ttl.toString();
  displayElm.innerText = ttl;
};

const randomNum = () => {
  const num = Math.round(Math.random() * 10);
  return num <= 3 ? num : 0;
};
