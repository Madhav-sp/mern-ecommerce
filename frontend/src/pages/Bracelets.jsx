import axios from "axios";
import { useState, useEffect } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

// Skeleton component
const SkeletonCard = () => (
  <div className="bg-gray-200 rounded-xl animate-pulse aspect-[3/4] w-full" />
);

const Bracelets = () => {
  const navigate = useNavigate();
  const [bracelets, setBracelets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBracelets = async () => {
      try {
        const res = await axiosInstance.get("/product");
        setBracelets(res.data);
        setFiltered(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bracelets:", error);
        setLoading(false);
      }
    };
    fetchBracelets();
  }, []);

  useEffect(() => {
    let result = [...bracelets];

    if (priceFilter === "Below ₹50") {
      result = result.filter((item) => item.price < 50);
    } else if (priceFilter === "₹50 - ₹70") {
      result = result.filter((item) => item.price >= 50 && item.price <= 70);
    } else if (priceFilter === "Above ₹70") {
      result = result.filter((item) => item.price > 70);
    }

    if (materialFilter && materialFilter !== "Material") {
      result = result.filter((item) =>
        item.material?.toLowerCase().includes(materialFilter.toLowerCase())
      );
    }

    if (sort === "Newest") {
      result = result.reverse();
    } else if (sort === "Price: Low to High") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sort === "Price: High to Low") {
      result = result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  }, [bracelets, sort, priceFilter, materialFilter]);

  const clearFilters = () => {
    setSort("");
    setPriceFilter("");
    setMaterialFilter("");
    setFiltered(bracelets);
  };

  return (
    <div className="px-6 md:px-20 py-10 mt-[4rem]">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Discover Our Charming Bracelets ✨
      </h1>

      {/* Layout: Sidebar (desktop) + Grid */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          <div className="sticky top-[6rem] bg-white p-5 rounded-xl shadow border border-gray-200 space-y-4">
            <h2 className="text-lg font-semibold mb-2">Filters</h2>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="">Sort by</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPriceFilter(e.target.value)}
              value={priceFilter}
            >
              <option value="">Price</option>
              <option>Below ₹50</option>
              <option>₹50 - ₹70</option>
              <option>Above ₹70</option>
            </select>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setMaterialFilter(e.target.value)}
              value={materialFilter}
            >
              <option value="">Material</option>
              <option>Gold</option>
              <option>Silver</option>
              <option>Beads</option>
            </select>

            {(sort || priceFilter || materialFilter) && (
              <button
                className="w-full mt-2 bg-red-100 text-red-700 font-semibold py-2 rounded-lg hover:bg-red-200 transition"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/bracelets/${item._id}`)}
                >
                  <div className="relative aspect-[3/4] w-full group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full px-3 py-2 text-white transition-all duration-300">
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                        <h3 className="text-sm font-medium truncate">
                          {item.name}
                        </h3>
                        <p className="flex items-center text-xs mt-1">
                          <MdOutlineCurrencyRupee className="mr-1 text-sm" />
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Admin Controls */}
                  {user?.isAdmin && (
                    <div className="p-3 flex justify-end gap-3 text-gray-500 text-lg">
                      <button
                        className="hover:text-blue-600"
                        title="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/edit/${item._id}`);
                        }}
                      >
                        <FaRegEdit size={18} />
                      </button>
                      <button
                        className="hover:text-red-600"
                        title="Delete"
                        onClick={async (e) => {
                          e.stopPropagation();
                          await axiosInstance.delete("/product/delete", {
                            data: {
                              id: item._id,
                            },
                          });
                          toast.success(
                            "after deletion do reload the website once!"
                          );
                        }}
                      >
                        <MdDeleteOutline size={21} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Bracelets;
