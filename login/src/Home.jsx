import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);  // State for showing profile
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editableDetails, setEditableDetails] = useState({ ...personalDetails });
  const [isEditing, setIsEditing] = useState(false);  // State for toggling edit mode
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId, productName) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
    alert(`${productName} has been added to the cart.`);
  };

  const getQuantity = (productId) => cart[productId] || 0;

  const calculateTotalCost = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p._id === productId);
      return total + (product ? product.cost * quantity : 0);
    }, 0);
  };

  const handleShowCart = () => setShowCart(!showCart);
  const handleProfileToggle = () => setShowProfile(!showProfile);  // Toggle profile visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    setPersonalDetails({ ...editableDetails });
    setIsEditing(false);
    setSuccessMessage("Profile updated successfully!");
  };

  const handleEditProfile = () => {
    setEditableDetails({ ...personalDetails });
    setIsEditing(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSuccessMessage("");
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>My Shop</div>
        <div style={styles.navOptions}>
          <input
            type="text"
            placeholder="Search for products..."
            style={styles.searchBar}
          />
          <div style={styles.iconGroup}>
            <div
              style={styles.icon}
              title="Profile"
              onClick={handleProfileToggle} // Toggle profile section
            >
              <FaUser />
            </div>
            <div
              style={styles.icon}
              title="Cart"
              onClick={handleShowCart}
            >
              <FaShoppingCart />
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      {showProfile && (
        <div style={styles.profile}>
          <div style={styles.profileHeader}>
            <h3>Personal Details</h3>
            <button
              style={styles.closeButton}
              onClick={handleCloseProfile}
            >
              X
            </button>
          </div>
          {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
          <div style={styles.profileDetails}>
            <div>
              <span>Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editableDetails.name}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              ) : (
                <span>{personalDetails.name}</span>
              )}
            </div>
            <div>
              <span>Email:</span>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editableDetails.email}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              ) : (
                <span>{personalDetails.email}</span>
              )}
            </div>
            <div>
              <span>Phone:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={editableDetails.phone}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              ) : (
                <span>{personalDetails.phone}</span>
              )}
            </div>
            <div>
              <span>Address:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={editableDetails.address}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              ) : (
                <span>{personalDetails.address}</span>
              )}
            </div>
          </div>

          {isEditing ? (
            <button style={styles.saveButton} onClick={handleSaveChanges}>
              Save Changes
            </button>
          ) : (
            <button style={styles.editButton} onClick={handleEditProfile}>
              Edit
            </button>
          )}
        </div>
      )}

      {/* Cart */}
      {showCart && (
        <div style={styles.cart}>
          <div style={styles.cartHeader}>
            <h3>Your Cart</h3>
            <button
              style={styles.closeButton}
              onClick={() => setShowCart(false)}
            >
              X
            </button>
          </div>
          {Object.keys(cart).length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              <ul>
                {Object.entries(cart).map(([productId, quantity]) => {
                  const product = products.find((p) => p._id === productId);
                  return (
                    <li key={productId}>
                      <div>{product.productname}</div>
                      <div>₹{product.cost} x {quantity}</div>
                      <div>₹{product.cost * quantity}</div>
                    </li>
                  );
                })}
              </ul>
              <hr />
              <div>Total: ₹{calculateTotalCost()}</div>
            </div>
          )}
        </div>
      )}

      <Slider {...carouselSettings}>
        <div>
          <img src="https://via.placeholder.com/1200x500" alt="Deal 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/1200x500" alt="Deal 2" />
        </div>
      </Slider>

      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product._id} style={styles.productCard}>
            <div style={styles.productImageContainer}>
              <img
                src={product.imageUrl}
                alt={product.productname}
                style={styles.productImage}
              />
            </div>
            <div style={styles.productDetails}>
              <h3>{product.productname}</h3>
              <p>{product.description}</p>
              <p>₹{product.cost}</p>
              <button style={styles.addButton}onClick={() => handleAddToCart(product._id, product.productname)}>
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



const styles = {
  cartHeader: {
    display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
 },
 closeButton: {
   backgroundColor: "#E11D48",
   color: "#FFFFFF",
   border: "none",
   borderRadius: "5px",
   padding: "0.3rem 0.8rem",
   fontSize: "0.9rem",
   cursor: "pointer",
 },
 container: {
   fontFamily: "'Poppins', sans-serif",
   color: "#333",
   backgroundColor: "#F9F9F9",
   margin: 0,
   padding: 0,
 },
 navbar: {
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
   padding: "1rem 2rem",
   backgroundColor: "#1E293B",
   color: "#F3F4F6",
   position: "sticky",
   top: 0,
   zIndex: 1000,
 },
 logo: {
   fontSize: "1.8rem",
   fontWeight: "bold",
   color: "#E11D48",
   cursor: "pointer",
 },
 navOptions: {
   display: "flex",
   alignItems: "center",
   gap: "1rem",
 },
 searchBar: {
   padding: "0.8rem",
   borderRadius: "8px",
   border: "1px solid #CBD5E1",
   width: "300px",
   outline: "none",
 },
 iconGroup: {
   display: "flex",
   alignItems: "center",
   gap: "1.5rem",
 },
 icon: {
   fontSize: "1.5rem",
   cursor: "pointer",
   color: "#F3F4F6",
 },
 carousel: {
   margin: "1.5rem 0",
   borderRadius: "10px",
   overflow: "hidden",
 },
 carouselImage: {
   width: "100%",
   height: "400px",
   objectFit: "cover",
 },
 productGrid: {
   display: "grid",
   gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
   gap: "2rem",
   padding: "2rem",
 },
 productCard: {
   backgroundColor: "#FFFFFF",
   borderRadius: "12px",
   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
   overflow: "hidden",
   transition: "transform 0.3s, box-shadow 0.3s",
   cursor: "pointer",
 },
 productImageContainer: {
   width: "100%",
   height: "250px",
   backgroundColor: "#F1F5F9",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
 },
 productImage: {
   maxWidth: "90%",
   maxHeight: "90%",
   objectFit: "contain",
 },
 productDetails: {
   padding: "1rem",
   textAlign: "center",
 },
 productTitle: {
   fontSize: "1.2rem",
   fontWeight: "600",
   color: "#111827",
 },
 productDescription: {
   fontSize: "0.9rem",
   color: "#6B7280",
   margin: "0.5rem 0",
 },
 productPrice: {
   fontSize: "1.2rem",
   fontWeight: "700",
   color: "#E11D48",
 },
 addButton: {
   marginTop: "1rem",
   backgroundColor: "#1E293B",
   color: "#FFFFFF",
   border: "none",
   padding: "0.6rem 1rem",
   borderRadius: "8px",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
profile: {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  width: "80%",
  maxWidth: "500px",
  zIndex: 1000,
  boxSizing: "border-box",
},
profileHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
},
closeButton: {
  backgroundColor: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  color: "#888",
},
successMessage: {
  color: "green",
  fontSize: "16px",
  marginBottom: "10px",
},
profileDetails: {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
},
inputField: {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginTop: "5px",
},
editButton: {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "15px",
},
saveButton: {
  padding: "10px 20px",
  backgroundColor: "#2196F3",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "15px",
},
 cartQuantity: {
   marginTop: "0.5rem",
   fontSize: "0.9rem",
   color: "#1E293B",
 },
 loading: {
   fontSize: "1.5rem",
   textAlign: "center",
   padding: "2rem",
 },
 error: {
   fontSize: "1.5rem",
   textAlign: "center",
   padding: "2rem",
   color: "red",
 },
 container: {
   fontFamily: "'Poppins', sans-serif",
   color: "#333",
   backgroundColor: "#F9F9F9",
   margin: 0,
   padding: 0,
 },
 navbar: {
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
   padding: "1rem 2rem",
   backgroundColor: "#1E293B",
   color: "#F3F4F6",
   position: "sticky",
   top: 0,
   zIndex: 1000,
 },
 logo: {
   fontSize: "1.8rem",
   fontWeight: "bold",
   color: "#E11D48",
   cursor: "pointer",
 },
 navOptions: {
   display: "flex",
   alignItems: "center",
   gap: "1rem",
 },
 searchBar: {
   padding: "0.8rem",
   borderRadius: "8px",
   border: "1px solid #CBD5E1",
   width: "300px",
   outline: "none",
 },
 iconGroup: {
   display: "flex",
   alignItems: "center",
   gap: "1.5rem",
 },
 icon: {
   fontSize: "1.5rem",
   cursor: "pointer",
   color: "#F3F4F6",
 },
 cart: {
   position: "fixed",
   top: "4rem",
   right: "2rem",
   backgroundColor: "#FFFFFF",
   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
   borderRadius: "10px",
   width: "300px",
   padding: "1rem",
   zIndex: 1000,
 },
 cartTitle: {
   fontSize: "1.2rem",
   fontWeight: "bold",
   marginBottom: "1rem",
 },
 emptyCart: {
   textAlign: "center",
   color: "#6B7280",
 },
 cartList: {
   listStyle: "none",
   padding: 0,
 },
 cartItem: {
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
   marginBottom: "0.5rem",
   fontSize: "0.9rem",
 },
 cartCost: {
   color: "#6B7280",
   marginLeft: "0.5rem",
 },
 cartItemPrice: {
   fontWeight: "bold",
 },
 cartTotal: {
   display: "flex",
   justifyContent: "space-between",
   fontSize: "1rem",
   fontWeight: "bold",
   marginTop: "1rem",
 },
 divider: {
   margin: "0.5rem 0",
   borderTop: "1px solid #E5E7EB",
 },
 loading: {
   fontSize: "1.5rem",
   textAlign: "center",
   padding: "2rem",
 },
 error: {
   fontSize: "1.5rem",
   textAlign: "center",
   padding: "2rem",
    color: "red",
 },};
export default HomePage;