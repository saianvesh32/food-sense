// import React from "react";
// import img1 from "../../../public/images/health.webp";
// import img2 from "../../../public/images/health2.webp";
// import img3 from "../../../public/images/health3.jpg"
// import img4 from "../../../public/images/health4.jpeg"
// import img5 from "../../../public/images/health5.jpeg"
// import img6 from "../../../public/images/health6.jpeg"

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Leaf, Droplet, AlertTriangle } from "lucide-react";

// const HomePage = () => {
//   // Array of images for the carousel
//   const images = [img1, img2];

//   return (
//     <div className="min-h-screen text-gray-900 bg-white">
//       {/* Hero Section */}
//       <div className="text-center py-10 pt-16 px-6 bg-gradient-to-b from-green-50 to-white">
//         <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-8 transition-transform duration-500 hover:scale-105">
//           Health Analysis App
//         </h1>

//         <div className="flex justify-center gap-6">
//           {/* Carousel */}
//           <Carousel className="w-full max-w-xs m-auto">
//             <CarouselContent>
//               {images.map((image, index) => (
//                 <CarouselItem key={index}>
//                   <div className="p-1">
//                     <Card>
//                       <CardContent className="flex aspect-square items-center justify-center p-6">
//                         <img
//                           src={image.src}
//                           alt={`Slide ${index + 1}`}
//                           className="rounded-lg object-cover w-full h-full"
//                         />
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious />
//             <CarouselNext />
//           </Carousel>
//         </div>
//       </div>

//       {/* Features Grid */}
//       <div className="max-w-7xl mx-auto px-6 py-20">
//         <div className="grid md:grid-cols-3 gap-10">
//           <FeatureCard
//             icon={<Leaf className="w-10 h-10 text-green-600" />}
//             title="Disease Detection"
//             description="Instantly identify crop diseases using AI-powered image analysis"
//           />
//           <FeatureCard
//             icon={<Droplet className="w-10 h-10 text-green-600" />}
//             title="Weather Monitoring"
//             description="Track soil moisture, temperature, and climate conditions in real-time"
//           />
//           <FeatureCard
//             icon={<AlertTriangle className="w-10 h-10 text-green-600" />}
//             title="Smart Alerts"
//             description="Receive timely notifications about weather and crop conditions"
//           />
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-green-50 py-16">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8 text-center">
//             <StatCard number="2.5s" label="Average Detection Time" />
//             <StatCard number="100+" label="Crop Varieties" />
//             <StatCard number="1000+" label="Active Farmers" />
//             <StatCard number="95%" label="Accuracy Rate" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, title, description }: any) => (
//   <div className="p-6 border border-gray-100 rounded-xl shadow-md transition-all duration-300 transform hover:shadow-2xl hover:scale-105 hover:bg-green-50">
//     <div className="mb-4">{icon}</div>
//     <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
//     <p className="text-gray-600">{description}</p>
//   </div>
// );

// const StatCard = ({ number, label }: any) => (
//   <div className="transition-transform transform hover:scale-105 duration-300">
//     <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
//     <div className="text-gray-600">{label}</div>
//   </div>
// );

// export default HomePage;
// import React from "react";
// import img1 from "../../../public/images/health.webp";
// import img2 from "../../../public/images/health2.webp";
// import img3 from "../../../public/images/health3.jpg";
// import img4 from "../../../public/images/health4.jpeg";
// import img5 from "../../../public/images/health5.jpeg";
// import img6 from "../../../public/images/health6.jpeg";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Leaf, Droplet, AlertTriangle } from "lucide-react";

// const HomePage = () => {
//   // Array of images for the carousel
//   const images = [img1, img2, img3, img4, img5, img6];

//   return (
//     <div className="min-h-screen text-gray-90">
//       {/* Hero Section */}
//       <div className="text-center py-10 pt-16 px-6 bg-gradient-to-b">
//         <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-8 transition-transform duration-500 hover:scale-105">
//           FoodMonito App
//         </h1>

//         <div className="flex justify-center gap-6">
//           {/* Carousel */}
//           <Carousel
//             opts={{
//               align: "start", // Aligns items to the left for a smooth scroll
//             }}
//             className="w-full max-w-5xl"
//           >
//             <CarouselContent>
//               {images.map((image, index) => (
//                 <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
//                   <div className="p-1">
//                     <Card>
//                       <CardContent className="flex aspect-square items-center justify-center p-6">
//                         <img
//                           src={image.src}
//                           alt={`Slide ${index + 1}`}
//                           className="rounded-lg object-cover w-full h-full"
//                         />
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious />
//             <CarouselNext />
//           </Carousel>
//         </div>
//       </div>

//       {/* Features Grid */}
//       <div className="max-w-7xl mx-auto px-6 py-20">
//         <div className="grid md:grid-cols-3 gap-10">
//           <FeatureCard
//             icon={<Leaf className="w-10 h-10 text-green-600" />}
//             title="Food Alternate"
//             description="Instantly identify crop diseases using AI-powered image analysis"
//           />
//           <FeatureCard
//             icon={<Droplet className="w-10 h-10 text-green-600" />}
//             title="Diet recommendation"
//             description="Track soil moisture, temperature, and climate conditions in real-time"
//           />
//           <FeatureCard
//             icon={<AlertTriangle className="w-10 h-10 text-green-600" />}
//             title="Daily goals"
//             description="Receive timely notifications about weather and crop conditions"
//           />
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-green-50 py-16">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8 text-center">
//             <StatCard number="2.5s" label="Average Detection Time" />
//             <StatCard number="100+" label="Crop Varieties" />
//             <StatCard number="1000+" label="Active Farmers" />
//             <StatCard number="95%" label="Accuracy Rate" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, title, description }: any) => (
//   <div className="p-6 border border-gray-100 rounded-xl shadow-md transition-all duration-300 transform hover:shadow-2xl hover:scale-105 hover:bg-green-50">
//     <div className="mb-4">{icon}</div>
//     <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
//     <p className="text-gray-600">{description}</p>
//   </div>
// );

// const StatCard = ({ number, label }: any) => (
//   <div className="transition-transform transform hover:scale-105 duration-300">
//     <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
//     <div className="text-gray-600">{label}</div>
//   </div>
// );

// export default HomePage;
import React from "react";
import img1 from "../../../public/images/health.webp";
import img2 from "../../../public/images/health2.webp";
import img3 from "../../../public/images/health3.jpg";
import img4 from "../../../public/images/health4.jpeg";
import img5 from "../../../public/images/health5.jpeg";
import img6 from "../../../public/images/health6.jpeg";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Replace, Heart, CheckCircle } from "lucide-react";

const HomePage = () => {
  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="min-h-screen text-gray-90">
      {/* Hero Section */}
      <div className="text-center py-10 pt-16 px-6 bg-gradient-to-b">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-8 transition-transform duration-500 hover:scale-105">
          Food Analysis System
        </h1>

        <div className="flex justify-center gap-6">
          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-5xl"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src={image.src}
                          alt={`Slide ${index + 1}`}
                          className="rounded-lg object-cover w-full h-full"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Replace className="w-10 h-10 text-green-600" />}
            title="Food Alternate"
            description="Suggests alternative foods based on dietary preferences or restrictions."
          />
          <FeatureCard
            icon={<Heart className="w-10 h-10 text-green-600" />}
            title="Diet Recommendation"
            description="Provides personalized diet plans based on user health goals or conditions."
          />
          <FeatureCard
            icon={<CheckCircle className="w-10 h-10 text-green-600" />}
            title="Daily Goals"
            description="Helps set and track daily nutritional and activity goals."
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="500+" label="Alternate Food Options Analyzed" />
            <StatCard number="300+" label="Personalized Diet Plans" />
            <StatCard number="1000+" label="Goals Tracked Daily" />
            <StatCard number="95%" label="Recommendation Accuracy Rate" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: any) => (
  <div className="p-6 border border-gray-100 rounded-xl shadow-md transition-all duration-300 transform hover:shadow-2xl hover:scale-105 hover:bg-green-50">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StatCard = ({ number, label }: any) => (
  <div className="transition-transform transform hover:scale-105 duration-300">
    <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default HomePage;
