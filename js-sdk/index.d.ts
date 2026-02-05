/**
 * uni-mobile-bridge TypeScript 类型定义
 * 支持 Android、iOS 和 HarmonyOS
 */

// 健康模块类型定义
export namespace Health {
  /**
   * 健康权限类型
   */
  export type Permission = 
    | 'steps'
    | 'heartRate'
    | 'sleep'
    | 'calories'
    | 'distance'
    | 'bloodPressure'
    | 'bloodGlucose'
    | 'weight';

  /**
   * 权限请求结果
   */
  export interface PermissionResult {
    success: boolean;
    granted: Permission[];
  }

  /**
   * 日期范围选项
   */
  export interface DateRangeOptions {
    startDate?: Date;
    endDate?: Date;
  }

  /**
   * 步数数据
   */
  export interface StepsData {
    steps: number;
    date: string;
  }

  /**
   * 心率数据
   */
  export interface HeartRateData {
    heartRate: number;
    date: string;
  }

  /**
   * 睡眠数据
   */
  export interface SleepData {
    duration: number;
    quality: 'excellent' | 'good' | 'fair' | 'poor';
    date: string;
  }

  /**
   * 请求健康数据权限
   */
  export function requestPermissions(permissions: Permission[]): Promise<PermissionResult>;

  /**
   * 获取步数数据
   */
  export function getSteps(options: DateRangeOptions): Promise<StepsData>;

  /**
   * 获取心率数据
   */
  export function getHeartRate(options: DateRangeOptions): Promise<HeartRateData>;

  /**
   * 获取睡眠数据
   */
  export function getSleepData(options: DateRangeOptions): Promise<SleepData>;
}

// 运动模块类型定义
export namespace Sports {
  /**
   * 运动类型
   */
  export type WorkoutType =
    | 'running'
    | 'walking'
    | 'cycling'
    | 'swimming'
    | 'hiking'
    | 'yoga'
    | 'fitness'
    | 'all';

  /**
   * 运动记录
   */
  export interface Workout {
    id: string;
    type: WorkoutType;
    duration: number;
    distance: number;
    calories: number;
    startDate: string;
    endDate: string;
  }

  /**
   * 运动查询选项
   */
  export interface WorkoutOptions {
    startDate?: Date;
    endDate?: Date;
    type?: WorkoutType;
  }

  /**
   * 开始运动选项
   */
  export interface StartWorkoutOptions {
    type: WorkoutType;
  }

  /**
   * 运动汇总
   */
  export interface WorkoutSummary {
    workoutId: string;
    duration: number;
    distance: number;
    calories: number;
  }

  /**
   * 获取运动记录
   */
  export function getWorkouts(options: WorkoutOptions): Promise<Workout[]>;

  /**
   * 开始运动记录
   */
  export function startWorkout(options: StartWorkoutOptions): Promise<{ workoutId: string }>;

  /**
   * 结束运动记录
   */
  export function stopWorkout(workoutId: string): Promise<{ summary: WorkoutSummary }>;
}

// 日历模块类型定义
export namespace Calendar {
  /**
   * 日历事件
   */
  export interface CalendarEvent {
    id?: string;
    title: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    notes?: string;
    allDay?: boolean;
  }

  /**
   * 事件查询选项
   */
  export interface EventQueryOptions {
    startDate?: Date;
    endDate?: Date;
    calendarIds?: string[];
  }

  /**
   * 权限请求结果
   */
  export interface PermissionResult {
    success: boolean;
  }

  /**
   * 请求日历权限
   */
  export function requestPermission(): Promise<PermissionResult>;

  /**
   * 获取日历事件
   */
  export function getEvents(options: EventQueryOptions): Promise<CalendarEvent[]>;

  /**
   * 创建日历事件
   */
  export function createEvent(event: CalendarEvent): Promise<{ eventId: string }>;

  /**
   * 删除日历事件
   */
  export function deleteEvent(eventId: string): Promise<{ success: boolean }>;
}

// 提醒模块类型定义
export namespace Reminder {
  /**
   * 提醒优先级
   */
  export type Priority = 0 | 1 | 2 | 3 | 4 | 5;

  /**
   * 提醒项
   */
  export interface ReminderItem {
    id?: string;
    title: string;
    dueDate?: Date;
    notes?: string;
    priority?: Priority;
    completed?: boolean;
  }

  /**
   * 提醒查询选项
   */
  export interface ReminderQueryOptions {
    completed?: boolean;
  }

  /**
   * 权限请求结果
   */
  export interface PermissionResult {
    success: boolean;
  }

  /**
   * 请求提醒权限
   */
  export function requestPermission(): Promise<PermissionResult>;

  /**
   * 获取提醒列表
   */
  export function getReminders(options?: ReminderQueryOptions): Promise<ReminderItem[]>;

  /**
   * 创建提醒
   */
  export function createReminder(reminder: ReminderItem): Promise<{ reminderId: string }>;

  /**
   * 更新提醒
   */
  export function updateReminder(reminderId: string, updates: Partial<ReminderItem>): Promise<{ success: boolean }>;

  /**
   * 删除提醒
   */
  export function deleteReminder(reminderId: string): Promise<{ success: boolean }>;
}

/**
 * uni-mobile-bridge 主接口
 */
declare const UnimobileBridge: {
  Health: typeof Health;
  Sports: typeof Sports;
  Calendar: typeof Calendar;
  Reminder: typeof Reminder;
};

export default UnimobileBridge;
