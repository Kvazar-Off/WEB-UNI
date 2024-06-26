var express = require("express");
http = require("http");
app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017')  // Подключаемся к БД
	.then(() => { // Успешное подключение
        	console.log('db connected...');
    	})
    	.catch(() => { // Подключение безуспешно
        	console.log('bad connection...');
    	});

let ToDo = mongoose.model('ToDo', new Schema({ description: String, tags: [ String ] })); // Создаем модель данных


app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);

app.get("/students.json", async (req, res) => { // Настраиваем маршрутизатор для GET-запроса
    await ToDo.find() // Выбираем все объекты модели данных
            .then((students) => { // Успешная читка
                res.json(students);
            })
            .catch((err) => { // Ошибка читки
                console.log(err);
            });
});


app.use(express.urlencoded({ extended: true }));

app.post("/students", async (req, res) => { 
	console.log(req.body);
	let newStudent = new ToDo({"description":req.body.description, "tags":req.body.tags});
	
	const newStudentObj = await newStudent.save()
			.then(async (result) => { 
				await ToDo.find()
					.then(async (result) => { 
						res.json(result);
					})
					.catch(async (err) => { 
						res.send('ERROR');
					});
			})
			.catch(async (err) => {
				console.log(err);
				res.send('ERROR');
			});
});

