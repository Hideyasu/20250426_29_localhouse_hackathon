<script>
    import { onMount } from 'svelte';
  
    let mapDiv;
  
    onMount(async () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDofI_zlB7qtdlRDnp7JDLLsf1AhZ3SuhA`;
        script.async = true;
        document.head.appendChild(script);
  
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }
  
      const map = new window.google.maps.Map(mapDiv, {
        center: { lat: 35.6812, lng: 139.7671 }, // 東京駅
        zoom: 15,
      });
    });
  </script>
  
  <style>
    #map {
      width: 100%;
      height: 100%;
    }
  </style>
  
  <div id="map" bind:this={mapDiv}></div>
  