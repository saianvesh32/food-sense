// // import { Button } from "@/components/ui/button";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import {
// //   Card,
// //   CardContent,
// //   CardFooter,
// // } from "@/components/ui/card";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "./ui/textarea";
// // import { Input } from "@/components/ui/input";
// // import React, { useState, useRef } from "react";

// // export function DialogDemo({
// //   markdown,
// //   setMarkdown,
// // }: {
// //   markdown: string;
// //   setMarkdown: (markdown: string) => void;
// // }) {
// //   const [schedules, setSchedules] = useState<any[]>([]); // State to store schedules
// //   const [crop, setCrop] = useState(""); // State for crop input
// //   const textareaRef = useRef<HTMLTextAreaElement>(null);

// //   const handleNewPost = (event: React.FormEvent) => {
// //     event.preventDefault();

// //     // Create a new schedule with crop and description
// //     const newSchedule = {
// //       crop,
// //       description: markdown,
// //     };

// //     // Add new schedule to the list
// //     setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);

// //     // Reset input fields after submission
// //     setCrop("");
// //     setMarkdown("");
// //   };

// //   return (
// //     <Dialog>
// //       <DialogTrigger asChild>
// //         <Button variant="outline" className="bg-green-500 text-white">create schedule</Button>
// //       </DialogTrigger>
// //       <DialogContent className="sm:max-w-[425px]">
// //         <DialogHeader>
// //           <DialogTitle>Create new schedule</DialogTitle>
// //         </DialogHeader>
// //         <div className="grid">
// //           <Card>
// //             <CardContent>
// //               <form onSubmit={handleNewPost} className="space-y-4">
// //                 <div>
// //                   <Label htmlFor="crop">Crop</Label>
// //                   <Input
// //                     id="crop"
// //                     value={crop}
// //                     onChange={(e) => setCrop(e.target.value)}
// //                     placeholder="Enter crop name"
// //                     className="w-full"
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label htmlFor="description">Description</Label>
// //                   <Textarea
// //                     ref={textareaRef}
// //                     value={markdown}
// //                     onChange={(e) => setMarkdown(e.target.value)}
// //                     placeholder="Describe the schedule"
// //                     className="w-full font-mono text-sm p-4 resize-none"
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label htmlFor="image">Upload Image</Label>
// //                   <div className="mt-1 flex items-center space-x-4">
// //                     <Input
// //                       id="image"
// //                       type="file"
// //                       accept="image/*"
// //                       className="w-full"
// //                     />
// //                     <Button type="button" size="icon" variant="outline">
// //                       <Camera className="h-4 w-4" />
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </form>
// //             </CardContent>
// //             <CardFooter>
// //               <Button type="submit" className="rounded p-1 px-2 border bg-green-500 text-white">Submit Post</Button>
// //             </CardFooter>
// //           </Card>
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import React, { useRef, useState, FormEvent } from "react";
// import { useScheduleStore } from "@/components/schedule/ScheduleStore";

// // Define types for the schedule data
// interface Schedule {
//   crop: string;
//   startDate: string; // Changed to represent the start date
//   markdown: string;
// }

// export function DialogDemo() {
//   // State hooks with explicit types
//   const [markdown, setMarkdown] = useState<string>("");
//   const [crop, setCrop] = useState<string>("");
//   const [startDate, setStartDate] = useState<string>(""); // Changed to track start date

//   // Access the store to save schedules
//   const { addSchedule } = useScheduleStore();

//   // Handle form submission
//   const handleNewPost = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
    
//     // Add schedule to the store
//     const newSchedule: Schedule = { crop, startDate, markdown };
//     addSchedule(newSchedule);

//     // Reset form fields
//     setCrop("");
//     setStartDate("");
//     setMarkdown("");
//   };

//   const textareaRef = useRef<HTMLTextAreaElement | null>(null);

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="bg-green-500 text-white">
//           Create Schedule
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Create New Schedule</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleNewPost} className="space-y-4">
//           <div>
//             <Label htmlFor="crop">Crop Name</Label>
//             <Input
//               id="crop"
//               value={crop}
//               onChange={(e) => setCrop(e.target.value)}
//               placeholder="Enter crop name"
//               className="w-full"
//             />
//           </div>
//           <div>
//             <Label htmlFor="startDate">Start Date</Label>
//             <Input
//               id="startDate"
//               type="date" // Changed input type to date
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               placeholder="Select start date"
//               className="w-full"
//             />
//           </div>
//           <div>
//             <Label htmlFor="markdown">Additional Notes</Label>
//             <Textarea
//               ref={textareaRef}
//               value={markdown}
//               onChange={(e) => setMarkdown(e.target.value)}
//               placeholder="Additional details..."
//               className="w-full"
//             />
//           </div>
//           <Button
//             type="submit"
//             className="rounded p-1 px-2 border bg-green-500 text-white"
//           >
//             Submit Post
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, FormEvent } from "react";
import { useScheduleStore } from "./schedule/ScheduleStore";

function addDays(startDate: string, days: number): string {
  const date = new Date(startDate);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
}

function generateScheduleForCrop(crop: string, startDate: string) {
  const cropSchedules: Record<string, { stage: string; days: number }[]> = {
    rice: [
      { stage: "Sowing Stage", days: 0 },
      { stage: "Tillering Stage", days: 14 },
      { stage: "Jointing and Booting Stage", days: 30 },
      { stage: "Heading and Grain Filling Stage", days: 60 },
    ],
    wheat: [
      { stage: "Sowing Stage", days: 0 },
      { stage: "Tillering Stage", days: 15 },
      { stage: "Booting Stage", days: 45 },
      { stage: "Heading and Harvesting", days: 75 },
    ],
    // Add more crops if needed
  };

  const scheduleStages = cropSchedules[crop.toLowerCase()];
  if (!scheduleStages) return null;

  return {
    crop,
    stages: scheduleStages.map(({ stage, days }) => ({
      stage,
      date: addDays(startDate, days),
    })),
  };
}

export function DialogDemo() {
  const [crop, setCrop] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  const { addSchedule } = useScheduleStore();

  const handleNewPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const schedule = generateScheduleForCrop(crop, startDate);
    if (schedule) {
      addSchedule(schedule);
      setCrop("");
      setStartDate("");
      alert(`Schedule for ${crop} added successfully!`);
    } else {
      alert("Crop not found. Please select a valid crop.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-500 text-white">
          Create Schedule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Schedule</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleNewPost} className="space-y-4">
          <div>
            <Label htmlFor="crop">Crop Name</Label>
            <Input
              id="crop"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="Enter crop name (e.g., rice, wheat)"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Select start date"
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="rounded p-1 px-2 border bg-green-500 text-white"
          >
            Submit Schedule
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
