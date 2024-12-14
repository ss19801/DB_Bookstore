import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import CustomerPage from "./pages/CustomerPage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/customer" element={<CustomerPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
