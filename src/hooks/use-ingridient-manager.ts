import { Ingredient } from '@/type/ingredient';
import { SelectedIngredient } from '@/type/selected-ingredient';
import { useState } from 'react';

// Custom hook for managing ingredients
export function useIngredientManager() {
    const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);

    // Function to add an ingredient or increase its amount if already selected
    const addIngredient = (ingredient: Ingredient) => {
        setSelectedIngredients((prevSelected) => {
            const existingIngredient = prevSelected.find(
                (item) => item.ingredient.name === ingredient.name
            );

            if (existingIngredient) {
                // If ingredient is already in the list, increase the amount
                return prevSelected.map((item) =>
                    item.ingredient.name === ingredient.name
                        ? { ...item, amount: item.amount + 1 }
                        : item
                );
            } else {
                // If ingredient is new, add it with an initial amount of 1
                return [...prevSelected, { ingredient, amount: 1 }];
            }
        });
    };

    // Function to decrease the amount of an ingredient or remove it if amount is 0
    const removeIngredient = (ingredient: Ingredient) => {
        setSelectedIngredients((prevSelected) => {
            return prevSelected
                .map((item) =>
                    item.ingredient.name === ingredient.name
                        ? { ...item, amount: Math.max(item.amount - 1, 0) }
                        : item
                )
                .filter((item) => item.amount > 0); // Remove ingredients with amount 0
        });
    };

    // Helper function to calculate totals for nutrients and price
    const calculateTotals = () => {
        return selectedIngredients.reduce(
            (totals, item) => {
                const { water, energy, protein, fat, carbohydrate, fiber, price } = item.ingredient;
                const amount = item.amount;

                return {
                    water: totals.water + water * amount,
                    energy: totals.energy + energy * amount,
                    protein: totals.protein + protein * amount,
                    fat: totals.fat + fat * amount,
                    carbohydrate: totals.carbohydrate + carbohydrate * amount,
                    fiber: totals.fiber + fiber * amount,
                    price: totals.price + price * amount,
                };
            },
            {
                water: 0,
                energy: 0,
                protein: 0,
                fat: 0,
                carbohydrate: 0,
                fiber: 0,
                price: 0,
            }
        );
    };

    const isNutritionSufficient = (minimum: Ingredient): boolean => {
        const totals = calculateTotals();
        return (
            totals.water >= minimum.water &&
            totals.energy >= minimum.energy &&
            totals.protein >= minimum.protein &&
            totals.fat >= minimum.fat &&
            totals.carbohydrate >= minimum.carbohydrate &&
            totals.fiber >= minimum.fiber
        );
    };

    return {
        selectedIngredients,
        addIngredient,
        removeIngredient,
        calculateTotals,
        isNutritionSufficient,
    };
}
