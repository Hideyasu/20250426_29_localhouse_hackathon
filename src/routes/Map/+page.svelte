<script lang="ts">
  import { goto } from '$app/navigation';

  const properties = [
    {
      id: 1,
      lat: 34.6937,
      lng: 135.5023,
      image: '/placeholder.png',
      price: '¥20,000,000',
      address: '大阪市中央区',
      details: {
        year: '築10年',
        layout: '3LDK',
        size: '80㎡',
        station: '駅から徒歩10分'
      }
    }
  ];

  const selectProperty = (id: number) => {
    goto('/Reform');
  };
</script>

<h1>Map</h1>
<div id="map">
  {#each properties as property}
    <div class="pin" style="top: {property.lat}px; left: {property.lng}px;" on:click={() => selectProperty(property.id)}>
      <img src={property.image} alt="空き家画像" />
      <p>{property.price}</p>
    </div>
  {/each}
</div>

<style>
  #map {
    position: relative;
    width: 100%;
    height: 500px;
    background-color: #e0e0e0;
  }
  .pin {
    position: absolute;
    cursor: pointer;
    text-align: center;
  }
  .pin img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid red;
  }
  .pin p {
    margin: 0;
    font-size: 12px;
    color: black;
  }
</style>