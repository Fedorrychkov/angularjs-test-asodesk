interface ICommon {
  position?: number;
  change?: number;
}

export interface IStat {
  keyword: string;
  id: number;
  countryCode?: string;
  updateDate?: string;
  updateDateIpad?: string;
  isCompleted?: boolean;
  canStartCampaign?: boolean;
  isAppstore?: boolean;
  is_clustered_search_result?: boolean;
  is_keywordstats_outdated?: boolean;
  position_info?: ICommon;
  total_apps?: string;
  users_per_day?: string;
  ipad_position_info?: ICommon;
  ipad_total_apps?: string;
  searchads_popularity?: number;
  suggestions_count?: number;
  timestamp?: string;
  color: number;
  checked?: boolean;
}

export interface IStats {
  data: IStat[];
  draw?: number;
  has_available_keywords?: boolean;
  recordsFiltered?: number;
  recordsTotal?: number;
  result?: string;
}
