import { GiShoppingBag } from "react-icons/gi";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import emptyCart from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

type CartProps = {
  location: any;
  getLocation: () => void;
};

const Cart = ({ location, getLocation }: CartProps) => {
  const cartContext = useCart();

  if (!cartContext) return null; // ✅ safety

  const { cartItem, updateQuantity, deleteItem } = cartContext;
  const { user } = useUser();
  const navigate = useNavigate();

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="mt-10 max-w-6xl mx-auto px-4 md:px-0 mb-5">
      {cartItem.length > 0 ? (
        <>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>

          <div className="mt-10">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 md:p-5 p-3 rounded-md flex items-center justify-between mt-3"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} className="w-20 h-20 rounded-md" />
                  <div>
                    <h1 className="md:w-[300px] line-clamp-2">{item.title}</h1>
                    <p className="text-red-500 font-semibold text-lg">
                      ${item.price}
                    </p>
                  </div>
                </div>

                <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                  <button onClick={() => updateQuantity(item.id, "decrease")}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, "increase")}>
                    +
                  </button>
                </div>

                <FaRegTrashAlt
                  className="text-red-500 text-2xl cursor-pointer"
                  onClick={() => deleteItem(item.id)}
                />
              </div>
            ))}
          </div>

          {/* DELIVERY + BILL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
            {/* Delivery Info */}
            <div className="bg-gray-100 p-6 rounded-md">
              <h1 className="font-bold text-xl mb-3">Delivery Info</h1>

              <input
                className="p-2 w-full rounded mb-2"
                value={user?.fullName ?? ""}
                placeholder="Full Name"
                readOnly
              />

              <input
                className="p-2 w-full rounded mb-2"
                value={location?.county ?? ""}
                placeholder="Address"
              />

              <button
                onClick={getLocation}
                className="bg-red-500 text-white px-4 py-2 rounded w-full mt-3"
              >
                Detect Location
              </button>
            </div>

            {/* Bill */}
            <div className="bg-white shadow-lg p-6 rounded-md h-max">
              <h1 className="font-bold text-xl mb-3">Bill Details</h1>

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <LuNotebookText /> Items
                </span>
                <span>${totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <MdDeliveryDining /> Delivery
                </span>
                <span className="text-red-500">FREE</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <GiShoppingBag /> Handling
                </span>
                <span>$5</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice + 5}</span>
              </div>

              <button className="bg-red-500 text-white w-full py-2 rounded mt-4">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center h-[600px] justify-center">
          <h1 className="text-red-500 text-3xl font-bold">
            Your cart is empty 😢
          </h1>
          <img src={emptyCart} className="w-72" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-4 py-2 rounded mt-3"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
