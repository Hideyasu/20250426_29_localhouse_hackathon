<script lang="ts">
    import { onMount } from 'svelte';
    
    let mapDiv: HTMLDivElement;
    
    const houses = [
      {
        id: 1,
        lat: 34.6560,
        lng: 135.6020,
        address: "東大阪市小若江1丁目10-1",
        price: "2800万円",
        builtYear: "築15年",
        exteriorImg: "https://via.placeholder.com/50?text=外観1",
        floorplanImg: "https://via.placeholder.com/150x100?text=間取り1",
      },
      {
        id: 2,
        lat: 34.6530,
        lng: 135.5990,
        address: "東大阪市小若江2丁目5-8",
        price: "2500万円",
        builtYear: "築25年",
        exteriorImg: "https://via.placeholder.com/50?text=外観2",
        floorplanImg: "https://via.placeholder.com/150x100?text=間取り2",
      },
      {
        id: 3,
        lat: 34.6555,
        lng: 135.5985,
        address: "東大阪市小若江3丁目2-3",
        price: "3100万円",
        builtYear: "築10年",
        exteriorImg: "https://via.placeholder.com/50?text=外観3",
        floorplanImg: "https://via.placeholder.com/150x100?text=間取り3",
      },
    ];
    
    onMount(async () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDofI_zlB7qtdlRDnp7JDLLsf1AhZ3SuhA`;
        script.async = true;
        document.head.appendChild(script);
        await new Promise((resolve) => (script.onload = resolve));
      }
    
      const map = new window.google.maps.Map(mapDiv, {
        center: { lat: 34.6545, lng: 135.6005 }, // 小若江を中心にする
        zoom: 15,
      });
    
      houses.forEach((house) => {
        const marker = new window.google.maps.Marker({
          position: { lat: house.lat, lng: house.lng },
          map,
          title: house.address,
        });
    
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="background: white; color: #1e3a8a; padding: 10px; max-width: 250px; font-family: sans-serif;">
              <h2 style="font-size: 18px; margin-bottom: 8px;">${house.address}</h2>
              <img src="${house.exteriorImg}" style="width: 100%; height: auto; margin-bottom: 8px;" />
              <img src="${house.floorplanImg}" style="width: 100%; height: auto; margin-bottom: 8px;" />
              <p><strong>価格:</strong> ${house.price}</p>
              <p><strong>築年数:</strong> ${house.builtYear}</p>
              <button style="background-color: #1e3a8a; color: white; border: none; padding: 8px 12px; border-radius: 5px; margin-top: 10px; cursor: pointer;">
                この空き家を選択する
              </button>
            </div>
          `
        });
    
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
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
    