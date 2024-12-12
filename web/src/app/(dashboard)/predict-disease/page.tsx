"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Upload,
  Loader2,
  Leaf,
  AlertTriangle,
  CheckCircle2,
  Info,
  Globe,
} from "lucide-react";
import TextToSpeech from "@/components/TextToSpeech";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const crops = [
  { value: "potato", label: "Potato", icon: "🥔" },
  { value: "tomato", label: "Tomato", icon: "🍅" },
  { value: "corn", label: "Corn", icon: "🌽" },
  { value: "wheat", label: "Wheat", icon: "🌾" },
  { value: "rice", label: "Rice", icon: "🍚" },
];

const mockPrediction = {
  disease: "Late Blight",
  confidence: 0.92,
  severity: "High",
  description:
    "Late blight is a devastating disease of potato and tomato caused by the oomycete pathogen Phytophthora infestans. It can destroy entire fields within days under favorable weather conditions.",
  recommendations: [
    "Remove and destroy all infected plant parts",
    "Apply fungicides preventatively",
    "Improve air circulation by proper spacing and pruning",
    "Use resistant varieties when available",
  ],
  preventiveMeasures: [
    "Plant disease-resistant varieties",
    "Practice crop rotation",
    "Ensure proper plant spacing for good air circulation",
    "Avoid overhead irrigation",
  ],
};

export default function CropDiseasePredictor() {
  const [selectedCrop, setSelectedCrop] = useState("potato");
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<typeof mockPrediction | null>(
    null
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const languages = [
    { code: "ENG", name: "English" },
    { code: "hindi", name: "Hindi" },
    { code: "telugu", name: "Telugu" },
    { code: "tamil", name: "Tamil" },
    { code: "kannada", name: "Kannada" },
  ];
  const [lang, setLang] = useState("ENG");

  const handlePredict = async () => {
    setIsLoading(true);
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPrediction(mockPrediction);
    setIsLoading(false);
  };

  const audioRef:any = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            Crop Disease Predictor
          </CardTitle>
          <CardDescription>
            Identify potential diseases in your crops and get expert
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="crop" className="text-lg font-semibold">
                  Crop Type
                </Label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a crop" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {crops.map((crop) => (
                      <SelectItem key={crop.value} value={crop.value}>
                        <span className="flex items-center gap-2">
                          {crop.icon} {crop.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="picture" className="text-lg font-semibold">
                  Crop Image
                </Label>
                <div className="mt-1">
                  <input
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label
                    htmlFor="picture"
                    className="cursor-pointer flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {image ? (
                      <Image
                        src={image}
                        alt="Uploaded crop"
                        width={200}
                        height={200}
                        className="max-h-full w-auto rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <span className="mt-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Upload an image
                        </span>
                      </div>
                    )}
                  </Label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Tip</AlertTitle>
                <AlertDescription>
                  For best results, upload a clear, well-lit image focusing on
                  the affected area of the plant.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handlePredict}
            disabled={!image || isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Predict Disease"
            )}
          </Button>
        </CardFooter>
      </Card>

      {prediction && (
        <Card className="mt-8 bg-white dark:bg-gray-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">
                Prediction Results
              </CardTitle>
              <div className="flex items-center gap-2">
                <audio
                  ref={audioRef}
                  src={`/images/${lang}.mp3`}
                  className="hidden"
                />
                {lang === "ENG" ? (
                  <TextToSpeech
                    originalText={`Disease detected: ${prediction.disease}. 
                        Description: ${prediction.description}. 
                        Recommendations: ${prediction.recommendations.join(
                          ". "
                        )}`}
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
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Detected Disease: {prediction.disease}
              </h3>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Confidence
                </p>
                <div className="flex items-center gap-2">
                  <Progress
                    value={prediction.confidence * 100}
                    className="w-24"
                  />
                  <span className="font-semibold">
                    {(prediction.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
            <Alert
              variant={
                prediction.severity === "High" ? "destructive" : "default"
              }
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Severity: {prediction.severity}</AlertTitle>
              <AlertDescription>
                This disease requires immediate attention and treatment.
              </AlertDescription>
            </Alert>
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="recommendations">
                  Recommendations
                </TabsTrigger>
                <TabsTrigger value="prevention">Prevention</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" /> About the Disease
                </h4>
                <p>{prediction.description}</p>
              </TabsContent>
              <TabsContent value="recommendations" className="mt-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Treatment Recommendations
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="prevention" className="mt-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Leaf className="h-4 w-4" /> Preventive Measures
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {prediction.preventiveMeasures.map((measure, index) => (
                    <li key={index}>{measure}</li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
