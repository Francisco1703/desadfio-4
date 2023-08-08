import express from "express";
import ProductManager from "../../ProductManager.js";

const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("index", { products });
  } catch (error) {
    console.error("Error al obtener los productos: ", error);
    res.status(500).send("Error al obtener los productos");
  }
});

router.get("/realTimeProducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    console.error("Error al obtener los productos en tiempo real: ", error);
  }
});

router.post("/products", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    req.app.get("socketServer").emit("productCreated", newProduct);
    res.json(newProduct);
  } catch (error) {
    console.error("Error, no se pudo cargar el producto!", error);
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    let id = Number(req.params.id);
    const deletedProduct = await productManager.deleteProduct(id);
    req.app.get("socketServer").emit("productDeleted", deletedProduct);
    res.json({
      status: "ok",
      message: `El producto con el id #${id} se eliminó correctamente!`,
      deletedProduct: deletedProduct,
    });
  } catch (error) {
    console.error("Error! No se pudo eliminar el producto!", error);
  }
});

export default router;
