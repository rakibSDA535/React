// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { MapPin } from "lucide-react";
// import { FaCaretDown } from "react-icons/fa";
// import { IoCartOutline } from "react-icons/io5";
// import {
//   SignedOut,
//   SignInButton,
//   SignedIn,
//   UserButton,
// } from "@clerk/clerk-react";
// import { CgClose } from "react-icons/cg";

// //=======================
// const getlocation = () => {
//   if (!navigator.geolocation) {
//     alert("Geolocation not supported");
//     return;
//   }
//   useEffect(() => {
//     getlocation();
//   }, []);

//   navigator.geolocation.getCurrentPosition(
//     async (position) => {
//       const { latitude, longitude } = position.coords;

//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
//       );
//       const data = await res.json();

//       setLocation({
//         county: data.address.county,
//         city: data.address.city,
//         town: data.address.town,
//         village: data.address.village,
//         suburb: data.address.suburb,
//         road: data.address.road,
//         lat: latitude,
//         lon: longitude,
//       });
//     },
//     () => alert("Location permission denied"),
//   );
// };

// //===================

// interface LocationAddress {
//   county?: string;
//   city?: string;
//   town?: string;
//   village?: string;
//   suburb?: string;
//   road?: string;
//   country?: string;
//   lat?: number;
//   lon?: number;
// }

// // NavberProps ইন্টারফেস আপডেট করা হয়েছে
// interface NavberProps {
//   location?: LocationAddress;
//   getlocation: () => void;
//   openDropdown: boolean;
//   setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Navber: React.FC<NavberProps> = ({
//   location,
//   getlocation,
//   openDropdown,
//   setOpenDropdown,
// }) => {
//   const toggleDropdown = () => {
//     setOpenDropdown(!openDropdown);
//   };

//   const cityName =
//     location?.county ||
//     location?.city ||
//     location?.town ||
//     location?.village ||
//     location?.suburb ||
//     location?.country ||
//     location?.lat ||
//     location?.lon ||
//     "Add Address";

//   const googleMapUrl =
//     location?.lat && location?.lon
//       ? `https://www.google.com/maps?q=${location.lat},${location.lon}`
//       : "";

//   return (
//     <div className="bg-white py-1 px-4 sm:px-10 md:px-40 shadow-2xl relative">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         {/* Logo & Location */}
//         <div className="flex gap-5 items-center">
//           <Link to="/">
//             <h1 className="font-bold text-3xl">
//               <span className="text-red-500 font-serif">Malti</span>VECO
//             </h1>
//           </Link>

//           <div
//             onClick={toggleDropdown}
//             className="flex gap-1 cursor-pointer text-gray-700 items-center hover:text-red-500 transition-colors"
//           >
//             <MapPin size={20} className="text-red-500" />
//             <span className="font-semibold">{cityName}</span>
//             <FaCaretDown />
//           </div>

//           {/* Location Dropdown */}
//           {openDropdown && (
//             <div className="w-[300px] shadow-2xl z-50 bg-white absolute top-16 left-40 border p-5 rounded-md">
//               <h1 className="font-semibold mb-3 text-xl flex justify-between items-center">
//                 Your Location
//                 <span
//                   className="cursor-pointer hover:text-red-500"
//                   onClick={toggleDropdown}
//                 >
//                   <CgClose />
//                 </span>
//               </h1>

//               {/* Location Details */}
//               <div className="text-sm text-gray-700 space-y-1 mb-4">
//                 {location?.road && <p>🛣️ Road: {location.road}</p>}
//                 {location?.suburb && <p>🏘️ Suburb: {location.suburb}</p>}
//                 {location?.village && <p>🌾 Village: {location.village}</p>}
//                 {location?.town && <p>🏙️ Town: {location.town}</p>}
//                 {location?.city && <p>🌆 City: {location.city}</p>}
//                 {location?.county && <p>📍 County: {location.county}</p>}
//                 {location?.country && <p>🌆 Country: {location.country}</p>}
//                 {location?.lat && <p>📍 Latetute: {location.lat}</p>}
//               </div>

//               {/* Google Map Button */}
//               {googleMapUrl && (
//                 <a
//                   href={googleMapUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mb-2"
//                 >
//                   📍 View on Google Maps
//                 </a>
//               )}
//               {/* Detect Button */}
//               <button
//                 onClick={getlocation}
//                 className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
//               >
//                 Detect my location
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Menu Items */}
//         <nav className="flex gap-7 items-center">
//           <ul className="hidden lg:flex gap-8 items-center text-lg font-semibold text-gray-800">
//             <li>
//               <Link to="/" className="hover:text-red-500">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/products" className="hover:text-red-500">
//                 Products
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className="hover:text-red-500">
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link to="/contact" className="hover:text-red-500">
//                 Contact
//               </Link>
//             </li>
//           </ul>

//           <Link to="/cart" className="hover:text-red-500 relative">
//             <IoCartOutline className="h-7 w-7" />
//             <span className="bg-blue-500 px-1.5 rounded-full absolute -top-2 -right-2 text-white text-xs">
//               0
//             </span>
//           </Link>

//           <div>
//             <SignedOut>
//               <SignInButton mode="modal">
//                 <button className="bg-red-500 text-white px-4 py-1 rounded-md font-semibold hover:bg-blue-500 transition-all">
//                   Sign In
//                 </button>
//               </SignInButton>
//             </SignedOut>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Navber;
//================
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { CgClose } from "react-icons/cg";

/* ================== TYPES ================== */
interface LocationAddress {
  county?: string;
  city?: string;
  town?: string;
  village?: string;
  suburb?: string;
  road?: string;
  country?: string;
  lat?: number;
  lon?: number;
}

/* ================== COMPONENT ================== */
const Navber: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [location, setLocation] = useState<LocationAddress | null>(null);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  /* ================== GET LOCATION ================== */
  const getlocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        );
        const data = await res.json();

        setLocation({
          county: data.address.county,
          city: data.address.city,
          town: data.address.town,
          village: data.address.village,
          suburb: data.address.suburb,
          road: data.address.road,
          country: data.address.country,
          lat: latitude,
          lon: longitude,
        });
      },
      () => alert("Location permission denied"),
    );
  };

  /* ================== DISPLAY NAME ================== */
  const cityName =
    location?.county ||
    location?.city ||
    location?.town ||
    location?.village ||
    "Add Address";

  /* ================== GOOGLE MAP LINK ================== */
  const googleMapUrl =
    location?.lat && location?.lon
      ? `https://www.google.com/maps?q=${location.lat},${location.lon}`
      : null;

  /* ================== JSX ================== */
  return (
    <div className="bg-white py-2 px-4 sm:px-10 md:px-40 shadow-2xl relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo & Location */}
        <div className="flex gap-5 items-center">
          <Link to="/">
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">Malti</span>VECO
            </h1>
          </Link>

          <div
            onClick={toggleDropdown}
            className="flex gap-1 cursor-pointer text-gray-700 items-center hover:text-red-500 transition"
          >
            <MapPin size={20} className="text-red-500" />
            <span className="font-semibold">{cityName}</span>
            <FaCaretDown />
          </div>

          {/* ========= LOCATION DROPDOWN ========= */}
          {openDropdown && (
            <div className="w-[320px] shadow-2xl z-50 bg-white absolute top-16 left-40 border p-5 rounded-md">
              <h1 className="font-semibold mb-3 text-xl flex justify-between items-center">
                Your Location
                <CgClose
                  className="cursor-pointer hover:text-red-500"
                  onClick={toggleDropdown}
                />
              </h1>

              {/* Address Info */}
              <div className="text-sm text-gray-700 space-y-1 mb-4">
                {location?.road && <p>🛣️ Road: {location.road}</p>}
                {location?.suburb && <p>🏘️ Suburb: {location.suburb}</p>}
                {location?.village && <p>🌾 Village: {location.village}</p>}
                {location?.town && <p>🏙️ Town: {location.town}</p>}
                {location?.city && <p>🌆 City: {location.city}</p>}
                {location?.county && <p>📍 County: {location.county}</p>}
                {location?.country && <p>🌍 Country: {location.country}</p>}
              </div>

              {/* Google Map Button */}
              {googleMapUrl && (
                <a
                  href={googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mb-2"
                >
                  📍 View on Google Maps
                </a>
              )}

              {/* Detect Button */}
              <button
                onClick={getlocation}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              >
                Detect my location
              </button>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex gap-7 items-center">
          <ul className="hidden lg:flex gap-8 items-center text-lg font-semibold text-gray-800">
            <li>
              <Link to="/" className="hover:text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-red-500">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-500">
                Contact
              </Link>
            </li>
          </ul>

          <Link to="/cart" className="relative hover:text-red-500">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-blue-500 px-1.5 rounded-full absolute -top-2 -right-2 text-white text-xs">
              0
            </span>
          </Link>

          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-blue-500 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navber;
