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
    return Number((a / b).toPrecision(10));
  }
  return "error";
}

// 演算子と二つの数字を受け取り、対応する関数を呼び出し、計算結果を文字列で返す関数
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return String(add(a, b));
    case "-":
      return String(subtract(a, b));
    case "*":
      return String(multiply(a, b));
    case "/":
      return String(divide(a, b));
    default:
      return "error";
  }
}

// 入力と結果が表示される画面
const display = document.querySelector(".display");

// 数字のボタンのノードリスト
const numberButtons = document.querySelectorAll(".number");

// 演算子のボタンのノードリスト
const operatorButtons = document.querySelectorAll(".operator");

// イコールのボタン
const equalButton = document.querySelector(".equal");

// クリアのボタン
const clearButton = document.querySelector(".clear");

// バックスペースボタン
const backSpaceButton = document.querySelector(".backSpace");

// 小数点のボタン
const commaButton = document.querySelector(".comma");

// displayに表示される文字列
let displayContent = "0";
display.textContent = displayContent;

// 演算子を保存する
// あとで演算子を複数保存できるようにする
let operator = null;

// 計算後にtrueになる
let isCalculated = false;

// 演算子の後に0が入力されたときtrueになる
let isAfterOperator = false;

// キーボード入力設定
// event.keyをみる
// 対応するbuttonをクリック
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "Enter":
    case "=":
      equalButton.click();
      break;
    case "Backspace":
      backSpaceButton.click();
      break;
    case ".":
      commaButton.click();
      break;
    case "Escape":
      clearButton.click();
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      clickNumButton(event.key);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      clickOprButton(event.key);
      break;
    default:
      break;
  }
});

// keyに対応する数字のボタンをクリックする関数
function clickNumButton(key) {
  Array.from(numberButtons)
    .find((button) => button.textContent === key)
    .click();
}

// keyに対応する演算子のボタンをクリックする関数
function clickOprButton(key) {
  Array.from(operatorButtons)
    .find((button) => button.textContent === key)
    .click();
}

// 数字ボタンが押された時の処理
// displayに表示される文字列を更新する関数が発動
// event.target.textContentで押されたボタンの文字列を取得する
// IF
//  isAfterOperatorがtrueのとき
//  直前の0を削除
//  isAfterOperatorをfalseに戻す
// IFEND
// IF
//  0が入力された時
//  IF
//   直前の文字が演算子のとき
// 　isAfterOperatorをtrueにする
//  IFEND
// IF
//  計算直後に数字ボタンを押された時
//  押されたボタンの文字列をdisplayContentに代入する
//  isCalculatedをfalseに戻す
//  displayに表示
// ELSEIF
//  displayContentが0のとき
// 　押されたボタンの文字列をdisplayContentに代入する
// ELSE
// displayContentが0以外のとき
//   押されたボタンの文字列をdisplayContentに追加する
// IFEND
// displayに表示
numberButtons.forEach((button) =>
  button.addEventListener("click", (event) => {
    const buttonText = event.target.textContent;
    // 演算子の直後に0があるとき0を削除
    // 3 + 03みたいになるのを防ぐ
    if (isAfterOperator) {
      displayContent = displayContent.slice(0, -1);
      isAfterOperator = false;
    }
    // 演算子の直後に0を入力したときisAfterOperatorをtrueにする
    if (
      buttonText === "0" &&
      (displayContent.slice(-1) === "+" ||
        displayContent.slice(-1) === "-" ||
        displayContent.slice(-1) === "*" ||
        displayContent.slice(-1) === "/")
    ) {
      isAfterOperator = true;
    }

    // 計算直後に数字を入力すると、新たに計算を始める
    if (isCalculated) {
      displayContent = buttonText;
      isCalculated = false;
    } else if (displayContent === "0") {
      displayContent = buttonText;
    } else {
      displayContent += buttonText;
    }
    display.textContent = displayContent;
  }),
);

// 演算子ボタンが押された時の処理
// IF
//  isAfterOperatorがtrueのとき
//  isAfterOperatorをfalseに戻す
// IFEND
// IF
//  計算直後に演算子ボタンが押されたとき
//  isCalculatedをfalseに戻す
// IFEND
// IF
//  displayContentが0のとき
// 　IF
// 　 演算子が-のとき
//　  displayContentに-を代入する
// 　IFEND
// ELSE IF
//  displayContentの最後の2文字が*-,/-のとき
//  IF
//   入力した演算子が-
//   なにもしない
//  IFEND
//  演算子を上書き保存
//  displayContentの最後の2文字を削除
//  displayContentに演算子を追加
// ELSE IF
//  displayContentの最後の文字が+,-のとき
//  演算子を上書き保存
//  displayContentの最後の文字を削除
//  displayContentに演算子を追加
// ELSE IF
//  displayContentの最後の文字が*,/のとき
//  IF
// 　入力した演算子が-のとき
// 　displayContentに-を追加
//  ELSE
// 　演算子を上書き保存
// 　displayContentの最後の文字を削除
// 　displayContentに演算子を追加
//  IFEND
// ELSE
//  displayContentが0以外の数字のとき
//  演算子を保存
//  displayContentに演算子を追加
// IFEND
// displayContentを表示
operatorButtons.forEach((button) =>
  button.addEventListener("click", (event) => {
    const buttonText = event.target.textContent;
    if (isAfterOperator) {
      isAfterOperator = false;
    }
    if (isCalculated) {
      isCalculated = false;
    }
    if (displayContent === "0") {
      if (buttonText === "-") {
        displayContent = buttonText;
      }
    } else if (
      displayContent.slice(-2) === "*-" ||
      displayContent.slice(-2) === "/-"
    ) {
      if (buttonText === "-") {
        return;
      }
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

// 小数点ボタンが押された時の処理
// 2.3.のように小数点が重なるのを防ぐ
//  displayContentを.で区切った配列に変換し、最後の要素から取得していく
//  演算子が.よりも手前にあるor.が存在しない
//    isDecimal = true
//  .が演算子より先にある場合
//    isDecimal = false

// IF
//  isAfterOperatorがtrueのとき
//  isAfterOperatorをfalseに戻す
// IFEND
// IF
//  isCalculated = trueのとき
//  falseに戻す
// IFEND
// IF
//  isDecimal = trueのとき
//  IF
//   displayContentの直前の文字が演算子のとき
//   displayContentに0.を追加する
//  ELSE
//   displayContentに.を追加する
//  IFEND
//  displayContentを表示
// IFEND
commaButton.addEventListener("click", (event) => {
  const buttonText = event.target.textContent;
  const array = displayContent.split("");
  //.をつけれるかを判定する
  const isDecimal =
    array.lastIndexOf(".") < array.lastIndexOf("+") ||
    array.lastIndexOf(".") < array.lastIndexOf("-") ||
    array.lastIndexOf(".") < array.lastIndexOf("*") ||
    array.lastIndexOf(".") < array.lastIndexOf("/") ||
    array.indexOf(".") === -1;

  if (isAfterOperator) {
    isAfterOperator = false;
  }
  if (isCalculated) {
    isCalculated = false;
  }
  if (isDecimal) {
    //直前の文字が演算子のときは0.を追加
    if (
      displayContent.slice(-1) === "+" ||
      displayContent.slice(-1) === "-" ||
      displayContent.slice(-1) === "*" ||
      displayContent.slice(-1) === "/"
    ) {
      displayContent += "0.";
    } else {
      displayContent += buttonText;
    }
    display.textContent = displayContent;
  }
});

// クリアボタンが押された時の処理
// displayContentを初期化
// displayに表示
// operatorを初期化
// 判定系を初期化
clearButton.addEventListener("click", () => {
  displayContent = "0";
  display.textContent = displayContent;
  operator = null;
  isAfterOperator = false;
  isCalculated = false;
});

// バックスペースボタンが押された時の処理
// IF
//  一文字の時は0を表示する
// IFEND
// 直前の文字を削除
// displayに表示
backSpaceButton.addEventListener("click", () => {
  if (displayContent.length === 1) {
    displayContent = "0";
  } else {
    displayContent = displayContent.slice(0, -1);
  }
  display.textContent = displayContent;
});

// イコールボタンが押された時の処理(数字2つと演算子1つの場合)
// IF
//  計算直後にもう一度押された場合
//  イベント終了
// IFEND
// 入力された文字列をoperatorで区切り、[数字1,operator,数字2]の配列を得る
// operatorを初期化
// firstNumとsecondNumに数字1,2を保存
// operate関数に引数を渡し、計算結果を得る
// displayContentに保存
// displayに表示

equalButton.addEventListener("click", () => {
  // 計算直後に押された場合動作を終了
  if (isCalculated) {
    return;
  }
  const opr = operator;
  operator = null;
  const [firstNum, secondNum] = displayContent.split(`${opr}`);
  displayContent = operate(opr, Number(firstNum), Number(secondNum));
  display.textContent = displayContent;
  isCalculated = true;
});
