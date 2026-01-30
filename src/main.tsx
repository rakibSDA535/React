import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import "react-toastify/dist/ReactToastify.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <DataProvider>
        <CartProvider>
          <App />

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            pauseOnHover
            theme="light"
          />

          <ScrollToTop
            smooth
            color="white"
            style={{
              backgroundColor: "#fa2d37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </CartProvider>
      </DataProvider>
    </ClerkProvider>
  </StrictMode>,
);
