"use client";
import { create } from "zustand";

// Define the structure for each stage in a schedule
interface ScheduleStage {
  stage: string;
  date: string;
}

// Define the structure for each schedule
interface Schedule {
  crop: string;
  stages: ScheduleStage[];
}

// Define the structure for the store state and actions
interface ScheduleStore {
  schedules: Schedule[];
  addSchedule: (newSchedule: Schedule) => void;
  removeSchedule: (index: number) => void;
}

// Zustand store implementation
const useScheduleStore = create<ScheduleStore>((set) => ({
  schedules: [],
  addSchedule: (newSchedule) =>
    set((state) => ({
      schedules: [...state.schedules, newSchedule],
    })),
  removeSchedule: (index) =>
    set((state) => ({
      schedules: state.schedules.filter((_, i) => i !== index),
    })),
}));

export { useScheduleStore };
