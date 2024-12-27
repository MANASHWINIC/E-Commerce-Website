import React from 'react';
import { useNavigate } from 'react-router-dom';
function Admin ()  {
    const navigate=useNavigate();
    function addproduct(){
        navigate('/addaproduct');
    }
    return (
        <div>
                <nav style={styles.navbar}>
                    <h1 style={styles.title}>E-Commerce Application</h1>
                </nav>
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Add a Product</h2>
                      <button style={styles.cardButton} onClick={addproduct}>
                                Add Product
                     </button>
                </div>
            </div>
    );
};

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
    card: {
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        width: '200px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: '20px',
        margin: '0 0 10px',
        textAlign: 'center',
    },
    cardButton: {
        padding: '8px 16px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Admin;
