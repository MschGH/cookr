<script>
    import "./style.css";
    let { children } = $props();
</script>

<nav>
    <h1><a href="/">Cookr</a></h1>
    <ul>
        <li>
            <a href="/recipes">Recipes</a>
        </li>
        <li>
            <a href="/cuisines">Cuisines</a>
        </li>
    </ul>
</nav>

<div class="container mt-3">
    {@render children()}
</div>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: grey;
        color: white;
    }
    ul {
        display: flex;
        margin: 0;
        margin-left: auto;
        list-style: none;
    }
    li {
        margin-right: 1rem;
    }
    a {
        color: white;
        text-decoration: none;
    }
    h1 {
        margin: 0;
        font-size: 2rem;
    }
</style>
