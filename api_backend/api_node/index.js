let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let apiRoutes = require("./routes/api-routes");

let app = express();

let mongoKey = "";

// Configure bodyparser to handle post requests
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect(mongoKey, { useNewUrlParser: true });

var db = mongoose.connection;

const cors = require("cors");

app.use(cors({ origin: true }));

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) =>
	res.send("Hello World! We are still testing stuff here")
);

// Use Api routes in the App
app.use("/api", apiRoutes);

app.listen(port, function () {
	console.log("Running TestHub on http://localhost:" + port);
});
