import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

let factText = [];
let factPic = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://meowfacts.herokuapp.com/");
        const responseCat = await axios.get("https://cataas.com/cat");

        const result = response.data;
        const resultCat = responseCat.data;

        // factText.push(result);
        // factPic.push(resultCat);
        // console.log(result);
        // console.log(resultCat);
        res.render("index.ejs", {
            data: factText,
            catData: factPic,
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

app.post("/generate", async (req, res) => {
    try {
        const response = await axios.get("https://meowfacts.herokuapp.com/");
        const responseCat = await axios.get("https://cataas.com/cat");

        const result = response.data;
        const resultCat = responseCat.data;

        factText.push(result);
        factPic.push(resultCat);
        // console.log(result);
        // console.log(resultCat);
        res.redirect("/");
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
    
});

app.post("/clear-all", (req, res) => {
    factText = [];
    factPic = [];
    res.redirect("/");

});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});