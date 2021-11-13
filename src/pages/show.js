import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Show = (props) => {
  // grab the navigate function
  const navigate = useNavigate();
  // get the params object
  const params = useParams();
  // grab the id from params
  const id = params.id;
  // grab people from props
  const cheeses = props.cheeses;
  // create state for form
  const [editForm, setEditForm] = useState({});
  // useEffect to set state to the existing person, when the data is available
  useEffect(() => {
    if (props.cheeses) {
      const cheese = cheeses.find((p) => p._id === id);
      setEditForm(cheese);
    }
  }, [props.cheeses]);

  if (props.cheeses) {
    // grab the target person from the people array
    const cheese = cheeses.find((p) => p._id === id);

    // handleChange function for form
    const handleChange = (event) => {
      // create a copy of the state
      const newState = { ...editForm };
      // update the newState
      newState[event.target.name] = event.target.value;
      // update the state
      setEditForm(newState);
    };

    // handleSubmit for form
    const handleSubmit = (event) => {
      // prevent the refresh
      event.preventDefault();
      // pass the form data to updatePeople
      props.updateCheeses(editForm, cheese._id);
      // redirect people back to index
      navigate("/");
    };
    const removeCheese = () => {
      props.deleteCheeses(cheese._id);
      navigate("/");
    };
    const form = (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="Country of Origin"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />
        <input type="submit" value="Update Cheese" />
      </form>
    );

    return (
      <div className="cheese">
        <h1>{cheese.name}</h1>
        <h2>{cheese.countryOfOrigin}</h2>
        <img src={cheese.image} alt={cheese.name} />
        {form}
        <button onClick={removeCheese}>DELETE CHEESE</button>
      </div>
    );
  } else {
    return <h1>No Cheese</h1>;
  }
};

export default Show;
