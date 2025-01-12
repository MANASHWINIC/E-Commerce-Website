/*import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSearch, FaUser, FaShoppingCart, FaSignInAlt} from "react-icons/fa"; // Importing icons

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    nextArrow: <div style={styles.arrow}>➡️</div>, // Custom next arrow
    prevArrow: <div style={styles.arrow}>⬅️</div>, // Custom previous arrow
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>Shopping Website</div>
        <div style={styles.navOptions}>
          <input
            type="text"
            placeholder="Search for products..."
            style={styles.searchBar}
          />
          
          <div style={styles.iconGroup}>
            <FaUser style={styles.icon} title="Profile" />
            <a href="/" style={styles.iconLink}>
              <FaShoppingCart style={styles.icon} title="Cart" />
            </a>
            <a href="/login" style={styles.loginButton}>Login</a>
          </div>
        </div>
      </nav>

      <Slider {...carouselSettings} style={styles.carousel}>
        <div>
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20230705/pngtree-3d-rendered-e-commerce-illustration-image_3811627.jpg"
            alt="Deal 1"
            style={styles.carouselImage}
          />
        </div>
        <div>
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20230705/pngtree-3d-rendered-e-commerce-illustration-image_3811627.jpg"
            alt="Deal 2"
            style={styles.carouselImage}
          />
        </div>
        <div>
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20230705/pngtree-3d-rendered-e-commerce-illustration-image_3811627.jpg"
            alt="Deal 3"
            style={styles.carouselImage}
          />
        </div>
      </Slider>

      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product._id} style={styles.productCard}>
            <img
              src={product.imageUrl}
              alt={product.productname}
              style={styles.productImage}
            />
            <div style={styles.productDetails}>
              <h3 style={styles.productTitle}>{product.productname}</h3>
              <p style={styles.productDescription}>{product.description}</p>
              <p style={styles.productPrice}>₹{product.cost}</p>
              <button >Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    color: "#222",
    margin: 0,
    padding: 0,
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#2C3E50",
    color: "#FDFEFE",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#E74C3C",
    cursor: "pointer",
  },
  navOptions: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  searchBar: {
    padding: "0.6rem",
    borderRadius: "8px",
    border: "1px solid #BDC3C7",
    width: "250px",
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
    color: "#FDFEFE",
  },
  iconLink: {
    color: "#FDFEFE",
    textDecoration: "none",
  },
  loginButton: {
    color: "#FDFEFE",
    textDecoration: "none",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#E74C3C",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  carousel: {
    marginTop: "1.5rem",
    marginBottom: "2rem",
    width: "100%",
  },
  carouselImage: {
    width: "100%",
    height: "500px", // Adjusted height for bigger carousel images
    objectFit: "cover",
    borderRadius: "10px",
  },
  arrow: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    fontSize: "2.5rem", // Larger size for arrows
    borderRadius: "50%",
    padding: "1rem",
    position: "absolute",
    top: "50%",
    zIndex: "10",
    cursor: "pointer",
    transform: "translateY(-50%)",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
    padding: "2rem",
  },
  productCard: {
    backgroundColor: "#FDFEFE",
    borderRadius: "8px",
    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    textAlign: "center",
  },
  productImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  productDetails: {
    padding: "1rem",
  },
  productTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    margin: "0.5rem 0",
  },
  productDescription: {
    color: "#555",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  productPrice: {
    fontSize: "1.1rem",
    color: "#E74C3C",
    fontWeight: "700",
  },
};

export default HomePage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      {/* Navbar 
      <nav style={styles.navbar}>
        <div style={styles.logo}>My Shop</div>
        <div style={styles.navOptions}>
          <input
            type="text"
            placeholder="Search for products..."
            style={styles.searchBar}
          />
          <div style={styles.iconGroup}>
            <FaUser style={styles.icon} title="Profile" />
            <FaShoppingCart style={styles.icon} title="Cart" />
          </div>
        </div>
      </nav>

      <Slider {...carouselSettings} style={styles.carousel}>
        <div>
          <img
            src="https://via.placeholder.com/1200x500"
            alt="Deal 1"
            style={styles.carouselImage}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/1200x500"
            alt="Deal 2"
            style={styles.carouselImage}
          />
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
              <h3 style={styles.productTitle}>{product.productname}</h3>
              <p style={styles.productDescription}>{product.description}</p>
              <p style={styles.productPrice}>₹{product.cost}</p>
              <p>Free Delivery</p>
              <button style={styles.addButton}>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
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
  productCardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
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
  addButtonHover: {
    backgroundColor: "#4B5563",
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
};

export default HomePage;
*/
import React, { useEffect, useState } from "react";
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

  const handleAddToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const getQuantity = (productId) => cart[productId] || 0;

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
            <FaUser style={styles.icon} title="Profile" />
            <FaShoppingCart style={styles.icon} title="Cart" />
          </div>
        </div>
      </nav>

      {/* Carousel */}
      <Slider {...carouselSettings} style={styles.carousel}>
        <div>
          <img
            src="https://via.placeholder.com/1200x500"
            alt="Deal 1"
            style={styles.carouselImage}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/1200x500"
            alt="Deal 2"
            style={styles.carouselImage}
          />
        </div>
      </Slider>

      {/* Product Grid */}
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
              <h3 style={styles.productTitle}>{product.productname}</h3>
              <p style={styles.productDescription}>{product.description}</p>
              <p style={styles.productPrice}>₹{product.cost}</p>
              <p>Free Delivery</p>
              <button
                style={styles.addButton}
                onClick={() => handleAddToCart(product._id)}
              >
                Add To Cart
              </button>
              {getQuantity(product._id) > 0 && (
                <p style={styles.cartQuantity}>
                  Quantity: {getQuantity(product._id)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
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
};

export default HomePage;
