import React, { useState } from "react";
import axios from "axios";
import { useCartStore } from "../stores/useCartStore.js"; // adjust if needed

const AISuggestions = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState("");
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const addToCart = useCartStore((state) => state.addToCart); // adjust if needed

    const handleSuggest = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuggestions("");
        setProductList([]);
        try {
            const res = await axios.post("/api/ai/suggest", { query });
            setSuggestions(res.data.suggestions);
            setProductList(res.data.products || []);
        } catch (err) {
            setSuggestions("⚠️ Could not fetch suggestions. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-xl shadow-lg text-white w-full max-w-2xl mx-auto my-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                💡 AI Product Suggestions
            </h2>
            <form onSubmit={handleSuggest} className="flex gap-2">
                <input
                    className="flex-1 px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-300"
                    type="text"
                    placeholder="Describe what you need..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                />
                <button
                    className={`px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Thinking..." : "Suggest"}
                </button>
            </form>
            {suggestions && (
                <div className="mt-4 bg-white text-black p-4 rounded-lg shadow-inner space-y-2">
                    <h3 className="font-bold mb-2">🔍 Suggestions & AI Reasoning:</h3>

                    {/* Reasoning block (full AI response) inside a collapsible */}
                    <details className="bg-gray-100 p-2 rounded cursor-pointer">
                        <summary className="font-semibold">Why these products?</summary>
                        <pre className="text-sm whitespace-pre-wrap mt-2">{suggestions}</pre>
                    </details>

                    {/* Extracted Points (optional, if suggestions contain numbered list) */}
                    <div className="mt-2">
                        <h4 className="font-semibold">Suggested Products:</h4>
                        <ul className="list-disc list-inside">
                            {productList.map((product) => (
                                <li key={product._id} className="hover:text-emerald-500">
                                    {product.name} — <span className="text-gray-600 text-sm">{product.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}


            {productList.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {productList.map((product) => (
                        <div
                            key={product._id}
                            className="relative bg-white text-black rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
                        >
                            <img
                                src={product.image || "https://via.placeholder.com/150"}
                                alt={product.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{product.name}</h3>
                            </div>
                            <button
                                onClick={() => addToCart(product)}
                                className="absolute bottom-2 right-2 bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600 transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default AISuggestions;
