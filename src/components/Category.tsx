import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
//import { Product } from "../context/DataContext";

const Category: React.FC = () => {
  const navigate = useNavigate();
  const { categoryOnlyData } = useData();

  // const getUniqueCategory = (
  //   data: Product[] | undefined,
  //   property: keyof Product,
  // ) => {
  //   if (!data) return [];

  //   const newVal = data.map((curElem) => {
  //     return curElem[property];
  //   });

  //   return [...new Set(newVal)] as string[];
  // };

  //const categoryOnlyData = getUniqueCategory(data, "category");

  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
        {categoryOnlyData?.map((item, index) => (
          <div key={index}>
            <button
              className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer hover:opacity-80 transition-all"
              onClick={() => navigate(`/category/${item}`)}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
