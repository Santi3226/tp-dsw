import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout Components
import MainLayout from "./components/layouts/MainLayout";

// Public Pages
import Paciente from "./pages/Paciente" 
import Home from "./pages/Home";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProductList from "./pages/ProductList";

// Other components
import Login from "./pages/Login";
import Register from "./pages/Register"
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Context and Hooks
import { AuthProvider } from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/paciente" element={<Paciente allowedRoles={["user","admin"]}/>} />
                <Route path="/turno" element={<Home allowedRoles={["user","admin"]} />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="products" element={<ProtectedRoute allowedRoles={[]}><ProductList /></ProtectedRoute>}/>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
