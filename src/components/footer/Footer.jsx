import UNIR_LOGO from "../../assets/UNIR_Logo.svg";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-gray-800 text-white text-center flex items-center justify-center">
      <img src={UNIR_LOGO} alt="UNIR Logo" className="h-10 mr-4" />
      <span>
        &copy; {new Date().getFullYear()} Máster IoT UNIR - TFM Diseño y
        desarrollo de una plataforma IoT para la monitorización de la calidad
        del aire
      </span>
    </footer>
  );
};

export default Footer;
