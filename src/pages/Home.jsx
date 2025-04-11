import React from "react";
import Background from "../img/Background2.png";

const Home = () => {
  return (
    <div
      className="relative h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 flex justify-center p-4">
        <div className="text-black text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Bienvenido los indicadores del area de innovación
          </h1>
          <p>
            Aqui se muestran los indicadores
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
