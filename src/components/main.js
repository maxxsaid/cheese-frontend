import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/index";
import Show from "../pages/show";
const Main = (props) => {
  // State to hold our list of people
  const [cheeses, setCheeses] = useState(null);
  const URL = "https://ms-cheese-backend.herokuapp.com/cheese/";
  // function to get updated list of people
  const getCheeses = async () => {
    // make the api call
    const response = await fetch(URL);
    // turn the response in an object
    const data = await response.json();
    // set the state to the api data
    setCheeses(data);
  };
  // function that will later be passed data from our new/create form and make the post request to create a new person
  const createCheeses = async (cheese) => {
    // make the post request to our API
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheese),
    });
    // get updated list of people
    getCheeses();
  };

  // function to update a person
  const updateCheeses = async (cheese, id) => {
    // make the put request
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheese),
    });
    // update the list of people
    getCheeses();
  };

  // create function to delete a person
  const deleteCheeses = async (id) => {
    // make the delete request
    await fetch(URL + id, {
      method: "delete",
    });
    // update the list of people
    getCheeses();
  };

  useEffect(() => {
    getCheeses();
  }, []);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<Index cheeses={cheeses} createCheeses={createCheeses} />}
        />
        <Route
          path="/cheeses/:id"
          element={
            <Show
              cheeses={cheeses}
              updateCheeses={updateCheeses}
              deleteCheeses={deleteCheeses}
            />
          }
        />
      </Routes>
    </main>
  );
};

export default Main;
