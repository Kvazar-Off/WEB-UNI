var express = require("express"),
http = require("http"),
app = express(),
students =
[
  {
    "institute": "Физико-математический факультет",
    "group": "2002",
    "name": "Кузнецова Екатерина Александровна",
    "phone": ["+7 (987) 654-3210"]
},
{
    "institute": "Институт информационных технологий и защиты информации",
    "group": "3003",
    "name": "Попов Максим Николаевич",
    "phone": ["+7 (495) 123-4567", "+7 (926) 555-6677"]
},
{
    "institute": "Институт авиации, наземного транспорта и энергетики",
    "group": "4004",
    "name": "Лебедева Анна Владимировна",
    "phone": ["+7 (903) 777-8899"]
},
{
    "institute": "Институт автоматики и электронного приборостроения",
    "group": "1005",
    "name": "Федоров Дмитрий Юрьевич",
    "phone": ["+7 (921) 999-8877"]
}
];

app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);

app.get("/students.json", function (req, res) {
	res.json(students);
});


app.use(express.urlencoded({ extended: true }));
app.post("/students", function (req, res) {
	console.log("Данные были отправлены на сервер!");
    var newStudent = req.body;
	console.log(newStudent);
	students.push(newStudent);

	res.json({"message":"Вы размещаетесь на сервере!"}); 
});

