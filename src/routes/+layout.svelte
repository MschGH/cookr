<script>
    import "./style.css";
    let navElements = $state([
        {
            name: "Home",
            link: "/",
            active: false,
        },
        {
            name: "Recipes",
            link: "/recipes",
            active: false,
        },
        {
            name: "Cuisines",
            link: "/cuisines",
            active: false,
        },
    ]);

    let { children } = $props();

    function navClick(navElement) {
        navElements.forEach(element => element.active = false);
        navElement.active = true;
    }
</script>

<nav class="navbar navbar-expand-sm navbar-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="/"
            ><img style="width:2rem;" src="cookr_favicon.png" alt="" /></a
        >
        <a onclick={navClick} class="navbar-brand" href="/">Cookr</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                {#each navElements as navElement}
                <li class="nav-item">
                    <a onclick={() => navClick(navElement)} class={navElement.active ? "nav-link active" : "nav-link"} href="{navElement.link}">{navElement.name}</a>
                </li>
                {/each}
            </ul>
        </div>
    </div>
</nav>

<div class="container mt-3">
    {@render children()}
</div>

<style>
    nav {
        background-color: grey !important;

        a {
            color: black;
            text-decoration: none;
        }
        a:hover {
            color: white;
        }
        .active {
            color: orange !important;
            text-shadow: 2px 2px 4px #000000;
        }
    }
</style>
