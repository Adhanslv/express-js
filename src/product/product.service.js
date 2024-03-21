const prisma = require("../db");
const {
	findProductById,
	findProducts,
	insertProductData,
	findProductByName,
	editProduct,
	deleteProduct,
} = require("./repository.product");

const getAllProducts = async () => {
	const products = await findProducts();

	return products;
};

const getProductById = async (id) => {
	const product = await findProductById(id);

	if (!product) {
		throw Error("<h1>Product not found</h1>");
	}

	return product;
};

const createProduct = async (addNewProduct) => {
	const findProducts = await findProductByName(addNewProduct.name);

	if (findProducts) {
		throw new Error("Name has to be unique");
	}

	const product = await insertProductData(addNewProduct);

	return product;
};

const deleteProductById = async (id) => {
	await getProductById(id);

	await deleteProduct(id);
};

const patchProductById = async (id, productData) => {
	await getProductById(id);

	const product = await editProduct(id, productData);

	return product;
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	deleteProductById,
	patchProductById,
};
