import db from '$lib/db.js';

export async function load() {
    return {
        ingredients: await db.getIngredientsCounts()
    }
}