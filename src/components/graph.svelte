<script lang="ts">
  import { onMount } from "svelte";

  type Data = {
    name: string;
    data: number[];
  };

  const { data } = $props<{ data: Data[] | null }>();

  let chart = $state<ApexCharts>();
  let chartDiv: HTMLDivElement;

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;

    chart = new ApexCharts(chartDiv, {
      chart: { type: "bar", stacked: true },
      plotOptions: { bar: { horizontal: true } },
      series: [],
    });
    chart.render();
  });

  $effect(() => {
    if (chart && data) {
      chart.updateOptions({
        series: data,
        xaxis: { categories: ["費用"] },
      });
    }
  });
</script>

<div bind:this={chartDiv} style="width: 100%; height: 400px;"></div>
