<script>
    let { data, form } = $props();
    let recipe = $state(data.recipe);

    let error = recipe.error;

    function hasErrors() {
        return error !== undefined;
    }
</script>

<div class="d-flex mt-4">
    <div>
        <a class="btn btn-secondary" href="/recipes">Back</a>
        <a class="btn btn-primary" href="/recipes/{recipe._id}/update">Edit</a>
        <form method="POST" action="?/delete">
            <input type="hidden" name="_id" value={recipe._id} />
            <button class="btn btn-danger mt-1" type="submit"
                >Delete recipe</button
            >
        </form>
    </div>

    {#if form?.error}
        <p class="error">{form?.error}</p>
    {/if}

    {#if hasErrors()}
        <p class="error">{error}</p>
    {:else}
        <div
            class="container d-flex flex-column gap-1 align-items-center col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8"
        >
            <h1>{recipe.name}</h1>
            <img src="/images/placeholder.png" alt="" />
            <div class="text-container">
                <p>{recipe.description}</p>
                <div class="ingredients-container">
                    <h2>Ingredients</h2>
                    <ul>
                        {#each recipe.ingredients as ingredient}
                            <li>{ingredient.name}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    
    img {
        width: 50%;
    }

    .text-container {
        width: 80%;
        padding: 1rem;
    }

    .ingredients-container {
        border-color: black;
        border-style: solid;
        border-width: 1px;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem 0 1rem;
    }

    ul {
        padding-left: 1rem;
        list-style-position: inside;
    }

    li {
        text-align: left;
    }

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
