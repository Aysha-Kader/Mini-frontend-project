import { FaStar, FaUtensils } from "react-icons/fa";


const ChefSection = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 max-w-6xl mx-auto mt-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          👨‍🍳
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Meet Our <span className="text-yellow-500">Chef</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Passionate creators behind every delicious recipe
        </p>
      </div>

      {/* Chef Card */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Chef Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
            alt="Chef"
            className="w-72 h-72 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Chef Info */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Chef Jacob 👩‍🍳
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6">
            With a love for global cuisines and homemade flavors, our chef
            focuses on simple ingredients, authentic taste, and healthy
            cooking. Every recipe is carefully crafted and tested before
            reaching your kitchen.
          </p>

          {/* Status */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-yellow-50 rounded-xl p-4">
              <FaUtensils className="mx-auto text-yellow-500 mb-1" />
              <p className="text-xl font-bold text-gray-800">250+</p>
              <p className="text-sm text-gray-500">Recipes</p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4">
              <FaStar className="mx-auto text-yellow-500 mb-1" />
              <p className="text-xl font-bold text-gray-800">4.8</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4">
              👨‍🍳
              <p className="text-xl font-bold text-gray-800">8+</p>
              <p className="text-sm text-gray-500">Years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefSection;
