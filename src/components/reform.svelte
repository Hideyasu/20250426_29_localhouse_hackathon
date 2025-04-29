<script lang="ts">
  import { getEquipments, type Equipment } from "$lib/api";
  import { onMount } from "svelte";

  let { selectedEquipments = $bindable() } = $props<{
    selectedEquipments: Equipment[];
  }>();

  let allEquipments = $state<Equipment[]>([]);
  onMount(async () => {
    allEquipments = await getEquipments();
  });
</script>

<div class="container">
  <div class="category">
    <!--<div class="category-title">{category.name}</div>-->
    <div class="checkboxes">
      {#each allEquipments as item}
        <div class="checkbox-item">
          <label>
            <input
              type="checkbox"
              value={item}
              bind:group={selectedEquipments}
            />
            {item.name}
          </label>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
  }

  .category {
    display: flex;
    align-items: center; /* カテゴリ名と項目を横並びに */
    gap: 1rem;
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .category-title {
    font-size: 1.5rem;
    color: #1e3a8a; /* 青色 */
    font-weight: bold;
    width: 150px; /* カテゴリ名の幅を固定 */
  }

  .checkboxes {
    display: flex;
    gap: 1rem; /* 項目間にスペース */
  }

  .checkbox-item {
    color: #1e3a8a; /* 青色 */
  }

  label {
    display: flex;
    align-items: center;
  }

  .button {
    margin-top: 2rem;
    padding: 1rem 2rem;
    background-color: #1e3a8a; /* 青色 */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    font-size: 1.2rem;
  }

  .button:hover {
    background-color: #1e40af; /* 少し暗くする */
  }
</style>
