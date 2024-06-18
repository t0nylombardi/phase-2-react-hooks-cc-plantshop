import React, { useState } from "react";

/**
 * Renders a card for an individual plant with options to edit, delete, and toggle stock status.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.url - The API URL for plant data.
 * @param {Object} props.plant - The plant object to display.
 * @param {number} props.plant.id - The unique ID of the plant.
 * @param {string} props.plant.name - The name of the plant.
 * @param {string} props.plant.image - The image URL of the plant.
 * @param {number} props.plant.price - The price of the plant.
 * @param {Function} props.updatePlant - Function to update a plant.
 * @param {Function} props.deletePlant - Function to delete a plant.
 * @returns {JSX.Element} The rendered PlantCard component.
 */
function PlantCard({ url, plant, updatePlant, deletePlant }) {
  const { id, name, image, price } = plant;
  const [isInStock, setIsInStock] = useState(true);
  const [newPrice, setNewPrice] = useState(price);

  /**
   * Toggles the stock status of the plant.
   */
  const handleToggleStock = () => {
    setIsInStock((prevStatus) => !prevStatus);
  };

  /**
   * Handles the edit action for the plant, updating the price.
   */
  const handleEdit = () => {
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        updatePlant(updatedPlant);
      })
      .catch((error) => console.error("Error updating plant:", error));
  };

  /**
   * Handles the delete action for the plant.
   */
  const handleDelete = () => {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        deletePlant(id);
      })
      .catch((error) => console.error("Error deleting plant:", error));
  };

  return (
    <>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p className="card-price">
        Price: $
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
      </p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      {isInStock ? (
        <button onClick={handleToggleStock} className="primary">
          In Stock
        </button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
    </>
  );
}

export default PlantCard;
