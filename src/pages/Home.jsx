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
            Bienvenido a Air Quality
          </h1>
          <p>
            Su solución para la monitorización de la calidad del aire. Nuestra
            plataforma IoT está diseñada para proporcionar datos precisos y en
            tiempo real sobre los niveles de calidad del aire, ayudando a
            comunidades, empresas y gobiernos a tomar decisiones informadas para
            mejorar la salud y el bienestar de las personas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
