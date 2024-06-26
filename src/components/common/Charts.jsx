import RechartGraph from "../chart/rechart_example";

const Charts = ({ topics, handleHistoric }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {topics.map((topic) => (
        <div
          key={topic.id_magnitud}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <RechartGraph
            data={topic.data}
            title={topic.descripcion}
            line1Name={topic.magnitud}
          />
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleHistoric(topic.id_magnitud)}
          >
            Ver histórico
          </button>
        </div>
      ))}
    </div>
  );
};

export default Charts;
