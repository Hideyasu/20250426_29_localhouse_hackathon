<script lang="ts">
  const MAPS_API_KEY = "AIzaSyADPUVze39G8j0r7DaeqhW3fM-f146LcY4";

  import type { House } from "$lib/api/houses";
  import { onMount } from "svelte";

  const { houses } = $props<{ houses: House[] }>();

  let mapDiv: HTMLDivElement;
  let map: google.maps.Map;
  let previousInfoWindow: google.maps.InfoWindow | null = null; // 現在開いているInfoWindowを保持

  onMount(async () => {
    // Google Maps Geocoding API を読み込む
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`;
      script.async = true;
      document.head.appendChild(script);
      await new Promise((resolve) => (script.onload = resolve));
    }

    map = new window.google.maps.Map(mapDiv, {
      center: { lat: 34.6545, lng: 135.6005 }, // 初期位置を指定
      zoom: 10,
    });
  });

  $effect(() => {
    updateMap(houses);
  });

  async function updateMap(houses: House[]) {
    const geocoder = new window.google.maps.Geocoder(); // Geocoding API を使うためのインスタンス

    // 住所をもとに緯度・経度を取得する関数
    function geocodeAddress(address: string): Promise<google.maps.LatLng> {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const location = results[0].geometry.location;
            resolve(location);
          } else {
            reject("住所の変換に失敗しました");
          }
        });
      });
    }

    for (const house of houses) {
      const address = "大阪府" + house.city + house.districtAddress;

      try {
        const location = await geocodeAddress(address);
        const marker = new window.google.maps.Marker({
          position: location,
          map,
          title: address,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="background: white; color: #1e3a8a; padding: 10px; max-width: 250px; font-family: sans-serif;">
              <h2 style="font-size: 18px; margin-bottom: 8px;">${address}</h2>
              <img src="https://placehold.jp/50x50.png" style="width: 100%; height: auto; margin-bottom: 8px;" />
              <p><strong>価格:</strong> ${house.price}万円</p>
              <p><strong>築年数:</strong> ${house.constructedAt}</p>
              <a href="/#${house.id}" style="background-color: #1e3a8a; color: white; border: none; padding: 8px 12px; border-radius: 5px; margin-top: 10px; cursor: pointer;">
                この空き家を選択する
              </a>
            </div>
          `,
        });

        marker.addListener("click", () => {
          // 以前のInfoWindowが開いていれば閉じる
          if (previousInfoWindow) {
            previousInfoWindow.close();
          }
          // 新しいInfoWindowを開く
          infoWindow.open(map, marker);
          // 現在開いているInfoWindowを保存
          previousInfoWindow = infoWindow;
        });
      } catch (error) {
        console.error(`住所 "${address}" の緯度経度の取得に失敗しました。`);
      }
    }
  }
</script>

<div id="map" bind:this={mapDiv}></div>

<style>
  #map {
    width: 100%;
    height: 100%;
  }
</style>
