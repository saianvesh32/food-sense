"use client"
import React, { useState, useRef } from 'react'
import Image from "next/image"
import { Leaf, Apple, Globe } from "lucide-react"
import TextToSpeech from "@/components/TextToSpeech";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function page({ params }: any) {
  const languages = [
    { code: "ENG", name: "English" },
    { code: "hindi", name: "Hindi" },
    { code: "telugu", name: "Telugu" },
    { code: "tamil", name: "Tamil" },
    { code: "kannada", name: "Kannada" },
  ];
  const [lang, setLang] = useState("ENG");
  const audioRef: any = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const foods = [
    {
      id: 1,
      name: "chips",
      image: "https://images.pexels.com/photos/479628/pexels-photo-479628.jpeg?auto=compress&cs=tinysrgb&w=600",
      fact1: "Chips are made from potatoes and are often fried in oil.",
      fact2: "They are a popular snack worldwide, often served with dips.",
      fact3: "Chips can be seasoned with various spices, including salt, vinegar, or cheese.",
      nutritional_value: {
        carbohydrates: "71 g",
        protein: "13 g",
        fiber: "12 g"
      }
    },
    {
      id: 2,
      name: "pizza",
      image: "https://images.pexels.com/photos/1166120/pexels-photo-1166120.jpeg?auto=compress&cs=tinysrgb&w=600",
      fact1: "Pizza is believed to have originated in Italy.",
      fact2: "It typically consists of a dough base, tomato sauce, cheese, and various toppings.",
      fact3: "Different regions have their own styles of pizza, such as New York or Chicago-style.",
      nutritional_value: {
        carbohydrates: "73 g",
        protein: "9 g",
        fiber: "7 g"
      }
    },
    // Other food objects...
  ];

  const food = foods.find((crop) => crop.id == params.id)
  if (!food) {
    console.log("food not found")
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <Image
              src={food?.image || ""}
              alt={food?.name || ""}
              layout="fill"
              objectFit="cover"
              className="object-center"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
              <h1 className="text-4xl sm:text-5xl font-bold text-white p-6">{food?.name}</h1>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    Facts about {food?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <p>{food?.fact1}</p>
                    </div>
                    <div>
                      <p>{food?.fact2}</p>
                    </div>
                    <div>
                      <p>{food?.fact3}</p>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="h-5 w-5 text-red-500" />
                    Nutritional Value
                  </CardTitle>
                  <CardDescription>(per 100g)</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="font-semibold">Carbohydrates:</dt>
                      <dd>{food?.nutritional_value.carbohydrates}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Protein:</dt>
                      <dd>{food?.nutritional_value.protein}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Fiber:</dt>
                      <dd>{food?.nutritional_value.fiber}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center mt-6">
              <audio
                ref={audioRef}
                src={`/images/${lang}.mp3`}
                className="hidden"
              />
              {lang === "ENG" ? (
                <TextToSpeech
                  originalText={`Facts about ${food?.name}: ${food?.fact1}, ${food?.fact2}, ${food?.fact3}. Nutritional values: Carbohydrates: ${food?.nutritional_value.carbohydrates}, Protein: ${food?.nutritional_value.protein}, Fiber: ${food?.nutritional_value.fiber}`}
                  onLanguageChange={(translatedText) => {
                    console.log("Translated text:", translatedText);
                  }}
                />
              ) : (
                <button
                  onClick={togglePlay}
                  className={`flex items-center justify-center w-8 h-8 rounded-full bg-background text-black shadow-md hover:bg-background focus:outline-none focus:ring-2 focus:ring-background-400 focus:ring-opacity-50 transition-all duration-300`}
                >
                  {isPlaying ? (
                    // Stop icon (pause)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 19H6V5h4v14zm8-14h-4v14h4V5z" />
                    </svg>
                  ) : (
                    // Play icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              )}
              <Select value={lang} onValueChange={setLang}>
                <SelectTrigger className="w-[130px] h-8">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {languages.map((lang) => (
                    <SelectItem
                      key={lang.code}
                      value={lang.code}
                      onClick={() => setLang(lang.code)}
                    >
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
