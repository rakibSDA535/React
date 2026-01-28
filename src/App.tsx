import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Navber from "./components/Navber";
import axios from "axios";
import Footer from "./components/Footer";

interface LocationAddress {
  county?: string;
  city?: string;
  town?: string;
  village?: string;
  suburb?: string;
  road?: string;
  country?: string;
}

const App: React.FC = () => {
  const [location, setlocation] = useState<LocationAddress | undefined>(
    undefined,
  );
  const [openDropdown, setOpenDropdown] = useState(false);

  const getlocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      try {
        const response = await axios.get(url);
        const exactlocation: LocationAddress = response.data.address;
        setlocation(exactlocation);
        setOpenDropdown(false); // লোকেশন পাওয়ার পর ড্রপডাউন বন্ধ হবে
      } catch (error) {
        console.error("Location Error:", error);
      }
    });
  };

  useEffect(() => {
    getlocation();
  }, []);

  return (
    <BrowserRouter>
      <Navber
        location={location}
        getlocation={getlocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/category/:type" element={<Products />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
