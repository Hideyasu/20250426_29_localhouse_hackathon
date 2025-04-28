<script lang="ts">
  import { goto } from '$app/navigation';

  const beforeImage = '/before-placeholder.png';
  const afterImage = '/after-placeholder.png';

  const reformCosts = [
    { item: 'キッチン', cost: 500000 },
    { item: '風呂・浴槽', cost: 800000 },
    { item: '外壁塗装・外壁', cost: 1200000 },
    { item: 'リビング', cost: 700000 }
  ];

  const totalCost = reformCosts.reduce((sum, reform) => sum + reform.cost, 0);

  const calculateInvestment = () => {
    goto('/Dashboard');
  };
</script>

<h1>Before/After</h1>
<div class="image-comparison">
  <div class="slider">
    <img src={beforeImage} alt="Before" />
    <img src={afterImage} alt="After" />
  </div>
</div>

<h2>リフォーム代</h2>
<ul>
  {#each reformCosts as reform}
    <li>{reform.item}: ¥{reform.cost.toLocaleString()}</li>
  {/each}
</ul>
<p>合計: ¥{totalCost.toLocaleString()}</p>

<form on:submit|preventDefault={calculateInvestment}>
  <label>
    家賃:
    <input type="number" placeholder="例: 80000" />
  </label>
  <label>
    年収:
    <input type="number" placeholder="例: 5000000" />
  </label>
  <button type="submit">空き家購入の有無による20年後の出資額の違いを調べる</button>
</form>

<style>
  .image-comparison {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
  }
  .slider {
    position: relative;
    overflow: hidden;
  }
  .slider img {
    width: 100%;
    display: block;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 5px 0;
  }
  form {
    margin-top: 20px;
  }
  label {
    display: block;
    margin-bottom: 10px;
  }
</style>