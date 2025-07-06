import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import HOMO_LOGO from "../assets/HOMO_LOGO.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/product")
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const featured = products.filter((p) => p.brand === "Featured");
  const newArrivals = products.slice(0, 4);

  return (
    <div className="text-gray-800 px-6 md:px-20 py-10 space-y-16 mt-[4rem]">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
        <img
          src={HOMO_LOGO}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start px-6 sm:px-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Elevate Your Style with Bead Bracelets
          </h1>
          <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
            Discover our curated collection of bracelets, designed to complement
            every occasion and personality. Find the perfect piece to express
            yourself.
          </p>
          <NavLink
            to="/bracelets"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition duration-200 group"
          >
            <span className="mr-2">🛍️</span>
            Explore Now
            <span className="ml-2 transform transition-transform group-hover:translate-x-1">
              ➔
            </span>
          </NavLink>
        </div>
      </div>

      {/* Featured Bracelets Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Bracelets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-gray-600 col-span-full">
              Loading featured products...
            </p>
          ) : featured.length > 0 ? (
            featured.map((item) => (
              <NavLink to="/bracelets" key={item._id}>
                <div className="relative w-full h-72 rounded-xl overflow-hidden group shadow-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white px-4 py-3">
                    <h3 className="text-lg font-semibold truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm opacity-80 truncate">
                      {item.description.slice(0, 80)}...
                    </p>
                  </div>
                </div>
              </NavLink>
            ))
          ) : (
            <p className="text-gray-600 col-span-full">
              No featured products found.
            </p>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-gray-600 col-span-full">
              Loading new arrivals...
            </p>
          ) : newArrivals.length > 0 ? (
            newArrivals.map((item) => (
              <NavLink to="/bracelets" key={item._id}>
                <div className="relative w-full h-52 rounded-xl overflow-hidden group shadow-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white px-4 py-3">
                    <h3 className="text-lg font-semibold truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm opacity-80 truncate">
                      {item.description.slice(0, 80)}...
                    </p>
                  </div>
                </div>
              </NavLink>
            ))
          ) : (
            <p className="text-gray-600 col-span-full">
              No new arrivals found.
            </p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-3xl text-center mx-auto">
        <h2 className="text-4xl font-semibold mb-3">About Bead Bracelets</h2>
        <p className="text-gray-700 leading-relaxed">
          At Bead Bracelets, we believe that a bracelet is more than just an
          accessory. It’s a reflection of your personality and style. Our
          mission is to provide high-quality, beautifully designed bracelets
          that empower you to express yourself with confidence. Each piece is
          crafted with care and attention to detail, ensuring both style and
          durability.
        </p>
      </section>

      {/* Subscribe Section */}
      <section className="text-center bg-white py-12">
        <h3 className="text-4xl font-bold mb-2">Join Our Community</h3>
        <p className="text-gray-600 mb-4">
          Stay updated on the latest trends, exclusive offers, and new arrivals.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md transition">
          Subscribe
        </button>
      </section>
    </div>
  );
};

export default Home;
