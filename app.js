const express = require('express');
const app = express();


require('dotenv').config();

console.log("ENV loaded:", process.env.DB_Url);

require('./src/db/dbconnection');

const port = process.env.PORT || 5001;

const errorHandlerMiddleware = require('./src/middlewares/errorHandlers');

const cors=require("cors")
const path=require("path")
const corsOptions= require("./src/helpers/corsOptions")

//Middleware 
app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(express.static(path.join(__dirname,"public")))
app.use("/uploads",express.static(__dirname))
// app.use(cors(corsOptions))


app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});

const router=require("./src/routers")
app.use("/api",router);


// Error handling middleware
app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});