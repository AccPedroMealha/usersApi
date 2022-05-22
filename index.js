import { readFileSync } from 'fs';
import { express } from "express";

let data = readFileSync('dbUsers.json');

var users = JSON.parse(data);
const app = express();
import cors from 'cors';

app.listen(process.env.PORT, () => console.log("Server Start at the Port"));

app.use(express.static('public'));
app.use(cors());

app.get('/users', alldata);

function alldata(request, response) {
	response.send(users);
}


app.get('/users/:user/', searchUsser);

function searchUsser(request, response) {
	var word = request.params.element;
	word = word.charAt(0).toUpperCase()
		+ word.slice(1).toLowerCase();

	if (users[word]) {
		var reply = users[word];
	}
	else {
		var reply = {
			status: "Not Found"
		}
	}

	response.send(reply);
}