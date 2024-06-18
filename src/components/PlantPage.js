import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

/**
 * The main component that manages the plants' state and rendering.
 *
 * @component
 * @returns {JSX.Element} The rendered PlantPage component.
 */
function PlantPage() {
  const API_URL = "http://localhost:6001/plants";
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Fetches the list of plants from the API on component mount.
   */
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };
    fetchPlants();
  }, []);

  /**
   * Filters the plants based on the search term.
   *
   * @returns {Array} The filtered list of plants.
   */
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Adds a new plant to the list.
   *
   * @param {Object} newPlant - The new plant object to add.
   */
  const addPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  /**
   * Handles the search input change and updates the search term.
   *
   * @param {Object} event - The input change event.
   */
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Updates the plant information in the state.
   *
   * @param {Object} updatedPlant - The updated plant object.
   */
  const updatePlant = (updatedPlant) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  };

  /**
   * Deletes a plant from the list.
   *
   * @param {number} id - The ID of the plant to delete.
   */
  const deletePlant = (id) => {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
  };

  return (
    <main>
      <NewPlantForm url={API_URL} onAddNewPlant={addPlant} />
      <Search onSearch={handleSearch} />
      <PlantList
        plants={filteredPlants}
        url={API_URL}
        updatePlant={updatePlant}
        deletePlant={deletePlant}
      />
    </main>
  );
}

export default PlantPage;
