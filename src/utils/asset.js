// Astro 对图片的静态 import 返回 ImageMetadata（含 .src），
// 普通 Vite 返回字符串 URL。这里统一归一化成字符串，供组件直接使用。
export function assetUrl(asset) {
  if (typeof asset === "string") return asset;
  return asset?.src ?? "";
}
