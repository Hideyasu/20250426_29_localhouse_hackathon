<script lang="ts">
  let houses = [
    { id: 1, address: "東京都新宿区", price: 30000000, age: 10 },
    { id: 2, address: "大阪府大阪市", price: 20000000, age: 20 },
    { id: 3, address: "北海道札幌市", price: 15000000, age: 30 }
  ];

  let searchAddress = "";
  let minPrice = 0;
  let maxPrice = Infinity;
  let maxAge = Infinity;

  let selectedHouses = new Set();

  function filterHouses() {
    return houses.filter(house => {
      return (
        house.address.includes(searchAddress) &&
        house.price >= minPrice &&
        house.price <= maxPrice &&
        house.age <= maxAge
      );
    });
  }

  function toggleSelection(id: number) {
    if (selectedHouses.has(id)) {
      selectedHouses.delete(id);
    } else {
      selectedHouses.add(id);
    }
  }
</script>

<div>
  <h1>空き家検索</h1>
  <form on:submit|preventDefault>
    <label>
      住所:
      <input type="text" bind:value={searchAddress} placeholder="例: 東京都" />
    </label>
    <label>
      最低価格:
      <input type="number" bind:value={minPrice} min="0" />
    </label>
    <label>
      最高価格:
      <input type="number" bind:value={maxPrice} min="0" />
    </label>
    <label>
      最大築年数:
      <input type="number" bind:value={maxAge} min="0" />
    </label>
    <button type="submit">検索</button>
  </form>

  <h2>検索結果</h2>
  <ul>
    {#each filterHouses() as house}
      <li>
        <label>
          <input
            type="checkbox"
            on:change={() => toggleSelection(house.id)}
            checked={selectedHouses.has(house.id)}
          />
          {house.address} - ¥{house.price.toLocaleString()} - 築{house.age}年
        </label>
      </li>
    {/each}
  </ul>
</div>