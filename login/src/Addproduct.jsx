/*import React, { useState, useEffect } from "react";
import axios from 'axios';

function Addproduct() {
    const style = {
        textAlign: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    };

    const [products, setProducts] = useState([]);
    const [stock, setStock] = useState(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:4000/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => console.error('Error fetching products:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (stock === 0 || name.length === 0 || price === 0 || category.length === 0 || description.length === 0 || imageUrl.length === 0) {
            alert('Please complete all the fields');
        } else {
            axios.post('http://localhost:4000/addproduct', {
                stock,
                name,
                price,
                description,
                category,
                imageUrl
            })
            .then((result) => {
                alert("Product added successfully");
                setProducts((prevProducts) => [...prevProducts, result.data]); // Optimistic update
                clearForm();
            })
            .catch((error) => console.error('Error adding product:', error));
        }
    };

    const clearForm = () => {
        setStock(0);
        setName("");
        setPrice(0);
        setCategory("");
        setDescription("");
        setImageUrl("");
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/deleteproduct/${id}`)
            .then(() => {
                alert("Product deleted successfully");
                setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
            })
            .catch((error) => console.error('Error deleting product:', error));
    };

    const handleEditStock = (id, newStock) => {
        axios.put(`http://localhost:4000/editproduct/${id}`, { stock: newStock })
            .then(() => {
                alert("Stock updated successfully");
                setProducts((prevProducts) =>
                    prevProducts.map(product =>
                        product.id === id ? { ...product, stock: newStock } : product
                    )
                );
            })
            .catch((error) => console.error('Error updating stock:', error));
    };

    return (
        <div>
            <nav style={styles.navbar}>
                <h1 style={styles.title}>E-Commerce Application</h1>
            </nav>
            <h1 style={{ textAlign: 'center' }}>Add a new product</h1>
            <form style={style} onSubmit={handleSubmit}>
                <label>Enter product name:
                    <br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>Enter product price:
                    <br />
                    <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </label>
                <br />
                <label>Enter product category:
                    <br />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home-kitchen">Home & Kitchen</option>
                        <option value="beauty-care">Beauty & Personal Care</option>
                        <option value="sports-outdoors">Sports & Outdoors</option>
                        <option value="miscellaneous">Miscellaneous</option>
                    </select>
                </label>
                <br />
                <label>Product Description:
                    <br />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        cols="50"
                    />
                </label>
                <br />
                <label>Enter Stock Available:
                    <br />
                    <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
                </label>
                <br />
                <label>Enter Product Image URL:
                    <br />
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>
                <br />
                {imageUrl && (
                    <div>
                        <img
                            src={imageUrl}
                            alt="Product Preview"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                    </div>
                )}
                <br />
                <input type="submit" value="Add Product" />
            </form>

            <h2 style={{ textAlign: 'center' }}>Product List</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <input
                                    type="number"
                                    value={product.stock}
                                    onChange={(e) => handleEditStock(product.id, Number(e.target.value))}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
    table: {
        margin: '20px auto',
        borderCollapse: 'collapse',
        width: '80%',
        textAlign: 'center',
    },
    button: {
        padding: '5px 10px',
        margin: '5px',
        border: 'none',
        backgroundColor: '#f44336',
        color: 'white',
        cursor: 'pointer',
    },
};

export default Addproduct;
import React, { useState, useEffect } from "react";
import axios from "axios";

function Addproduct() {
    const style = {
        textAlign: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
    };

    const [products, setProducts] = useState([]);
    const [stock, setStock] = useState(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios
            .get("http://localhost:4000/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => console.error("Error fetching products:", error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !price || !category || !description || !imageUrl || stock <= 0) {
            alert("Please complete all the fields");
            return;
        }

        axios
            .post("http://localhost:4000/addproduct", {
                stock,
                name,
                price,
                description,
                category,
                imageUrl,
            })
            .then((response) => {
                alert("Product added successfully");
                setProducts((prevProducts) => [...prevProducts, response.data]);
                clearForm();
            })
            .catch((error) => console.error("Error adding product:", error));
    };

    const clearForm = () => {
        setStock(0);
        setName("");
        setPrice(0);
        setCategory("");
        setDescription("");
        setImageUrl("");
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:4000/deleteproduct/${id}`)
            .then(() => {
                alert("Product deleted successfully");
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            })
            .catch((error) => console.error("Error deleting product:", error));
    };

    const handleEditStock = (id, newStock) => {
        axios
            .put(`http://localhost:4000/editproduct/${id}`, { stock: newStock })
            .then(() => {
                alert("Stock updated successfully");
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === id ? { ...product, stock: newStock } : product
                    )
                );
            })
            .catch((error) => console.error("Error updating stock:", error));
    };

    return (
        <div>
            <nav style={styles.navbar}>
                <h1 style={styles.title}>E-Commerce Application</h1>
            </nav>
            <h1 style={{ textAlign: "center" }}>Add a New Product</h1>
            <form style={style} onSubmit={handleSubmit}>
                <label>
                    Enter Product Name:
                    <br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Enter Product Price:
                    <br />
                    <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </label>
                <br />
                <label>
                    Enter Product Category:
                    <br />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home-kitchen">Home & Kitchen</option>
                        <option value="beauty-care">Beauty & Personal Care</option>
                        <option value="sports-outdoors">Sports & Outdoors</option>
                        <option value="miscellaneous">Miscellaneous</option>
                    </select>
                </label>
                <br />
                <label>
                    Product Description:
                    <br />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        cols="50"
                    />
                </label>
                <br />
                <label>
                    Enter Stock Available:
                    <br />
                    <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
                </label>
                <br />
                <label>
                    Enter Product Image URL:
                    <br />
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>
                <br />
                {imageUrl && (
                    <div>
                        <img
                            src={imageUrl}
                            alt="Product Preview"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                    </div>
                )}
                <br />
                <input type="submit" value="Add Product" />
            </form>

            <h2 style={{ textAlign: "center" }}>Product List</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <input
                                    type="number"
                                    value={product.stock}
                                    onChange={(e) => handleEditStock(product.id, Number(e.target.value))}
                                />
                            </td>
                            <td>
                                <button style={styles.button} onClick={() => handleDelete(product.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "white",
    },
    title: {
        fontSize: "24px",
        margin: 0,
    },
    table: {
        margin: "20px auto",
        borderCollapse: "collapse",
        width: "80%",
        textAlign: "center",
    },
    button: {
        padding: "5px 10px",
        margin: "5px",
        border: "none",
        backgroundColor: "#f44336",
        color: "white",
        cursor: "pointer",
    },
};

export default Addproduct;

import React, { useState, useEffect } from "react";
import axios from "axios";

function Addproduct() {
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editProductId, setEditProductId] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:4000/products") // Fetch products from the backend
      .then((response) => {
        setProducts(response.data); // Set products from the response
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !category || !description || !imageUrl || stock <= 0) {
      alert("Please complete all the fields");
      return;
    }

    // If editing an existing product
    if (editProductId) {
      axios
        .put(`http://localhost:4000/products/${editProductId}`, {
          stock,
          name,
          price,
          description,
          category,
          imageUrl,
        })
        .then((response) => {
          alert("Product updated successfully");
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === editProductId ? response.data : product
            )
          );
          clearForm();
        })
        .catch((error) => console.error("Error updating product:", error));
    } else {
      // If adding a new product
      axios
        .post("http://localhost:4000/addproduct", {
          stock,
          name,
          price,
          description,
          category,
          imageUrl,
        })
        .then((response) => {
          alert("Product added successfully");
          setProducts((prevProducts) => [...prevProducts, response.data]); // Add the new product
          clearForm();
        })
        .catch((error) => console.error("Error adding product:", error));
    }
  };

  const clearForm = () => {
    setStock(0);
    setName("");
    setPrice(0);
    setCategory("");
    setDescription("");
    setImageUrl("");
    setEditProductId(null); // Reset edit ID when form is cleared
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:4000/deleteproduct/${id}`) // Delete product by ID
      .then(() => {
        alert("Product deleted successfully");
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description);
    setStock(product.stock);
    setImageUrl(product.imageUrl);
    setEditProductId(product.id);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add/Edit Product</h1>
      <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
        <br />
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home-kitchen">Home & Kitchen</option>
            <option value="beauty-care">Beauty & Personal Care</option>
            <option value="sports-outdoors">Sports & Outdoors</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Stock:
          <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
        </label>
        <br />
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>
        <br />
        {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: "100px", height: "100px" }} />}
        <br />
        <button type="submit">{editProductId ? "Update Product" : "Add Product"}</button>
      </form>

      <h2 style={{ textAlign: "center" }}>Product List</h2>
      <table border="1" style={{ width: "80%", margin: "auto", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Addproduct;
*/import React, { useState, useEffect } from "react";
import axios from "axios";

function Addproduct() {
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editProductId, setEditProductId] = useState(null);

  // Fetch products on component mount and load from localStorage if available
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts)); // Load products from localStorage if they exist
    } else {
      fetchProducts(); // Otherwise, fetch from backend
    }
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        setProducts(response.data);
        localStorage.setItem("products", JSON.stringify(response.data)); // Save to localStorage
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !category || !description || !imageUrl || stock <= 0) {
      alert("Please complete all the fields");
      return;
    }

    if (editProductId) {
      axios
        .put(`http://localhost:4000/products/${editProductId}`, {
          stock,
          name,
          price,
          description,
          category,
          imageUrl,
        })
        .then((response) => {
          alert("Product updated successfully");
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === editProductId ? response.data : product
            )
          );
          localStorage.setItem("products", JSON.stringify(products)); // Save updated products to localStorage
          clearForm();
        })
        .catch((error) => console.error("Error updating product:", error));
    } else {
      axios
        .post("http://localhost:4000/addproduct", {
          stock,
          name,
          price,
          description,
          category,
          imageUrl,
        })
        .then((response) => {
          alert("Product added successfully");
          setProducts((prevProducts) => [...prevProducts, response.data]);
          localStorage.setItem("products", JSON.stringify([...products, response.data])); // Save to localStorage
          clearForm();
        })
        .catch((error) => console.error("Error adding product:", error));
    }
  };

  const clearForm = () => {
    setStock(0);
    setName("");
    setPrice(0);
    setCategory("");
    setDescription("");
    setImageUrl("");
    setEditProductId(null); // Reset edit ID when form is cleared
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:4000/deleteproduct/${id}`)
      .then(() => {
        alert("Product deleted successfully");
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.filter((product) => product.id !== id);
          localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update localStorage
          return updatedProducts;
        });
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description);
    setStock(product.stock);
    setImageUrl(product.imageUrl);
    setEditProductId(product.id);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add/Edit Product</h1>
      <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
        <br />
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home-kitchen">Home & Kitchen</option>
            <option value="beauty-care">Beauty & Personal Care</option>
            <option value="sports-outdoors">Sports & Outdoors</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Stock:
          <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
        </label>
        <br />
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>
        <br />
        {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: "100px", height: "100px" }} />}
        <br />
        <button type="submit">{editProductId ? "Update Product" : "Add Product"}</button>
      </form>

      <h2 style={{ textAlign: "center" }}>Product List</h2>
      <table border="1" style={{ width: "80%", margin: "auto", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Addproduct;
