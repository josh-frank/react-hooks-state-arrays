import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [ foods, setFoods ] = useState( spicyFoods );
  const [ foodFilter, setFilter ] = useState( "All" );

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArray = [ ...foods, newFood ];
    setFoods( newFoodArray );
  }
  
  function handleFoodClick( foodToUpdateId ) {
    const foodToUpdate = foods.find( food => food.id === foodToUpdateId );
    foodToUpdate.heatLevel++;
    const newFoodArray = foods.filter( food => food.id !== foodToUpdateId );
    setFoods( [ ...newFoodArray, foodToUpdate ] );
  }
  
  function handleFilterClick( filterEvent ) {
    setFilter( filterEvent.target.value );
  }

  const filteredFoods = foods.filter( food => {
    if ( foodFilter === "All" ) {
      return true;
    } else {
      return food.cuisine === foodFilter;
    }
  } );

  const foodList = filteredFoods.map( food =>
    <li key={ food.id } onClick={ () => handleFoodClick( food.id ) }>
      { food.name } | Cuisine: { food.cuisine } | Heat: { food.heatLevel }
    </li>
  );

  return (
    <div>
      <select name="filter" onChange={ handleFilterClick }>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{ foodList }</ul>
      <button onClick={ handleAddFood }>Add New Food</button>
    </div>
  );
}

export default SpicyFoodList;
