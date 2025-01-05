<script>
    let { recipe } = $props();
</script>

<div class="container">
    <img src="/images/placeholder.png" alt=""/>
    <div class="text-container">
        <a href="/recipes/{recipe._id}"><h4>{recipe.name}</h4></a>
    </div>
</div>
<br />

<style>
    .container {
        width: 24rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        padding: 1rem;
    }

    .container img {
        width: 100%;
    }

    .text-container {
        padding-top: 1rem;
        text-align: center;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
</style>
