import { Link } from "react-router-dom";
import { privateRoutes } from "../../router/PrivateRoutes";

const Sidebar = () => {
  // Retrieve role value from localStorage
  const roleNumber = parseInt(localStorage.getItem("role"), 0);

  // Filter sidebar options based on role
  const filteredOptions = privateRoutes.filter((option) => {
    if (!option.roles) return true; // If roles are not specified, show the option
    return option.roles <= roleNumber; // Show the option if user's role matches
  });

  return (
    <aside className="w-48 h-full bg-gray-600 text-white">
      <nav className="flex flex-col p-4">
        {filteredOptions.map(
          (option, index) =>
            option.visible && (
              <Link
                key={index}
                to={option.path}
                className="py-2 px-4 hover:bg-gray-700"
              >
                {option.name}
              </Link>
            )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
