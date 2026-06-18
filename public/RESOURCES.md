# 资源文件下载指南

App 可以正常运行，但以下资源需要自行下载以完整体验：

## 环境音效 (放入 `public/sounds/`)

| 文件名 | 推荐来源 | 搜索关键词 |
|--------|----------|-----------|
| `rain.mp3` | https://freesound.org | "rain loop" (CC0 许可) |
| `cafe.mp3` | https://pixabay.com/music | "cafe ambience" |
| `white-noise.mp3` | https://freesound.org | "white noise loop" (CC0) |

**处理建议**: 用 Audacity（免费）裁剪为 30-60 秒无缝循环，导出 MP3 128kbps。

## 背景视频 (放入 `public/videos/`)

| 文件名 | 推荐来源 | 搜索关键词 |
|--------|----------|-----------|
| `forest-rain.mp4` | https://coverr.co | "rain forest" (白天/温暖风格) |
| `night-forest.mp4` | https://pexels.com/videos | "night forest" (夜间风格) |

**处理建议**: 用 HandBrake（免费）裁剪为 30 秒循环，去除音轨。H.264 MP4, 1080p。

## PWA 图标 (放入 `public/icons/`)

你可以使用 https://realfavicongenerator.net 上传 favicon.svg 生成所有尺寸的图标。

需要以下文件:
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `apple-touch-icon.png` (180x180)
