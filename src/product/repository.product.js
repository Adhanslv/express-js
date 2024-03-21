const prisma = require("../db");

const findProducts = async () => {
	const producuts = await prisma.product.findMany();

	return producuts;
};

const findProductById = async (id) => {
	const product = await prisma.product.findUnique({
		where: {
			id,
		},
	});

	return product;
};

const findProductByName = async (name) => {
	const product = await prisma.product.findFirst({
		where: {
			name,
		},
	});

	return product;
};

const insertProductData = async (productData) => {
	const product = await prisma.product.create({
		data: {
			name: productData.name,
			description: productData.description,
			image: productData.image,
			price: productData.price,
		},
	});

	return product;
};

const deleteProduct = async (id) => {
	await prisma.product.delete({
		where: {
			id,
		},
	});
};

const editProduct = async (id, productData) => {
	const product = await prisma.product.update({
		where: {
			id: parseInt(id),
		},
		data: {
			description: productData.description,
			image: productData.image,
			name: productData.name,
			price: productData.price,
		},
	});

	return product;
};

module.exports = {
	findProducts,
	findProductById,
	insertProductData,
	findProductByName,
	deleteProduct,
	editProduct,
};
