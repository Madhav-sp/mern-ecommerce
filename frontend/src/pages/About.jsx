import React from "react";
import { NavLink } from "react-router-dom";
import about_page_pic from "../assets/about_page_pic.jpg";
const About = () => {
  return (
    <div className="px-6 md:px-20 py-12 text-gray-800 mt-[4rem]">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-900">
            About Bead Bracelets
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Crafted with passion, worn with pride — discover the heart behind
            every bead.
          </p>
        </div>

        {/* Image & Story */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-md group">
            <img
              src={about_page_pic}
              alt="About Bead Bracelets"
              className="w-full h-80 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="text-lg leading-relaxed text-gray-700 space-y-4">
            <p>
              At <span className="font-semibold">Bead Bracelets</span>, we
              believe jewelry should be a reflection of your spirit. Our story
              started with a simple goal — to bring elegance and meaning into
              your everyday wear.
            </p>
            <p>
              Each bracelet is a blend of craftsmanship and creativity. From
              natural stones to delicate cords, every detail is handpicked by
              skilled artisans to ensure both beauty and durability.
            </p>
            <p>
              Whether you're looking for a gift, a statement, or a subtle touch
              — we have something that tells your story.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            What We Stand For
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                icon: "🌿",
                title: "Sustainable",
                desc: "Eco-friendly practices & ethically sourced materials.",
              },
              {
                icon: "🛠️",
                title: "Handcrafted",
                desc: "Every piece is handmade with care and precision.",
              },
              {
                icon: "💖",
                title: "Community",
                desc: "A brand built on trust, love, and shared creativity.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center"
              >
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Block */}
        <div className="bg-gradient-to-r from-orange-100 via-white to-orange-50 p-10 rounded-2xl shadow-lg text-center space-y-5 border border-orange-200">
          <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-base">
            From a single bracelet made with love to a global community of style
            enthusiasts — Bead Bracelets is more than just a brand. It's a
            movement. We believe in empowering individuals through meaningful
            accessories that speak louder than words.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            Join the Bead Revolution
          </h2>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            Stay connected with us for style inspiration, new arrivals, and
            exclusive offers.
          </p>
          <NavLink to="/bracelets">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-md transition duration-200">
              Explore Our Collection
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default About;
