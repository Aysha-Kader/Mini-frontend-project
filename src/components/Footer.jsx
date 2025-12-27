import { FaFacebook, FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate=useNavigate();
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* App info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            🍲Flavoriz
          </h2>
          <p className="text-sm text-gray-400">
            Discover, cook, and share delicious recipes from around the world.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          {/* <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer" onClick={navigate("/home")}>Home</li>
            <li className="hover:text-yellow-400 cursor-pointer" onClick={navigate("/recepies")}>Recipes</li>
            <li className="hover:text-yellow-400 cursor-pointer" onClick={navigate("/favourites")}>Favourites</li>
            <li className="hover:text-yellow-400 cursor-pointer" onClick={navigate("/add-recipe")}>Add Recipe</li>
          </ul> */}
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Follow Us
          </h3>
          <div className="flex gap-4 text-xl">
            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-sky-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        <p>
          © {new Date().getFullYear()} Recipe Hub. Made with{" "}
          <FaHeart className="inline text-red-500" /> by You
        </p>
      </div>
    </footer>
  );
};

export default Footer;
