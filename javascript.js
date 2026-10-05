
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
}
