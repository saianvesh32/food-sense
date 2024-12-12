// "use client";

// import { useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Camera, Filter, MessageCircle, ThumbsUp } from "lucide-react";

// import { DialogDemo } from "@/components/dialog";

// export default function FarmerSocialFeed() {
//   const [posts, setPosts] = useState([
//     {
//       id: 1,
//       author: "John Doe",
//       avatar: "/placeholder.svg?height=40&width=40",
//       image:
//         "https://www.cropin.com/hs-fs/hubfs/kharif-crop.jpg?width=880&height=661&name=kharif-crop.jpg",
//       description: "My corn field is looking great this year!",
//       likes: 15,
//       comments: 3,
//     },
//     {
//       id: 2,
//       author: "Jane Smith",
//       avatar: "/placeholder.svg?height=40&width=40",
//       image:
//         "https://www.agriculture.com/thmb/-n2UYRhRjNwjD07g9avsuA5AOH4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/51319378596_e3d93628bc_o-2000-820ecd997aa1406da2e2d7b276fccb6d.jpg",
//       description: "New sustainable irrigation system installed.",
//       likes: 22,
//       comments: 5,
//     },
//   ]);
//   const [filter, setFilter] = useState("all");

//   // const filteredPosts = filter === 'all' ? posts : posts.filter(post => post.category === filter)

//   const [markdown, setMarkdown] = useState(
//     "# Welcome to the Enhanced Markdown Editor\n\nThis is a **live preview** of your markdown.\n\n## Features:\n\n- Real-time preview\n- Syntax highlighting\n- Responsive design\n- Formatting toolbar\n\n[link](/)"
//   );

//   return (
//     <div className="bg-gradient-to-b from-green-50 to-white">
//       <div className="container w-9/12 6mx-auto p-4 space-y-8 ">
//         <h1 className="text-4xl font-bold text-center mb-8 text-emerald-800 pt-2">
//           Farmer's Social Feed
//         </h1>

//         {/* New Post Form */}

//         {/* Filter */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Filter className="h-5 w-5" />
//             <Select value={filter} onValueChange={setFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter posts" />
//               </SelectTrigger>
//               <SelectContent className="bg-background">
//                 <SelectItem value="all">All Posts</SelectItem>
//                 <SelectItem value="crops">Crops</SelectItem>
//                 <SelectItem value="livestock">Livestock</SelectItem>
//                 <SelectItem value="equipment">Equipment</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <DialogDemo markdown={markdown} setMarkdown={setMarkdown} />
//         </div>

//         {/* Posts List */}
//         <div className="space-y-6">
//           {posts.map((post) => (
//             <Card key={post.id}>
//               <CardContent className="p-4">
//                 <div className="flex items-center space-x-4 mb-4">
//                   <Avatar>
//                     <AvatarImage src={post.avatar} alt={post.author} />
//                     <AvatarFallback>
//                       {post.author
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="font-semibold">{post.author}</p>
//                     <p className="text-sm text-gray-500">Posted 2 hours ago</p>
//                   </div>
//                 </div>
//                 <img
//                   src={post.image}
//                   alt="Post"
//                   className="w-full h-64 object-cover rounded-md mb-4"
//                 />
//                 <p>{post.description}</p>
//               </CardContent>
//               <CardFooter className="flex justify-between items-center">
//                 <Button variant="ghost" className="flex items-center space-x-2">
//                   <ThumbsUp className="h-4 w-4" />
//                   <span>{post.likes} Likes</span>
//                 </Button>
//                 <Button variant="ghost" className="flex items-center space-x-2">
//                   <MessageCircle className="h-4 w-4" />
//                   <span>{post.comments} Comments</span>
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
