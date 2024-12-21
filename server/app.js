const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config(); // this code will load the .env file
const connectMongodb = require("./init/mongodb");
const app = express();
const {authRoute , categoryRoute, fileRoute} = require("./routes");
const {errorHandler} = require("./middlewares");
const notfound = require("./controllers/notfound")

//connect database
connectMongodb();

// third party middleware : 
app.use(express.json({limit:"500mb"}));
app.use(bodyParser.urlencoded({limit:"500mb",extended:true})); /*parse the incoming request body in a middleware before your handlers limit the incoming request body size to be 500mb extended:true means that it will parse urlencoded data to key/value and array key/value */
app.use(morgan("dev"));

// route section :-
app.use("/api/v1/auth" , authRoute);
app.use("/api/v1/category" , categoryRoute);
app.use("/api/v1/file" , fileRoute);

// Not Found route :-
app.use("*" , notfound);     // * means, when request does not match to all routes then it will come to this routes.

// error Handling middleware
app.use(errorHandler);

module.exports = app;
