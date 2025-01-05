import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export async function load( {params}) {
    return {
        recipe: await db.getRecipe(params.recipe_id)
    }
}

export const actions = {
    delete: async ( {request} ) => {
        let data = await request.formData();
        let recipe_id = data.get("_id");
        let response = await db.deleteRecipe(recipe_id);
        let recipeId = response.recipeId;
        let success = recipeId != null;
        if (success) {
            redirect(303, "/recipes");
        }
        return response;
    }
}