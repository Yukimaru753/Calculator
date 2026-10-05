
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
    if(b !== 0) {
        return a / b;
    }
    return "error";
}

// 演算子と二つの数字を受け取り、対応する関数を呼び出す関数
function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "error";
    }
}

console.log(operate('+', 5, 3)); // 8