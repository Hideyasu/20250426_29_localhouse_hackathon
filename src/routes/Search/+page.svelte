<script>
  import { goto } from '$app/navigation';

  let selectedPrefecture = '大阪';
  let propertyType = '';
  let city = '';
  let price = '';
  let layout = '';
  let age = '';

  const search = () => {
    goto('/Map');
  };
</script>

<h1>Search</h1>
<form on:submit|preventDefault={search}>
  <label>
    都道府県:
    <select bind:value={selectedPrefecture}>
      <option value="大阪">大阪</option>
    </select>
  </label>
  <label>
    物件種別:
    <input type="text" bind:value={propertyType} />
  </label>
  <label>
    市区町村:
    <input type="text" bind:value={city} />
  </label>
  <label>
    価格:
    <input type="text" bind:value={price} />
  </label>
  <label>
    間取り:
    <input type="text" bind:value={layout} />
  </label>
  <label>
    築年数:
    <input type="text" bind:value={age} />
  </label>
  <button type="submit">この条件で検索する</button>
</form>