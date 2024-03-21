const express = require("express");
const dotenv = require("dotenv");
const productController = require("./product/product.controller");
const app = express();
const PORT = process.env.PORT;
dotenv.config();
app.use(express.json());

app.get("/api", (req, res) => {
	res.send("<h1>REST API</h1>");
});

app.use("/products", productController);

app.listen(PORT, () => {
	console.log("Succes Running API in : " + PORT);
});
