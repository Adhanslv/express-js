const express = require("express");
const router = express.Router();
const {
	getAllProducts,
	getProductById,
	createProduct,
	deleteProductById,
	patchProductById,
} = require("./product.service");

// Show Data
router.get("/", async (req, res) => {
	const products = await getAllProducts();

	res.send(products);
});

// Get data by ID
router.get("/:id", async (req, res) => {
	try {
		const productId = parseInt(req.params.id);
		const product = await getProductById(parseInt(productId));

		res.send(product);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Create
router.post("/", async (req, res) => {
	try {
		const addNewProduct = req.body;

		const product = await createProduct(addNewProduct);
		res.send({
			data: product,
			message: "Create product succes 🎉",
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Deleted
router.delete("/:id", async (req, res) => {
	try {
		const productId = parseInt(req.params.id);

		await deleteProductById(productId);
		res.send("Sucess deleted data");
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Update
router.put("/:id", async (req, res) => {
	const productId = req.params.id;
	const productData = req.body;

	if (
		!(
			productData.image &&
			productData.description &&
			productData.name &&
			productData.price
		)
	) {
		return res.status(400).send("Some field are missing");
	}

	const product = await prisma.product.update({
		where: {
			id: productId,
		},
		data: {
			description: productData.description,
			image: productData.image,
			name: productData.name,
			price: productData.price,
		},
	});
	res.send({
		data: product,
		message: "Edit product success",
	});
});

// Patch
router.patch("/:id", async (req, res) => {
	try {
		const productId = parseInt(req.params.id);
		const productData = req.body;

		const product = await patchProductById(productId, productData);
		res.send({
			data: product,
			message: "Edit product success",
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;
