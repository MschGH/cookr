import db from '$lib/db.js';
import { redirect } from "@sveltejs/kit";

export async function load( {params}) {
    return {
        recipe: await db.getRecipe(params.recipe_id),
        ingredients: await db.getIngredients()
    }
}

export const actions = {
    update: async ( {request} ) => {
        let data = await request.formData();
        let ingredients = data.getAll("ingredient").map(ingredient => ({ name: ingredient }));
        let response = await db.updateRecipe({
            _id: data.get("_id"),
            name: data.get("name"),
            description: data.get("description"),
            ingredients: ingredients
        })
        let recipeId = response.recipeId;
        let success = recipeId != null;
        if (success) {
            redirect(303, "/recipes/" + recipeId);
        }
        return response;
    }
}