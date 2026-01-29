// import { createContext, useContext, useState } from "react";
// import { toast } from "react-toastify";

// /* ================= TYPES ================= */
// interface CartItem {
//   id: number;
//   title: string;
//   price: number;
//   thumbnail: string;
//   quantity: number;
// }

// interface CartContextType {
//   cartItem: CartItem[];
//   addToCart: (product: Omit<CartItem, "quantity">) => void;
//   updateQuantity: (productId: number, action: "increase" | "decrease") => void;
//   deleteItem: (productId: number) => void;
// }

// /* ================= CONTEXT ================= */
// export const CartContext = createContext<CartContextType | null>(null);

// /* ================= PROVIDER ================= */
// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cartItem, setCartItem] = useState<CartItem[]>([]);

//   /* ===== Add to cart ===== */
//   const addToCart = (product: Omit<CartItem, "quantity">) => {
//     const itemInCart = cartItem.find((item) => item.id === product.id);

//     if (itemInCart) {
//       setCartItem((prev) =>
//         prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item,
//         ),
//       );
//       toast.warn("Product quantity increased!");
//     } else {
//       setCartItem((prev) => [...prev, { ...product, quantity: 1 }]);
//       toast.success("Product added to cart!");
//     }
//   };

//   /* ===== Update quantity ===== */
//   const updateQuantity = (
//     productId: number,
//     action: "increase" | "decrease",
//   ) => {
//     setCartItem(
//       (prev) =>
//         prev
//           .map((item) => {
//             if (item.id === productId) {
//               const newQty =
//                 action === "increase" ? item.quantity + 1 : item.quantity - 1;

//               return newQty > 0 ? { ...item, quantity: newQty } : null;
//             }
//             return item;
//           })
//           .filter(Boolean) as CartItem[],
//     );
//   };

//   /* ===== Delete item ===== */
//   const deleteItem = (productId: number) => {
//     setCartItem((prev) => prev.filter((item) => item.id !== productId));
//     toast.info("Item removed from cart");
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItem, addToCart, updateQuantity, deleteItem }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// /* ================= HOOK ================= */
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within CartProvider");
//   }
//   return context;
// };
