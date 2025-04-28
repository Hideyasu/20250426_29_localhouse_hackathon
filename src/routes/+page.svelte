<script lang="ts">
  import Map from '../components/map.svelte'
</script>
<style>
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
</style>

<div class="text-7xl font-bold text-shadow">
  <!-- ロゴ部分はそのままでOK -->
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

<div class="grid grid-cols-2 grid-rows-2 h-screen">
  <div class="bg-red-500">
    <div class="text-5xl font-bold">Search</div>
  </div>
  <div class="bg-blue-500">
    <div class="text-5xl font-bold">Reform</div>
    <div class="text-5xl font-bold">Before/After</div>
  </div>
  <div class="bg-green-500">
    <div class="text-5xl font-bold">Map</div>
    <Map />
  </div>
  <div class="bg-yellow-500">
    <div class="text-5xl font-bold">Dashboard</div>
  </div>
</div>
