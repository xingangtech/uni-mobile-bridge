/**
 * HarmonyOS Module Types
 */

export interface HealthData {
  steps?: number;
  heartRate?: number;
  duration?: number;
  quality?: string;
  date: string;
}

export interface WorkoutData {
  id: string;
  type: string;
  duration: number;
  distance: number;
  calories: number;
  startDate: string;
  endDate: string;
}

export interface CalendarEvent {
  id?: string;
  title: string;
  startDate: string;
  endDate: string;
  location?: string;
  notes?: string;
}

export interface ReminderItem {
  id?: string;
  title: string;
  dueDate?: string;
  notes?: string;
  priority?: number;
  completed?: boolean;
}
