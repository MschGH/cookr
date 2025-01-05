import db from '$lib/db.js';
import { redirect } from "@sveltejs/kit";

export async function load() {
    return {
        ingredients: await db.getIngredients()
    }
}

export const actions = {
    create: async ( {request} ) => {
        let data = await request.formData();
        let ingredients = data.getAll("ingredient").map(ingredient => ({ name: ingredient }));
        let response = await db.createRecipe({
            name: data.get("name"),
            description: data.get("description"),
            ingredients: ingredients
        })
        let createdRecipeId = response.createdRecipeId;
        let success = createdRecipeId != null;
        if (success) {
            redirect(303, "/recipes/" + createdRecipeId);
        }
        return response;
    }
}