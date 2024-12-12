"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Search } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Organic Fertilizer",
    price: 29.99,
    category: "Fertilizers",
    image: "https://media.istockphoto.com/id/967945790/photo/organic-manure.webp?a=1&b=1&s=612x612&w=0&k=20&c=D-zhdQSE7HN9riZVSlSqXdmvEJm3PXDDz_PYc7cfbjE=",
  },
  {
    id: 2,
    name: "Eco-Friendly Pesticide",
    price: 19.99,
    category: "Pesticides",
    image: "https://media.istockphoto.com/id/805830962/photo/farmer-working-in-wheat-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=oeKrU19N43m5B_Ynp0fw3u9eXvQsAF6HPUPkF6xTUoU=",
  },
  {
    id: 3,
    name: "High-Yield Seeds",
    price: 9.99,
    category: "Seeds",
    image: "https://media.istockphoto.com/id/1330424959/photo/field-of-sunflowers.webp?a=1&b=1&s=612x612&w=0&k=20&c=LF5u9WA7p4W4Vk-d-b8Fllk212JdWAP1fJBYJ5z_IDc=",
  },
  {
    id: 4,
    name: "Soil pH Tester",
    price: 39.99,
    category: "Tools",
    image: "https://media.istockphoto.com/id/2153068887/photo/diverse-scientists-conducting-ph-test-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=mI2f7oO9mtMUu1z2qtWTzYgo6haMdQGTy9oonqV1DJo=",
  },
  {
    id: 5,
    name: "Drip Irrigation Kit",
    price: 89.99,
    category: "Equipment",
    image: "https://media.istockphoto.com/id/172376972/photo/carrot-farm.webp?a=1&b=1&s=612x612&w=0&k=20&c=sbfkt3_9c2UrcPGgvMZOKlD3_LUvtbsAgEYS7OOM6I4=",
  },
  {
    id: 6,
    name: "Compost Accelerator",
    price: 14.99,
    category: "Fertilizers",
    image: "https://media.istockphoto.com/id/2156837747/photo/a-recycling-bin-for-vegetable-waste.webp?a=1&b=1&s=612x612&w=0&k=20&c=e55BLTmEuE04jYgBbrob3WvqwhdoKknAMehSDbSBPOI=",
  },
];

const categories = ["All", "Fertilizers", "Pesticides", "Seeds", "Tools", "Equipment"];

export default function FarmerStore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: any) => {
    const newCart: any = [...cart, product];
    setCart(newCart);
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-b from-green-50 to-white">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-center text-emerald-800">Farmer's Store</h1>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <Button variant="outline" className="relative flex items-center">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`text-sm font-medium rounded-full px-4 py-2 ${selectedCategory === category ? "bg-emerald-600 text-white" : "text-emerald-600 border-emerald-600"
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col bg-white justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg rounded-lg overflow-hidden"
          >
            <CardHeader className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold text-emerald-800">{product.name}</CardTitle>
              <p className="text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
