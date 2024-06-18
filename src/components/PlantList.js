import React from "react";
import PlantCard from "./PlantCard";

/**
 * Renders a list of PlantCard components.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.url - The API URL for plant data.
 * @param {Array} props.plants - The array of plant objects to display.
 * @returns {JSX.Element} The rendered PlantList component.
 */
function PlantList({ url, plants }) {
  // generate a unique key for each plant
  const generateKey = (pre) => {
    return `${pre}_${Math.random().toString(16).slice(2)}}`;
  };
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <li
          key={generateKey("plant")}
          className="card"
          data-testid="plant-item"
        >
          <PlantCard plant={plant} url={url} />
        </li>
      ))}
    </ul>
  );
}

export default PlantList;
