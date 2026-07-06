import { useState } from "react";
import Forsale from "../components/Forsale";
import Rented from "../components/Rented";

const House = () => {
  const [view, setView] = useState("rent");

  return (
    <div
      className="flex flex-col items-center md:text-3xl text-lg p-6 gap-6 min-h-screen"
      style={{
        background:
          "radial-gradient(circle at center, #11192e 10%, #090d16 60%, #05070a 100%)",
      }}
    >
      <h1 className="text-text shadow-[2px_2px_4px_#ff7f50] text-center mt-12">
        We have a variety of houses, offices, apartments you can buy or rent
      </h1>

      <p className="text-white text-sm font-medium italic text-center">
        The buttons below will help you explore both rented houses and buying
        houses
      </p>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-6">
        <button
          onClick={() => setView("rent")}
          className={`px-5 py-3 rounded-2xl text-white cursor-pointer border-0 transition-all duration-500 md:text-lg text-xl shadow-[4px_4px_6px_blue-400] hover:text-text ${
            view === "rent"
              ? "bg-hover scale-105 ring-2 ring-blue-400"
              : "bg-primary hover:bg-hover"
          }`}
        >
          For rent
        </button>

        <button
          onClick={() => setView("sale")}
          className={`px-5 py-3 rounded-2xl text-white cursor-pointer border-0 transition-all duration-500 md:text-lg text-xl shadow-[4px_4px_6px_blue-400] hover:text-text ${
            view === "sale"
              ? "bg-hover scale-105 ring-2 ring-blue-400"
              : "bg-primary hover:bg-hover"
          }`}
        >
          For sale
        </button>
      </div>

      <div className="w-full max-w-6xl mt-4">
        {view === "rent" ? <Rented className="rounded-xl" /> : <Forsale />}
      </div>
    </div>
  );
};

export default House;
