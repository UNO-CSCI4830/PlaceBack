const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("PlaceBack backend is running!");
});

app.listen(PORT, () => {
    console.log(`PlaceBack backend running at http://localhost:${PORT}`);
});