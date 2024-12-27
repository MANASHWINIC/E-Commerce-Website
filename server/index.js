const express =require("express")
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
})
