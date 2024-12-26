import React from "react";
import { useState } from 'react';
import axios from 'axios';
function Addproduct(){
    const style = {
        textAlign: 'center',
        height: '100vh', 
        backgroundColor: '#f0f0f0',
      };
    const [stock, setStock] = useState(0);
    const [name,setName]=useState("");
    const [price,setPrice]=useState(0);
    const [category,setCategory]=useState("");
    const [description,setDescription]=useState("");
    const [image,setImage]=useState(null);
    const handleFileChange=(e)=>{
        const file = e.target.files[0];
        if (file) {
          setImage(file);
        }
    }

    const handleSubmit= (e)=>{
        if (stock===0 || name.length==0 || price===0 || category.length==0 || description.length==0){
           alert('Please complete all the fields');
        }
        else{
            
            axios.post('http://localhost:4000/addproduct', {stock,name,price,description,category}, 
                )
         .then((result) => {
           console.log(result)});

           alert("Product added successfully")

        }

    }

    return (
        <div>
                <nav style={styles.navbar}>
                    <h1 style={styles.title}>E-Commerce Application</h1>
                </nav>
                <h1 style={{textAlign:'center'}}>Add a new product</h1>
                <br/>
                <br/>
                <form style={style} onSubmit={handleSubmit}>
                 
                  <label>Enter product name:
                      <br/>
                      <br/>
                      <input type="text" onChange={(e) => setName(e.target.value)} />
                  </label>
                  <br/>
                  <br/>
                  <label>Enter product price:
                        <br/>
                        <br/>
                      <input type="number" onChange={(e) => setPrice(e.target.value)}/>
                  </label>
                  <br/>
                  <br/>
                  <label>Enter product category:
                  <br/>
                  <br/>
                  <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home-kitchen">Home & Kitchen</option>
                        <option value="beauty-care">Beauty & Personal Care</option>
                        <option value="sports-outdoors">Sports & Outdoors</option>
                        <option value="miscellaneous">Miscellaneous</option>
                  </select>
                  
                  </label>
                  <br/>
                  <br/>
                  <label> Product Description: 
                  <br/>
                  <br/>
                   <textarea
                    id="description"
                    rows="10"
                    cols="50"
                    placeholder="Enter product description here..."
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  </label>
                  <br/>
                  <br/>
                  <label> Enter Stock Available:
                  <br/>
                  <br/>
                    <input type="number" onChange={(e) => setStock(e.target.value)}></input>

                  </label>
                  <br/>
                  <br/>
                  
                  
                  <input type="submit"></input>
               </form>
        </div>
    );
}
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
    },
    title: {
        fontSize: '24px',
        margin: 0,
    },
    button: {
        padding: '8px 16px',
        fontSize: '16px',
        color: '#333',
        backgroundColor: '#f0f0f0',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
  };



export default Addproduct;