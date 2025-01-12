/*const express =require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const EmployeeModel=require('./models/Employee')
const ProductModel=require('./models/Product')
const app=express()
app.use(express.json())
app.use(cors());






mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post('/login',(req,res)=>{
  const {email,password}=req.body;
  EmployeeModel.findOne({email:email}).then(user=>{
    if (user){
      if (user.password===password){
        res.json("Success")
      }
      else{
        res.json("Password is incorrect")
      }
    }
    else{
      res.json("No record existed")
    }
  })
})


app.post('/register',(req,res)=>{
EmployeeModel.create(req.body)
.then(employees=>res.json(employees))
.catch(err=>res.json(err))
})

app.post('/addproduct',async (req,res)=>{
  let id=0;
  id = await ProductModel.countDocuments({});

  id='PRO'+String(id+1);
  let stock=parseInt(req.body.stock);
  let name=req.body.name;
  let category=req.body.category;
  let description=req.body.description;
  let price=parseInt(req.body.price);
  let data={
    id:id,
    productname: name,
    cost:price,
    category:category,
    description:description,
    stock:stock,

  };
  ProductModel.create(data).then((res)=>{
    console.log('added product');}
  ).catch((err)=>{
    console.error('Error counting documents:', err);
  }
  );



})

app.listen(4000,()=>{
    console.log("server is running sucessfully");
})*/
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');
const ProductModel = require('./models/Product');
const app = express();


app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Employee login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email }).then(user => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

// Employee registration route
app.post('/register', (req, res) => {
  EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err));
});
/*
// Add product route
app.post('/addproduct', async (req, res) => {
  try {
    let id = await ProductModel.countDocuments({});
    id = 'PRO' + (id + 1); // Generate product ID

    const { name, category, description, price, stock } = req.body;
    const data = {
      id,
      productname: name,
      cost: price,
      category,
      description,
      stock: parseInt(stock),
    };

    const newProduct = await ProductModel.create(data); // Create the product
    res.json(newProduct); // Send the newly created product as the response
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Error adding product', error: err });
  }
});
*/
app.post('/addproduct', async (req, res) => {
  try {
    let id = await ProductModel.countDocuments({});
    id = 'PRO' + (id + 1); // Generate product ID

    const { name, category, description, price, stock, imageUrl } = req.body;
    
    // Prepare the data to be saved
    const data = {
      id,
      productname: name,
      cost: price,
      category,
      description,
      stock: parseInt(stock),
      imageUrl: imageUrl, // Add imageUrl to the data
    };

    // Create the product in the database
    const newProduct = await ProductModel.create(data); 
    res.json(newProduct); // Send the newly created product as the response
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Error adding product', error: err });
  }
});

let products = []; // In-memory array to store products

app.post('/addproduct', (req, res) => {
    const product = req.body;
    product.id = `PRO${products.length + 1}`; // Generate a unique ID
    products.push(product);
    console.log('Product added:', product); // Log added product
    res.status(201).json(product);
});






// Get all products route
app.get('/api/products', async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products); // Send the products to the frontend
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err });
  }
});

let productId = 1;

// Add Product
app.post('/products', (req, res) => {
    const product = { id: productId++, ...req.body };
    products.push(product);
    res.status(201).json(product);
});

// Get Products
app.get('/products', (req, res) => {
  console.log('Returning products:', products); // Log products array
  res.status(200).json(products);
});

// Update product by ID
app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});


// Start the server
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
