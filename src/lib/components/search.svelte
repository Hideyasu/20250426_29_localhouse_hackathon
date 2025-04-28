<script lang="ts">
  import { getHouses, type House } from "$lib/api/houses";
  import { onMount } from "svelte";

  let allHouses: House[] = [];
  let { filteredHouses = $bindable() } = $props<{ filteredHouses: House[] }>();

  onMount(async () => {
    allHouses = await getHouses();
    console.log(allHouses);
  });
</script>

<div class="text-gray-600">※ 検索機能はこれから実装</div>
