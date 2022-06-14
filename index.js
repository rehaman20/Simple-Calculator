const mathOperators = ["+", "-", "x", "/"];
const mathOperatorButtons = document.querySelectorAll(".math-operator");
const mathNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const mathNumberButtons = document.querySelectorAll(".math-number");
const mathManipulators = ["=", "DEL", "RESET"];
const mathManipulatingButtons = document.querySelectorAll(".math-manipulator");
const dotButton = document.querySelector(".dot");
let inputBox = document.querySelector(".math-input");
inputBox.focus();

[
  ...mathNumberButtons,
  ...mathOperatorButtons,
  ...mathManipulatingButtons,
  dotButton,
].forEach(button => {
  button.addEventListener("click", function (e) {
    const clickedButtonValue = this.innerText;
    const isSpace = inputBox.value.includes(" ");
    if ((Number(clickedButtonValue) || clickedButtonValue == 0) && !isSpace) {
      inputBox.value += `${clickedButtonValue}`;
    } else if (
      mathOperators.includes(clickedButtonValue) &&
      (+inputBox.value.slice(-1) == 0 ||
        (+inputBox.value.slice(-1) && !isSpace))
    ) {
      if (
        (clickedButtonValue == "+" || clickedButtonValue == "-") &&
        !isSpace
      ) {
        inputBox.value += `${clickedButtonValue}`;
      }
      if (
        (clickedButtonValue == "x" || clickedButtonValue == "/") &&
        inputBox.value &&
        !isSpace
      ) {
        inputBox.value += `${clickedButtonValue}`;
      }
    } else if (
      clickedButtonValue == "." &&
      (+inputBox.value.slice(-1) == 0 ||
        (+inputBox.value.slice(-1) && !isSpace))
    ) {
      inputBox.value += `${clickedButtonValue}`;
    } else {
      switch (clickedButtonValue) {
        case "DEL": {
          if (inputBox.value.includes(" ")) {
            inputBox.value = inputBox.value
              .split(" ")
              .join("")
              .slice(0, inputBox.value.length - 3);
            break;
          } else {
            inputBox.value = inputBox.value
              .split(" ")
              .join("")
              .slice(0, inputBox.value.length - 1);
            break;
          }
        }
        case "RESET":
          {
            inputBox.value = "";
            inputBox.focus();
          }
          break;
        case "=":
          if (+inputBox.value.slice(-1) == 0 || +inputBox.value.slice(-1)) {
            const dummyExp = inputBox.value.replaceAll("x", "*");
            if (!inputBox.value.includes("=")) {
              const result = `${inputBox.value} = ${eval(dummyExp)}`;
              inputBox.value = result;
              break;
            } else {
              inputBox.value = eval(dummyExp.split("=")[0]);
              break;
            }
          }

        default:
          break;
      }
    }
  });
});
