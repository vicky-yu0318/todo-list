// 這個錯誤通常是由於 TypeScript 無法找到 vue-leaflet 模組的型別聲明文件。你可以採取以下步驟來解決這個問題
// 建立一個自定義的型別聲明文件：如果 vue-leaflet 本身沒有型別聲明文件，你可以手動創建一個臨時的型別聲明文件。你可以在專案根目錄下創建一個 vue-leaflet.d.ts 文件，並添加以下內容：
declare module "vue-leaflet" {
  import { DefineComponent } from "vue";

  export const LMap: DefineComponent<{}, {}, any>;
  export const LTileLayer: DefineComponent<{}, {}, any>;
  export const LMarker: DefineComponent<{}, {}, any>;
  export const LPopup: DefineComponent<{}, {}, any>;
}
