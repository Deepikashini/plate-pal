import { configureStore } from "@reduxjs/toolkit";
import mealSlice from "./mealSlice";

const store = configureStore({
    reducer: {
        meals: mealSlice,
    }
});

export default store;