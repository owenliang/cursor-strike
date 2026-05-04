import type { TKey } from './types';

const zh: Record<TKey, string> = {
  login_subtitle: 'FPS 鼠标手速训练',
  login_placeholder: '请输入游戏昵称...',
  login_start: '开始游戏',
  login_version: 'v1.0 // 精准训练系统',
  login_title: 'Cursor Strike — FPS 鼠标手速训练',

  hud_pause: '暂停',
  hud_quit: '退出',
  hud_hits: '命中',
  hud_misses: '失误',
  hud_time_left: '剩余时间',
  hud_hits_desc: '成功点击数 / 刷新目标总数',
  hud_misses_desc: '点击空白区域的次数',
  hud_time_desc: '倒计时归零后训练结束',

  overlay_go: 'GO!',
  overlay_paused: '已暂停',
  overlay_resume: '继续',
  confirm_quit_title: '确认退出？',
  confirm_quit_yes: '确认',
  confirm_quit_no: '取消',

  result_title: '训练完成',
  result_subtitle: '表现评估报告',
  result_play_again: '再来一局',
  result_home: '返回主页',

  stat_total_score: '总得分',
  stat_hits: '命中',
  stat_misses: '失误',
  stat_hit_rate: '命中率',
  stat_avg_reaction: '平均反应用时',
  stat_hits_per_sec: '每秒命中',

  desc_total_score: '每命中1个目标得1分，总得分 = 命中次数',
  desc_hits: '成功点击的目标数 / 累计刷新的目标总数',
  desc_misses: '点击空白区域（未命中任何目标）的次数',
  desc_hit_rate: '成功点击次数 ÷ (成功点击 + 失误点击) × 100%',
  desc_avg_reaction: '从目标出现到成功点击的平均间隔时间（秒）',
  desc_hits_per_sec: '总命中次数 ÷ 游戏时长(秒)，衡量击靶手速',
};

const en: Record<TKey, string> = {
  login_subtitle: 'FPS Mouse Speed Training',
  login_placeholder: 'Enter nickname...',
  login_start: 'Start Game',
  login_version: 'v1.0 // Precision Training System',
  login_title: 'Cursor Strike — FPS Mouse Speed Training',

  hud_pause: 'Pause',
  hud_quit: 'Quit',
  hud_hits: 'Hits',
  hud_misses: 'Misses',
  hud_time_left: 'Time Left',
  hud_hits_desc: 'Successful clicks / Total targets spawned',
  hud_misses_desc: 'Clicks on empty areas',
  hud_time_desc: 'Training ends when countdown reaches zero',

  overlay_go: 'GO!',
  overlay_paused: 'Paused',
  overlay_resume: 'Resume',
  confirm_quit_title: 'Confirm Quit?',
  confirm_quit_yes: 'Confirm',
  confirm_quit_no: 'Cancel',

  result_title: 'Training Complete',
  result_subtitle: 'Performance Report',
  result_play_again: 'Play Again',
  result_home: 'Home',

  stat_total_score: 'Total Score',
  stat_hits: 'Hits',
  stat_misses: 'Misses',
  stat_hit_rate: 'Hit Rate',
  stat_avg_reaction: 'Avg Reaction',
  stat_hits_per_sec: 'Hits/sec',

  desc_total_score: '1 point per target hit. Total Score = number of hits',
  desc_hits: 'Targets successfully clicked / Total targets spawned',
  desc_misses: 'Clicks on empty area (missed all targets)',
  desc_hit_rate: 'Successful clicks ÷ (successful + missed clicks) × 100%',
  desc_avg_reaction: 'Average time from target spawn to successful click (seconds)',
  desc_hits_per_sec: 'Total hits ÷ game duration (seconds), measures click speed',
};

export const translations = { zh, en } as const;