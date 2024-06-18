import React from "react";
import PlantCard from "./PlantCard";

/**
 * Renders a list of PlantCard components.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.url - The API URL for plant data.
 * @param {Array} props.plants - The array of plant objects to display.
 * @param {Function} props.updatePlant - Function to update a plant.
 * @param {Function} props.deletePlant - Function to delete a plant.
 * @returns {JSX.Element} The rendered PlantList component.
 */
function PlantList({ url, plants, updatePlant, deletePlant }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <li key={plant.id} className="card" data-testid="plant-item">
          <PlantCard
            plant={plant}
            url={url}
            updatePlant={updatePlant}
            deletePlant={deletePlant}
          />
        </li>
      ))}
    </ul>
  );
}

export default PlantList;
