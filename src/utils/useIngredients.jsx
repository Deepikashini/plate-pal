import { useSelector } from 'react-redux';

export const useIngredients = (id) => {
    const recipe = useSelector((state) => {
        return state.meals.find((meal) => meal.idMeal === id);
    });

    const getIngredients = () => {
        const ingredients = [];
        for (let i=1; i <= 20; i++) {
            const ingredient = recipe[`strIngredients${i}`];
            const measurement = recipe[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== '') {
                ingredient.push({
                    ingredient,
                    measurement
                });
            }
        }
        return ingredients;
    };

    return {
        recipe,
        ingredients: getIngredients(),
        ingredientsLength: getIngredients().length,
    };
};