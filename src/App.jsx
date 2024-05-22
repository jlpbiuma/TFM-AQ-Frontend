// src/App.js
import "./App.css";
import { Router } from "./router/router.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <header className="w-full py-2 bg-gray-800 text-white text-center font-mono">
        Plataforma IoT
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <Router />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
// hola