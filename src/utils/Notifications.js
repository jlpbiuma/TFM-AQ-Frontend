import toast from "react-hot-toast";

const success = (message, backgroundColor, letterColor) =>
  toast(message, {
    duration: 4000,
    position: "top-right",

    // Styling
    style: {
      background: backgroundColor,
      color: letterColor,
      borderRadius: "10px",
    },
    className: "",

    // Custom Icon
    icon: "✅",

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

const error = (message, backgroundColor = "#fff", letterColor = "#f00") =>
  toast(message, {
    duration: 4000,
    position: "top-right",

    // Styling
    style: {
      background: backgroundColor,
      color: letterColor,
    },
    className: "",

    // Custom Icon
    icon: "❌",

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
