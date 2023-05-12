import React, { useState } from "react";
import useFetch from "./hooks/useFetch";

function Home() {
  const { data, isLoading, error } = useFetch("http://localhost:5055/Garages");
  console.log("data:" + data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h1>About Us</h1>
      <p>
        We are a company that specializes in providing high-quality products and
        services to our customers.
      </p>
      <p>
        Our mission is to exceed our customers' expectations and provide them
        with the best possible experience.
      </p>
      <p>Thank you for choosing us as your trusted partner.</p>
      <div>
        {data.map((garage) => (
          <Box key={garage.id} garage={garage} />
        ))}
      </div>
    </div>
  );
}

function Box({ garage }) {
  return <div>{garage.name}</div>;
}

export default Home;
