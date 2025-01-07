<script>
    import RecipeCard from "../../lib/components/RecipeCard.svelte";
    import RecipeCardCompact from "../../lib/components/RecipeCardCompact.svelte";

    let { data } = $props();
    let recipes = data.recipes;
    let visibleRecipes = $state(recipes);
    let showCompactView = $state(false);
    let showFilter = $state(false);
    let ingredients = $state(
        data.ingredients.map((ingredient) => ({ ...ingredient, checked: false }))
    );
    let error = recipes.error;

    function hasErrors() {
        return error !== undefined;
    }

    function toggleView() {
        showCompactView = !showCompactView;
    }
    function toggleFilter() {
        showFilter = !showFilter;
    }

    function toggleIngredient(ingredient) {
        ingredient.checked = !ingredient.checked;
        filterRecipes();
    }

    function resetFilter() {
        ingredients.forEach((ingredient) => (ingredient.checked = false));
        visibleRecipes = recipes;
    }

    function filterRecipes() {
        visibleRecipes = recipes.filter((recipe) =>
            recipe.ingredients.every(
                (ingredient) =>
                    ingredients.find((i) => i.name === ingredient.name).checked,
            ),
        );
    }
</script>

<h1>Recipes</h1>

<a class="btn btn-primary me-3" href="/recipes/create">Add new recipe</a>
<button class="btn btn-secondary me-2" onclick={toggleView}>Toggle view</button>
<button class="btn btn-secondary" onclick={toggleFilter}>Show filter</button><br
/>

{#if showFilter}
    <div
        class="mt-4 d-flex flex-wrap gap-3 position-fixed col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2"
        style="max-width: 15%; max-height: 70%; overflow: auto;"
    >
        {#each ingredients as ingredient}
            <div style="width: 10rem; gap:0.5rem;">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id={ingredient.name}
                    value={ingredient.name}
                    checked={ingredient.checked}
                    onchange={() => {
                        toggleIngredient(ingredient);
                    }}
                />
                <label for={ingredient.name}>{ingredient.name}</label>
            </div>
        {/each}
        <button class="reset btn btn-dark" onclick={resetFilter}
            >Reset filter</button
        >
    </div>
{/if}

<div class="mt-4">
    {#if hasErrors()}
        <p class="error">{error}</p>
    {:else if showCompactView}
        <div
            class={!showFilter
                ? "d-flex flex-wrap gap-3"
                : "d-flex flex-wrap gap-3 col-8 offset-3"}
        >
            {#each visibleRecipes as recipe}
                <RecipeCardCompact {recipe} />
            {/each}
        </div>
    {:else}
        {#each visibleRecipes as recipe}
            <RecipeCard {recipe} />
        {/each}
    {/if}
</div>

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
