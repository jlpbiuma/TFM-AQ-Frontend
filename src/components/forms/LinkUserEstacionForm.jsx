import { useState } from "react";

const LinkUserEstacionForm = ({ id_estacion, onSubmit }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  // Assuming you have user data from API or somewhere else
  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    // Add more users as needed
  ];

  const handleUserSelection = (event) => {
    const userId = parseInt(event.target.value);
    const isSelected = event.target.checked;

    if (isSelected) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleLinkUsers = () => {
    // Implement logic to link selected users to the estacion_id
    console.log("Selected Users:", selectedUsers);
  };

  return (
    <div>
      <h2>Select Users:</h2>
      <form>
        {users.map((user) => (
          <label key={user.id}>
            <input
              type="checkbox"
              value={user.id}
              checked={selectedUsers.includes(user.id)}
              onChange={handleUserSelection}
            />
            {user.name}
          </label>
        ))}
      </form>
      <button onClick={handleLinkUsers}>Link Users</button>
    </div>
  );
};

export default LinkUserEstacionForm;
