import UNIR_LOGO from "../../assets/UNIR_Logo.svg";
import FEMEPA_logo2 from "../../assets/Femepa_logo2.png"


const Footer = () => {
  return (
    <footer className="w-full py-4 bg-gray-300 text-black text-center flex items-center justify-center">
      <img src={FEMEPA_logo2} alt="Femepa_logo2" className="h-10 mr-4" />
      <span>
        &copy; {new Date().getFullYear()} INDICADORES AERA DE INNOVACIÓN
      </span>
    </footer>
  );
};

export default Footer;
