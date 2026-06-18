# 自习室 Study Room

一个沉浸式网页自习空间：把今日任务、专注计时、环境音、学习统计和完成反馈放在同一个安静界面里。

在线体验：

https://zzzqr007-g.github.io/study-room/

## 预览

自习室提供自然和图书馆两种场景，支持浅色、深色和自动主题。背景视频、粒子雨效和毛玻璃界面会一起营造低干扰的学习氛围。

## 主要功能

- 今日任务：添加学习任务，并设为当前专注目标。
- 专注计时：支持专注/休息、倒计时/正计时，以及 25/45/60/90 分钟预设。
- 完成反馈：一轮专注结束后可标记任务完成、再来一轮、休息一下或切换任务。
- 环境音：雨声、咖啡馆、篝火，支持音量控制。
- 学习统计：记录今日专注、本周趋势、连续天数和成就徽章。
- 沉浸场景：自然/图书馆背景视频切换。
- 移动端适配：手机上使用底部任务抽屉和简化菜单。
- PWA：支持安装到桌面或移动设备。

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Framer Motion
- Recharts

## 本地运行

```bash
npm install
npm run dev
```

打开：

```text
http://localhost:5173/
```

## 构建

```bash
npm run build
```

构建产物位于 `dist/`。

## 部署

本项目已配置 GitHub Pages 自动部署：

```text
.github/workflows/deploy.yml
```

推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。

## 资源说明

背景视频和环境音位于 `public/` 目录。原始雨声文件较大，仓库中提交的是优化后的循环版本：

```text
public/sounds/rain-loop.wav
```

本地原始文件 `public/sounds/rain.wav` 已加入 `.gitignore`。
