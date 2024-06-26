function requestFullName() {
    let fullName = prompt("Введите свои фамилию, имя и отчество через пробел:");

    return fullName;
}

function validateFullName(fullName) {
    let nameParts = fullName.split(" ");

    return nameParts.length === 3;
}


function greetUser(fullName) {
    let confirmation = confirm("Вы ввели: " + fullName + "\n\n Данные корректны?");

    if (confirmation) {
        alert("Приветствуем вас, " + fullName + "!");
    } else {
        alert("Пожалуйста, введите корректные ФИО.");
    }
}


function main() {
    let inputFullName = requestFullName();

    if (validateFullName(inputFullName)) {
        greetUser(inputFullName);
    } else {
        alert("Ошибка ввода. Пожалуйста, введите фамилию, имя и отчество через пробел.");
    }
}

function calculate_1() {
    var N = parseInt(document.getElementById('parametr_1').value);
    var result = findNumbers(N);
    document.getElementById('result_1').innerText = result;
}

function findNumbers(N) {
    var result = [];

    for (var i = 1; i < N; i++) {
        var digits = i.toString().split('').map(Number);
        var product = digits.reduce(function (acc, num) {
            return acc * num;
        }, 1);
        var sum = digits.reduce(function (acc, num) {
            return acc + num;
        }, 0);

        if (product === sum) {
            result.push(i);
        }
    }

    return result.length > 0 ? result.join(', ') : "Нет таких чисел в интервале от 1 до " + (N - 1);
}
