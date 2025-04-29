<script lang="ts">
  import Map from "../components/map.svelte";
  import Reform from "../components/reform.svelte";
  import Search from "$lib/components/search.svelte";
  import type { Equipment, House } from "$lib/api";
  import Graph from "../components/graph.svelte";
  import { onMount } from "svelte";

  let filteredHouses = $state<House[]>([]);
  let selectedHouse = $state<House | null>(null);
  let selectedEquipments = $state<Equipment[]>([]);
  onMount(() => {
    window.addEventListener("hashchange", () => {
      selectedHouse =
        filteredHouses.find(
          (house) => house.id === Number(location.hash.replace("#", "")),
        ) ?? null;
    });
  });

  let data = $derived(
    selectedHouse
      ? [
          { name: "購入費", data: [selectedHouse.price] },
          ...selectedEquipments.map((item) => ({
            name: item.name,
            data: [item.price],
          })),
        ]
      : null,
  );

  const categories = [
    {
      name: "水回り",
      items: ["キッチン", "風呂", "トイレ", "洗面所"],
    },
    {
      name: "屋内",
      items: ["リビング", "ダイニング", "洋室", "和室", "廊下", "階段"],
    },
    {
      name: "屋外",
      items: ["庭", "バルコニー", "駐車場", "外壁", "屋根"],
    },
    {
      name: "その他",
      items: ["収納", "階段", "窓"],
    },
  ];
</script>

<!-- ロゴ -->
<div class="text-5xl md:text-7xl font-extrabold text-center py-8 text-shadow">
  <span class="text-blue-800">A</span><span class="text-black">K</span><span
    class="text-blue-800">I</span
  ><span class="text-black">Y</span><span class="text-blue-800">A</span>
  <span class="mx-1"></span>
  <span class="text-black">S</span><span class="text-blue-800">I</span><span
    class="text-black">M</span
  ><span class="text-black">U</span><span class="text-black">L</span><span
    class="text-blue-800">A</span
  ><span class="text-black">T</span><span class="text-blue-800">I</span><span
    class="text-black">O</span
  ><span class="text-black">N</span>
</div>

<!-- 4セクションレイアウト -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-10">
  <!-- Search -->
  <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
    <div class="text-3xl font-bold text-blue-900 mb-4">Search</div>
    <Search bind:filteredHouses />
  </div>

  <!-- Reform -->
  <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
    <div class="text-3xl font-bold text-blue-900 mb-4">Reform</div>
    <Reform bind:selectedEquipments />
  </div>

  <!-- Map -->
  <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
    <div class="text-3xl font-bold text-blue-900 mb-4">Map</div>
    <div class="aspect-square rounded-lg overflow-hidden">
      <Map houses={filteredHouses} />
    </div>
  </div>

  <!-- Dashboard -->
  <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
    <div class="text-3xl font-bold text-blue-900 mb-4">Dashboard</div>
    <Graph {data} />
  </div>
</div>
