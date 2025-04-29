<script lang="ts">
    import { getHouses, type House } from "$lib/api/houses";
    import { onMount } from "svelte";
    import { parseISO, differenceInYears } from "date-fns";

    let allHouses: House[] = $state([]);
    let { filteredHouses = $bindable() } = $props<{
        filteredHouses: House[];
    }>();

    onMount(async () => {
        allHouses = await getHouses();
    });

    let selectedCities = $state<string[]>([]);
    let maxPrice = $state<number>(5000000);
    let maxAge = $state<number>(200);

    function filterHouses() {
        filteredHouses = allHouses.filter((house) => {
            const matchesAddress =
                selectedCities.length === 0 ||
                selectedCities.includes(house.city);
            const matchesPrice = house.price <= maxPrice;
            const matchesAge =
                differenceInYears(
                    new Date(),
                    parseISO(house.constructedAt + "-01"),
                ) <= maxAge;

            return matchesAddress && matchesPrice && matchesAge;
        });
    }
</script>

<form onsubmit={filterHouses}>
    <label>
        市区町村:
        <div class="selectbox-3">
            <select bind:value={selectedCities} multiple>
                {#each new Set(allHouses.map((house) => house.city)) as city}
                    <option>{city}</option>
                {/each}
            </select>
        </div>
    </label>

    <label style="display: block; margin-bottom: 10px; margin-top: 20px;">
        価格:
        <input type="number" bind:value={maxPrice} class="textbox-1" />
    </label>

    <label style="display: block; margin-bottom: 10px;">
        最大築年数:
        <input type="number" bind:value={maxAge} class="textbox-1" />
    </label>

    <!-- 築年数とボタンの間に余白を追加 -->
    <div style="margin-top: 20px;">
        <button type="submit">検索</button>
    </div>
</form>

<style>
    .selectbox-3 {
        display: inline-flex;
        align-items: center;
        position: relative;
        width: 100%;
    }

    .selectbox-3 select {
        appearance: none;
        width: 100%;
        height: 200px; /* 高さを大きくしてスクロールできるように */
        padding: 0.4em 1em;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
        color: #333;
        font-size: 1em;
        cursor: pointer;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow-y: auto; /* 縦スクロールできるように */
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
</style>
