<script>
    let { ingredients, choice = [] } = $props();

    function isIngredientChecked(ingredient) {
        return choice.some(i => i.name === ingredient.name);
    }
</script>

{#each ingredients as ingredient}
    <input
        type="checkbox"
        id={ingredient.name}
        value={ingredient.name}
        name="ingredient"
        checked={isIngredientChecked(ingredient)}
    />
    <label for={ingredient.name}>{ingredient.name}</label><br />
{/each}

<style>
</style>
