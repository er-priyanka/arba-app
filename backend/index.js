require("dotenv").config();
const express = require('express');
const { connection } = require("./Configs/db");
const cors = require('cors');

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => res.send('Hello'));

app.listen(PORT, async () => {
    try{
        await connection;
        console.log("Connected to db");
    }catch(err){
        console.log(err);
    }
    console.log(`server started on http://localhost:${PORT}`)

});