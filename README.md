# 自习室 Study Room

一个适合个人学习的沉浸式自习网页。它把今日任务、番茄钟、环境音、学习统计和专注完成反馈放在同一个轻量界面里，适合桌面端打开，也适合手机竖屏放在旁边当学习计时器。

## Features

- 今日任务：添加学习任务，并选择当前专注目标。
- 专注计时：支持专注/休息模式、倒计时/正计时和常用时长预设。
- 学习闭环：专注完成后显示总结面板，可标记任务完成、再来一轮、休息或切换任务。
- 环境音：雨声、咖啡馆、篝火，支持音量控制。
- 学习统计：记录今日、本周、连续天数和成就徽章。
- 沉浸背景：自然/图书馆场景切换，支持浅色、深色和自动主题。
- PWA：可安装到桌面或移动设备。

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Framer Motion
- Recharts

## Getting Started

```bash
npm install
npm run dev
```

打开本地地址：

```text
http://localhost:5173/
```

## Build

```bash
npm run build
```

构建产物会生成到 `dist/`。

## Deploy to GitHub Pages

项目已包含 GitHub Pages 工作流：`.github/workflows/deploy.yml`。

发布步骤：

1. 在 GitHub 创建一个空仓库，例如 `study-room`。
2. 把本地项目推送到 GitHub 的 `main` 分支。
3. 在仓库 Settings -> Pages 中，将 Source 设为 GitHub Actions。
4. 每次 push 到 `main` 后，GitHub Actions 会自动构建并发布。

## Media Notes

原始雨声音频较大，不适合直接提交到 GitHub。本项目引用的是优化后的：

```text
public/sounds/rain-loop.wav
```

本地原始文件 `public/sounds/rain.wav` 已加入 `.gitignore`，不会被提交。

## Scripts

```bash
npm run dev       # start development server
npm run build     # type-check and build
npm run lint      # run eslint
npm run preview   # preview production build
```
