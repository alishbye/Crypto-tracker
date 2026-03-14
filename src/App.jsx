import React, { useState, useRef } from "react";
import axios from "axios";
import Section1 from "./components/Section1";
import CoinCard from "./components/CoinCard";




function App() {
  const [searchVisible, setSearchVisible] = useState(false); 
  const [search, setSearch] = useState("");
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState("");

  const [trendingVisible, setTrendingVisible] = useState(false); // NEW
  const [trendingCoins, setTrendingCoins] = useState([]); // NEW
  const trendingRef = useRef(null); // NEW

  const searchRef = useRef(null);

  // Triggered when user clicks "Search Coin" button
  const handleSearchClick = () => {
    setSearchVisible(true); 
    setCoin(null);
    setError("");
    setTrendingVisible(false); // hide trending section

    setTimeout(() => {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCoin(null);

    if (!search) {
      setError("Please enter a coin name!");
      return;
    }

    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${search.toLowerCase()}`
      );

      const coinData = {
        id: res.data.id,
        name: res.data.name,
        symbol: res.data.symbol,
        image: res.data.image.small,
        current_price: res.data.market_data.current_price.usd,
        market_cap: res.data.market_data.market_cap.usd,
        price_change_percentage_24h:
          res.data.market_data.price_change_percentage_24h,
      };
      setCoin(coinData);
    } catch (err) {
      setError("Coin not found or API error!");
    }
  };

  // NEW: Trending Coins handler
  const handleTrendingClick = async () => {
    setTrendingVisible(true);
    setSearchVisible(false);
    setCoin(null);
    setError("");

    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "gecko_desc", // trending according to coingecko
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        }
      );
      setTrendingCoins(res.data);
      setTimeout(() => trendingRef.current.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      setError("Failed to fetch trending coins!");
    }
  };

  return (
    
    <div>
      {/* Hero Section */}
      <Section1
        onSearchClick={handleSearchClick}
        onTrendingClick={handleTrendingClick} // UPDATED
        onTopCoinsClick={() => alert("Top Coins coming soon!")}
      />

      {/* Search Section */}
      {searchVisible && (
        <section
          ref={searchRef}
          className="w-full h-screen bg-[#0D365F]  flex flex-col justify-center items-center py-20 transition-all duration-700"
        >
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-8 text-center">
            Search Cryptocurrency
          </h2>

          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 w-full max-w-xl px-4"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter coin name (e.g. bitcoin)"
              className="border p-3 rounded w-full md:w-72 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-3 rounded hover:bg-gray-500 transition"
            >
              Search
            </button>
          </form>

          {error && <p className="text-red-500 text-center mb-6">{error}</p>}
          {coin && <CoinCard coin={coin} />}
        </section>
      )}

      {/* NEW: Trending Coins Section */}
      {trendingVisible && (
        <section
          ref={trendingRef}
          className="w-full min-h-[80vh] bg-[#0D365F]  flex flex-col justify-center items-center py-20 transition-all duration-700"
        >
          <h2 className="text-3xl md:text-5xl text-blue-200 font-bold mb-8 text-center">
            Trending Coins
          </h2>

          {error && <p className="text-red-500 text-center mb-6">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
            {trendingCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
