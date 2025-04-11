import Background from "../../img/Background2.png";

const ViewLanding = () => {
  return (
    <div className="relative h-full">
      <img src={Background} alt="Background" className="h-full" />
      <div className="absolute inset-0 flex items-center flex-col  w-full h-full">
        <span className="w-5/6 p-6 text-gray-800 text-center overflow-auto text-2xl">
          Bienvenido a indicadores de empresas
        </span>
      </div>
    </div>
  );
};

export default ViewLanding;
