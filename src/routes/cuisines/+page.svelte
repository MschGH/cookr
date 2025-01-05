<script>
    import { flip } from "svelte/animate";
    import { dndzone } from "svelte-dnd-action";

    let { data, form } = $props();
    let allCuisines = data.cuisines;
    let items = $state(allCuisines);

    let error = data.error;

    function hasErrors() {
        return error !== undefined;
    }

    const flipDurationMs = 300;
    function handleDndConsider(e) {
        items = e.detail.items;
    }
    function handleDndFinalize(e) {
        items = e.detail.items;
    }
</script>

<h1 class="mb-4">Arrange the cuisines according to your taste!</h1>

{#if hasErrors()}
    <p class="error">{error}</p>
{:else}
    <section
        style="width: 50%;"
        use:dndzone={{ items, flipDurationMs }}
        onconsider={handleDndConsider}
        onfinalize={handleDndFinalize}
    >
        {#each items as item (item.id)}
            <div
                class="dnd-element mb-2 p-2"
                animate:flip={{ duration: flipDurationMs }}
            >
                {item.id}. {item.name}
            </div>
        {/each}
    </section>
    <br />

    <form method="POST" action="?/update">
        {#each items as cuisine}
            <input type="hidden" name={cuisine.id} value={cuisine._id} />
            <input type="hidden" name={cuisine.id} value={cuisine.name} />
        {/each}
        <button class="btn btn-dark" type="submit">Save order</button>
    </form>
    {#if form?.error}
            <div class="error">
                {#each form.error as error}
                    <div>{error}</div>
                {/each}
            </div>
    {/if}
{/if}

<style>
    .dnd-element {
        width: 50%;
        border: 1px solid black;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        background-color: wheat;
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
