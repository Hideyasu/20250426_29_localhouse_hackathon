<script lang="ts">
  import { onMount } from "svelte";

  let barChart: HTMLCanvasElement;
  let lineChart: HTMLCanvasElement;

  onMount(async () => {
    const module = await import("chart.js/auto");
    const Chart = module.default;

    // 棒グラフ: 空き家購入 vs 家賃
    new Chart(barChart, {
      type: "bar",
      data: {
        labels: ["空き家購入＋リフォーム", "20年間家賃"],
        datasets: [
          {
            label: "出費額 (万円)",
            data: [2000, 1920],
            backgroundColor: ["#4caf50", "#f44336"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });

    // 折れ線グラフ: 成約価格の推移
    new Chart(lineChart, {
      type: "line",
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `${1995 + i}年`),
        datasets: [
          {
            label: "成約価格 (万円)",
            data: Array.from(
              { length: 30 },
              () => Math.floor(Math.random() * 1000) + 1000
            ),
            borderColor: "#2196f3",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
      },
    });
  });
</script>

<h1>Dashboard</h1>
<div>
  <h2>空き家購入 vs 家賃</h2>
  <canvas bind:this={barChart}></canvas>
</div>
<div>
  <h2>成約価格の推移</h2>
  <canvas bind:this={lineChart}></canvas>
</div>

<style>
  canvas {
    max-width: 600px;
    margin: 20px auto;
    display: block;
  }
</style>
