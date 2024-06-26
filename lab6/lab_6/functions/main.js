"use strict";

function mapStudents(studentObjects) {
    return studentObjects.map(function (student) {
        return { institute: student.institute, group: student.group, name: student.name };
    });
}

function organizeByProperty(studentObjects, property) {
    let organizedData = {}; // Здесь создается пустой объект 

    studentObjects.forEach(function (student) { // перебирается каждый элемент в массиве studentObjects
        let key = student[property]; // извлекается значение указанного свойства
        if (!organizedData.hasOwnProperty(key)) {
            organizedData[key] = [];
        }

        organizedData[key].push(student);
    });

    return organizedData;
}

function organizeByPhoneNumber(studentObjects) {
    let studentsByPhone = {};

    studentObjects.forEach(function (student) {
        student.phone.forEach(function (phoneNumber) {
            if (!studentsByPhone.hasOwnProperty(phoneNumber)) {
                studentsByPhone[phoneNumber] = [];
            }
            studentsByPhone[phoneNumber].push(student);
        });
    });

    return studentsByPhone;
}

function organizeAndDisplay(studentObjects, property) {
    let organizedData;
    if (property === 'phone') {
        organizedData = organizeByPhoneNumber(studentObjects);
    } else {
        organizedData = organizeByProperty(studentObjects, property);
    }

    let $content = $("<ul>");
    for (let key in organizedData) {
        $content.append($("<h2>").text(key));

        organizedData[key].forEach(function(student) { // перебираем каждый ключ в объекте
            let info;
            if (property === 'institute') {
                info = student.name + ", " + student.group;
            } else if (property === 'group') {
                info = student.name + ", " + student.institute;
            } else if (property === 'phone') {
                info = student.name + ", " + student.group + ", " + student.institute;
            }
            $content.append($("<li>").text(info));
        });
    }
    return $content;
}

function addStudent($nameInput, $instituteInput, $groupInput, $phoneNumbersInput, students, studentObjects) {
    if ($nameInput.val() === "" || $instituteInput.val() === "" ||
        $groupInput.val() === "" || $phoneNumbersInput.val() === "") {
        return;
    }

    let newStudent = { institute: $instituteInput.val(),
                       group: $groupInput.val(),
                       name: $nameInput.val() };
    students.push(newStudent);
    studentObjects.push({
        "institute": $instituteInput.val(),
        "group": $groupInput.val(),
        "name": $nameInput.val(),
        "phone": $phoneNumbersInput.val().split(",")
    });

    $instituteInput.val("");
    $groupInput.val("");
    $nameInput.val("");
    $phoneNumbersInput.val("");
}

let main = function (studentObjects) {
    let students = mapStudents(studentObjects);
    
    $(".tabs a span").toArray().forEach(function (element) {
        $(element).on("click", function () {
            let $element = $(element); // создается jQuery-объект $element, который представляет текущий элемент <span>, на который был совершен клик

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty(); // делается для того, чтобы удалить все предыдущие данные перед отображением новых данных

            if ($element.parent().is(":nth-child(1)")) {
                let $content = $("<ul>");
                for (let i = students.length - 1; i >= 0; i--) {
                    let student = students[i];
                    let info = student.institute + ", " + student.group + ", " + student.name;
                    $content.append($("<li>").text(info));
                }
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                let $content = $("<ul>");
                students.forEach(function (student) {
                    let info = student.institute + ", " + student.group + ", " + student.name;
                    $content.append($("<li>").text(info));
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                $("main .content").append(organizeAndDisplay(studentObjects, 'institute'));
            } else if ($element.parent().is(":nth-child(4)")) {
                $("main .content").append(organizeAndDisplay(studentObjects, 'group'));
            } else if ($element.parent().is(":nth-child(5)")) {
                $("main .content").append(organizeAndDisplay(studentObjects, 'phone'));
            } else if ($element.parent().is(":nth-child(6)")) {
                let $content = $("<div>");
                $content.append($("<p>").text("Добавить нового студента"));

                $content.append($("<div>").text("ФИО:"));
                let $nameInput = $("<input>");
                $content.append($nameInput);

                $content.append($("<div>").text("Институт:"));
                let $instituteInput = $("<input>");
                $content.append($instituteInput);

                $content.append($("<div>").text("Группа:"));
                let $groupInput = $("<input>");
                $content.append($groupInput);

                $content.append($("<div>").text("Номера телефонов (через запятую):"));
                let $phoneNumbersInput = $("<input>");
                $content.append($phoneNumbersInput);

                $content.append($("<div>"));
                let $button = $("<button>");
                $content.append($button.text("Добавить"));

                $button.on("click", function (event) {
                    addStudent($nameInput, $instituteInput, $groupInput, $phoneNumbersInput, students, studentObjects);
                });
                $("main .content").append($content);
            }
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click"); // имитируется щелчок мыши на 1 элемент. Это гарантирует, что при загрузке страницы будет отображена информация о студентах в соответствии с первой вкладкой
};

$(document).ready(function () {
    $.getJSON("students.json", function (studentObjects) {
        main(studentObjects);
    });
});
