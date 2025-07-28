import { BrowserRouter, Routes, Route } from "react-router";
import "./styles/App.css";
import MainLayout from "./components/layouts/MainLayout";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
