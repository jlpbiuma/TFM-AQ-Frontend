import toast from "react-hot-toast";

const success = () =>
  toast("Hello World", {
    duration: 4000,
    position: "top-right",

    // Styling
    style: {
      background: "#333",
      color: "#fff",
    },
    className: "",

    // Custom Icon
    icon: "👏",

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });

const error = () =>
  toast("Error", {
    duration: 4000,
    position: "top-right",

    // Styling
    style: {
      background: "#333",
      color: "#fff",
    },
    className: "",

    // Custom Icon
    icon: "👏",

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });

export default {
  success,
  error,
};
