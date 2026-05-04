# 技术实现方案

## 技术栈选型

| 层面 | 选择 | 理由 |
|------|------|------|
| 框架 | React 18 + Vite | 轻量、快速构建，组件化适合游戏界面拆分 |
| 语言 | TypeScript | 类型安全，状态和事件处理清晰 |
| 样式 | CSS 变量 + inline styles | 与设计令牌对齐，游戏组件用 inline style 更灵活 |
| 状态管理 | React useState + useRef | 单局游戏状态简单，无需 Redux/Zustand |
| 动画 | CSS transitions/keyframes + requestAnimationFrame | 小球入场/消失用 CSS，游戏循环用 rAF |
| 存储 | localStorage | 轻量持久化历史记录，无后端需求 |

---

## 项目结构

```
cursor-strike/
├── package.json              # name: cursor-strike
├── index.html                # Vite 入口 HTML，引入 Google Fonts (Anton + Inter)
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx              # 入口
    ├── App.tsx               # 页面切换 + 过渡动画
    ├── styles/
    │   ├── tokens.css        # 设计令牌（CSS 变量）
    │   ├── global.css        # 全局基础样式（html/body/#root 撑满浏览器）
    │   └── animations.css    # 动画定义（ballSpawn/ballDie/crosshairFlash/fadeInUp/shake/timeFlash/countIn/hitParticle）
    ├── pages/
    │   ├── LoginPage.tsx     # Slide 1 — 登录首页
    │   ├── GamePage.tsx      # Slide 2 — 游戏主界面
    │   └── ResultPage.tsx    # Slide 3 — 训练结束评估
    ├── components/
    │   ├── Crosshair.tsx     # FPS 十字准星（8px短臂+4px间隙+4px中心点）
    │   ├── TargetBall.tsx    # 目标小球组件（固定18px半径）
    │   ├── HudPanel.tsx      # 右上角 HUD 面板（命中/失误/剩余时间 + Tip）
    │   ├── HudControls.tsx   # 左上角暂停/退出按钮
    │   ├── StatCard.tsx      # 数据卡片 + buildResultCards（6项指标 + Tip）
    │   ├── ActionButton.tsx  # 再来一局 / 返回主页 按钮
    │   ├── CountdownOverlay.tsx  # 开局 3-2-1 倒计时
    │   ├── PauseOverlay.tsx  # 暂停蒙层
    │   ├── ConfirmModal.tsx  # 退出确认弹窗
    │   ├── HitEffect.tsx     # 命中粒子扩散效果
    │   └── Tip.tsx           # 悬浮提示（lucide info 图标 + 描述文字）
    ├── hooks/
    │   ├── useGameLoop.ts    # 游戏主循环（rAF 驱动，ref模式避免闭包过期）
    │   ├── useBallSpawner.ts # 小球生成逻辑（屏幕中心anchor，280ms恒定间隔）
    │   ├── useTimer.ts       # 30秒倒计时管理（ref模式）
    │   └── useScore.ts       # 得分/命中/失误/反应时间累计（ref模式）
    ├── utils/
    │   ├── constants.ts      # 游戏参数常量
    │   ├── ballCollision.ts  # 小球互不重叠检测
    │   └── storage.ts        # localStorage 操作（saveResult + 内部 loadHistory）
    └── types/
        └── game.ts           # TypeScript 类型定义（Ball, GameResult, HistoryRecord, Page）
```

---

## 核心架构设计

### 1. 页面流转

App.tsx 维护当前页面状态：

```typescript
type Page = 'login' | 'game' | 'result';

interface AppState {
  page: Page;
  nickname: string;
  gameResult: GameResult | null;
  transitioning: boolean;
}
```

页面切换通过 CSS opacity transition 实现，无路由库依赖：
- 切换时 opacity 1→0 淡出（200ms），新页淡入
- 切换期间禁止交互（pointerEvents: none）

### 2. Ref 模式防止闭包过期

多个 hook 使用 ref 模式避免 stale closure 问题：

- `onEndRef` / `onDoneRef` / `onExitRef` — 将回调存入 ref，tick 函数无依赖变更
- `scoreRef` / `gameRef` — 读取最新值而非闭包中的初始值
- `ballsRef` — spawnBall 使用 ref 读取最新小球列表
- `onSpawnRef` — 保持 onSpawn 回调最新引用

### 3. 游戏主循环架构

```
GamePage (容器)
  ├── useGameLoop ────────── 主循环驱动
  │     ├── useTimer ──────── 30秒倒计时（onEndRef模式）
  │     ├── useBallSpawner ── 小球生成调度（屏幕中心anchor）
  │     └── useScore ──────── 命中/失误累计（scoreRef模式）
  │
  ├── 渲染层
  │     ├── Crosshair ──────── 鼠标跟随准星（props: x, y, flash）
  │     ├── TargetBall[] ────── 动态小球列表
  │     ├── HudPanel ────────── 右上角数据（命中/失误/时间 + Tip）
  │     ├── HudControls ──────── 左上角按钮
  │     ├── HitEffect ────────── 命中粒子
  │     ├── CountdownOverlay ─── 开局倒计时（onDoneRef模式）
  │     ├── PauseOverlay ─────── 暂停蒙层
  │     └── 视差背景 ──────────── mouseMove → background offset (0.5倍)
```

### 4. 小球生成与碰撞检测

`useBallSpawner` 核心逻辑：

```typescript
interface Ball {
  id: string;
  x: number;       // 相对游戏区域中心的坐标
  y: number;
  radius: number;   // 固定 18px
  spawnTime: number; // performance.now()，用于计算反应时间
  dying: boolean;   // 消除动画状态
}

// 生成参数
const BALL_CONFIG = {
  SPAWN_INTERVAL: 280,    // ms，恒定间隔不加速
  MAX_BALLS: 15,           // 同屏最大小球数
  DISTANCE_MIN: 30,        // px，距屏幕中心最小距离
  DISTANCE_MAX: 80,        // px，距屏幕中心最大距离
  BALL_GAP: 6,             // px，小球间最小间距增量
  RADIUS: 18,              // px，固定半径
  SPAWN_RETRIES: 20,       // 碰撞重试次数
  DIE_DURATION: 200,       // ms，消除动画持续时间
};
```

生成逻辑：
1. 获取游戏区域中心坐标 (cx, cy)
2. 随机生成角度 + 距离（30–80px），计算 x/y 坐标
3. 检查与所有现有小球的最小距离 ≥ ball.radius + BALL_CONFIG.RADIUS + BALL_GAP
4. 重试最多 20 次，若仍碰撞则跳过本轮生成
5. 280ms 后下一轮生成（恒定速度）

### 5. 反应时间追踪

每次小球生成记录 `spawnTime = performance.now()`。点击命中时：

```typescript
reactionTime = (performance.now() - ball.spawnTime) / 1000; // 秒
```

平均反应用时 = 所有命中球的 reactionTime 算术平均值。

### 6. 游戏计时

`useTimer` 管理 30 秒倒计时：
- 每 rAF tick 计算 elapsed = now - startTime（考虑暂停补偿）
- 剩余时间 = 30 - elapsed（秒）
- 最后 10 秒进入红色闪烁态
- 归零时通过 onEndRef.current 触发回调 → 构建结果 → 跳转评估页

### 7. 命中与失误判定

GamePage 容器监听整个游戏区域的 `onClick`：

```typescript
handleClick(e: React.MouseEvent) {
  const clickX = e.clientX - areaRect.left;
  const clickY = e.clientY - areaRect.top;

  // 检查是否命中任何非dying小球
  const hitBall = balls.find(ball =>
    !ball.dying && distance(clickX, clickY, ball.x, ball.y) <= ball.radius
  );

  if (hitBall) {
    onHit(hitBall);   // 命中处理：得分+1，记录反应时间，killBall动画
  } else {
    onMiss();         // 失误处理：准星闪红，失误+1
  }
}
```

---

## 设计令牌映射

CSS 变量文件 `tokens.css`：

```css
:root {
  --fps-accent: #4ade80;
  --fps-green-dark: #22c55e;
  --fps-bg-dark: #1a1a2e;
  --fps-bg-card: #1a1a2e;
  --fps-border: #2a2a4a;
  --fps-text-muted: #999999;
  --fps-text-light: #9ca3af;
  --fps-text-dim: #666666;
  --fps-text-primary: #E5E5E5;
  --fps-error: #ef4444;

  --fps-font-heading: 'Anton', sans-serif;
  --fps-font-body: 'Inter', sans-serif;
  --fps-font-captions: 'Inter', sans-serif;

  --fps-rounded-sm: 4px;
  --fps-rounded-md: 6px;

  --fps-glow-accent: 0 0 8px rgba(74, 222, 128, 0.25);
}
```

字体引入方式：Google Fonts CDN（Anton + Inter）。

---

## 性能考量

| 场景 | 策略 |
|------|------|
| 小球渲染 | 纯 CSS positioned div，不使用 Canvas，DOM 数量 ≤ 15 |
| 动画 | CSS keyframes 处理入场/消失/粒子；rAF 仅驱动计时和生成调度 |
| 命中粒子 | 5 个小 div，CSS animation 300ms 后自动移除 |
| HUD 数值更新 | setState 触发局部重渲染，不影响小球层 |
| 暂停恢复 | 时间补偿而非重算，避免累积误差 |
| 视差背景 | CSS transform，无重绘开销 |

---

## 数据类型定义

```typescript
type Page = 'login' | 'game' | 'result';

interface Ball {
  id: string;
  x: number;
  y: number;
  radius: number;      // 固定 18px
  spawnTime: number;   // performance.now()
  dying: boolean;
}

interface GameResult {
  nickname: string;
  totalScore: number;
  hits: number;
  misses: number;
  totalTargets: number;
  hitRate: number;         // 百分比，0-100
  avgReactionTime: number; // 秒
  hitsPerSecond: number;   // hits / GAME_DURATION
  timestamp: number;       // Date.now()
}

interface HistoryRecord extends GameResult {
  id: string;
}
```

localStorage 结构：

```typescript
// key: 'cursor_strike_history'
// value: HistoryRecord[]（最多 20 条）
```

---

## 构建与部署

- **开发**：`npm run dev`（Vite HMR 热更新）
- **构建**：`npm run build`（tsc + vite build）
- **部署**：纯静态文件，可部署至任意 CDN / 静态托管
- **无后端依赖**：所有逻辑前端完成，localStorage 本地持久化