import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import Cart from "./components/Cart.jsx";
import "./styles/app.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route /> */}
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
