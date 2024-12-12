'use client'

import React, { useState, useEffect } from 'react';
import { Pause, Play, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TextToSpeechProps {
  originalText: string;
  onLanguageChange?: (translatedText: string) => void;
}

// Supported languages
const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'kn', name: 'Kannada' },
];

const TextToSpeech: React.FC<TextToSpeechProps> = ({ 
  originalText,
  onLanguageChange 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynth, setSpeechSynth] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState(originalText);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynth(window.speechSynthesis);
      
      // Initialize voices
      const loadVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (speechSynth) {
        speechSynth.cancel();
      }
    };
  }, []);

  useEffect(() => {
    setTranslatedText(originalText);
  }, [originalText]);

  useEffect(() => {
    if (translatedText) {
      const newUtterance = new SpeechSynthesisUtterance(translatedText);
      
      // Find appropriate voice for the selected language
      const availableVoice = voices.find(voice => 
        voice.lang.toLowerCase().includes(currentLanguage.toLowerCase())
      );
      if (availableVoice) {
        newUtterance.voice = availableVoice;
      }
      
      newUtterance.lang = currentLanguage;
      newUtterance.onend = () => setIsPlaying(false);
      setUtterance(newUtterance);
    }
  }, [translatedText, currentLanguage, voices]);

  const translateText = async (targetLang) => {
    try {
      // Google Translate API direct call (simplified without widget script)
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(originalText)}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Translation failed with status ${response.status}`);
      }
  
      const data = await response.json();
      const translated = data[0].map((item) => item[0]).join('');
  
      setTranslatedText(translated);
      onLanguageChange?.(translated); // Callback for translated text
      return translated;
    } catch (error) {
      console.error("Translation error:", error);
      return originalText;
    }
  };
  
  const handleLanguageChange = async (langCode) => {
    setCurrentLanguage(langCode);
    if (langCode !== "en") {
      await translateText(langCode);
    } else {
      setTranslatedText(originalText);
      onLanguageChange?.(originalText);
    }
  };
  

  const toggleSpeech = () => {
    if (!translatedText || !speechSynth) return;

    if (isPlaying) {
      speechSynth.cancel();
      setIsPlaying(false);
    } else {
      speechSynth.cancel();
      utterance && speechSynth.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={toggleSpeech}
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default TextToSpeech;