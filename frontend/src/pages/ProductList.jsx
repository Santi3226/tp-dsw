import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

function ProductList() {
  const { isLoading, isError, error, products } = useProducts();

  if (isLoading) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>Cargando productos...</p>
        <div style={pageStyles.spinner}></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.errorMessage}>Ha ocurrido un error y no se pudieron obtener los productos: {error.message}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>No se encontraron productos.</p>
      </div>
    );
  }

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Nuestros Productos</h1>
      <div style={pageStyles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const pageStyles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "left",
  },
  containerCentered: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  header: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "0.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Diseño responsivo en cuadrícula
    gap: "20px",
    justifyItems: "center",
  },
  message: {
    fontSize: "1.2em",
    color: "#666",
    padding: "50px 0",
  },
  errorMessage: {
    fontSize: "1.2em",
    color: "#e74c3c",
    padding: "50px 0",
  },
  spinner: {
    // Un spinner CSS simple
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderLeftColor: "#007bff",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    margin: "30px auto",
  },
  retryButton: {
    backgroundColor: "#ffc107",
    color: "black",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "1em",
    transition: "background-color 0.2s ease-in-out",
  },
};

export default ProductList;
