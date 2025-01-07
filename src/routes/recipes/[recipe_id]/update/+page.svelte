<script>
    let { data, form } = $props();
    let recipe = $state(data.recipe);
    let ingredients = $state(data.ingredients.map((ingredient) => ({ ...ingredient, checked: false })));
    let errorMessage = $state("");

    let error = recipe.error;

    function hasErrors() {
        return error !== undefined;
    }

    function isIngredientChecked(ingredient) {
        return recipe.ingredients.some((i) => i.name === ingredient.name);
    }

    function newIngredient() {
        const newIngredientElement = document.querySelector(
            'input[name="new-ing"]'
        );
        const newIngredient = newIngredientElement.value;
        if (newIngredient.trim() === "") {
            return;
        }
        ingredients.push({ name: newIngredient, checked: true });
    }

    function validateForm(event) {
        const checkboxes = document.querySelectorAll(
            'input[name="ingredient"]:checked',
        );
        if (checkboxes.length === 0) {
            event.preventDefault();
            errorMessage = "Please select at least one ingredient.";
        } else {
            errorMessage = "";
        }
    }
</script>

<h1>Edit recipe <i>{recipe.name}</i></h1>
{#if hasErrors()}
    <p class="error">{error}</p>
{:else}
<form method="POST" action="?/update" onsubmit={validateForm}>
    <input type="hidden" name="_id" value={recipe._id} />
    <label for="name">Name*</label><br />
    <input
        type="text"
        id="name"
        name="name"
        value={recipe.name}
        class="form-control"
        required
    /><br />
    <label for="description">Description*</label><br />
    <input
        type="text"
        id="description"
        name="description"
        value={recipe.description}
        class="form-control"
        required
    /><br />
    <label class="mb-1" for="ingredients">Ingredients*</label><br />
    {#if errorMessage}
        <p class="text-danger">{errorMessage}</p>
    {/if}
    <div
        class="d-flex flex-wrap gap-3 col-10 col-sm-12 col-md-12 col-lg-10 col-xl-8"
        style="max-width: 56rem;"
    >
        {#each ingredients as ingredient}
            <div style="width: 10rem; gap:0.5rem;">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id={ingredient.name}
                    value={ingredient.name}
                    name="ingredient"
                    checked={isIngredientChecked(ingredient)}
                />
                <label for={ingredient.name}>{ingredient.name}</label><br />
            </div>
        {/each}
    </div>
    <input style="max-width: 16rem;" type="text" name="new-ing" id="new-ing">
    <button class="btn btn-secondary mt-2" type="button" onclick={newIngredient}
        >add new ingredient</button><br><br />
    <button class="btn btn-success mt-2" type="submit">Save recipe</button>
    <a class="btn btn-dark mt-2" href="/recipes">Cancel</a>
</form>
{/if}

{#if form?.error}
    <p class="error">{form?.error}</p>
{/if}

<style>
    .error {
        background-color: #f8d7da;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        max-width: 50%;
        text-align: center;
        word-wrap: break-word;
        margin: 0 auto;
    }
</style>