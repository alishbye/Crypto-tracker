// src/components/CoinCard.jsx
import React from "react";

function CoinCard({ coin }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-linear-to-b from-gray-400 via-gray-200 to-white hover:shadow-xl transition max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10 mr-3" />
        <h2 className="font-bold text-xl">{coin.name}</h2>
        <span className="ml-auto text-gray-500">{coin.symbol.toUpperCase()}</span>
      </div>
      <p>Price: ${coin.current_price.toLocaleString()}</p>
      <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
      <p
        className={
          coin.price_change_percentage_24h >= 0
            ? "text-green-500 font-bold"
            : "text-red-500 font-bold"
        }
      >
        24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  );
}

export default CoinCard;
