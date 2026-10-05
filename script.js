function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function subtract(a, b) {
  return a - b;
}

// あとで有効数字やエラー処理を追加
function divide(a, b) {
  if (b !== 0) {
    return a / b;
  }
  return "error";
}

// 演算子と二つの数字を受け取り、対応する関数を呼び出す関数
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "error";
  }
}

// 入力と結果が表示される画面
const display = document.querySelector(".display");

// 数字のボタン
const numberButtons = document.querySelectorAll(".number");

// 演算子のボタン
const operatorButtons = document.querySelectorAll(".operator");

// displayに表示される文字列
let displayContent = "0";
display.textContent = displayContent;

// 演算子を保存する
let operator = null;

// 数字ボタンを押す
// displayに表示される文字列を更新する関数が発動
// event.target.textContentで押されたボタンの文字列を取得する
// IF
// displayContentが0のとき
// 　押されたボタンの文字列をdisplayContentに代入する
// displayContentが0以外のとき
//   押されたボタンの文字列をdisplayContentに追加する
// IFEND
// displayに表示
numberButtons.forEach((button) =>
  button.addEventListener("click", (event) => {
    const buttonText = event.target.textContent;
    if (displayContent === "0") {
      displayContent = buttonText;
    } else {
      displayContent += buttonText;
    }
    display.textContent = displayContent;
  }),
);

// 演算子ボタンを押す
// IF
// displayContentが0のとき
// 　IF
// 　演算子が-のとき
//　　　displayContentに-を代入する
// 　IFEND
// ELSE IF
// displayContentの最後の2文字が*-,/-のとき
// 　演算子を上書き保存
// 　displayContentの最後の2文字を削除
// 　displayContentに演算子を追加
// ELSE IF
// displayContentの最後の文字が+,-のとき
// 　演算子を上書き保存
// 　displayContentの最後の文字を削除
// 　displayContentに演算子を追加
// ELSE IF
// displayContentの最後の文字が*,/のとき
//   IF
// 　入力した演算子が-のとき
// 　　displayContentに-を追加
// 　ELSE
// 　　演算子を上書き保存
// 　　displayContentの最後の文字を削除
// 　　displayContentに演算子を追加
//   IFEND
// ELSE
// displayContentが0以外の数字のとき
// 　演算子を保存
// 　displayContentに演算子を追加
// IFEND
// displayContentを表示
operatorButtons.forEach((button) =>
  button.addEventListener("click", (event) => {
    const buttonText = event.target.textContent;
    if (displayContent === "0") {
      if (buttonText === "-") {
        displayContent = buttonText;
      }
    } else if (
      displayContent.slice(-2) === "*-" ||
      displayContent.slice(-2) === "/-"
    ) {
      operator = buttonText;
      displayContent = displayContent.slice(0, -2) + buttonText;
    } else if (
      displayContent.slice(-1) === "+" ||
      displayContent.slice(-1) === "-"
    ) {
      operator = buttonText;
      displayContent = displayContent.slice(0, -1) + buttonText;
    } else if (
      displayContent.slice(-1) === "*" ||
      displayContent.slice(-1) === "/"
    ) {
      if (buttonText === "-") {
        displayContent += buttonText;
      } else {
        operator = buttonText;
        displayContent = displayContent.slice(0, -1) + buttonText;
      }
    } else {
      operator = buttonText;
      displayContent += buttonText;
    }
    display.textContent = displayContent;
  }),
);
