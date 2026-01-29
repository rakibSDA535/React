import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrums from "../components/Breadcrums";
import Loading from "../assets/Loading4.webm";

/* ================= TYPES ================= */
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  category: string;
  thumbnail: string;
}

/* ================= COMPONENT ================= */
const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);

  const { id } = useParams();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setSingleProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (!singleProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <video muted autoPlay loop>
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  const originalPrice = Math.round(
    singleProduct.price +
      (singleProduct.price * singleProduct.discountPercentage) / 100,
  );

  return (
    <div className="px-4 md:px-0 pb-4">
      <Breadcrums title={singleProduct.title} />

      <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          <img
            src={singleProduct.thumbnail}
            alt={singleProduct.title}
            className="rounded-2xl w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <h1 className="md:text-3xl text-xl font-bold text-gray-800">
            {singleProduct.title}
          </h1>

          <div className="text-gray-700">
            {singleProduct.brand.toUpperCase()} /{" "}
            {singleProduct.category.toUpperCase()}
          </div>

          <p className="text-xl text-red-500 font-bold">
            ${singleProduct.price}{" "}
            <span className="line-through text-gray-700">${originalPrice}</span>{" "}
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              {singleProduct.discountPercentage}% OFF
            </span>
          </p>

          <p className="text-gray-600">{singleProduct.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Quantity:
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border rounded-lg px-3 py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
