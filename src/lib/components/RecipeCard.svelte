<script>
    let { recipe } = $props();
</script>

<div class="container">
    <img src="/images/placeholder.png" alt=""/>
    <div class="text-container">
        <a href="/recipes/{recipe._id}"><h2>{recipe.name}</h2></a>
        <p>{recipe.description}</p>
        <ul>
            {#each recipe.ingredients as ingredient}
                <li>{ingredient.name}</li>
            {/each}
        </ul>
    </div>
</div>
<br />

<style>
    .container {
        width: 42rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        padding: 1rem;
    }

    .container img {
        width: 100%;
        z-index: 0;
        position: relative;
    }

    .text-container {
        position: relative;
        width: 80%;
        padding: 1rem;
        background-color: rgba(255, 255, 255);
        border-radius: 0.5rem;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        text-align: center;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: -5rem;
        margin-bottom: 1rem;
        z-index: 1;
    }

    ul {
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding-left: 1rem;
        list-style-position: inside;
        flex-wrap: wrap;
    }

    a {
        text-decoration: none;
        color: black;
    }
</style>
