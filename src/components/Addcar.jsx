import { getGaragesByUserID } from "../services/GarageService";
import {createCar} from "../services/CarService";
import React, { useEffect } from "react";


const Addcar = () => {
  const [car, setCar] = useEffect({
    name: '',
    description: '',
    manufacturer: '',
    model: '',
    year: '',
    seats: '',
    engine: '',
    garage: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleGarageSelect = (e) => {
    const selectedGarage = e.target.value;
    setCar((prevData) => ({
      ...prevData,
      garage: selectedGarage
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the createCar function from AddCarService and pass carData as an argument
    createCar.createCar(car)
      .then((response) => {
        // Handle success response
        console.log('Car added successfully:', response);
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding car:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Add Car</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={car.name} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={car.description} onChange={handleInputChange}></textarea>
      </div>
      <div>
        <label htmlFor="manufacturer">Manufacturer:</label>
        <input type="text" id="manufacturer" name="manufacturer" value={car.manufacturer} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" name="model" value={car.model} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input type="text" id="year" name="year" value={car.year} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="seats">Seats:</label>
        <input type="text" id="seats" name="seats" value={car.seats} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="engine">Engine:</label>
        <input type="text" id="engine" name="engine" value={car.engine} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="garage">Garage:</label>
        <select id="garage" name="garage" value={getGaragesByUserID.garage} onChange={handleGarageSelect}>
          <option value="">Select a Garage</option>
        </select>
      </div>
      <button type="submit">Add Car</button>
    </form>
  );
};

export default Addcar;
