


<script>
import { defineComponent, reactive, ref, } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup, LPolyline } from "@vue-leaflet/vue-leaflet"; //LPolyline
import "leaflet/dist/leaflet.css";
// import leaflet from 'leaflet';
import axios from 'axios'


export default defineComponent({
    name: 'MapMove',
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LPolyline
    },

    setup() {
        const map = ref(null);
        const route = ref([
            [
                -3.723333,
                55.204407
            ],
            [
                -3.723333,
                55.204407
            ]
        ]);
        // console.log('leaflet :>> ', leaflet);
        // const aa = leaflet.map('#map').setView([25.0340, 121.4628], 15)
        // const aa = leaflet.map(map.value).setView([25.0340, 121.4628], 15)
        // console.log('aa :>> ', aa);


        // console.log('map.value :>> ', map.value);

        //     // const map = L.map('map').setView([25.0330, 121.5654], 13); // 設置初始視圖到台北101
        //     // 示例：在5秒後更改視圖到另一個位置


        const mapDetail = reactive({
            zoom: 13,
            center: [25.0330, 121.5654], // 台北101的經緯度 // [25.0110, 121.4628], // 新北市板橋的經緯度
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // 圖資
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', // copyright
            markerPosition: [25.0330, 121.5654], // [25.0110, 121.4628], // 新北市板橋的經緯度
        })

        const getRoute = async () => {
            const start = [51.505, -0.09];
            const end = [51.51, -0.1];
            const { data } = await axios.get(`http://router.project-osrm.org/route/v1/driving/${start.join(',')};${end.join(',')}`, {
                params: {
                    overview: 'full',
                    geometries: 'geojson',
                },
            });




            const coordinates = data.routes[0].geometry.coordinates;
            // console.log('data :>> ', data);
            // console.log('coordinates :>> ', coordinates);

            route.value = coordinates.map(coord => [coord[1], coord[0]]);
            console.log('route.value :>> ', JSON.stringify(route.value, null, 2));
        };

        return {
            mapDetail,
            map,
            getRoute,
            route
        }

    }
})
</script>

<template>
    <div id="app" class="bg-blue-900 w-[700px] h-[800px]">

        <l-map ref="map" :zoom="mapDetail.zoom" :center="mapDetail.center" style="height: 500px; width: 100%;">
            <l-tile-layer :url="mapDetail.url" :attribution="mapDetail.attribution" />
            <l-polyline :lat-lngs="route"></l-polyline>
            <l-marker :lat-lng="mapDetail.markerPosition">
                <l-popup>這是一個彈出視窗!</l-popup>
            </l-marker>
        </l-map>
        <button @click="getRoute">Get Route</button>
    </div>
</template>



<style>
#app {
    height: 100vh;
    /* 確保容器有足夠的高度 */
}

l-map {
    height: 500px;
    /* 確保地圖有足夠的高度 */
    width: 100%;
}
</style>

