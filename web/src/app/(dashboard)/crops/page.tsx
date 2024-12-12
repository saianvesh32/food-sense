'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

const crops = [
  {
    id: 1,
    name: "chips",
    image: "https://images.pexels.com/photos/479628/pexels-photo-479628.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A staple grain crop.",
    
    nutritional_value: {
      carbohydrates: "71 g",
      protein: "13 g",
      fiber: "12 g"
    },
   
  },
  {
    id: 2,
    name: "pizza",
    image: "https://images.pexels.com/photos/1166120/pexels-photo-1166120.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Versatile crop for food and fuel.",
   
    nutritional_value: {
      carbohydrates: "73 g",
      protein: "9 g",
      fiber: "7 g"
    }
  },
  {
    id: 3,
    name: "burger",
    image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Major food source for many cultures.",
   
    nutritional_value: {
      carbohydrates: "80 g",
      protein: "2.7 g",
      fiber: "<1 g"
    }
  },
  {
    id: 4,
    name: "noodles",
    image: "https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Protein-rich legume crop.",
    
    nutritional_value: {
      carbohydrates: "9 g",
      protein: "36 g",
      fat: "20 g"
    }
  },
  {
    id: 5,
    name: "pasta",
    image: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Starchy tuber vegetable",

    nutritional_value: {
      carbohydrates: "17 g",
      protein: "2 g",
      fiber: "2 g"
    }
  },
  {
    id: 6,
    name: "manchuria",
    image: "https://images.pexels.com/photos/28674543/pexels-photo-28674543/free-photo-of-spicy-indo-chinese-gobi-manchurian-dish.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Popular fruit often used as a vegetable.",
    nutritional_value: {
      carbohydrates: "4 g",
      protein: "1 g",
      fiber: "1 g"
    }
  },
  {
    id: 7,
    name: "chicken rolls",
    image: "https://images.pexels.com/photos/6416559/pexels-photo-6416559.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Leafy green vegetable.",
   
    nutritional_value: {
      carbohydrates: "2 g",
      protein: "1 g",
      fiber: "1 g"
    }
   
  },
  {
    id: 8,
    name: "chicken 65",
    image:"data:image/jpeg;base64,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",
    description: "Root vegetable rich in beta-carotene.",
    nutritional_value: {
      carbohydrates: "10 g",
      protein: "1 g",
      fiber: "3 g"
    }
  }

]




export default function Component() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-green-50 to-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-emerald-800">Food Items</h1>
      
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search crops..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-emerald-500" />
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredCrops.map((crop) => (
          <motion.div
          onClick={() => window.location.href = `/crops/${crop.id}`}
            key={crop.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            whileHover={{ scale: 1.03 }}
            layout
          >
            <img src={crop.image} alt={crop.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-emerald-800 mb-2">{crop.name}</h2>
              <p className="text-gray-600">{crop.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredCrops.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No crops found. Try a different search term.</p>
      )}
    </div>
  )
}