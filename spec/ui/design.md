# UI 设计规范

## 设计令牌

### 色彩体系

| Token | 值 | 用途 |
|-------|-----|------|
| `--fps-accent` | `#4ade80` | 主强调色：霓虹绿，用于标题高亮、按钮填充、数据数值、十字准星、目标小球 |
| `--fps-green-dark` | `#22c55e` | 深霓虹绿，用于目标小球径向渐变终点色 |
| `--fps-bg-dark` | `#1a1a2e` | 最深背景色，全局底色（深灰碳紫） |
| `--fps-bg-card` | `#1a1a2e` | 卡片背景色，HUD 面板 / 数据卡片半透明底色 |
| `--fps-border` | `#2a2a4a` | 边框色，输入框 / 卡片 / 按钮 stroke（紫灰调） |
| `--fps-text-primary` | `#E5E5E5` | 主要前景文字色（深色背景上的亮色文字） |
| `--fps-text-light` | `#9ca3af` | 次级文字色，subtitle / 标签 |
| `--fps-text-muted` | `#999999` | 柔和文字，HUD 标签 / caption |
| `--fps-text-dim` | `#666666` | 最暗文字，底部版本标注 |
| `--fps-error` | `#ef4444` | 失误专用色：红色，用于失误数值、准星闪红 |

### 字体体系

| Token | 值 | 用途 |
|-------|-----|------|
| `--fps-font-heading` | Anton | 所有标题、按钮文字、HUD 数值；extra-bold condensed，大尺寸冲击感 |
| `--fps-font-body` | Inter | 正文、输入框 placeholder；regular weight |
| `--fps-font-captions` | Inter | 小标签、HUD 字段名、底部标注；regular weight，适合小字号 |

字号层级：
- 大标题：48–72px（Anton）
- HUD 数值 / 卡片数值：24–32px（Anton）
- 按钮文字：18–22px（Anton）
- 正文 / 输入框：16px（Inter）
- Caption / 标签：11–13px（Inter，letter-spacing 1–4px）

### 圆角 & 阴影

| Token | 值 | 用途 |
|-------|-----|------|
| `--fps-rounded-sm` | 4px | 小控件：HUD 按钮、输入框 |
| `--fps-rounded-md` | 6px | 中等控件：数据卡片、主按钮 |

阴影层级：
- **accent glow**：`0 0 8px rgba(74,222,128,0.25)` — 霓虹绿发光，用于标题/按钮 textShadow

---

## 页面布局

### Slide 1 — 登录首页

尺寸：1280×720

**层级结构（从底到顶）：**

1. **网格背景层** — 绝对定位覆盖全屏
   - 底色：`#1a1a2e`
   - 百分比网格线（25%/50%/75% 位置），1px `rgba(26,26,26,0.15)`
   - 径向渐变柔光椭圆：`rgba(74,222,128,0.03) → transparent`，opacity 0.5

2. **内容居中层** — 垂直居中容器
   - 内部容器 maxWidth 90vw / 480px，垂直布局 gap:32
   - **标题**："CURSOR STRIKE" — Anton 72px bold，霓虹绿，letter-spacing -2，textShadow glow
   - **霓虹装饰线**：200×2px 绿条，opacity 0.6，圆角 1
   - **副标题**："FPS 鼠标手速训练" — Inter 14px，letter-spacing 4，`#9ca3af`
   - **输入框**：padding 16×20，底色 `#1a1a2e`，1px `#2a2a4a` 边框，圆角 6
     - 左侧 lucide `user` 图标 20px `#999999`
     - placeholder "请输入游戏昵称..." — Inter 16px
   - **开始按钮**：padding 16×32，底色 `#4ade80`，圆角 6
     - boxShadow glow（blur 8, rgba(74,222,128,0.38)）
     - lucide `crosshair` 图标 20px + "开始游戏" Anton 22px，深底色
   - **底部标注**："v1.0 // 精准训练系统" — Inter 11px，`#666666`，opacity 0.5

### Slide 2 — 游戏主界面

尺寸：1280×720，绝对定位

1. **背景**：`#1a1a2e`，随鼠标视差偏移（0.5倍幅度，transform translate）

2. **左上角 HUD** — x:20 y:16，水平排列 gap:12
   - **暂停按钮**：padding 10×14，底色 `rgba(26,26,26,0.5)`，1px `#2a2a4a` 边框，圆角 4
     - lucide `pause` 16px + "暂停" Inter 12px，`#9ca3af`
   - **退出按钮**：同样式
     - lucide `x` 16px + "退出" Inter 12px，`#9ca3af`

3. **右上角 HUD 面板** — right:20 top:16，固定宽 180px，padding 16×20，gap 16
   - 底色 `rgba(26,26,26,0.9)`，1px `#2a2a4a` 边框，圆角 6
   - overflow: visible（确保 Tip 悬浮不被裁剪）
   - 三行数据，每行：label + Tip 图标（Inter 11px，letter-spacing 2，`#999999`） + value（Anton 24px）
     - **命中**：hits/totalTargets — 霓虹绿
     - **失误**：misses — `#ef4444`
     - **剩余时间**：seconds — `#E5E5E5`；最后10秒变红+闪烁

4. **十字准星** — 跟随鼠标位置，cursor:none
   - FPS短臂准星风格：
   - 4根短臂：8px长 × 2px宽，距中心间隙 4px，`#4ade80` opacity 0.8
   - 中心点：4×4 绿色实心圆
   - 失误时：整体闪红+淡出（crosshairFlash 150ms）

5. **目标小球** — 在屏幕中心周边散布（距中心 30–80px）
   - 尺寸：固定 36px 直径（radius 18px）
   - 填充：`#4ade80` 实色 + boxShadow glow
   - 出场动画：ballSpawn（scale 0→1, opacity 0→1, 150ms）
   - 消除动画：ballDie（scale 1→0, opacity 1→0, 200ms）
   - 最多15个同屏，每280ms刷新一颗

### Slide 3 — 训练结束评估

尺寸：1280×720

1. **背景层** — `#1a1a2e` + 径向渐变柔光椭圆（opacity 0.4）

2. **垂直居中容器** — padding 60×80，gap 32
   - **标题**："训练完成" — Anton 48px bold，霓虹绿，letter-spacing 1，textShadow glow
   - **副标题**："表现评估报告" — Inter 13px，letter-spacing 3，`#9ca3af`

3. **数据卡片网格** — maxWidth 90vw / 840px，2 行 × 3 列，gap 16
   - 每张卡片：垂直居中，padding 20×24，gap 8
     - 底色 `rgba(26,26,26,0.8)`，1px `#2a2a4a` 边框，圆角 6
     - backdrop-filter blur 8（磨砂效果）
     - overflow: visible（确保 Tip 悬浮不被裁剪）
     - Label + Tip 图标：Inter 11px letter-spacing 2 `#999999`
     - Value：Anton 32px
     - fadeInUp 动画（400ms + stagger delay）

   | 列1 | 列2 | 列3 |
   |------|------|------|
   | 总得分 (霓虹绿) | 命中 hits/total (霓虹绿) | 失误 (红 #ef4444) |
   | 命中率 % (霓虹绿) | 平均反应用时 s (霓虹绿) | 每秒命中 (霓虹绿) |

4. **操作按钮行** — maxWidth 90vw / 480px，水平 gap 16
   - **再来一局**：fill，padding 14×28，底色 `#4ade80`，圆角 6，glow shadow
   - **返回主页**：fill，padding 14×28，底色 `#1a1a2e`，1px `#2a2a4a` 边框

---

## 图标清单

| 页面 | 图标 | Lucide 名称 | 尺寸 | 颜色 |
|------|------|-------------|------|------|
| 登录 | 用户 | `user` | 20px | `#999999` |
| 登录 | 准星 | `crosshair` | 20px | `#1a1a2e` |
| 游戏 | 暂停 | `pause` | 16px | `#9ca3af` |
| 游戏 | 关闭 | `x` | 16px | `#9ca3af` |
| 结果 | 重试 | `rotate-ccw` | 18px | `#1a1a2e` |
| 结果 | 主页 | `house` | 18px | `#9ca3af` |
| HUD/卡片 | 提示 | `info` | 12px | `#999999` |