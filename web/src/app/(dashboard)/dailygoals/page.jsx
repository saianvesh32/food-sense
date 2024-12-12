// 'use client';

// import React, { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell } from 'recharts';

// // Food items data (sample)
// const foodItems = [
//   {"Food_items": "Apple", "Carbohydrates": 13.81, "Proteins": 0.26, "Fats": 0.17, "Calories": 52},
//   {"Food_items": "Banana", "Carbohydrates": 22.84, "Proteins": 1.09, "Fats": 0.33, "Calories": 89},
//   {"Food_items": "Orange", "Carbohydrates": 11.75, "Proteins": 0.94, "Fats": 0.12, "Calories": 47},
//   {"Food_items": "Strawberry", "Carbohydrates": 7.68, "Proteins": 0.67, "Fats": 0.3, "Calories": 32},
//   {"Food_items": "Blueberry", "Carbohydrates": 14.49, "Proteins": 0.74, "Fats": 0.33, "Calories": 57},
//   {"Food_items": "Pineapple", "Carbohydrates": 13.12, "Proteins": 0.54, "Fats": 0.12, "Calories": 50},
//   {"Food_items": "Mango", "Carbohydrates": 14.98, "Proteins": 0.82, "Fats": 0.38, "Calories": 60},
//   {"Food_items": "Avocado", "Carbohydrates": 8.53, "Proteins": 2, "Fats": 14.66, "Calories": 160},
//   {"Food_items": "Tomato", "Carbohydrates": 3.89, "Proteins": 0.88, "Fats": 0.2, "Calories": 18},
//   {"Food_items": "Carrot", "Carbohydrates": 9.58, "Proteins": 0.93, "Fats": 0.24, "Calories": 41},
//   {"Food_items": "Potato", "Carbohydrates": 17.58, "Proteins": 2.02, "Fats": 0.1, "Calories": 77},
//   {"Food_items": "Sweet Potato", "Carbohydrates": 20.12, "Proteins": 1.57, "Fats": 0.05, "Calories": 86},
//   {"Food_items": "Onion", "Carbohydrates": 9.34, "Proteins": 1.1, "Fats": 0.1, "Calories": 40},
//   {"Food_items": "Broccoli", "Carbohydrates": 6.64, "Proteins": 2.82, "Fats": 0.37, "Calories": 34},
//   {"Food_items": "Spinach", "Carbohydrates": 3.63, "Proteins": 2.86, "Fats": 0.39, "Calories": 23},
//   {"Food_items": "Lettuce", "Carbohydrates": 2.87, "Proteins": 1.36, "Fats": 0.15, "Calories": 15},
//   {"Food_items": "Cucumber", "Carbohydrates": 3.63, "Proteins": 0.65, "Fats": 0.11, "Calories": 15},
//   {"Food_items": "Peas", "Carbohydrates": 14.45, "Proteins": 5.42, "Fats": 0.4, "Calories": 81},
//   {"Food_items": "Corn", "Carbohydrates": 18.7, "Proteins": 3.27, "Fats": 1.35, "Calories": 86},
//   {"Food_items": "Cauliflower", "Carbohydrates": 4.97, "Proteins": 1.92, "Fats": 0.28, "Calories": 25},
//   {"Food_items": "Egg", "Carbohydrates": 0.72, "Proteins": 12.56, "Fats": 9.51, "Calories": 143},
//   {"Food_items": "Chicken Breast", "Carbohydrates": 0, "Proteins": 31, "Fats": 3.6, "Calories": 165},
//   {"Food_items": "Salmon", "Carbohydrates": 0, "Proteins": 25.4, "Fats": 8.1, "Calories": 208},
//   {"Food_items": "Beef", "Carbohydrates": 0, "Proteins": 26.1, "Fats": 12, "Calories": 250},
//   {"Food_items": "Pork", "Carbohydrates": 0, "Proteins": 27, "Fats": 10, "Calories": 242},
//   {"Food_items": "Tofu", "Carbohydrates": 2.3, "Proteins": 8.1, "Fats": 4.8, "Calories": 76},
//   {"Food_items": "Almonds", "Carbohydrates": 21.55, "Proteins": 21.15, "Fats": 49.93, "Calories": 576},
//   {"Food_items": "Walnuts", "Carbohydrates": 13.71, "Proteins": 15.23, "Fats": 65.21, "Calories": 654},
//   {"Food_items": "Peanuts", "Carbohydrates": 16.13, "Proteins": 25.8, "Fats": 49.24, "Calories": 567},
//   {"Food_items": "Rice (White)", "Carbohydrates": 28.17, "Proteins": 2.69, "Fats": 0.28, "Calories": 130},
//   {"Food_items": "Rice (Brown)", "Carbohydrates": 23.51, "Proteins": 2.58, "Fats": 0.97, "Calories": 111},
//   {"Food_items": "Wheat Bread", "Carbohydrates": 49.42, "Proteins": 8.49, "Fats": 3.45, "Calories": 265},
//   {"Food_items": "Pasta", "Carbohydrates": 25, "Proteins": 5, "Fats": 1.1, "Calories": 131},
//   {"Food_items": "Cheese (Cheddar)", "Carbohydrates": 1.28, "Proteins": 24.9, "Fats": 33.31, "Calories": 402},
//   {"Food_items": "Milk (Whole)", "Carbohydrates": 4.8, "Proteins": 3.2, "Fats": 3.25, "Calories": 60},
//   {"Food_items": "Yogurt (Plain)", "Carbohydrates": 4.7, "Proteins": 3.5, "Fats": 3.3, "Calories": 59},
//   {"Food_items": "Butter", "Carbohydrates": 0.06, "Proteins": 0.85, "Fats": 81.11, "Calories": 717},
//   {"Food_items": "Olive Oil", "Carbohydrates": 0, "Proteins": 0, "Fats": 100, "Calories": 884},
//   {"Food_items": "Sugar", "Carbohydrates": 99.98, "Proteins": 0, "Fats": 0, "Calories": 387},
//   {"Food_items": "Honey", "Carbohydrates": 82.4, "Proteins": 0.3, "Fats": 0, "Calories": 304},
//   {"Food_items": "Dark Chocolate", "Carbohydrates": 46.36, "Proteins": 4.88, "Fats": 30.18, "Calories": 546},
//   {"Food_items": "Popcorn", "Carbohydrates": 74.97, "Proteins": 11.13, "Fats": 4.5, "Calories": 387},
//   {"Food_items": "Coconut", "Carbohydrates": 15.23, "Proteins": 3.33, "Fats": 33.49, "Calories": 354},
//   {"Food_items": "Lentils", "Carbohydrates": 20.13, "Proteins": 7.54, "Fats": 0.38, "Calories": 116},
//   {"Food_items": "Quinoa", "Carbohydrates": 21.3, "Proteins": 4.4, "Fats": 1.9, "Calories": 120},
//   {"Food_items": "Chickpeas", "Carbohydrates": 27.42, "Proteins": 8.86, "Fats": 2.59, "Calories": 164},
//   {"Food_items": "Black Beans", "Carbohydrates": 23.71, "Proteins": 8.86, "Fats": 0.54, "Calories": 132},
//   {"Food_items": "Kidney Beans", "Carbohydrates": 22.8, "Proteins": 8.67, "Fats": 0.5, "Calories": 127},
//   {"Food_items": "Eggplant", "Carbohydrates": 5.88, "Proteins": 1.01, "Fats": 0.18, "Calories": 25},
//   {"Food_items": "Zucchini", "Carbohydrates": 3.11, "Proteins": 1.21, "Fats": 0.32, "Calories": 17},
//   {"Food_items": "Bell Pepper (Red)", "Carbohydrates": 6.03, "Proteins": 0.99, "Fats": 0.3, "Calories": 26},
//   {"Food_items": "Bell Pepper (Green)", "Carbohydrates": 4.64, "Proteins": 0.91, "Fats": 0.17, "Calories": 20},
//   {"Food_items": "Brussels Sprouts", "Carbohydrates": 8.95, "Proteins": 3.38, "Fats": 0.3, "Calories": 43},
//   {"Food_items": "Beetroot", "Carbohydrates": 9.56, "Proteins": 1.61, "Fats": 0.17, "Calories": 43},
//   {"Food_items": "Celery", "Carbohydrates": 3, "Proteins": 0.69, "Fats": 0.17, "Calories": 14},
//   {"Food_items": "Mushrooms (White)", "Carbohydrates": 3.26, "Proteins": 3.09, "Fats": 0.34, "Calories": 22},
//   {"Food_items": "Green Beans", "Carbohydrates": 7.13, "Proteins": 1.83, "Fats": 0.22, "Calories": 31},
//   {"Food_items": "Pumpkin", "Carbohydrates": 6.5, "Proteins": 1, "Fats": 0.1, "Calories": 26},
//   {"Food_items": "Cabbage", "Carbohydrates": 5.8, "Proteins": 1.28, "Fats": 0.1, "Calories": 25},
//   {"Food_items": "Radish", "Carbohydrates": 3.4, "Proteins": 0.68, "Fats": 0.1, "Calories": 16},
//   {"Food_items": "Chia Seeds", "Carbohydrates": 42.1, "Proteins": 16.54, "Fats": 30.75, "Calories": 486},
//   {"Food_items": "Flax Seeds", "Carbohydrates": 28.88, "Proteins": 18.29, "Fats": 42.16, "Calories": 534},
//   {"Food_items": "Sunflower Seeds", "Carbohydrates": 20, "Proteins": 21, "Fats": 51, "Calories": 584},
//   {"Food_items": "Cashews", "Carbohydrates": 30.19, "Proteins": 18.22, "Fats": 43.85, "Calories": 553},
//   {"Food_items": "Pistachios", "Carbohydrates": 27.17, "Proteins": 20.16, "Fats": 45.39, "Calories": 562},
//   {"Food_items": "Raspberries", "Carbohydrates": 11.94, "Proteins": 1.2, "Fats": 0.65, "Calories": 52},
//   {"Food_items": "Blackberries", "Carbohydrates": 9.61, "Proteins": 1.39, "Fats": 0.49, "Calories": 43},
//   {"Food_items": "Cranberries", "Carbohydrates": 12.2, "Proteins": 0.4, "Fats": 0.1, "Calories": 46},
//   {"Food_items": "Dates", "Carbohydrates": 75.03, "Proteins": 2.45, "Fats": 0.39, "Calories": 282},
//   {"Food_items": "Raisins", "Carbohydrates": 79.18, "Proteins": 3.07, "Fats": 0.46, "Calories": 299},
//   {"Food_items": "Figs (Dried)", "Carbohydrates": 63.87, "Proteins": 3.3, "Fats": 0.93, "Calories": 249},
//   {"Food_items": "Watermelon", "Carbohydrates": 7.55, "Proteins": 0.61, "Fats": 0.15, "Calories": 30},
//   {"Food_items": "Cantaloupe", "Carbohydrates": 8.16, "Proteins": 0.84, "Fats": 0.19, "Calories": 34},
//   {"Food_items": "Papaya", "Carbohydrates": 10.82, "Proteins": 0.47, "Fats": 0.26, "Calories": 43},
//   {"Food_items": "Plums", "Carbohydrates": 11.42, "Proteins": 0.7, "Fats": 0.28, "Calories": 46},
//   {"Food_items": "Peaches", "Carbohydrates": 9.54, "Proteins": 0.91, "Fats": 0.25, "Calories": 39},
//   {"Food_items": "Apricots", "Carbohydrates": 11.12, "Proteins": 1.4, "Fats": 0.39, "Calories": 48},
//   {"Food_items": "Cottage Cheese", "Carbohydrates": 3.38, "Proteins": 11.12, "Fats": 4.3, "Calories": 98},
//   {"Food_items": "Turkey", "Carbohydrates": 0, "Proteins": 29, "Fats": 4.8, "Calories": 135},
//   {"Food_items": "Shrimp", "Carbohydrates": 0.91, "Proteins": 20.31, "Fats": 0.51, "Calories": 84},
//   {"Food_items": "Scallops", "Carbohydrates": 4.01, "Proteins": 20.54, "Fats": 0.95, "Calories": 111},
//   {"Food_items": "Tuna", "Carbohydrates": 0, "Proteins": 29.91, "Fats": 0.6, "Calories": 132},
//   {"Food_items": "Clams", "Carbohydrates": 5.13, "Proteins": 14.67, "Fats": 1.97, "Calories": 74},
//   {"Food_items": "Lamb", "Carbohydrates": 0, "Proteins": 25.6, "Fats": 20.8, "Calories": 294},
//   {"Food_items": "Duck", "Carbohydrates": 0, "Proteins": 19, "Fats": 28, "Calories": 337}
// ];

// const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57'];

// export const NutritionTracker = () => {
//   const getStoredTotals = () => {
//     if (typeof window !== 'undefined') {
//       const savedTotals = JSON.parse(localStorage.getItem('totals'));
//       return savedTotals || { proteins: 0, carbohydrates: 0, fats: 0, calories: 0 };
//     }
//     return { proteins: 0, carbohydrates: 0, fats: 0, calories: 0 }; // Default for server-side
//   };

//   const [totals, setTotals] = useState(getStoredTotals);
//   const [foodName, setFoodName] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedFood, setSelectedFood] = useState(null);

//   const limits = {
//     proteins: 100,  // example limit for proteins
//     carbohydrates: 300,
//     fats: 80,
//     calories: 2500,
//   };

  
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('totals', JSON.stringify(totals));
//     }
//   }, [totals]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedFood) {
//       alert('Please select a valid food item');
//       return;
//     }

//     const multiplier = parseInt(quantity, 10);

//     // Update totals
//     setTotals((prevTotals) => {
//       const quantityInGrams = multiplier; // Replace with the actual variable for user input
//       const newTotals = {
//         proteins: prevTotals.proteins + (selectedFood.Proteins * quantityInGrams) / 100,
//         carbohydrates: prevTotals.carbohydrates + (selectedFood.Carbohydrates * quantityInGrams) / 100,
//         fats: prevTotals.fats + (selectedFood.Fats * quantityInGrams) / 100,
//         calories: prevTotals.calories + (selectedFood.Calories * quantityInGrams) / 100,
//       };
    
//       return newTotals;
//     });
    

//       // Check if any limit is reached
//       // Object.keys(limits).forEach(key => {
//       //   if (newTotals[key] >= limits[key]) {
//       //     alert(`Congratulations! You've reached your ${key} limit!`);
//       //   }
//       // });

//     //   return newTotals;
//     // });

//     setFoodName('');
//     setQuantity(1);
//     setSelectedFood(null); // Reset selected food
//   };

//   const handleFoodNameChange = (e) => {
//     setFoodName(e.target.value);
//     if (e.target.value) {
//       // Filter food items that match the entered characters
//       const matchedItems = foodItems.filter(item => item.Food_items.toLowerCase().includes(e.target.value.toLowerCase()));
//       setSuggestions(matchedItems);
//     } else {
//       setSuggestions([]);
//     }
//   };
//   const makezero = () => {
//     // Reset totals to zero
//     const resetTotals = { proteins: 0, carbohydrates: 0, fats: 0, calories: 0 };
//     setTotals(resetTotals);
  
//     // Update localStorage to reflect the reset
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('totals', JSON.stringify(resetTotals));
//     }
//   };
  
//   const handleFoodSelect = (food) => {
//     setFoodName(food.Food_items);
//     setSelectedFood(food);
//     setSuggestions([]); // Clear suggestions after selection
//   };

//   // Prepare pie chart data for progress visualization
//   const pieChartData = (currentValue, limit) => [
//     { name: 'Progress', value: currentValue },
//     { name: 'Remaining', value: limit - currentValue },
//   ];

//   return (
//     <div className="p-4 max-w-md ml-[50px]">
//       <h1 className="text-2xl font-bold mb-4">Nutrition Tracker</h1>

//       <div className=' flex gap-[200px]'>
//         <div>
        

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>

//               <label htmlFor="foodName" className="block text-sm font-medium">Food Name</label>
//               <input
//                 type="text"
//                 id="foodName"
//                 value={foodName}
//                 onChange={handleFoodNameChange}
//                 className="border px-2 py-1 w-[200px]"
//                 placeholder="Search for food..."
//               />
//               {suggestions.length > 0 && (
//                 <ul className="mt-2 bg-white border max-h-60 overflow-auto">
//                   {suggestions.map((food) => (
//                     <li
//                       key={food.Food_items}
//                       onClick={() => handleFoodSelect(food)}
//                       className="p-2 hover:bg-gray-200 cursor-pointer"
//                     >
//                       {food.Food_items}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div>
//               <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
//               <input
//                 type="number"
//                 id="quantity"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 className="border px-2 py-1 w-full"
//                 min="1"
//               />
//             </div>

//             <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
//               Add to Totals
//             </button>
//             <button
//     onClick={makezero}
//     className="bg-red-500 px-2 py-2 rounded text-white  "
//   >
//     Reset Totals
//   </button>
//           </form>
//         </div>
// <div >

//         <div className="w-[500px] flex gap-6"> {/* Use flex and gap for side-by-side layout */}
//           {/* Proteins Pie Chart */}
//           <div className="mt-4">
 
// </div>   
//           <div className="mb-4 w-[200px]">
//             <h3 className="font-semibold">Proteins</h3>
//             <PieChart width={200} height={200}>
//               <Pie
//                 data={pieChartData(totals.proteins, limits.proteins)}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 label
//               >
//                 {pieChartData(totals.proteins, limits.proteins).map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#e0e0e0'} />
//                 ))}
//               </Pie>
//             </PieChart>
//             <p>{totals.proteins.toFixed(1)} / {limits.proteins} grams</p>
//           </div>

//           {/* Carbohydrates Pie Chart */}
//           <div className="mb-4 w-[200px]">
//             <h3 className="font-semibold">Carbohydrates</h3>
//             <PieChart width={200} height={200}>
//               <Pie
//                 data={pieChartData(totals.carbohydrates, limits.carbohydrates)}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#82ca9d"
//                 label
//               >
//                 {pieChartData(totals.carbohydrates, limits.carbohydrates).map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={index === 0 ? '#8884d8' : '#e0e0e0'} />
//                 ))}
//               </Pie>
//             </PieChart>
//             <p>{totals.carbohydrates.toFixed(1)} / {limits.carbohydrates} grams</p>
//           </div>
//         </div>

//         <div className="w-[500px] flex gap-6"> {/* Use flex and gap for side-by-side layout */}
//           {/* Fats Pie Chart */}
//           <div className="mb-4 w-[200px]">
//             <h3 className="font-semibold">Fats</h3>
//             <PieChart width={200} height={200}>
//               <Pie
//                 data={pieChartData(totals.fats, limits.fats)}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#ffc658"
//                 label
//               >
//                 {pieChartData(totals.fats, limits.fats).map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={index === 0 ? '#ff6347' : '#e0e0e0'} />
//                 ))}
//               </Pie>
//             </PieChart>
//             <p>{totals.fats.toFixed(1)} / {limits.fats} grams</p>
//           </div>

//           {/* Calories Pie Chart */}
//           <div className="mb-4 w-[200px]">
//             <h3 className="font-semibold">Calories</h3>
//             <PieChart width={200} height={200}>
//               <Pie
//                 data={pieChartData(totals.calories, limits.calories)}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#d0ed57"
//                 label
//               >
//                 {pieChartData(totals.calories, limits.calories).map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={index === 0 ? '#ffcc00' : '#e0e0e0'} />
//                 ))}
//               </Pie>
//             </PieChart>
//             <p>{totals.calories.toFixed(1)} / {limits.calories} kcal</p>
//           </div>
//         </div>
//         </div>
//       </div>
//      </div>
//   );
// };


// export default NutritionTracker;
'use client'
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import foodData from '../../../../../backendfordailyprogress/pythontracker/file.json';
import './NutrientTracker.css';

const maxLimits = {
    Calories: 2400,
    Fats: 30,
    Proteins: 100,
    Carbohydrates: 130,
};

const NutrientTracker = () => {
    useEffect(() => {
        const appInitialized = localStorage.getItem('appInitialized');
        if (!appInitialized) {
            localStorage.removeItem('overallProgress'); // Clear progress
            localStorage.setItem('appInitialized', 'true'); // Mark app as initialized
        }
    }, []);

    const [foodItem, setFoodItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [overall, setOverall] = useState(() => {
        const savedProgress = localStorage.getItem('overallProgress');
        return savedProgress
            ? JSON.parse(savedProgress)
            : {
                  Calories: 0,
                  Fats: 0,
                  Proteins: 0,
                  Carbohydrates: 0,
              };
    });

    const [suggestions, setSuggestions] = useState([]);
    const [completionMessage, setCompletionMessage] = useState('');
    const [showResetButton, setShowResetButton] = useState(false);

    const calorieChartRef = useRef(null);
    const carbohydrateChartRef = useRef(null);
    const proteinChartRef = useRef(null);
    const fatChartRef = useRef(null);

    const nutrientCharts = useRef({});

    useEffect(() => {
        const chartConfig = (ctx, label, bgColor) => ({
            type: 'pie',
            data: {
                labels: [`${label} Consumed`, 'Remaining'],
                datasets: [{ data: [0, 100], backgroundColor: [bgColor, '#ddd'] }],
            },
            options: { responsive: false, maintainAspectRatio: false },
        });

        nutrientCharts.current.calories = new Chart(
            calorieChartRef.current,
            chartConfig(calorieChartRef.current, 'Calories', '#f39c12')
        );
        nutrientCharts.current.carbohydrates = new Chart(
            carbohydrateChartRef.current,
            chartConfig(carbohydrateChartRef.current, 'Carbohydrates', '#3498db')
        );
        nutrientCharts.current.proteins = new Chart(
            proteinChartRef.current,
            chartConfig(proteinChartRef.current, 'Proteins', '#2ecc71')
        );
        nutrientCharts.current.fats = new Chart(
            fatChartRef.current,
            chartConfig(fatChartRef.current, 'Fats', '#e74c3c')
        );

        Object.keys(overall).forEach((nutrient) => {
            const percent = (overall[nutrient] / maxLimits[nutrient]) * 100;
            updateChart(nutrient.toLowerCase(), percent);
        });

        return () => {
            Object.values(nutrientCharts.current).forEach((chart) => chart.destroy());
        };
    }, [overall]);

    useEffect(() => {
        const allCompleted = Object.keys(maxLimits).every(
            (key) => overall[key] >= maxLimits[key]
        );
        setShowResetButton(allCompleted);
    }, [overall]);

    const updateChart = (nutrient, percent) => {
        const chart = nutrientCharts.current[nutrient];
        if (chart) {
            chart.data.datasets[0].data = [percent, 100 - percent];
            chart.update();
        }
    };

    const saveProgress = (updatedOverall) => {
        localStorage.setItem('overallProgress', JSON.stringify(updatedOverall));
    };

    const updateProgressAndCharts = (data) => {
        const updatedOverall = { ...overall };
        Object.keys(data.overall).forEach((nutrient) => {
            const percent = (data.overall[nutrient] / maxLimits[nutrient]) * 100;
            updateChart(nutrient.toLowerCase(), percent);

            if (percent >= 100) {
                setCompletionMessage(`${nutrient} completed for today! 🎉`);
            }

            updatedOverall[nutrient] = data.overall[nutrient];
        });

        setOverall(updatedOverall);
        saveProgress(updatedOverall);
    };

    const handleFoodInput = (event) => {
        setFoodItem(event.target.value);
        if (event.target.value.trim()) {
            const filteredSuggestions = foodData
                .filter((item) =>
                    item.Food_items.toLowerCase().includes(event.target.value.toLowerCase())
                )
                .map((item) => item.Food_items);
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setFoodItem(suggestion);
        setSuggestions([]);
    };

    const handleCalculate = () => {
        const item = foodData.find((i) => i.Food_items === foodItem);
        if (!item) {
            alert('Food item not found');
            return;
        }
        const nutrients = {
            Calories: (item.Calories * quantity) / 100,
            Fats: (item.Fats * quantity) / 100,
            Proteins: (item.Proteins * quantity) / 100,
            Carbohydrates: (item.Carbohydrates * quantity) / 100,
        };

        const updatedOverall = { ...overall };
        Object.keys(nutrients).forEach((key) => {
            updatedOverall[key] = Math.min(updatedOverall[key] + nutrients[key], maxLimits[key]);
        });

        setOverall(updatedOverall);
        saveProgress(updatedOverall);
        updateProgressAndCharts({ overall: updatedOverall });
    };

    const resetProgress = () => {
        const resetOverall = {
            Calories: 0,
            Fats: 0,
            Proteins: 0,
            Carbohydrates: 0,
        };
        setOverall(resetOverall);
        saveProgress(resetOverall);
        Object.keys(resetOverall).forEach((nutrient) => updateChart(nutrient.toLowerCase(), 0));
        setCompletionMessage('');
    };

    return (
        <div>
            <h1>Nutrient Tracker</h1>

            <div id="main-container">
                <div id="charts-section">
                    <div className="chart-container">
                        <canvas ref={calorieChartRef}></canvas>
                        <p>Calories</p>
                    </div>
                    <div className="chart-container">
                        <canvas ref={carbohydrateChartRef}></canvas>
                        <p>Carbohydrates</p>
                    </div>
                    <div className="chart-container">
                        <canvas ref={proteinChartRef}></canvas>
                        <p>Proteins</p>
                    </div>
                    <div className="chart-container">
                        <canvas ref={fatChartRef}></canvas>
                        <p>Fats</p>
                    </div>
                </div>

                <div id="input-section">
                    <input
                        type="text"
                        id="food-item"
                        value={foodItem}
                        onChange={handleFoodInput}
                        className='border'
                        placeholder="Type a food item"
                    />
                    <ul className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                         className='border'
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity (e.g., grams)"
                    />
                    <button id="calculate-btn" onClick={handleCalculate}>
                        Calculate
                    </button>
                </div>

                <div id="tracker">
                    {Object.keys(maxLimits).map((nutrient) => (
                        <div key={nutrient} className="nutrient-row">
                            <div className="nutrient-btn">
                                <span className="nutrient-percentage">
                                    {((overall[nutrient] / maxLimits[nutrient]) * 100).toFixed(0)}%
                                </span>
                                <span className="nutrient-name">{nutrient}</span>
                                <span className="nutrient-intake">
                                    {overall[nutrient].toFixed(2)}/{maxLimits[nutrient]}
                                </span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress"
                                    style={{
                                        width: `${(overall[nutrient] / maxLimits[nutrient]) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {completionMessage && <div id="completion-message">{completionMessage}</div>}

            {showResetButton && (
                <div id="reset-section">
                    <button id="reset-btn" onClick={resetProgress}>
                        Set to Zero
                    </button>
                </div>
            )}
        </div>
    );
};

export default NutrientTracker;