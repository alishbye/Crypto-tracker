import React from "react";
import LottieLogo from "./Lottielogo";  


function Section1({ onTrendingClick, onSearchClick, onConvertClick }) {
  return (
    <section className="w-full h-screen bg-[#0D365F] flex flex-col justify-center items-center text-center">
      <LottieLogo />
      <h1 className="text-4xl text-white md:text-5xl font-extrabold mb-4">
        Track CryptoCurrency prices<br></br>in real-time
      </h1>
      <p className="text-lg md:text-xl text-white font-bold mb-4">
        Stay updated with live cryptocurrency prices, market cap, and trends.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={onTrendingClick}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition"
        >
          Discover Trending Coins
        </button>
        <button
          onClick={onSearchClick}
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition"
        >
          Search Coin
        </button>
     
      </div>
    </section>
  );
}

export default Section1;
