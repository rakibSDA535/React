// import React from "react";

// // প্রপসের জন্য ইন্টারফেস তৈরি করা হলো
// interface FilterSectionProps {
//   search: string;
//   setSearch: (val: string) => void;
//   category: string;
//   setCategory: (val: string) => void;
//   brand: string;
//   setBrand: (val: string) => void;
//   priceRange: number[];
//   setPriceRange: (val: number[]) => void;
//   categoryOnlyData: string[];
//   brandOnlyData: string[];
//   handleCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleBrandChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// }

// const FilterSection: React.FC<FilterSectionProps> = ({
//   search,
//   setSearch,
//   category,
//   setCategory,
//   brand,
//   setBrand,
//   priceRange,
//   setPriceRange,
//   categoryOnlyData,
//   brandOnlyData,
//   handleCategoryChange,
//   handleBrandChange,
// }) => {
//   return (
//     <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-full">
//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search..."
//         className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Category Section */}
//       <h1 className="mt-5 font-semibold text-xl">Category</h1>
//       <div className="flex flex-col gap-2 mt-3">
//         {categoryOnlyData.map((item, index) => (
//           <div key={index} className="flex gap-2 items-center">
//             <input
//               type="checkbox"
//               name="category"
//               id={`cat-${index}`}
//               checked={category === item}
//               value={item}
//               onChange={handleCategoryChange}
//               className="cursor-pointer"
//             />
//             <label
//               htmlFor={`cat-${index}`}
//               className="cursor-pointer uppercase text-sm"
//             >
//               {item}
//             </label>
//           </div>
//         ))}
//       </div>

//       {/* Brand Section */}
//       <div className="mt-5">
//         <h1 className="font-semibold text-xl mb-3">Brand</h1>
//         <select
//           className="bg-white w-full p-2 border-gray-200 border-2 rounded-md form-select"
//           value={brand}
//           onChange={handleBrandChange}
//         >
//           {brandOnlyData.map((item, index) => (
//             <option key={index} value={item}>
//               {item.toUpperCase()}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Price Range Section */}
//       <div className="mt-5">
//         <h1 className="font-semibold text-xl mb-3">Price Range</h1>
//         <div className="flex flex-col gap-2">
//           <label className="text-sm">Max Price: ${priceRange[1]}</label>
//           <input
//             type="range"
//             min="0"
//             max="5000"
//             className="w-full cursor-pointer accent-red-500"
//             value={priceRange[1]}
//             onChange={(e) =>
//               setPriceRange([priceRange[0], Number(e.target.value)])
//             }
//           />
//         </div>
//       </div>

//       {/* Reset Button */}
//       <button
//         className="bg-red-500 hover:bg-red-600 text-white w-full rounded-md px-3 py-2 mt-6 cursor-pointer transition-all"
//         onClick={() => {
//           setSearch("");
//           setCategory("All");
//           setBrand("All");
//           setPriceRange([0, 5000]);
//         }}
//       >
//         Reset Filters
//       </button>
//     </div>
//   );
// };

// export default FilterSection;
//============================================
import React from "react";

//  প্রপসের জন্য ইন্টারফেস তৈরি করা হলো
interface FilterSectionProps {
  search: string;
  setSearch: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  brand: string;
  setBrand: (val: string) => void;
  priceRange: number[];
  setPriceRange: (val: number[]) => void;
  categoryOnlyData: string[];
  brandOnlyData: string[];
  handleCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBrandChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  categoryOnlyData,
  brandOnlyData,
  handleCategoryChange,
  handleBrandChange,
}) => {
  return (
    <div className="bg-gray-200 mt-10 p-4 rounded-md h-max hidden md:block w-1xl">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="bg-white p-1 rounded-md border-gray-500 border-2 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Section */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categoryOnlyData?.map((item, index) => {
          return (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="checkbox"
                name={item}
                value={item}
                checked={category === item}
                id={`cat-${index}`}
                className="cursor-pointer"
                onChange={handleCategoryChange}
              />
              <button className="cursor-pointer uppercase">{item}</button>
            </div>
          );
        })}
      </div>
      {/* Brand Section */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      <select
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md form-select"
        value={brand}
        onChange={handleBrandChange}
      >
        {brandOnlyData.map((item, index) => {
          return (
            <option key={index} value={item}>
              {String(item).toUpperCase()}
            </option>
          );
        })}
      </select>
      {/* Price Range Section */}
      <div className="mt-5">
        <h1 className="font-semibold text-xl mb-3">Price Range</h1>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Max Price: ${priceRange[1]}</label>
          <input
            type="range"
            min="0"
            max="100000"
            className="w-full cursor-pointer accent-red-500"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white w-full rounded-md px-3 py-2 mt-6 cursor-pointer transition-all"
        onClick={() => {
          setSearch("");
          setCategory("All");
          setBrand("All");
          setPriceRange([0, 100000]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
