const mongoose = require('mongoose');

mongoose.connect(process.env.DB_Url)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log("Database connection failed", err);
    });