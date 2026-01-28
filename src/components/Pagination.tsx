import React from "react";

interface PaginationProps {
  page: number;
  dynamicPage: number;
  pageHandler: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  dynamicPage,
  pageHandler,
}) => {
  const getPages = (current: number, total: number) => {
    const pages: (number | string)[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, "...", total);
      } else if (current >= total - 2) {
        pages.push(1, "...", total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 my-6">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => pageHandler(page - 1)}
        className={`px-3 py-1 rounded-md text-white transition
          ${
            page === 1
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
      >
        Prev
      </button>

      {/* Pages */}
      {getPages(page, dynamicPage).map((item, index) => (
        <button
          key={index}
          disabled={item === "..."}
          onClick={() => typeof item === "number" && pageHandler(item)}
          className={`w-9 h-9 flex items-center justify-center rounded-full transition
            ${
              item === page
                ? "bg-red-500 text-white font-bold"
                : "bg-white text-gray-700 hover:bg-red-100"
            }
            ${item === "..." ? "cursor-default" : "cursor-pointer"}
          `}
        >
          {item}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={page === dynamicPage}
        onClick={() => pageHandler(page + 1)}
        className={`px-3 py-1 rounded-md text-white transition
          ${
            page === dynamicPage
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
