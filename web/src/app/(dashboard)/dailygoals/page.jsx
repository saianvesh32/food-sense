'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const foodData = {
  Apple: { Calories: 52, Fats: 0.2, Proteins: 0.3, Carbohydrates: 14 },
  Banana: { Calories: 89, Fats: 0.3, Proteins: 1.1, Carbohydrates: 23 },
  Rice: { Calories: 130, Fats: 0.3, Proteins: 2.7, Carbohydrates: 28 },
  Chicken: { Calories: 239, Fats: 14, Proteins: 27, Carbohydrates: 0 },
};

export default function NutrientTracker() {
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [overall, setOverall] = useState({
    Calories: 0,
    Fats: 0,
    Proteins: 0,
    Carbohydrates: 0,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('overallProgress');
    if (saved) {
      setOverall(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('overallProgress', JSON.stringify(overall));
    }
  }, [overall, loaded]);

  const handleAdd = () => {
    if (!selectedFood || !quantity || isNaN(quantity)) return;

    const nutrients = foodData[selectedFood];
    const multiplier = parseFloat(quantity) / 100;

    setOverall(prev => ({
      Calories: prev.Calories + nutrients.Calories * multiplier,
      Fats: prev.Fats + nutrients.Fats * multiplier,
      Proteins: prev.Proteins + nutrients.Proteins * multiplier,
      Carbohydrates: prev.Carbohydrates + nutrients.Carbohydrates * multiplier,
    }));

    setSelectedFood('');
    setQuantity('');
  };

  if (!loaded) return null; // or a loading spinner if you want

  // Prepare data for the chart
  const data = [
    { name: 'Calories', value: overall.Calories },
    { name: 'Fats (g)', value: overall.Fats },
    { name: 'Proteins (g)', value: overall.Proteins },
    { name: 'Carbohydrates (g)', value: overall.Carbohydrates },
  ];

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Nutrient Tracker</h1>

      <div className="mb-6 flex gap-2 justify-center">
        <select
          value={selectedFood}
          onChange={e => setSelectedFood(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Food</option>
          {Object.keys(foodData).map(food => (
            <option key={food} value={food}>{food}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity (grams)"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="border p-2 rounded w-28"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-center">Overall Progress</h2>
        <ul className="list-disc list-inside text-center mb-6">
          <li>Calories: {overall.Calories.toFixed(2)}</li>
          <li>Fats: {overall.Fats.toFixed(2)} g</li>
          <li>Proteins: {overall.Proteins.toFixed(2)} g</li>
          <li>Carbohydrates: {overall.Carbohydrates.toFixed(2)} g</li>
        </ul>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}



// 'use client'
// import React, { useEffect, useState, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import foodData from '../../../../../backendfordailyprogress/pythontracker/file.json';
// import './NutrientTracker.css';

// const maxLimits = {
//     Calories: 2400,
//     Fats: 30,
//     Proteins: 100,
//     Carbohydrates: 130,
// };

// const NutrientTracker = () => {
//     useEffect(() => {
//         const appInitialized = localStorage.getItem('appInitialized');
//         if (!appInitialized) {
//             localStorage.removeItem('overallProgress'); // Clear progress
//             localStorage.setItem('appInitialized', 'true'); // Mark app as initialized
//         }
//     }, []);

//     const [foodItem, setFoodItem] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [overall, setOverall] = useState(() => {
//         const savedProgress = localStorage.getItem('overallProgress');
//         return savedProgress
//             ? JSON.parse(savedProgress)
//             : {
//                   Calories: 0,
//                   Fats: 0,
//                   Proteins: 0,
//                   Carbohydrates: 0,
//               };
//     });

//     const [suggestions, setSuggestions] = useState([]);
//     const [completionMessage, setCompletionMessage] = useState('');
//     const [showResetButton, setShowResetButton] = useState(false);

//     const calorieChartRef = useRef(null);
//     const carbohydrateChartRef = useRef(null);
//     const proteinChartRef = useRef(null);
//     const fatChartRef = useRef(null);

//     const nutrientCharts = useRef({});

//     useEffect(() => {
//         const chartConfig = (ctx, label, bgColor) => ({
//             type: 'pie',
//             data: {
//                 labels: [`${label} Consumed`, 'Remaining'],
//                 datasets: [{ data: [0, 100], backgroundColor: [bgColor, '#ddd'] }],
//             },
//             options: { responsive: false, maintainAspectRatio: false },
//         });

//         nutrientCharts.current.calories = new Chart(
//             calorieChartRef.current,
//             chartConfig(calorieChartRef.current, 'Calories', '#f39c12')
//         );
//         nutrientCharts.current.carbohydrates = new Chart(
//             carbohydrateChartRef.current,
//             chartConfig(carbohydrateChartRef.current, 'Carbohydrates', '#3498db')
//         );
//         nutrientCharts.current.proteins = new Chart(
//             proteinChartRef.current,
//             chartConfig(proteinChartRef.current, 'Proteins', '#2ecc71')
//         );
//         nutrientCharts.current.fats = new Chart(
//             fatChartRef.current,
//             chartConfig(fatChartRef.current, 'Fats', '#e74c3c')
//         );

//         Object.keys(overall).forEach((nutrient) => {
//             const percent = (overall[nutrient] / maxLimits[nutrient]) * 100;
//             updateChart(nutrient.toLowerCase(), percent);
//         });

//         return () => {
//             Object.values(nutrientCharts.current).forEach((chart) => chart.destroy());
//         };
//     }, [overall]);

//     useEffect(() => {
//         const allCompleted = Object.keys(maxLimits).every(
//             (key) => overall[key] >= maxLimits[key]
//         );
//         setShowResetButton(allCompleted);
//     }, [overall]);

//     const updateChart = (nutrient, percent) => {
//         const chart = nutrientCharts.current[nutrient];
//         if (chart) {
//             chart.data.datasets[0].data = [percent, 100 - percent];
//             chart.update();
//         }
//     };

//     const saveProgress = (updatedOverall) => {
//         localStorage.setItem('overallProgress', JSON.stringify(updatedOverall));
//     };

//     const updateProgressAndCharts = (data) => {
//         const updatedOverall = { ...overall };
//         Object.keys(data.overall).forEach((nutrient) => {
//             const percent = (data.overall[nutrient] / maxLimits[nutrient]) * 100;
//             updateChart(nutrient.toLowerCase(), percent);

//             if (percent >= 100) {
//                 setCompletionMessage(`${nutrient} completed for today! 🎉`);
//             }

//             updatedOverall[nutrient] = data.overall[nutrient];
//         });

//         setOverall(updatedOverall);
//         saveProgress(updatedOverall);
//     };

//     const handleFoodInput = (event) => {
//         setFoodItem(event.target.value);
//         if (event.target.value.trim()) {
//             const filteredSuggestions = foodData
//                 .filter((item) =>
//                     item.Food_items.toLowerCase().includes(event.target.value.toLowerCase())
//                 )
//                 .map((item) => item.Food_items);
//             setSuggestions(filteredSuggestions);
//         } else {
//             setSuggestions([]);
//         }
//     };

//     const handleSuggestionClick = (suggestion) => {
//         setFoodItem(suggestion);
//         setSuggestions([]);
//     };

//     const handleCalculate = () => {
//         const item = foodData.find((i) => i.Food_items === foodItem);
//         if (!item) {
//             alert('Food item not found');
//             return;
//         }
//         const nutrients = {
//             Calories: (item.Calories * quantity) / 100,
//             Fats: (item.Fats * quantity) / 100,
//             Proteins: (item.Proteins * quantity) / 100,
//             Carbohydrates: (item.Carbohydrates * quantity) / 100,
//         };

//         const updatedOverall = { ...overall };
//         Object.keys(nutrients).forEach((key) => {
//             updatedOverall[key] = Math.min(updatedOverall[key] + nutrients[key], maxLimits[key]);
//         });

//         setOverall(updatedOverall);
//         saveProgress(updatedOverall);
//         updateProgressAndCharts({ overall: updatedOverall });
//     };

//     const resetProgress = () => {
//         const resetOverall = {
//             Calories: 0,
//             Fats: 0,
//             Proteins: 0,
//             Carbohydrates: 0,
//         };
//         setOverall(resetOverall);
//         saveProgress(resetOverall);
//         Object.keys(resetOverall).forEach((nutrient) => updateChart(nutrient.toLowerCase(), 0));
//         setCompletionMessage('');
//     };

//     return (
//         <div>
//             <h1>Nutrient Tracker</h1>

//             <div id="main-container">
//                 <div id="charts-section">
//                     <div className="chart-container">
//                         <canvas ref={calorieChartRef}></canvas>
//                         <p>Calories</p>
//                     </div>
//                     <div className="chart-container">
//                         <canvas ref={carbohydrateChartRef}></canvas>
//                         <p>Carbohydrates</p>
//                     </div>
//                     <div className="chart-container">
//                         <canvas ref={proteinChartRef}></canvas>
//                         <p>Proteins</p>
//                     </div>
//                     <div className="chart-container">
//                         <canvas ref={fatChartRef}></canvas>
//                         <p>Fats</p>
//                     </div>
//                 </div>

//                 <div id="input-section">
//                     <input
//                         type="text"
//                         id="food-item"
//                         value={foodItem}
//                         onChange={handleFoodInput}
//                         className='border'
//                         placeholder="Type a food item"
//                     />
//                     <ul className="suggestions">
//                         {suggestions.map((suggestion, index) => (
//                             <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
//                                 {suggestion}
//                             </li>
//                         ))}
//                     </ul>
//                     <input
//                         type="number"
//                         id="quantity"
//                         value={quantity}
//                          className='border'
//                         onChange={(e) => setQuantity(e.target.value)}
//                         placeholder="Quantity (e.g., grams)"
//                     />
//                     <button id="calculate-btn" onClick={handleCalculate}>
//                         Calculate
//                     </button>
//                 </div>

//                 <div id="tracker">
//                     {Object.keys(maxLimits).map((nutrient) => (
//                         <div key={nutrient} className="nutrient-row">
//                             <div className="nutrient-btn">
//                                 <span className="nutrient-percentage">
//                                     {((overall[nutrient] / maxLimits[nutrient]) * 100).toFixed(0)}%
//                                 </span>
//                                 <span className="nutrient-name">{nutrient}</span>
//                                 <span className="nutrient-intake">
//                                     {overall[nutrient].toFixed(2)}/{maxLimits[nutrient]}
//                                 </span>
//                             </div>
//                             <div className="progress-bar">
//                                 <div
//                                     className="progress"
//                                     style={{
//                                         width: `${(overall[nutrient] / maxLimits[nutrient]) * 100}%`,
//                                     }}
//                                 ></div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {completionMessage && <div id="completion-message">{completionMessage}</div>}

//             {showResetButton && (
//                 <div id="reset-section">
//                     <button id="reset-btn" onClick={resetProgress}>
//                         Set to Zero
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default NutrientTracker;