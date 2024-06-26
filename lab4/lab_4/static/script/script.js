
//Задание 1 
function checkNumbers() {
    var inputData = {
        k: parseInt(document.getElementById("k").value),
        a: parseInt(document.getElementById("a").value),
        b: parseInt(document.getElementById("b").value)
    };

    if (!inputData.k || !inputData.a || !inputData.b) {
        alert("Некорректные данные.");
        return;
    }

    if (inputData.k < 0 || inputData.k > 9) {
        alert("k должно быть числом от 0 до 9.");
        return;
    }

    if (!Number.isInteger(inputData.a) || !Number.isInteger(inputData.b)) {
        alert("Введите целые числа.");
        return;
    }

    if (inputData.a <= 0 || inputData.b <= 0) {
        alert("Числа должны быть больше нуля.");
        return;
    }

    if (inputData.a >= inputData.b) {
        alert("Число b должно быть больше числа a.");
        return;
    }

    var result = solver(inputData);
    document.getElementById("result").textContent = "Сумма чисел из отрезка [" + inputData.a + ", " + inputData.b + "], содержащих цифру " + inputData.k + " равна " + result;
}

function solver(data) {
    var sum = 0;

    for (var i = data.a; i <= data.b; i++) {
        if (containsDigit(i, data.k)) {
            sum += i;
        }
    }

    return sum;
}

function containsDigit(number, k) {
    var digits = number.toString().split("");

    for (var i = 0; i < digits.length; i++) {
        if (digits[i] === k.toString()) {
            return true;
        }
    }

    return false;
}


//Задания про дату
function date() {
    // Массивы для дней недели и месяцев
    var daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    // Получение текущей даты
    var currentDate = new Date();

    // Получение дня недели, даты, месяца и года
    var currentDayOfWeek = daysOfWeek[currentDate.getDay()];
    var currentMonth = months[currentDate.getMonth()];
    var currentDateNum = currentDate.getDate();
    var currentYear = currentDate.getFullYear();

    // Определение даты начала сессии
    var sessionDate = new Date(2024, 5, 10); // Июнь - месяц начинается с 0

    // Рассчет количества дней до сессии
    var daysRemaining = Math.ceil((sessionDate - currentDate) / (1000 * 60 * 60 * 24));

    // Обновление ячеек таблицы с текущей датой
    document.getElementById("weekday").textContent = currentDayOfWeek;
    document.getElementById("date").textContent = currentDateNum + ' ' + currentMonth;
    document.getElementById("year").textContent = currentYear;
    document.getElementById("dateS").value = daysRemaining;

}


function getMemorableDate() {
    var memorableDate = prompt("Введите памятную для вас дату (формат: ДД.ММ.ГГГГ)", "01.01.2000");
    if (memorableDate !== null) {
        if (isValidDate(memorableDate)) {
            document.getElementById("memorableButton").innerText = memorableDate;
        } else {
            alert("Неверный формат даты! Пожалуйста, введите дату в формате ДД.ММ.ГГГГ");
        }
    }
}

function isValidDate(dateString) {
    var pattern = /^\d{2}\.\d{2}\.\d{4}$/;
    return pattern.test(dateString);
}



//Сумма последовательности
function calculateSum() {
    var input = document.getElementById("sequenceInput").value.split(",");
    var firstTerm = input[0].trim();
    var numberOfTerms = input[1].trim();

    // Проверка на корректность введенных данных
    if (!isInteger(firstTerm) || !isInteger(numberOfTerms) || firstTerm === "" || numberOfTerms === "") {
        alert("Пожалуйста, введите корректные целые числа.");
        return;
    }

    var sum = 0;
    for (var i = 0; i < numberOfTerms.length; i++) {
        if (numberOfTerms[i] < '0' || numberOfTerms[i] > '9') {
            alert("Пожалуйста, введите корректное целое число.");
            return;
        }
    }

    for (var i = 0; i < firstTerm.length; i++) {
        if (firstTerm[i] < '0' || firstTerm[i] > '9') {
            alert("Пожалуйста, введите корректное целое число.");
            return;
        }
    }

    var sum = 0;
    for (var i = 0; i < parseInt(numberOfTerms); i++) {
        var term = Math.pow(-1, i) * Math.pow(parseInt(firstTerm) + i + 4, 2);
        sum += term;
    }

    document.getElementById("result2").innerHTML = "Сумма " + numberOfTerms + " членов последовательности: " + sum;
}

// Функция для проверки целочисленности числа
function isInteger(value) {
    for (var i = 0; i < value.length; i++) {
        if (value[i] < '0' || value[i] > '9') {
            return false;
        }
    }
    return true;
}