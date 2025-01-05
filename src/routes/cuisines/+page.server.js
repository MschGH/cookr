import db from "$lib/db";

export async function load() {
    let response = await db.getCuisines();
    let success = response.cuisines != null;
    if (success) {
        response.cuisines = response.cuisines.sort((a, b) => a.id - b.id);
    }
    return response;
}

export const actions = {
    update: async ({ request }) => {
        let cuisines = [];
        let errorMessages = [];

        let data = await request.formData();
        let keys = new Set([...data.keys()]);
        let index = 1;
        for (let key of keys) {
            let entries = data.getAll(key);
            let cuisine = {
                _id: entries[0],
                name: entries[1],
                id: index
            }
            cuisines.push(cuisine);
            index++;
        }

        for (let cuisine of cuisines) {
            let response = await db.updateCuisine(cuisine);
            let success = response.cuisineId != null;
            if (!success) {
                errorMessages.push(response.error);
            }
        }
        if (errorMessages.length > 0) {
            return { error: errorMessages };
        }
    }

}