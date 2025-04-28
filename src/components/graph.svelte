<script>
    import { onMount } from "svelte";
  
    let income = 500;
    let rent = 10;
    let oldHousePrice = 500;
    let reformCost = 100;
    let maintainancePerYear = 10;
    let commonFeePerYear = 10;
    let years = 30;
  
    let totalIncome;
    let rentTotal;
    let commonFeeTotal;
    let oldHouseTotal;
    let maintainanceTotal;
    let datasets;
    let chart;
    let ApexCharts;
    let chartDiv;
  
    onMount(async () => {
      const module = await import("apexcharts");
      ApexCharts = module.default;
  
      chart = new ApexCharts(chartDiv, {
        chart: { type: "bar", stacked: true },
        plotOptions: { bar: { horizontal: true } },
        series: [],
        xaxis: { categories: [] },
      });
      chart.render();
    });
  
    // ① 計算
    $: totalIncome = income * years;
    $: rentTotal = rent * 12 * years;
    $: commonFeeTotal = commonFeePerYear * years;
    $: oldHouseTotal = oldHousePrice + reformCost;
    $: maintainanceTotal = maintainancePerYear * years;
  
    // ② datasets作成
    $: datasets = {
      賃貸: {
        家賃合計: rentTotal,
        "共益費・管理費合計": commonFeeTotal,
        残り: totalIncome - (rentTotal + commonFeeTotal),
      },
      空き家: {
        空き家購入費: oldHousePrice,
        リフォーム費: reformCost,
        "維持費・修繕費合計": maintainanceTotal,
        残り: totalIncome - (oldHousePrice + reformCost + maintainanceTotal),
      },
    };
  
    // ③ チャート更新
    $: if (chart && datasets) {
      chart.updateOptions({
        series: [
          { name: "家賃合計", data: [datasets["賃貸"]["家賃合計"], 0] },
          { name: "共益費・管理費合計", data: [datasets["賃貸"]["共益費・管理費合計"], 0] },
          { name: "空き家購入費", data: [0, datasets["空き家"]["空き家購入費"]] },
          { name: "リフォーム費", data: [0, datasets["空き家"]["リフォーム費"]] },
          { name: "維持費・修繕費合計", data: [0, datasets["空き家"]["維持費・修繕費合計"]] },
          { name: "残り", data: [datasets["賃貸"]["残り"], datasets["空き家"]["残り"]] },
        ],
        xaxis: { categories: ["賃貸", "空き家"] },
      });
    }
  </script>
  
  <div class="inputs">
    <label>年収（万円）<input type="number" bind:value={income} /></label>
    <label>家賃（月額・万円）<input type="number" bind:value={rent} /></label>
    <label>空き家購入価格（万円）<input type="number" bind:value={oldHousePrice} /></label>
    <label>リフォーム費（万円）<input type="number" bind:value={reformCost} /></label>
    <label>空き家の年間維持費・修繕費（万円）<input type="number" bind:value={maintainancePerYear} /></label>
    <label>賃貸の年間共益費・管理費（万円）<input type="number" bind:value={commonFeePerYear} /></label>
    <label>住む年数（年）<input type="range" min="1" max="50" bind:value={years} /></label>
    <p>{years} 年</p>
  </div>
  
  <div bind:this={chartDiv} style="width: 100%; height: 400px;"></div>
  
  <div class="result">
    {#if datasets && datasets["空き家"]["残り"] > datasets["賃貸"]["残り"]}
      <p>✅ 空き家を購入した方が {datasets["空き家"]["残り"] - datasets["賃貸"]["残り"]} 万円手元に多く残ります！</p>
    {:else if datasets}
      <p>✅ 賃貸の方が {datasets["賃貸"]["残り"] - datasets["空き家"]["残り"]} 万円手元に多く残ります！</p>
    {/if}
  </div>
  
  <style>
    .inputs {
      display: grid;
      gap: 10px;
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-size: 14px;
    }
    .result {
      margin-top: 20px;
      font-weight: bold;
    }
  </style>
  