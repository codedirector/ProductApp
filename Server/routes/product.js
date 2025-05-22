const express=require("express");
const Product=require("../models/Product");
const upload=require("../middleware/upload");
const isAdmin=require("../middleware/isadmin");
const router=express.Router();

router.post("/", isAdmin, upload.single("image"), async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : "";

  const product = new Product({
    name,
    price,
    description,
    image,
    createdBy: req.user.userId
  });

  await product.save();
  res.send("Product created");
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); 
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Error fetching products");
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  const { name, price, description } = req.body;

  await Product.findByIdAndUpdate(req.params.id, {
    name,
    price,
    description
  });

  res.send("Product updated");
});

router.delete("/:id", isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Product deleted");
});

module.exports = router;