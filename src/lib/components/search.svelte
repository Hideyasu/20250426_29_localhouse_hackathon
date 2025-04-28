<script lang="ts">
    let houses = [
        {
            id: 1,
            address: "大東市",
            flor_plan: "2LDK",
            price: 1000000,
            age: 10,
        },
        {
            id: 2,
            address: "大阪市",
            flor_plan: "1LDK",
            price: 3000000,
            age: 20,
        },
        {
            id: 3,
            address: "東大阪市",
            flor_plan: "1LDK",
            price: 3000000,
            age: 30,
        },
    ];

    let selectedAddresses: string[] = [];
    let maxPrice: number | null = null; // 未入力時はnull
    let maxAge: number | null = null; // 未入力時はnull

    let selectedHouses = new Set<number>();
    let filteredHouses = houses; // フィルタリング結果を保持
    let hasSearched = false; // 検索ボタンが押されたかどうかを管理

    // フィルタリング関数
    function filterHouses() {
        filteredHouses = houses.filter((house) => {
            const matchesAddress =
                selectedAddresses.length === 0 ||
                selectedAddresses.includes(house.address);
            const matchesPrice = maxPrice === null || house.price <= maxPrice;
            const matchesAge = maxAge === null || house.age <= maxAge;

            // 条件のいずれかが満たされていれば表示
            return matchesAddress && matchesPrice && matchesAge;
        });
        hasSearched = true; // 検索ボタンが押されたことを記録
        console.log("Filtered Houses:", filteredHouses); // デバッグ用
    }

    function toggleSelection(id: number) {
        if (selectedHouses.has(id)) {
            selectedHouses.delete(id);
        } else {
            selectedHouses.add(id);
        }
    }
</script>

<form on:submit|preventDefault={filterHouses}>
    <label>
        市区町村:
        <div class="selectbox-3">
            <select bind:value={selectedAddresses} multiple>
                <option value="大東市">大東市</option>
                <option value="大阪市">大阪市</option>
                <option value="東大阪市">東大阪市</option>
            </select>
        </div>
    </label>
    <label style="display: block; margin-bottom: 10px;">
        価格:
        <input
            type="number"
            bind:value={maxPrice}
            class="textbox-1"
            placeholder="5000000"
        />
    </label>
    <label>
        最大築年数:
        <input
            type="number"
            bind:value={maxAge}
            class="textbox-1"
            placeholder="30"
        />
    </label>
    <button type="submit">検索</button>
</form>

{#if hasSearched}
    <h2>検索結果</h2>
    <ul>
        {#each filteredHouses as house}
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
{/if}

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

    li {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    li label {
        display: flex;
        align-items: center;
        gap: 10px;
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
