<h1 style="text-align: center; font-size: 2.5rem; color: #000000;">空き家</h1>

<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let searchLocation = ""; 
  let minPrice = "";
  let maxPrice = "";

  let houses = [
    { id: 1, name: "空き家A", price: 1200000, location: "東京都", image: "https://www.akisapo.jp/wp-content/uploads/2023/02/image5-1.jpg" },
    { id: 2, name: "空き家B", price: 980000, location: "大阪府", image: "https://example.com/houseB.jpg" },
    { id: 3, name: "空き家C", price: 1500000, location: "福岡県", image: "https://example.com/houseC.jpg" },
  ];

  let filteredHouses = houses;
  let selectedHouses = []; // 選択された空き家を格納する配列

  const filterHouses = () => {
    filteredHouses = houses.filter((house) => {
      const matchesLocation = searchLocation
        ? house.location.includes(searchLocation)
        : true;
      const matchesMinPrice = minPrice ? house.price >= parseInt(minPrice) : true;
      const matchesMaxPrice = maxPrice ? house.price <= parseInt(maxPrice) : true;
      return matchesLocation && matchesMinPrice && matchesMaxPrice;
    });
    console.log("検索結果:", filteredHouses);
  };

  // 資産とリフォーム費用関連
  let assetValue = ""; // 資産の入力値
  let renovationCosts = [
    { name: "キッチン", cost: 500000 },
    { name: "トイレ", cost: 200000 },
    { name: "お風呂・浴槽", cost: 800000 },
    { name: "洗面", cost: 300000 },
    { name: "クロス", cost: 100000 },
    { name: "和室", cost: 400000 },
    { name: "フローリング", cost: 600000 },
    { name: "玄関", cost: 250000 },
    { name: "洋室", cost: 450000 },
    { name: "外壁", cost: 700000 },
    { name: "外溝・エクステリア", cost: 500000 },
    { name: "屋根", cost: 900000 },
    { name: "駐車場・ガレージ", cost: 800000 },
    { name: "ベランダ", cost: 300000 },
    { name: "バルコニー", cost: 350000 },
  ];
  let selectedCosts = [1]; // 選択されたリフォーム費用
  let remainingAsset = 0; // 資産からリフォーム費用を引いた結果

  const calculateRemainingAsset = () => {
    const totalCost = selectedCosts.reduce((sum, cost) => sum + cost, 0);
    remainingAsset = parseInt(assetValue) - totalCost;
    drawChart();
  };

  const toggleCostSelection = (cost :number) => {
    if (selectedCosts.includes(cost)) {
      selectedCosts = selectedCosts.filter((c) => c !== cost);
    } else {
      selectedCosts.push(cost);
    }
  };

  let chart: Chart | null = null; // チャートのインスタンスを保持する変数

  const drawChart = () => {
    const ctx = (document.getElementById("assetChart") as HTMLCanvasElement)?.getContext("2d");
    if (ctx) {
      if (chart) chart.destroy(); // 既存のチャートを破棄
      chart = new Chart(ctx, {
        type: "bar", // 横棒グラフ
        data: {
          labels: ["資産", "リフォーム費用", "残りの資産"],
          datasets: [
            {
              label: "金額 (円)",
              data: [
                parseInt(assetValue) || 0,
                selectedCosts.reduce((sum, cost) => sum + cost, 0),
                remainingAsset > 0 ? remainingAsset : 0,
              ],
              backgroundColor: ["#4CAF50", "#FF5722", "#2196F3"],
              borderColor: ["#388E3C", "#E64A19", "#1976D2"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y", // 横棒グラフにする設定
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    }
  };

  onMount(() => {
    drawChart();
  });
</script>

<!-- 検索フォーム -->
<!-- <div>
  <h2>検索条件</h2>
  <div style="margin-bottom: 10px;">
    <label for="location">所在地:</label>
    <input id="location" type="text" bind:value={searchLocation} placeholder="例: 東京都" />
  </div>
  <div style="margin-bottom: 10px;">
    <label for="minPrice">最低価格:</label>
    <input id="minPrice" type="number" bind:value={minPrice} placeholder="例: 1000000" />
  </div>
  <div style="margin-bottom: 10px;">
    <label for="maxPrice">最高価格:</label>
    <input id="maxPrice" type="number" bind:value={maxPrice} placeholder="例: 2000000" />
  </div>
  <button on:click={filterHouses}>検索</button>
</div> -->

<!-- 検索結果 -->

<!-- <div>
  <h2>検索結果</h2>
  <ul style="list-style: none; padding: 0;">
    {#each filteredHouses as house}
      <li style="margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
        <img src={house.image} alt={house.name} style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;" />
        <div>
          <p><strong>{house.name}</strong></p>
          <p>価格: ¥{house.price.toLocaleString()}</p>
          <p>所在地: {house.location}</p>
        </div>
      </li>
    {/each}
  </ul>
</div> -->
<!-- <div>
  <ul style="list-style: none; padding: 0;">
    {#each filteredHouses as house}
      <li style="margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
-->
        <!-- チェックボックスを追加 -->
        <!-- <input type="checkbox" bind:group={selectedHouses} value={house} />
        <img src={house.image} alt={house.name} style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;" />
        <div>
          <p><strong>{house.name}</strong></p>
          <p>価格: ¥{house.price.toLocaleString()}</p>
          <p>所在地: {house.location}</p>
        </div>
      </li>
    {/each}
  </ul>
</div>  -->

<!-- 資産とリフォーム費用 -->
<div>
  <h2>資産とリフォーム費用</h2>
  <div style="margin-bottom: 10px;">
    <label for="assetValue">資産の金額 (円):</label>
    <input id="assetValue" type="number" bind:value={assetValue} placeholder="例: 5000000" />
  </div>

  <h3>リフォーム内容を選択</h3>
  <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
    {#each renovationCosts as { name, cost }}
      <label>
        <input
          type="checkbox"
          on:change={() => toggleCostSelection(cost)}
        /> {name} (¥{cost.toLocaleString()})
      </label>
    {/each}
  </div>

  <button on:click={calculateRemainingAsset}>計算する</button>
</div>

<div style="display: flex; justify-content: center; margin: 20px 0;">
  <canvas id="assetChart" width="400" height="200"></canvas>
</div>
