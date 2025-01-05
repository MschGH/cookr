import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("cookr"); // select database

//////////////////////////////////////////
// Recipes
//////////////////////////////////////////

// Get all recipes
async function getRecipes() {
  let recipes = [];
  try {
    const collection = db.collection("recipes");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    recipes = await collection.find(query).toArray();
    recipes.forEach((recipe) => {
      recipe._id = recipe._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
  return recipes;
}

// Get recipe by id
async function getRecipe(id) {
  let recipe = null;
  try {
    const collection = db.collection("recipes");
    const query = { _id: new ObjectId(id) }; // filter by id
    recipe = await collection.findOne(query);

    if (!recipe) {
      let error = "No recipe with id " + id;
      console.log(error);
      return { error: error }
    } else {
      recipe._id = recipe._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
  return recipe;
}

// create recipe
async function createRecipe(recipe) {
  try {
    const collection = db.collection("recipes");
    const result = await collection.insertOne(recipe);
    return { createdRecipeId: result.insertedId.toString() }; // convert ObjectId to String
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
}

// update recipe
// returns: id of the updated recipe or null, if recipe could not be updated
async function updateRecipe(recipe) {
  try {
    let id = recipe._id;
    delete recipe._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("recipes");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: recipe });
    if (result.matchedCount === 0) {
      let error = "No recipe with id " + id;
      console.log(error);
      return { error: error };
    } else {
      console.log("Recipe with id " + id + " has been updated.");
      return { recipeId: id };
    }
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
}

// delete recipe by id
// returns: id of the deleted recipe or null, if recipe could not be deleted
async function deleteRecipe(id) {
  try {
    const collection = db.collection("recipes");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      let error = "No recipe with id " + id;
      console.log(error);
      return { error: error };
    } else {
      console.log("Recipe with id " + id + " has been successfully deleted.");
      return { recipeId: id };
    }
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
}

//////////////////////////////////////////
// Ingredients
//////////////////////////////////////////

// Get all ingredients

// TODO: implement

async function getIngredients() {
  let ingredients = [];
  try {
    const collection = db.collection("recipes");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    const pipeline = [
      {
        $unwind: {
          path: "$ingredients"
        }
      },
      {
        $group: {
          _id: "$ingredients.name"
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id"
        }
      }
    ];

    // Get all objects that match the query
    ingredients = await collection.aggregate(pipeline).toArray();
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
  return ingredients;
}

//////////////////////////////////////////
// Cuisines
//////////////////////////////////////////

// Get all cuisines
async function getCuisines() {
  let cuisines = [];
  try {
    const collection = db.collection("cuisines");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    cuisines = await collection.find(query).toArray();
    cuisines.forEach((cuisine) => {
      cuisine._id = cuisine._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
  return { cuisines: cuisines };
}

// update cuisine
// returns: id of the updated cuisine or null, if cuisine could not be updated
async function updateCuisine(cuisine) {
  try {
    let id = cuisine._id;
    delete cuisine._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("cuisines");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: cuisine });
    if (result.matchedCount === 0) {
      let error = "No cuisine with id " + id;
      console.log(error);
      return { error: error };
    } else {
      console.log("Cuisine with id " + id + " has been updated.");
      return { cuisineId: id };
    }
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
}

// export all functions so that they can be used in other files
export default {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getIngredients,
  getCuisines,
  updateCuisine,
};
