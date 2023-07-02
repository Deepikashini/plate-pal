import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const RandomMeal = () => {
    const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchRandomSeafoodMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
        const data = await response.json();
        const randomMealIds = getRandomMealIds(data.meals, 10);
        const randomMeals = await fetchMealsByIds(randomMealIds);
        setMeals(randomMeals);
      } catch (error) {
        console.error('Error fetching random seafood meals:', error);
      }
    };

    fetchRandomSeafoodMeals();
  }, []);

  const getRandomMealIds = (mealArray, count) => {
    const shuffledArray = mealArray.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count).map((meal) => meal.idMeal);
  };

  const fetchMealsByIds = async (mealIds) => {
    const mealPromises = mealIds.map(async (id) => {
      try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        
  
        const response = await fetch(url);
        const data = await response.json();
        console.log('API response: ', data);
        return data.meals[0];
      } catch (error) {
        console.error(`Error fetching meal with ID ${id}:`, error);
        return null;
      }
    });
    return Promise.all(mealPromises);
  };

  return (
    <div>
      <h1>Random Seafood Recipes</h1>
      <div className="meal-cards">
        {meals.map((meal) => (
          <div className="meal-card" key={`${meal.idMeal}-${uuidv4()}`}>
            <h2>{meal.strMeal}</h2>
            <p>Category: {meal.strCategory}</p>
            <p>Area: {meal.strArea}</p>
            <p>Instructions: {meal.strInstructions}</p>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>Ingredients:</p>
            <ul>
              {Object.keys(meal).map((key) => {
                if (key.includes('strIngredient') && meal[key]) {
                  const ingredientIndex = key.slice(-1);
                  const measureKey = `strMeasure${ingredientIndex}`;
                  return (
                    <li key={`${meal.idMeal}-${ingredientIndex}-${uuidv4()}`}>
                      {meal[key]} - {meal[measureKey]}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 

export default RandomMeal;