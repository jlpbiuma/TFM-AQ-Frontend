import Background from "../../img/Background2.png";

const ViewLanding = () => {
  return (
    <div className="relative h-full">
      <img src={Background} alt="Background" className="h-full" />
      <div className="absolute inset-0 flex items-center flex-col  w-full h-full">
        <span className="w-5/6 p-6 text-gray-800 text-center overflow-auto text-2xl">
          Bienvenido a Air Quality, su solución para la monitorización de la
          calidad del aire. Nuestra plataforma IoT está diseñada para
          proporcionar datos precisos y en tiempo real sobre los niveles de
          calidad del aire, ayudando a comunidades, empresas y gobiernos a tomar
          decisiones informadas para mejorar la salud y el bienestar de las
          personas.
        </span>
      </div>
    </div>
  );
};

export default ViewLanding;
