import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from "./Category";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const SamplePrevArrow: React.FC<ArrowProps> = ({
  className,
  style,
  onClick,
}) => (
  <div onClick={onClick} className={`arrow ${className}`} style={{ zIndex: 3 }}>
    <AiOutlineArrowLeft
      size={25}
      className="arrows cursor-pointer"
      style={{
        ...style,
        display: "block",
        borderRadius: "50px",
        background: "#f53347",
        color: "white",
        position: "absolute",
        padding: "2px",
        left: "50px",
      }}
    />
  </div>
);

const SampleNextArrow: React.FC<ArrowProps> = ({
  className,
  style,
  onClick,
}) => (
  <div onClick={onClick} className={`arrow ${className}`}>
    <AiOutlineArrowRight
      size={25}
      className="arrows cursor-pointer"
      style={{
        ...style,
        display: "block",
        borderRadius: "50px",
        background: "#f53347",
        color: "white",
        position: "absolute",
        padding: "2px",
        right: "50px",
      }}
    />
  </div>
);

const Carousel: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useData();

  const settings = {
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    pouseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    accessibility: true,
    focusOnSelect: false,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {data?.slice(0, 7).map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
          >
            <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] items-center px-4">
              <div className="space-y-6">
                <h1 className="md:text-4xl text-xl font-bold uppercase text-white w-full md:w-[500px]">
                  {item.title}
                </h1>
                <p className="md:w-[500px] text-gray-400 line-clamp-3">
                  {item.description}
                </p>
                <button
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-all"
                >
                  Shop Now
                </button>
              </div>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="bg-white rounded-full w-[400px] md:w-[550px] shadow-2xl shadow-red-400 cursor-pointer"
                onClick={() => navigate(`/products/${item.id}`)}
              />
            </div>
          </div>
          //====================================================
        ))}
      </Slider>
      <Category />
    </div>
  );
};

export default Carousel;

//==================
// import React from "react";
// import Slider from "react-slick";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import { useData } from "../context/DataContext";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // ১. প্রপস-এর জন্য একটি ইন্টারফেস তৈরি করুন
// interface ArrowProps {
//   className?: string;
//   style?: React.CSSProperties;
//   onClick?: () => void;
// }

// // ২. 'any' সরিয়ে 'ArrowProps' ব্যবহার করুন
// const SamplePrevArrow: React.FC<ArrowProps> = (props) => {
//   const { onClick } = props;
//   return (
//     <div
//       onClick={onClick}
//       className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-red-500 p-3 rounded-full cursor-pointer text-white hover:bg-black transition-all shadow-lg"
//     >
//       <AiOutlineArrowLeft size={25} />
//     </div>
//   );
// };

// const SampleNextArrow: React.FC<ArrowProps> = (props) => {
//   const { onClick } = props;
//   return (
//     <div
//       onClick={onClick}
//       className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-red-500 p-3 rounded-full cursor-pointer text-white hover:bg-black transition-all shadow-lg"
//     >
//       <AiOutlineArrowRight size={25} />
//     </div>
//   );
// };

// const Carousel: React.FC = () => {
//   const navigate = useNavigate();
//   const { data } = useData();

//   const settings = {
//     // dots: true,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     fade: true,
//     pauseOnHover: false,
//   };

//   // if (!data || data.length === 0) {
//   //   return (
//   //     <div className="h-[600px] flex items-center justify-center">
//   //       Loading...
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="relative w-full overflow-hidden">
//       <Slider {...settings} key={data?.length}>
//         {data && data.length > 0 ? (
//           data.slice(0, 7).map((item) => (
//             <div key={item.id}>
//               <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col md:flex-row gap-10 justify-center h-[600px] items-center px-6 md:px-20">
//                 <div className="space-y-6">
//                   <h1 className="md:text-5xl text-2xl font-bold uppercase text-white leading-tight md:w-[600px]">
//                     {item.title}
//                   </h1>
//                   <p className="md:w-[500px] text-gray-300 text-lg line-clamp-3">
//                     {item.description}
//                   </p>
//                   <button
//                     onClick={() => navigate(`/products/${item.id}`)}
//                     className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-red-600 transition-all transform hover:scale-105 shadow-xl"
//                   >
//                     Shop Now
//                   </button>
//                 </div>

//                 <div>
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-[300px] md:w-[450px] h-[300px] md:h-[450px] object-contain rounded-full border-8 border-white/10 shadow-2xl cursor-pointer"
//                     onClick={() => navigate(`/products/${item.id}`)}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           /* ডাটা লোড হওয়ার সময় একটি ডামি স্লাইড বা খালি ডিভ */
//           <div className="h-[600px] bg-slate-900 flex items-center justify-center text-white">
//             Loading...
//           </div>
//         )}
//       </Slider>
//     </div>
//   );
// };

// export default Carousel;
//=========================================
// import React from "react";
// import Slider from "react-slick";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// /* -------------------- Fake Data -------------------- */

// const fakeData = [
//   {
//     id: 1,
//     title: "Test Product One",
//     description: "This is a test description for product one.",
//     image: "https://cdn.viddo.ai/pub/generator/function/3.webp?t=123",
//   },
//   {
//     id: 2,
//     title: "Test Product Two",
//     description: "This is a test description for product two.",
//     image:
//       "https://tse4.mm.bing.net/th/id/OIP.m7raK4voi4b-n0Wd8XMdQQHaEP?w=626&h=358&rs=1&pid=ImgDetMain&o=7&rm=3",
//   },
//   {
//     id: 3,
//     title: "Test Product Three",
//     description: "This is a test description for product three.",
//     image: "https://rare-gallery.com/uploads/posts/522674-fall-mist-leaves.jpg",
//   },
//   {
//     id: 4,
//     title: "Test Product Three",
//     description: "This is a test description for product four.",
//     image:
//       "https://tse2.mm.bing.net/th/id/OIP.lPRnCIGY9ZtZ1y_YgkiHxQHaE8?w=600&h=400&rs=1&pid=ImgDetMain&o=7&rm=3",
//   },
// ];

// /* -------------------- Arrow Components -------------------- */

// interface ArrowProps {
//   onClick?: () => void;
// }

// const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
//   <div
//     onClick={onClick}
//     className="absolute left-5 top-1/2 -translate-y-1/2 z-10
//                bg-red-500 p-2 rounded-full text-white cursor-pointer"
//   >
//     <AiOutlineArrowLeft size={22} />
//   </div>
// );

// const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
//   <div
//     onClick={onClick}
//     className="absolute right-5 top-1/2 -translate-y-1/2 z-10
//                bg-red-500 p-2 rounded-full text-white cursor-pointer"
//   >
//     <AiOutlineArrowRight size={22} />
//   </div>
// );

// /* -------------------- Carousel Component -------------------- */

// const Carousel: React.FC = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     pauseOnHover: false,
//     cssEase: "ease-in-out",
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   };

//   return (
//     <div className="relative overflow-hidden">
//       <Slider {...settings}>
//         {fakeData.map((item) => (
//           <div key={item.id} className="bg-black">
//             <div className="h-[600px] flex flex-col md:flex-row items-center justify-center gap-10 px-4">
//               {/* Text */}
//               <div className="space-y-4 text-center md:text-left">
//                 <h1 className="text-3xl font-bold text-white">{item.title}</h1>
//                 <p className="text-gray-400 max-w-md">{item.description}</p>
//               </div>

//               {/* Image */}
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-[300px] md:w-[500px] rounded-xl shadow-lg"
//               />
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Carousel;
