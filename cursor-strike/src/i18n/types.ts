export type Lang = 'zh' | 'en';

export type TKey =
  // Login
  | 'login_subtitle'
  | 'login_placeholder'
  | 'login_start'
  | 'login_version'
  | 'login_title'
  // Game HUD
  | 'hud_pause'
  | 'hud_quit'
  | 'hud_hits'
  | 'hud_misses'
  | 'hud_time_left'
  | 'hud_hits_desc'
  | 'hud_misses_desc'
  | 'hud_time_desc'
  // Overlays
  | 'overlay_go'
  | 'overlay_paused'
  | 'overlay_resume'
  | 'confirm_quit_title'
  | 'confirm_quit_yes'
  | 'confirm_quit_no'
  // Result page
  | 'result_title'
  | 'result_subtitle'
  | 'result_play_again'
  | 'result_home'
  // Stat labels
  | 'stat_total_score'
  | 'stat_hits'
  | 'stat_misses'
  | 'stat_hit_rate'
  | 'stat_avg_reaction'
  | 'stat_hits_per_sec'
  // Stat descriptions
  | 'desc_total_score'
  | 'desc_hits'
  | 'desc_misses'
  | 'desc_hit_rate'
  | 'desc_avg_reaction'
  | 'desc_hits_per_sec';