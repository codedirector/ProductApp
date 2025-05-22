const express=require('express');
const cors=require("cors");
const app=express();
const connectDB=require("./config/db");
require("dotenv").config();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/product"));
// app.use("/cart", require("./routes/cart"));

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});
const port=5000;
app.listen(port,()=>console.log("server running at port 5000"));