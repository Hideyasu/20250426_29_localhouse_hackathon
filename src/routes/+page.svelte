<h1 style="text-align: center; font-size: 2.5rem; color: #4CAF50;">空き家の値段と推移</h1>
<p style="text-align: center; font-size: 1.2rem; color: #555;">以下は空き家の価格とその推移を示しています。</p>

<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import type { TooltipItem } from 'chart.js';

  let houses = [
    { id: 1, name: '空き家A', price: 1200000, trend: '+5%', location: '東京都', size: '80㎡', builtYear: 1995 },
    { id: 2, name: '空き家B', price: 980000, trend: '-2%', location: '大阪府', size: '60㎡', builtYear: 1988 },
    { id: 3, name: '空き家C', price: 1500000, trend: '+8%', location: '福岡県', size: '100㎡', builtYear: 2005 }
  ];

  let filteredHouses = houses;
  let searchLocation = '';
  let minPrice = '';
  let maxPrice = '';

  function filterHouses() {
    filteredHouses = houses.filter(house => {
      const matchesLocation = searchLocation ? house.location.includes(searchLocation) : true;
      const matchesMinPrice = minPrice ? house.price >= parseInt(minPrice) : true;
      const matchesMaxPrice = maxPrice ? house.price <= parseInt(maxPrice) : true;
      return matchesLocation && matchesMinPrice && matchesMaxPrice;
    });
  }

  let chart;

  onMount(() => {
    const ctx = (document.getElementById('priceChart') as HTMLCanvasElement)?.getContext('2d');
    if (ctx) {
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: houses.map(house => house.name),
          datasets: [{
            label: '価格 (円)',
            data: houses.map(house => house.price),
            backgroundColor: ['#4CAF50', '#FF5722', '#2196F3'],
            borderColor: ['#388E3C', '#E64A19', '#1976D2'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context: TooltipItem<"bar">) {
                  const rawValue = context.raw as number;
                  return `¥${rawValue.toLocaleString()}`;
                }
              }
            }
          }
        }
      });
    }
  });
</script>

<div style="margin: 20px auto; width: 80%; text-align: center;">
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
  <button on:click={filterHouses} style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">検索</button>
<div style="margin: 20px auto; width: 80%; text-align: center;">
  <h2>リフォーム内容を選択</h2>
  <div style="margin-bottom: 10px;">
    <label for="reformOptions">リフォーム内容:</label>
    <select id="reformOptions" style="padding: 10px; width: 100%;">
      <option value="exterior">外壁塗装</option>
      <option value="roof">屋根修理</option>
      <option value="plumbing">水回りリフォーム</option>
      <option value="flooring">床張り替え</option>
      <option value="insulation">断熱工事</option>
    </select>
  </div>
  <button style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">選択を確定</button>
</div>
</div>

<div style="display: flex; justify-content: center; margin: 20px 0;">
  <canvas id="priceChart" width="400" height="200"></canvas>
</div>

<table style="width: 80%; margin: 0 auto; border-collapse: collapse; text-align: center;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th style="padding: 10px; border: 1px solid #ddd;">名前</th>
      <th style="padding: 10px; border: 1px solid #ddd;">価格 (円)</th>
      <th style="padding: 10px; border: 1px solid #ddd;">推移</th>
      <th style="padding: 10px; border: 1px solid #ddd;">所在地</th>
      <th style="padding: 10px; border: 1px solid #ddd;">広さ</th>
      <th style="padding: 10px; border: 1px solid #ddd;">築年</th>
    </tr>
  </thead>
  <tbody>
    {#each filteredHouses as house}
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">{house.name}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">{house.price.toLocaleString()}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">{house.trend}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">{house.location}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">{house.size}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">{house.builtYear}</td>
      </tr>
    {/each}
  </tbody>
</table>
