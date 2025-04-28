<script lang="ts">
  import Search from "$lib/components/search.svelte";
  import Map from "../components/map.svelte";
</script>

<div class="text-7xl font-bold text-shadow">
  <span class="text-blue-800">A</span>
  <span class="text-black">K</span>
  <span class="text-blue-800">I</span>
  <span class="text-black">Y</span>
  <span class="text-blue-800">A</span>
  <span> </span>
  <span class="text-black">S</span>
  <span class="text-blue-800">I</span>
  <span class="text-black">M</span>
  <span class="text-black">U</span>
  <span class="text-black">L</span>
  <span class="text-blue-800">A</span>
  <span class="text-black">T</span>
  <span class="text-blue-800">I</span>
  <span class="text-black">O</span>
  <span class="text-black">N</span>
</div>

<div class="grid">
  <div class="border-box">
    <div class="text-6xl font-bold text-shadow">
      <span class="text-blue-800">S</span>
      <span class="text-black">E</span>
      <span class="text-blue-800">A</span>
      <span class="text-black">R</span>
      <span class="text-blue-800">C</span>
      <span class="text-black">H</span>
    </div>
    <Search />
  </div>

  <div class="border-box">
    <h2>Reform</h2>
    <div style="display: flex; justify-content: center; margin: 20px 0;">
      <canvas id="assetChart" width="400" height="200"></canvas>
    </div>
    <div class="text-5xl font-bold">Before/After</div>
  </div>

  <div class="bg-green-500">
    <h2>Map</h2>
    <Map />
  </div>

  <div class="bg-yellow-500">
    <h2>Dashboard</h2>
  </div>
</div>

<style>
  /* 全体のスタイル */
  body {
    font-family: "Arial", sans-serif;
    background-color: #f4f4f9;
    margin: 0;
    padding: 0;
  }

  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .border-box {
    border: 2px solid #ddd; /* 枠線の色を薄く */
    border-radius: 12px; /* 角を丸く */
    padding: 20px;
    margin: 20px;
    background-color: #fff; /* 白背景 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 柔らかい影 */
  }

  .selectbox-3 {
    display: inline-flex;
    align-items: center;
    position: relative;
    width: 100%;
  }

  .selectbox-3 select {
    appearance: none;
    width: 100%;
    height: 2.8em;
    padding: 0.4em 1em;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    color: #333;
    font-size: 1em;
    cursor: pointer;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .textbox-1 {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1em;
    background-color: #f9f9f9;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .textbox-1-label {
    display: block;
    margin-bottom: 5px;
    font-size: 0.9em;
    color: #555;
  }

  button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 1em;
    color: #372e2e;
    background-color: #4caf50;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #45a049;
  }

  h2 {
    font-size: 1.5em;
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
  }

  .grid > div {
    padding: 20px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .bg-green-500 {
    background-color: #e8f5e9;
  }

  .bg-yellow-500 {
    background-color: #fffde7;
  }
  .text-6xl {
    font-size: 35px; /* 文字サイズを小さく調整 */
  }
</style>
