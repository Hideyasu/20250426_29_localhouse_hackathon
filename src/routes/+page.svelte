<script lang="ts">
  import Map from '../components/map.svelte';
  import Reform from '../components/reform.svelte';

  const categories = [
    {
      name: '水回り',
      items: ['キッチン', '風呂', 'トイレ', '洗面所']
    },
    {
      name: '屋内',
      items: ['リビング', 'ダイニング', '洋室', '和室', '廊下', '階段']
    },
    {
      name: '屋外',
      items: ['庭', 'バルコニー', '駐車場', '外壁', '屋根']
    },
    {
      name: 'その他',
      items: ['収納', '階段', '窓']
    }
  ];
</script>

<style>
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
</style>

<!-- ロゴ -->
<div class="text-5xl md:text-7xl font-extrabold text-center py-8 text-shadow">
  <span class="text-blue-800">A</span><span class="text-black">K</span><span class="text-blue-800">I</span><span class="text-black">Y</span><span class="text-blue-800">A</span>
  <span class="mx-1"></span>
  <span class="text-black">S</span><span class="text-blue-800">I</span><span class="text-black">M</span><span class="text-black">U</span><span class="text-black">L</span><span class="text-blue-800">A</span><span class="text-black">T</span><span class="text-blue-800">I</span><span class="text-black">O</span><span class="text-black">N</span>
</div>

<!-- 4セクションレイアウト -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-10">
  
  <!-- Search -->
  <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
    <div class="text-3xl font-bold text-blue-900 mb-4">Search</div>
    <div class="text-gray-600">※ 検索機能はこれから実装</div>
  </div>

  <!-- Reform -->
  <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
    <div class="text-3xl font-bold text-blue-900 mb-4">Reform</div>
    <Reform {categories} />
    <div class="mt-6">
      <button class="bg-blue-800 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
        Before/Afterへ進む
      </button>
    </div>
  </div>

  <!-- Map -->
  <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
    <div class="text-3xl font-bold text-blue-900 mb-4">Map</div>
    <div class="h-[400px] rounded-lg overflow-hidden">
      <Map />
    </div>
  </div>

  <!-- Dashboard -->
  <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
    <div class="text-3xl font-bold text-blue-900 mb-4">Dashboard</div>
    <div class="text-gray-600">※ ダッシュボード機能はこれから実装</div>
  </div>

</div>
