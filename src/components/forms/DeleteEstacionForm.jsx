import { useState } from "react";
import Notifications from "../../utils/Notifications.js";

const DeleteEstacionForm = ({ estacion, onDelete, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Enable the delete button only if the typed value matches the estacion name
    setIsButtonDisabled(value !== estacion.nombre);
  };

  const handleSubmit = () => {
    if (inputValue === estacion.nombre) {
      onDelete(estacion.id);
      onClose();
    } else {
      Notifications.error("Estacion name does not match. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Delete Estacion</h2>
      <p>Are you sure you want to delete the Estacion "{estacion.nombre}"?</p>
      <p>Please type the Estacion name to confirm:</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-2 py-1 mt-2 mb-4"
      />
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="mr-2 bg-gray-200 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className={`${
            isButtonDisabled ? "bg-red-200 cursor-not-allowed" : "bg-red-500"
          } text-white px-4 py-2 rounded`}
          disabled={isButtonDisabled}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteEstacionForm;
