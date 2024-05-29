// Historico.js
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ViewHistorico() {
  // Aquí puedes utilizar los datos para renderizar tablas individuales para cada gráfico
  // Por simplicidad, supongamos que `data` es un objeto con los datos para cada gráfico

  return (
    <div>
       <tbody>hola mundo</tbody> 
      {/* Renderizar tablas para cada gráfico */}
    </div>
  );
}

export default ViewHistorico;





// Historico.js

// import React from "react";

// function Historico({ location }) {
//   const { data } = location.state;

//   // Función para renderizar una tabla de datos
//   const renderTable = (title, chartData) => {
//     return (
//       <div>
//         <h2>{title}</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Fecha</th>
//               <th>Valor</th>
//             </tr>
//           </thead>
//           <tbody>
//             {chartData.map((entry, index) => (
//               <tr key={index}>
//                 <td>{entry.date}</td>
//                 <td>{entry.value}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {/* Renderizar tabla para el gráfico de temperatura */}
//       {data.temperatura && renderTable("Temperatura", data.temperatura)}

//       {/* Renderizar tabla para el gráfico de humedad */}
//       {data.humedad && renderTable("Humedad", data.humedad)}

//       {/* Renderizar tabla para el gráfico de carbono */}
//       {data.carbono && renderTable("Carbono", data.carbono)}
//     </div>
//   );
// }

// export default Historico;