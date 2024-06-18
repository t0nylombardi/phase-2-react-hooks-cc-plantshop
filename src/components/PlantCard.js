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
 * @returns {JSX.Element} The rendered PlantCard component.
 */
function PlantCard({ url, plant }) {
  const { id, name, image, price } = plant;

  const [isInStock, setIsInStock] = useState(true);

  /**
   * Toggles the stock status of the plant.
   */
  const handleToggleStock = () => {
    setIsInStock((prevStatus) => !prevStatus);
  };

  /**
   * Handles the edit action for the plant, updating the price.
   *
   * @param {Object} event - The click event.
   */
  const handleEdit = (e) => {
    const newPrice = e.target.parentElement.querySelector("input").value;
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        e.target.parentElement.querySelector(
          "input"
        ).textContent = `Price: ${updatedPlant.price}`;
      })
      .catch((error) => console.error("Error updating plant:", error));
  };

  /**
   * Handles the delete action for the plant.
   *
   * @param {Object} event - The click event.
   */
  const handleDelete = (e) => {
    const id = e.target.parentElement.id.split("-")[1];
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => console.log("deleted"))
      .catch((error) => console.error("Error deleting plant:", error));
  };

  return (
    <>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p className="card-price">
        Price: $<input type="number" defaultValue={price} />
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
