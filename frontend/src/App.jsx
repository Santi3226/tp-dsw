import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout Components
import MainLayout from "./components/layouts/MainLayout";

// Public Pages
import Paciente from "./pages/Paciente" 
import Home from "./pages/Home";
import Turno from "./pages/Turno";
import Laboratorio from "./pages/Laboratorio";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; 
import TurnoAdmin from "./pages/TurnoAdmin";
import CentroAdmin from "./pages/CentroAdmin";
import PacienteAdmin from "./pages/PacienteAdmin";
import PoliticaAdmin from "./pages/PoliticaAdmin";

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
                
                <Route path="/paciente/:tab" element={
                  <ProtectedRoute>
                      <Paciente allowedRoles={["user","admin"]}/>
                  </ProtectedRoute>
                }></Route>

                <Route path="/turno/:tab" element={
                  <ProtectedRoute>
                      <Turno allowedRoles={["user","admin"]}/>
                  </ProtectedRoute>
                }></Route>

                <Route path="/laboratorio/:tab" element={<Laboratorio />} />

              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="turno" element={<TurnoAdmin />} />
                <Route path="paciente" element={<PacienteAdmin />} />
                <Route path="centro" element={<CentroAdmin />} />
                <Route path="politica" element={<PoliticaAdmin />} />
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
