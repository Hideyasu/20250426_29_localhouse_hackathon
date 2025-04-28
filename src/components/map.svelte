<script lang="ts">
  import { onMount } from 'svelte';

  let mapDiv: HTMLDivElement;

  // スプレッドシートからのデータ（仮に直接配列で定義しています）
  const houses = [
    {
      id: 1,
      address: "東大阪市小若江2丁目", // 住所のみ
      price: "2800万円",
      builtYear: "築15年",
      exteriorImg: "https://via.placeholder.com/50?text=外観1",
      floorplanImg: "https://via.placeholder.com/150x100?text=間取り1",
    },
    {
      id: 2,
      address: "高石市千代田6丁目", // 住所のみ
      price: "2500万円",
      builtYear: "築25年",
      exteriorImg: "https://via.placeholder.com/50?text=外観2",
      floorplanImg: "https://via.placeholder.com/150x100?text=間取り2",
    },
    {
      id: 3,
      address: "東大阪市小若江", // 住所のみ
      price: "3100万円",
      builtYear: "築10年",
      exteriorImg: "https://via.placeholder.com/50?text=外観3",
      floorplanImg: "https://via.placeholder.com/150x100?text=間取り3",
    },
  ];

  let previousInfoWindow: google.maps.InfoWindow | null = null; // 現在開いているInfoWindowを保持

  onMount(async () => {
    // Google Maps Geocoding API を読み込む
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      document.head.appendChild(script);
      await new Promise((resolve) => (script.onload = resolve));
    }

    const map = new window.google.maps.Map(mapDiv, {
      center: { lat: 34.6545, lng: 135.6005 }, // 初期位置を指定
      zoom: 15,
    });

    const geocoder = new window.google.maps.Geocoder(); // Geocoding API を使うためのインスタンス

    // 住所をもとに緯度・経度を取得する関数
    function geocodeAddress(address: string): Promise<google.maps.LatLng> {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const location = results[0].geometry.location;
            resolve(location);
          } else {
            reject("住所の変換に失敗しました");
          }
        });
      });
    }

    // 空き家の情報を処理
    for (const house of houses) {
      try {
        const location = await geocodeAddress(house.address); // 住所から緯度・経度を取得
        const marker = new window.google.maps.Marker({
          position: location,
          map,
          title: house.address,
          icon: {
            scaledSize: new window.google.maps.Size(50, 50), // サイズ指定！
          },
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
          `,
        });

        marker.addListener('click', () => {
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
        console.error(`住所 "${house.address}" の緯度経度の取得に失敗しました。`);
      }
    }
  });
</script>

<style>
  #map {
    width: 100%;
    height: 100%;
  }
</style>

<div id="map" bind:this={mapDiv}></div>
