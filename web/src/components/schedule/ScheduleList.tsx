"use client";
import React from "react";
import { useScheduleStore } from "./ScheduleStore";
import { Button } from "@/components/ui/button";

const ScheduleList: React.FC = () => {
  const { schedules, removeSchedule } = useScheduleStore();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Schedule List</h2>
      {schedules.length > 0 ? (
        schedules.map((schedule, index) => (
          <div
            key={index}
            className="mb-4 p-6 rounded-lg shadow-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white"
          >
            <h3 className="text-xl font-bold mb-4">{schedule.crop}</h3>
            <ul className="mb-4">
              {schedule.stages.map((stage, idx) => (
                <li key={idx} className="mb-2">
                  <span className="font-bold">{stage.date}</span> — {stage.stage}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => removeSchedule(index)}
              variant="outline"
              className="bg-white text-green-500 hover:bg-green-500 hover:text-white border-2"
            >
              Remove Schedule
            </Button>
          </div>
        ))
      ) : (
        <p>No schedules available</p>
      )}
    </div>
  );
};

export default ScheduleList;
