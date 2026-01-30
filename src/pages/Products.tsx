// import React, { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import Loading from "../assets/Loading4.webm";
// import FilterSection from "../components/FilterSection";
// import notfound from "../assets/notfound.json";
// import Lottie from "lottie-react";
// import { FaFilter } from "react-icons/fa6";
// import { useCart } from "../context/CartContext";
// import { useData } from "../context/DataContext";
// import Pagination from "../components/Pagination";

// const Products: React.FC = () => {
//   const { data, fetchAllProducts } = useData();
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [brand, setBrand] = useState("All");
//   const [priceRange, setPriceRange] = useState([0, 100000]);
//   const [page, setPage] = useState(1);
//   const [openFilter, setOpenFilter] = useState(false);
//   const { cartItem } = useCart();

//   const toggleFilter = () => {
//     setOpenFilter(!openFilter);
//   };

//   const handlePaginationBug = () => {
//     if (page > dynamicPage) {
//       setPage(1);
//     }
//   };
//   useEffect(() => {
//     fetchAllProducts();
//     handlePaginationBug();
//     window.scrollTo(0, 0);
//   }, []);

//   const filteredData = data?.filter(
//     (item) =>
//       item.title.toLowerCase().includes(search.toLowerCase()) &&
//       (category === "All" || item.category === category) &&
//       (brand === "All" || item.brand === brand) &&
//       item.price >= priceRange[0] &&
//       item.price <= priceRange[1],
//   );
//   const dynamicPage = Math.ceil(filteredData?.length / 16);
//   const pageHandler = (selectedPage) => {
//     setPage(selectedPage);
//     window.scrollTo(0, 0);
//   };

//   const getUniqueData = (data: any[] | undefined, property: string) => {
//     if (!data) return ["All"];
//     const newVal = data.map((curElem) => curElem[property]);
//     return ["All", ...new Set(newVal)];
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCategory(e.target.value);
//     setPage(1);
//     setOpenFilter(false);
//   };

//   const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setBrand(e.target.value);
//     setPage(1);
//     setOpenFilter(false);
//   };

//   const categoryOnlyData = getUniqueData(data, "category");
//   const brandOnlyData = getUniqueData(data, "brand");
//   return (
//     <div>
//       <div className="max-w-6x1 mx-auto px-4 mb-10">
//         <h1 className="font-semibold text-4xl mt-10">All Products</h1>
//         <div
//           className={`bg-gray-100 flex justify-between items-center md:hidden ${openFilter ? "rounded-t-md" : "rounded-md"} px-4 p-2 mt-5 `}
//         >
//           <h1 className="font-semibold text-xl">Filters</h1>
//           <FaFilter onClick={toggleFilter} />
//         </div>
//         {openFilter ? (
//           <div className="bg-gray-100 p-2 md:hidden">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <h1 className="mt-5 font-semibold text-xl">Category</h1>
//             <div className="flex flex-col gap-2 mt-3">
//               {categoryOnlyData.map((item, index) => {
//                 return (
//                   <div key={index} className="flex gap-2">
//                     <input
//                       type="checkbox"
//                       name={item}
//                       id=""
//                       checked={category === item}
//                       value={item}
//                       onChange={handleCategoryChange}
//                     />
//                     <button className="cursor-pointer uppercase" value={item}>
//                       {item}
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="mt-5">
//               <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
//               <select
//                 name=""
//                 id=""
//                 className="bg-white w-full p-2 border-gray-200 border-2 rounded-md form-select"
//                 value={brand}
//                 onChange={handleBrandChange}
//               >
//                 {brandOnlyData.map((item, index) => {
//                   return (
//                     <option key={index} className="option" value={item}>
//                       {item.toUpperCase()}
//                     </option>
//                   );
//                 })}
//               </select>
//               <div className="mt-5">
//                 <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
//                 <div className="flex flex-col gap-2">
//                   <label>
//                     Price Range: ${priceRange[0]}- ${priceRange[1]}
//                   </label>
//                   <input
//                     type="range"
//                     min="0"
//                     max="5000"
//                     value={priceRange[1]}
//                     onChange={(e) =>
//                       setPriceRange([priceRange[0], Number(e.target.value)])
//                     }
//                   />
//                 </div>
//               </div>
//               <button
//                 className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
//                 onClick={() => {
//                   setSearch("");
//                   setCategory("All");
//                   setBrand("All");
//                   setPriceRange([0, 5000]);
//                   setOpenFilter(false);
//                 }}
//               >
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         ) : (
//           ""
//         )}
//         {data && data?.length > 0 ? (
//           <div className="flex gap-5">
//             <FilterSection
//               cartItem={cartItem}
//               data={data}
//               search={search}
//               setSearch={setSearch}
//               category={category}
//               setCategory={setCategory}
//               brand={brand}
//               setBrand={setBrand}
//               priceRange={priceRange}
//               setPriceRange={setPriceRange}
//               getUniqueData={getUniqueData}
//               categoryOnlyData={categoryOnlyData}
//               brandOnlyData={brandOnlyData}
//               handleCategoryChange={handleCategoryChange}
//               handleBrandChange={handleBrandChange}
//             />
//             <div>
//               {filteredData && filteredData.length > 0 ? (
//                 <div className="flex flex-col justify-center items-center ">
//                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-7 mt-10">
//                     {filteredData
//                       .slice(page * 16 - 16, page * 16)
//                       .map((product, index) => {
//                         return <ProductCard key={index} product={product} />;
//                       })}
//                   </div>
//                   <Pagination
//                     pageHandler={pageHandler}
//                     page={page}
//                     dynamicPage={dynamicPage}
//                   />
//                 </div>
//               ) : (
//                 <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10  ">
//                   <Lottie animationData={notfound} classID="w-[500px]" />
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-[600px]">
//             <video muted autoPlay loop className="w-40">
//               <source src={Loading} type="video/webm" />
//             </video>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;
//=========
import React, { useEffect, useState, ChangeEvent } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../assets/Loading4.webm";
import FilterSection from "../components/FilterSection";
import notfound from "../assets/notfound.json";
import Lottie from "lottie-react";
import { FaFilter } from "react-icons/fa6";
import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";
import Pagination from "../components/Pagination";

const Products: React.FC = () => {
  const { data, fetchAllProducts } = useData();
  const { cartItem } = useCart();

  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [brand, setBrand] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [page, setPage] = useState<number>(1);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  // ডাটা ফিল্টার করার লজিক
  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1],
  );

  // ডায়নামিক পেজ সংখ্যা নির্ধারণ
  const totalItems = filteredData?.length || 0;
  const dynamicPage = Math.ceil(totalItems / 16) || 1;

  // Error 29 ফিক্স: ইফেক্টের বদলে সরাসরি রেন্ডার লজিকে পেজ চেক করা
  const activePage = page > dynamicPage ? 1 : page;

  const pageHandler = (selectedPage: number) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  const getUniqueData = (
    data: any[] | undefined,
    property: string,
  ): string[] => {
    if (!data) return ["All"];
    const newVal = data.map((curElem) => curElem[property]);
    return ["All", ...new Set(newVal)] as string[];
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    setPage(1); // ফিল্টার চেঞ্জ করলে প্রথম পেজে নিয়ে আসা
    setOpenFilter(false);
  };

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const categoryOnlyData = getUniqueData(data, "category");
  const brandOnlyData = getUniqueData(data, "brand");

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <h1 className="font-semibold text-4xl mt-10">All Products</h1>

        {/* Mobile Filter Toggle */}
        <div
          className={`bg-gray-100 flex justify-between items-center md:hidden ${
            openFilter ? "rounded-t-md" : "rounded-md"
          } px-4 p-2 mt-5`}
        >
          <h1 className="font-semibold text-xl">Filters</h1>
          <FaFilter onClick={toggleFilter} className="cursor-pointer" />
        </div>

        {/* Mobile Filter Content */}
        {openFilter && (
          <div className="bg-gray-100 p-4 md:hidden rounded-b-md">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <h1 className="mt-5 font-semibold text-xl">Category</h1>
            <div className="flex flex-col gap-2 mt-3">
              {categoryOnlyData.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={category === item}
                    value={item}
                    onChange={handleCategoryChange}
                  />
                  <span className="uppercase text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <h1 className="font-semibold text-xl mb-3">Brand</h1>
              <select
                className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
                value={brand}
                onChange={handleBrandChange}
              >
                {brandOnlyData.map((item, index) => (
                  <option key={index} value={item}>
                    {item.toUpperCase()}
                  </option>
                ))}
              </select>

              <div className="mt-5">
                <h1 className="font-semibold text-xl mb-3">Price Range</h1>
                <div className="flex flex-col gap-2">
                  <label>Max Price: ${priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                  />
                </div>
              </div>
              <button
                className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 w-full"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setBrand("All");
                  setPriceRange([0, 5000]);
                  setOpenFilter(false);
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {data && data.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-5">
            <FilterSection
              cartItem={cartItem}
              data={data}
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              brand={brand}
              setBrand={setBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              categoryOnlyData={categoryOnlyData}
              brandOnlyData={brandOnlyData}
              handleCategoryChange={handleCategoryChange}
              handleBrandChange={handleBrandChange}
            />

            <div className="flex-1">
              {filteredData && filteredData.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-7 mt-10">
                    {filteredData
                      .slice((activePage - 1) * 16, activePage * 16)
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                  <Pagination
                    pageHandler={pageHandler}
                    page={activePage}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center mt-10 w-full">
                  <Lottie
                    animationData={notfound}
                    className="w-full max-w-md"
                  />
                  <p className="text-xl font-semibold text-gray-500">
                    No products found!
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[600px]">
            <video muted autoPlay loop className="w-40">
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
