// simple-icons 数据渲染为单色 SVG（goldenheart 站点专用小工具）
export default function SiIcon({ icon, size = 20, className = "" }) {
  if (!icon?.path) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}
