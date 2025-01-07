<script>
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';

    Chart.register(...registerables);

    let { data } = $props();
    let ingredients = $state(data.ingredients);

    let chart;

    onMount(() => {
        const ctx = document.getElementById('ingredientsChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ingredients.map(ingredient => ingredient.name),
                datasets: [{
                    label: 'Count',
                    data: ingredients.map(ingredient => ingredient.count),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
</script>

<h1>Most popular ingredients</h1>
<canvas id="ingredientsChart" width="400" height="200"></canvas>