function ProductCard({ product }) {
  return (
    <div style={cardStyles.card}>
      <img src={product.imageUrl || 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt={product.name} style={cardStyles.image} />
      <h3 style={cardStyles.title}>{product.name}</h3>
      <p style={cardStyles.description}>{product.description}</p>
      <div style={cardStyles.price}>${product.price ? product.price.toFixed(2) : 'N/A'}</div>
      <button style={cardStyles.button}>Ver Detalles</button>
    </div>
  );
}

// Estilos básicos para la tarjeta, deberia pasarlos a un CSS
const cardStyles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '15px',
    width: '250px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '15px',
    textAlign: 'center',
    flexGrow: 1, 
  },
  price: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.2s ease-in-out',
  },
  cardHover: {
    transform: 'translateY(-5px)',
  }
};

export default ProductCard;