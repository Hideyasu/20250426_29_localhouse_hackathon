<script lang="ts">
    import { onMount } from "svelte";
    import ApexCharts from "apexcharts"; // apexchartsをインポート
  
    let priceHistory = [
      { month: '2025-01', price: 500 },
      { month: '2025-02', price: 510 },
      { month: '2025-03', price: 520 },
      { month: '2025-04', price: 530 },
      { month: '2025-05', price: 540 },
    ]; // 仮の成約価格データ
    let activeNow = 120; // 現在のアクティブユーザー
    let lastMonthActive = 100; // 先月のアクティブユーザー
    let popularityNow = 250; // 現在の人気数
    let lastMonthPopularity = 220; // 先月の人気数
  
    let priceChart;
    let activityChart;
    let popularityChart;
  
    onMount(() => {
      // 価格推移のグラフ
      priceChart = new ApexCharts(document.querySelector("#priceChart"), {
        chart: { type: "line" },
        series: [{
          name: "価格",
          data: priceHistory.map(item => item.price),
        }],
        xaxis: {
          categories: priceHistory.map(item => item.month),
        },
      });
      priceChart.render();
  
      // アクティブユーザー数の比較
      activityChart = new ApexCharts(document.querySelector("#activityChart"), {
        chart: { type: "bar" },
        series: [{
          name: "ユーザー数",
          data: [lastMonthActive, activeNow],
        }],
        xaxis: {
          categories: ['先月', '現在'],
        },
      });
      activityChart.render();
  
      // 人気数の比較
      popularityChart = new ApexCharts(document.querySelector("#popularityChart"), {
        chart: { type: "bar" },
        series: [{
          name: "人気数",
          data: [lastMonthPopularity, popularityNow],
        }],
        xaxis: {
          categories: ['先月', '現在'],
        },
      });
      popularityChart.render();
    });
  </script>
  
  <div class="container mx-auto p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      <!-- 価格推移のグラフ -->
      <div class="card bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Value</h2>
        <div id="priceChart" style="width: 100%; height: 100px;"></div>
      </div>
      
      <!-- アクティブユーザー数の比較 -->
      <div class="card bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Active Now</h2>
        <div id="activityChart" style="width: 100%; height: 100px;"></div>
      </div>
  
      <!-- 人気数の比較 -->
      <div class="card bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Popularity</h2>
        <div id="popularityChart" style="width: 100%; height: 100px;"></div>
      </div>
      
    </div>
  </div>
  
  <style>
    .card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  </style>
  