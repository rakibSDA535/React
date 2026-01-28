import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
  brand: string;
}

interface DataContextType {
  data: Product[] | undefined;
  setData: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
  fetchAllProducts: () => Promise<void>;
  categoryOnlyData: string[];
  brandOnlyData: string[];
}

const DataContext = createContext<DataContextType | null>(null);

// ২. মেইন কম্পোনেন্ট (DataProvider)
export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Product[] | undefined>(undefined);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      const productsData = res.data.products || res.data;
      setData(productsData);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  //=======================bring from Category================
  const getUniqueCategory = (
    data: Product[] | undefined,
    property: keyof Product,
  ) => {
    if (!data) return ["All"];

    const newVal = data.map((curElem) => {
      return curElem[property];
    });

    return ["All", ...new Set(newVal)] as string[];
  };
  //==============OR============aita dile filert er string(item) er string sara kaj korbe=========
  // const getUniqueCategory = (
  //   products: Product[] | undefined,
  //   property: keyof Product,
  // ) => {
  //   if (!products) return ["All"];
  //   const newVal = products
  //     .map((curElem) => curElem[property])
  //     .filter((val): val is string => typeof val === "string");
  //   return ["All", ...new Set(newVal)];
  // };

  const categoryOnlyData = getUniqueCategory(data, "category");
  const brandOnlyData = getUniqueCategory(data, "brand");
  //=========================

  // const getUniqueData = (
  //   products: Product[] | undefined,
  //   property: keyof Product,
  // ) => {
  //   if (!products) return ["All"];
  //   const newVal = products.map((curElem) => curElem[property] as string);
  //   return ["All", ...new Set(newVal)];
  // };

  //const categoryOnlyData = getUniqueData(data, "category");
  //const brandOnlyData = getUniqueData(data, "brand");

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        categoryOnlyData,
        brandOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// ৩. কাস্টম হুক
// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
