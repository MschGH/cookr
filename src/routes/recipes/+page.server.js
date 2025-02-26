import db from "$lib/db";

export async function load() {
    return {
        recipes: await db.getRecipes(),
        ingredients: await db.getIngredients()
    }
}