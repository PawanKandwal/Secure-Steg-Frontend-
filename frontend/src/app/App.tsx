import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  ImagePlus,
  X,
  Upload,
  Download,
  Lock,
  Unlock,
  Settings as SettingsIcon,
  Sun,
  Moon,
  Sparkles,
  Volume2,
  VolumeX,
  Music,
  Languages,
  UserRound,
  Check,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";

import {
  hideMessage,
  revealMessage,
  SecureStegApiError,
} from "../api/secureStegApi";

import pikachuFallback from "../assets/pokemon-pikachu.png";
import PokemonCorner from "./pokemon/PokemonCorner";

// ─────────────────────────────────────────────────────────────────────────
// STICKER / POKÉMON SOURCE SWITCH
//
// true  -> Pokémon mode
//         - random Pokémon on Upload button
//         - floating Pokémon
//         - Pokéball / Pokédex system
//
// false -> Sticker mode
//         - random local sticker on Upload button
//         - floating local stickers
//         - Pokéball / Pokédex hidden
//
// The application's Settings menu now controls whether the Pokémon
// functionality is actually rendered.
//
// ─────────────────────────────────────────────────────────────────────────

const USE_POKEMON = true;

// true  -> floating stickers can be grabbed and dragged
// false -> floating stickers are not interactive
const INTERACTIVE_STICKERS = true;


// Change this to `false` to completely hide the Pokémon theme option from the UI
const ENABLE_POKEMON_THEME = true;

// ─────────────────────────────────────────────────────────────────────────
// POKÉMON LIST
// ─────────────────────────────────────────────────────────────────────────

const POKEMON_IDS = [
  25,
  1,
  7,
  6,
  39,
  94,
  133,
  143,
  54,
  4,
  152,
  155,
  158,
  175,
  183,
  196,
  197,
  2,
  3,
  5,
  8,
  9,
  10,
  13,
  16,
  19,
  21,
  23,
  27,
  29,
  32,
  35,
  37,
  41,
  43,
  46,
  48,
  50,
  52,
  56,
  58,
  60,
  63,
  66,
  69,
  72,
  74,
  77,
  79,
  81,
  83,
  84,
  86,
  88,
  90,
  92,
  95,
  96,
  98,
  100,
  102,
  104,
  107,
  108,
  109,
  111,
  113,
  114,
  115,
  116,
  118,
  120,
  122,
  123,
  124,
  125,
  126,
  127,
  128,
  129,
  130,
  131,
  132,
  134,
  135,
  136,
  137,
  138,
  140,
  142,
  144,
  145,
  146,
  147,
  148,
  149,
  150,
  151,
  153,
  154,
  156,
  157,
  159,
  160,
  161,
  163,
  165,
  167,
  170,
  172,
  173,
  174,
  176,
  177,
  179,
  181,
  182,
  184,
  185,
  186,
  187,
  190,
  191,
  193,
  194,
  198,
  199,
  200,
  201,
  202,
];

// ─────────────────────────────────────────────────────────────────────────
// LOCAL STICKERS
// ─────────────────────────────────────────────────────────────────────────

const stickerModules = import.meta.glob<string>(
  "../assets/stickers/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const STICKER_URLS = Object.values(stickerModules);

// ─────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────

function randomItem<T>(items: T[]): T | null {
  if (items.length === 0) return null;

  return items[Math.floor(Math.random() * items.length)];
}

// ─────────────────────────────────────────────────────────────────────────
// UPLOAD BUTTON IMAGE
// ─────────────────────────────────────────────────────────────────────────

function getUploadSticker(): string {
  if (USE_POKEMON) {
    const randomPokemonId =
      randomItem(POKEMON_IDS) ?? 25;

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPokemonId}.png`;
  }

  return (
    randomItem(STICKER_URLS) ??
    pikachuFallback
  );
}

const UPLOAD_STICKER_URL =
  getUploadSticker();

// ─────────────────────────────────────────────────────────────────────────
// FLOATING BACKGROUND
// ─────────────────────────────────────────────────────────────────────────

const STICKER_SLOT_COUNT = 151;

const STICKER_SLOTS = Array.from(
  {
    length: STICKER_SLOT_COUNT,
  },
  (_, i) => i,
);

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [
      copy[j],
      copy[i],
    ];
  }

  return copy;
}

// New Pokémon order on every page refresh.
const RANDOM_POKEMON_IDS =
  shuffled(POKEMON_IDS);

// ─────────────────────────────────────────────────────────────────────────
// FLOATING IMAGE SOURCE
// ─────────────────────────────────────────────────────────────────────────

function getFloatingImageSource(
  index: number,
): string | null {
  if (USE_POKEMON) {
    const id =
      RANDOM_POKEMON_IDS[
        index % RANDOM_POKEMON_IDS.length
      ];

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  if (STICKER_URLS.length > 0) {
    return STICKER_URLS[
      index % STICKER_URLS.length
    ];
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────
// FLOATING STICKER CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────

function getStickerConfig(index: number) {
  const h =
    (index * 2654435761) >>> 0;

  const left =
    (h % 94) + 1;

  const delay =
    ((h >> 4) % 220) / 10;

  const duration =
    10 + ((h >> 8) % 80) / 10;

  const size =
    55 + ((h >> 12) % 55);

  const drift =
    ((h >> 16) % 40) - 20;

  const src =
    getFloatingImageSource(index);

  return {
    index,
    src,
    left: `${left}%`,
    delay: `${delay}s`,
    duration: `${duration}s`,
    size,
    drift,
  };
}

const CONFIGS =
  STICKER_SLOTS.map((i) =>
    getStickerConfig(i),
  );

type Mode = "hide" | "reveal";

type AppTheme =
  | "pokemon"
  | "light"
  | "dark";

type AppLanguage =
  | "en"
  | "ja"
  | "hi";

const SETTINGS_STORAGE_KEY =
  "secure-steg-settings";

// ─────────────────────────────────────────────────────────────────────────
// POKÉMON SETTINGS PANEL ARTWORK
// ─────────────────────────────────────────────────────────────────────────

const POKEMON_SETTINGS_ART = {
  pikachu:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",

  bulbasaur:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",

  charmander:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",

  squirtle:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
};

// ─────────────────────────────────────────────────────────────────────────
// MUSIC PLAYLIST
// ─────────────────────────────────────────────────────────────────────────

const MUSIC_ASSETS = import.meta.glob<string>(
  "../assets/music/*.mp3",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const MUSIC_PLAYLIST = [
  {
    title: "Littleroot Town",
    src: MUSIC_ASSETS[
      "../assets/music/01 - Littleroot Town.mp3"
    ],
  },
  {
    title: "Surfing Theme",
    src: MUSIC_ASSETS[
      "../assets/music/02 - Surfing Theme.mp3"
    ],
  },
  {
    title: "Fortree City",
    src: MUSIC_ASSETS[
      "../assets/music/03 - Fortree City.mp3"
    ],
  },
  {
    title: "Professor Birch's Lab Theme",
    src: MUSIC_ASSETS[
      "../assets/music/04 - Professor Birch's Lab Theme.mp3"
    ],
  },
  {
    title: "Sootopolis City",
    src: MUSIC_ASSETS[
      "../assets/music/05 - Sootopolis City.mp3"
    ],
  },
  {
    title: "Diving Theme",
    src: MUSIC_ASSETS[
      "../assets/music/06 - Diving Theme.mp3"
    ],
  },
  {
    title: "Oldale Town",
    src: MUSIC_ASSETS[
      "../assets/music/07 - Oldale Town.mp3"
    ],
  },
  {
    title: "Route 101",
    src: MUSIC_ASSETS[
      "../assets/music/08 - Route 101.mp3"
    ],
  },
  {
    title: "Verdanturf Town",
    src: MUSIC_ASSETS[
      "../assets/music/09 - Verdanturf Town.mp3"
    ],
  },
  {
    title: "Slateport City",
    src: MUSIC_ASSETS[
      "../assets/music/10 - Slateport City.mp3"
    ],
  },
  {
    title: "Mauville + Mossdeep Rustboro City",
    src: MUSIC_ASSETS[
      "../assets/music/11 - Mauville + Mossdeep Rustboro City.mp3"
    ],
  },
  {
    title: "Petalburg City",
    src: MUSIC_ASSETS[
      "../assets/music/12 - Petalburg City.mp3"
    ],
  },
  {
    title: "Oceanic Museum",
    src: MUSIC_ASSETS[
      "../assets/music/13 - Oceanic Museum.mp3"
    ],
  },
  {
    title: "Ever Grande City",
    src: MUSIC_ASSETS[
      "../assets/music/14 - Ever Grande City.mp3"
    ],
  },
  {
    title: "Fallarbor Town",
    src: MUSIC_ASSETS[
      "../assets/music/15 - Fallarbor Town.mp3"
    ],
  },
  {
    title: "Lilycove City",
    src: MUSIC_ASSETS[
      "../assets/music/16 - Lilycove City.mp3"
    ],
  },
  {
    title: "Route 113",
    src: MUSIC_ASSETS[
      "../assets/music/17 - Route 113.mp3"
    ],
  },
  {
    title: "Dewford Town",
    src: MUSIC_ASSETS[
      "../assets/music/18 - Dewford Town.mp3"
    ],
  },
].filter(
  (
    track,
  ): track is {
    title: string;
    src: string;
  } => Boolean(track.src),
);

// ─────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────

interface AppTranslations {
  writeMessage: string;
  revealMessageTitle: string;
  writeSubtitle: string;
  revealSubtitle: string;
  hide: string;
  reveal: string;
  enterKey: string;
  whatsMessage: string;
  attachImage: string;
  upload: string;
  uploading: string;
  revealing: string;
  uploaded: string;
  revealed: string;
  download: string;
  removeFile: string;
  errorAttachFirst: string;
  errorEnterKey: string;
  errorEnterMessage: string;
  errorGeneric: string;
  settingsTitle: string;
  customizeSubtitle: string;
  appearance: string;
  themeLight: string;
  themeDark: string;
  themePokemon: string;
  audio: string;
  soundEffects: string;
  soundEffectsDesc: string;
  music: string;
  musicDesc: string;
  nowPlaying: string;
  language: string;
  languageDesc: string;
  information: string;
  aboutCreator: string;
  aboutCreatorDesc: string;
  done: string;
  aboutCreatorTitle: string;
  creatorAka: string;
  creatorBio: string;
}

const TRANSLATIONS: Record<AppLanguage, AppTranslations> = {
  en: {
    writeMessage: "Write a Message",
    revealMessageTitle: "Reveal a Message",
    writeSubtitle: "Write something and attach an image.",
    revealSubtitle: "Attach an encoded image and enter its key.",
    hide: "Hide",
    reveal: "Reveal",
    enterKey: "Enter your key...",
    whatsMessage: "What's your message?",
    attachImage: "Attach an image — or drag & drop",
    upload: "Upload",
    uploading: "Uploading...",
    revealing: "Revealing...",
    uploaded: "Uploaded!",
    revealed: "Revealed!",
    download: "Download",
    removeFile: "Remove file",
    errorAttachFirst: "Please attach an image first.",
    errorEnterKey: "Please enter a key.",
    errorEnterMessage: "Please enter a message to hide.",
    errorGeneric: "Something went wrong. Please try again.",
    settingsTitle: "Settings",
    customizeSubtitle: "Customize Secure Steg",
    appearance: "Appearance",
    themeLight: "Light",
    themeDark: "Dark",
    themePokemon: "Pokémon",
    audio: "Audio",
    soundEffects: "Sound Effects",
    soundEffectsDesc: "Interface and action sounds",
    music: "Music",
    musicDesc: "Background music",
    nowPlaying: "Now Playing",
    language: "Language",
    languageDesc: "Choose your preferred language",
    information: "Information",
    aboutCreator: "About Creator",
    aboutCreatorDesc: "About the creator and Secure Steg",
    done: "Done",
    aboutCreatorTitle: "About Creator",
    creatorAka: "pawankandwal2341@gmail.com",
    creatorBio:
      "Creator and developer of Secure Steg, a secure image steganography web application.",
  },

  ja: {
    writeMessage: "メッセージを書く",
    revealMessageTitle: "メッセージを解読",
    writeSubtitle: "メッセージを入力し、画像を添付してください。",
    revealSubtitle: "暗号化された画像を添付し、キーを入力してください。",
    hide: "隠す",
    reveal: "解読",
    enterKey: "キーを入力...",
    whatsMessage: "メッセージを入力してください",
    attachImage: "画像を添付 — またはドラッグ&ドロップ",
    upload: "アップロード",
    uploading: "アップロード中...",
    revealing: "解読中...",
    uploaded: "アップロード完了！",
    revealed: "解読完了！",
    download: "ダウンロード",
    removeFile: "ファイルを削除",
    errorAttachFirst: "まず画像を添付してください。",
    errorEnterKey: "キーを入力してください。",
    errorEnterMessage: "隠すメッセージを入力してください。",
    errorGeneric: "問題が発生しました。もう一度お試しください。",
    settingsTitle: "設定",
    customizeSubtitle: "Secure Stegをカスタマイズ",
    appearance: "外観",
    themeLight: "ライト",
    themeDark: "ダーク",
    themePokemon: "ポケモン",
    audio: "オーディオ",
    soundEffects: "効果音",
    soundEffectsDesc: "操作音とアクション音",
    music: "音楽",
    musicDesc: "バックグラウンドミュージック",
    nowPlaying: "再生中",
    language: "言語",
    languageDesc: "使用する言語を選択してください",
    information: "情報",
    aboutCreator: "制作者について",
    aboutCreatorDesc: "制作者とSecure Stegについて",
    done: "完了",
    aboutCreatorTitle: "制作者について",
    creatorAka: "pawankandwal2341@gmail.com",
    creatorBio:
      "Secure Stegの制作者兼開発者。安全な画像ステガノグラフィーのWebアプリケーションです。",
  },

  hi: {
    writeMessage: "संदेश लिखें",
    revealMessageTitle: "संदेश प्रकट करें",
    writeSubtitle: "कुछ लिखें और एक छवि संलग्न करें।",
    revealSubtitle: "एन्कोड की गई छवि संलग्न करें और उसकी कुंजी दर्ज करें।",
    hide: "छुपाएं",
    reveal: "प्रकट करें",
    enterKey: "अपनी कुंजी दर्ज करें...",
    whatsMessage: "आपका संदेश क्या है?",
    attachImage: "एक छवि संलग्न करें — या खींचें और छोड़ें",
    upload: "अपलोड करें",
    uploading: "अपलोड हो रहा है...",
    revealing: "प्रकट किया जा रहा है...",
    uploaded: "अपलोड हो गया!",
    revealed: "प्रकट हो गया!",
    download: "डाउनलोड करें",
    removeFile: "फ़ाइल हटाएं",
    errorAttachFirst: "कृपया पहले एक छवि संलग्न करें।",
    errorEnterKey: "कृपया एक कुंजी दर्ज करें।",
    errorEnterMessage: "कृपया छुपाने के लिए एक संदेश दर्ज करें।",
    errorGeneric: "कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।",
    settingsTitle: "सेटिंग्स",
    customizeSubtitle: "Secure Steg को अनुकूलित करें",
    appearance: "दिखावट",
    themeLight: "लाइट",
    themeDark: "डार्क",
    themePokemon: "पोकेमॉन",
    audio: "ऑडियो",
    soundEffects: "साउंड इफ़ेक्ट्स",
    soundEffectsDesc: "इंटरफ़ेस और एक्शन ध्वनियाँ",
    music: "संगीत",
    musicDesc: "पृष्ठभूमि संगीत",
    nowPlaying: "अभी चल रहा है",
    language: "भाषा",
    languageDesc: "अपनी पसंदीदा भाषा चुनें",
    information: "जानकारी",
    aboutCreator: "निर्माता के बारे में",
    aboutCreatorDesc: "निर्माता और Secure Steg के बारे में",
    done: "पूर्ण",
    aboutCreatorTitle: "निर्माता के बारे में",
    creatorAka: "pawankandwal2341@gmail.com",
    creatorBio:
      "Secure Steg के निर्माता और डेवलपर, एक सुरक्षित इमेज स्टेग्नोग्राफी वेब एप्लिकेशन।",
  },
};

// ─────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────

export default function App() {
  const [mode, setMode] =
    useState<Mode>("hide");

  // ───────────────────────────────────────────────────────────────────────
  // APPLICATION SETTINGS (Unified with Light Mode as Default)
  // ───────────────────────────────────────────────────────────────────────

  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!saved) {
        return "light"; 
      }
      const parsed = JSON.parse(saved);
      
      // If they saved Pokémon, but you disabled it, force them back to Light mode
      if (parsed.theme === "pokemon") {
        return ENABLE_POKEMON_THEME ? "pokemon" : "light";
      }
      
      if (parsed.theme === "light" || parsed.theme === "dark") {
        return parsed.theme;
      }
    } catch {
      // Use default.
    }
    return "light";
  });

  const [soundEffects, setSoundEffects] =
    useState<boolean>(() => {
      try {
        const saved =
          localStorage.getItem(
            SETTINGS_STORAGE_KEY,
          );

        if (!saved) {
          return true;
        }

        const parsed =
          JSON.parse(saved);

        return typeof parsed.soundEffects ===
          "boolean"
          ? parsed.soundEffects
          : true;
      } catch {
        return true;
      }
    });

  const [music, setMusic] =
    useState<boolean>(() => {
      try {
        const saved =
          localStorage.getItem(
            SETTINGS_STORAGE_KEY,
          );

        if (!saved) {
          return true;
        }

        const parsed =
          JSON.parse(saved);

        return typeof parsed.music ===
          "boolean"
          ? parsed.music
          : true;
      } catch {
        return true;
      }
    });

  const [language, setLanguage] =
    useState<AppLanguage>(() => {
      try {
        const saved =
          localStorage.getItem(
            SETTINGS_STORAGE_KEY,
          );

        if (!saved) {
          return "en";
        }

        const parsed =
          JSON.parse(saved);

        return parsed.language === "ja"
        ? "ja"
        : parsed.language === "hi"
          ? "hi"
          : "en";
      } catch {
        return "en";
      }
    });

  const pokemonTheme =
    theme === "pokemon";

  const t = TRANSLATIONS[language];

  // ───────────────────────────────────────────────────────────────────────
  // APPLICATION DATA
  // ───────────────────────────────────────────────────────────────────────

  const [key, setKey] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [done, setDone] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [resultImageUrl, setResultImageUrl] =
    useState<string | null>(null);

  const [revealedMessage, setRevealedMessage] =
    useState<string | null>(null);

  const fileRef =
    useRef<HTMLInputElement>(null);

  // ───────────────────────────────────────────────────────────────────────
  // BACKGROUND STICKER DRAGGING
  // ───────────────────────────────────────────────────────────────────────

  const [
    draggedSticker,
    setDraggedSticker,
  ] = useState<{
    index: number;
    left: number;
    top: number;
  } | null>(null);

  const [
    releasedStickers,
    setReleasedStickers,
  ] = useState<Record<number, { left: number; top: number }>>({});

  const dragRef = useRef<{
    index: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  // ───────────────────────────────────────────────────────────────────────
  // DRAG MOVEMENT / RELEASE
  // ───────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      if (!dragRef.current) {
        return;
      }

      setDraggedSticker(
        (current) => {
          if (
            !current ||
            current.index !==
              dragRef.current?.index
          ) {
            return current;
          }

          return {
            ...current,
            left:
              event.clientX -
              dragRef.current.offsetX,
            top:
              event.clientY -
              dragRef.current.offsetY,
          };
        },
      );
    };

    const handlePointerUp = () => {
      if (!dragRef.current) {
        return;
      }

      const released =
        draggedSticker;

      dragRef.current = null;

      if (released) {
        setReleasedStickers((current) => ({
          ...current,
          [released.index]: { left: released.left, top: released.top },
        }));
      }

      setDraggedSticker(null);
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp,
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp,
      );
    };
  }, [draggedSticker]);

  // ───────────────────────────────────────────────────────────────────────
  // CLEANUP RESULT OBJECT URL
  // ───────────────────────────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      if (resultImageUrl) {
        URL.revokeObjectURL(
          resultImageUrl,
        );
      }
    };
  }, [resultImageUrl]);

  // ───────────────────────────────────────────────────────────────────────
  // RESET
  // ───────────────────────────────────────────────────────────────────────

  const resetResults = () => {
    setError(null);

    setDone(false);

    if (resultImageUrl) {
      URL.revokeObjectURL(
        resultImageUrl,
      );
    }

    setResultImageUrl(null);

    setRevealedMessage(null);
  };

  // ───────────────────────────────────────────────────────────────────────
  // MODE SWITCH
  // ───────────────────────────────────────────────────────────────────────

  const switchMode = (
    next: Mode,
  ) => {
    if (
      next === mode ||
      uploading
    ) {
      return;
    }

    setMode(next);

    resetResults();
  };

  // ───────────────────────────────────────────────────────────────────────
  // FILE SELECT
  // ───────────────────────────────────────────────────────────────────────

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    resetResults();

    setSelectedFile(file);

    const reader =
      new FileReader();

    reader.onload = () => {
      setPreview(
        reader.result as string,
      );
    };

    reader.readAsDataURL(file);
  };

  // ───────────────────────────────────────────────────────────────────────
  // REMOVE FILE
  // ───────────────────────────────────────────────────────────────────────

  const handleRemoveFile = () => {
    resetResults();

    setSelectedFile(null);

    setPreview(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // ───────────────────────────────────────────────────────────────────────
  // DROP FILE
  // ───────────────────────────────────────────────────────────────────────

  const handleDrop = (
    e: React.DragEvent,
  ) => {
    e.preventDefault();

    const file =
      e.dataTransfer.files?.[0];

    if (
      !file ||
      !file.type.startsWith(
        "image/",
      )
    ) {
      return;
    }

    resetResults();

    setSelectedFile(file);

    const reader =
      new FileReader();

    reader.onload = () => {
      setPreview(
        reader.result as string,
      );
    };

    reader.readAsDataURL(file);
  };

  // ───────────────────────────────────────────────────────────────────────
  // SUBMIT VALIDATION
  // ───────────────────────────────────────────────────────────────────────

  const canSubmit =
    !uploading &&
    !!selectedFile &&
    !!key &&
    (mode === "reveal" ||
      !!message);

  // ───────────────────────────────────────────────────────────────────────
  // UPLOAD / REVEAL
  // ───────────────────────────────────────────────────────────────────────

  const handleUpload =
    async () => {
      setError(null);
      setDone(false);

      if (mode === "reveal") {
        setRevealedMessage(null);
      }

      if (
        mode === "hide" &&
        resultImageUrl
      ) {
        URL.revokeObjectURL(
          resultImageUrl,
        );

        setResultImageUrl(null);
      }

      if (!selectedFile) {
        setError(
          t.errorAttachFirst,
        );

        return;
      }

      if (!key.trim()) {
        setError(
          t.errorEnterKey,
        );

        return;
      }

      if (
        mode === "hide" &&
        !message.trim()
      ) {
        setError(
          t.errorEnterMessage,
        );

        return;
      }

      setUploading(true);

      try {
        if (mode === "hide") {
          const blob =
            await hideMessage(
              selectedFile,
              message,
              key,
            );

          const url =
            URL.createObjectURL(
              blob,
            );

          setResultImageUrl(
            url,
          );

          setDone(true);
        } else {
          const text =
            await revealMessage(
              selectedFile,
              key,
            );

          setRevealedMessage(text);

          setError(null);

          setDone(true);
        }
      } catch (err) {
        if (mode === "reveal") {
          setRevealedMessage(null);
        }

        setDone(false);

        const msg =
          err instanceof
          SecureStegApiError
            ? err.message
            : t.errorGeneric;

        setError(msg);
      } finally {
        setUploading(false);
      }
    };

  // ───────────────────────────────────────────────────────────────────────
  // DOWNLOAD
  // ───────────────────────────────────────────────────────────────────────

  const handleDownload = () => {
    if (!resultImageUrl) {
      return;
    }

    const a =
      document.createElement(
        "a",
      );

    a.href =
      resultImageUrl;

    const baseName =
      selectedFile?.name?.replace(
        /\.[^.]+$/,
        "",
      ) ?? "image";

    a.download =
      `${baseName}-encoded.png`;

    document.body.appendChild(a);

    a.click();

    a.remove();
  };

  // ───────────────────────────────────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────────────────────────────────

  return (
    <div
      className={`relative w-full min-h-full overflow-hidden theme-${theme}`}
      style={{
        minHeight: "100dvh",
        fontFamily:
          "'Outfit', sans-serif",
      }}
    >
      {/* ================================================================
          SETTINGS BUTTON + PANEL
      ================================================================= */}

      <Settings
        theme={theme}
        onThemeChange={setTheme}
        soundEffects={soundEffects}
        onSoundEffectsChange={
          setSoundEffects
        }
        music={music}
        onMusicChange={setMusic}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* ================================================================
          APPLICATION STYLES
      ================================================================= */}

      <style>{`
        html, body {
          height: 100%;
          overflow: hidden;
          overscroll-behavior: none;
        }

        @keyframes floatUp {
          0% {
            transform:
              translateY(110vh)
              translateX(0px)
              rotate(-4deg)
              scale(1);
            opacity: 0;
          }

          5% {
            opacity: 1;
          }

          50% {
            transform:
              translateY(0vh)
              translateX(var(--drift))
              rotate(3deg)
              scale(1.03);
            opacity: 1;
          }

          95% {
            opacity: 1;
          }

          100% {
            transform:
              translateY(-115vh)
              translateX(0px)
              rotate(-2deg)
              scale(0.95);
            opacity: 0;
          }
        }

        @keyframes floatFromGrab {
          0% {
            transform:
              translateY(0px)
              translateX(0px)
              rotate(0deg)
              scale(1.03);
            opacity: 1;
          }

          100% {
            transform:
              translateY(-115vh)
              translateX(var(--drift))
              rotate(3deg)
              scale(1);
            opacity: 0;
          }
        }

        .glass-card {
          background:
            rgba(255, 255, 255, 0.52);

          backdrop-filter:
            blur(28px);

          -webkit-backdrop-filter:
            blur(28px);

          border:
            1px solid
            rgba(255, 255, 255, 0.82);

          box-shadow:
            0 8px 48px
            rgba(100, 130, 200, 0.14),
            0 2px 12px
            rgba(100, 130, 200, 0.1),
            inset 0 1.5px 0
            rgba(255, 255, 255, 0.95),
            inset 0 -1px 0
            rgba(200, 220, 255, 0.15);
        }

        .theme-pokemon .glass-card {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .theme-pokemon .glass-card::-webkit-scrollbar {
          display: none;
        }

        .glass-input {
          background:
            rgba(255, 255, 255, 0.5);

          border:
            1px solid
            rgba(200, 215, 240, 0.6);

          color:
            #1e293b;

          transition:
            border-color 0.2s,
            background 0.2s,
            box-shadow 0.2s;
        }

        .glass-input::placeholder {
          color:
            #94a3b8;
        }

        .glass-input:focus {
          background:
            rgba(255, 255, 255, 0.72);

          border-color:
            rgba(59, 130, 246, 0.45);

          box-shadow:
            0 0 0 3px
            rgba(59, 130, 246, 0.1);

          outline:
            none;
        }

        .drop-zone {
          background:
            rgba(255, 255, 255, 0.38);

          border:
            1.5px dashed
            rgba(148, 163, 184, 0.55);

          transition:
            background 0.2s,
            border-color 0.2s;
        }

        .drop-zone:hover {
          background:
            rgba(255, 255, 255, 0.6);

          border-color:
            rgba(59, 130, 246, 0.45);
        }

        .upload-btn {
          background:
            linear-gradient(
              135deg,
              #ffcb05 0%,
              #f59e0b 100%
            );

          border:
            1px solid
            rgba(245, 158, 11, 0.5);

          box-shadow:
            0 4px 20px
            rgba(245, 158, 11, 0.3),
            inset 0 1px 0
            rgba(255, 255, 255, 0.4);

          color:
            #1e293b;

          transition:
            transform 0.15s,
            box-shadow 0.15s;

          position:
            relative;

          overflow:
            visible;
        }

        .upload-btn:hover:not(:disabled) {
          box-shadow:
            0 6px 28px
            rgba(245, 158, 11, 0.45),
            inset 0 1px 0
            rgba(255, 255, 255, 0.5);

          transform:
            translateY(-1px);
        }

        .upload-btn:active:not(:disabled) {
          transform:
            translateY(0px)
            scale(0.98);
        }

        .upload-btn:disabled {
          opacity:
            0.55;

          cursor:
            not-allowed;
        }

        .pikachu-btn {
          position:
            absolute;

          bottom:
            -18px;

          right:
            -14px;

          width:
            62px;

          height:
            62px;

          pointer-events:
            none;

          filter:
            drop-shadow(
              0 3px 6px
              rgba(0, 0, 0, 0.22)
            );

          transition:
            transform 0.2s;
        }

        .upload-btn:hover:not(:disabled)
          .pikachu-btn {
          transform:
            translateY(-3px)
            rotate(5deg);
        }

        .mode-toggle-btn {
          transition:
            background 0.2s,
            color 0.2s,
            box-shadow 0.2s;
        }

        .floating-sticker {
          will-change:
            transform,
            left,
            top;

          user-select:
            none;

          -webkit-user-select:
            none;

          -webkit-user-drag:
            none;

          -webkit-touch-callout:
            none;
        }

        /* ============================================================
           THEME OVERRIDES
        ============================================================= */

        .theme-dark {
          color:
            #f8fafc;
        }

        .theme-dark .glass-card {
          background:
            rgba(15, 23, 42, 0.82) !important;

          border-color:
            rgba(255, 255, 255, 0.12) !important;

          box-shadow:
            0 8px 48px
            rgba(0, 0, 0, 0.38),
            0 2px 12px
            rgba(0, 0, 0, 0.28),
            inset 0 1px 0
            rgba(255, 255, 255, 0.05) !important;
        }

        .theme-dark .glass-input {
          background:
            rgba(30, 41, 59, 0.82) !important;

          border-color:
            rgba(148, 163, 184, 0.22) !important;

          color:
            #f8fafc !important;
        }

        .theme-dark .glass-input::placeholder {
          color:
            #94a3b8 !important;
        }

        .theme-dark .glass-input:focus {
          background:
            rgba(30, 41, 59, 0.95) !important;

          border-color:
            rgba(96, 165, 250, 0.55) !important;
        }

        .theme-dark .drop-zone {
          background:
            rgba(30, 41, 59, 0.62) !important;

          border-color:
            rgba(148, 163, 184, 0.26) !important;
        }

        .theme-dark .drop-zone:hover {
          background:
            rgba(51, 65, 85, 0.78) !important;

          border-color:
            rgba(96, 165, 250, 0.5) !important;
        }

        .theme-dark .text-slate-800 {
          color:
            #f8fafc !important;
        }

        .theme-dark .text-slate-600 {
          color:
            #cbd5e1 !important;
        }

        .theme-dark .text-slate-400 {
          color:
            #94a3b8 !important;
        }

        .theme-dark .mode-toggle-btn {
          color:
            #94a3b8 !important;
        }

        .theme-light .glass-card {
          background:
            rgba(255, 255, 255, 0.76) !important;
        }

        .theme-light .glass-input {
          background:
            rgba(255, 255, 255, 0.72) !important;
        }

        .theme-pokemon .glass-card {
          background:
            rgba(255, 255, 255, 0.52) !important;
        }

        .theme-pokemon .glass-input {
          background:
            rgba(255, 255, 255, 0.5) !important;
        }

        .settings-pokemon-panel {
          overflow: visible;
        }

        .settings-pikachu {
          position: absolute;

          top: -34px;
          right: 8px;

          width: 46px;
          height: 46px;

          object-fit: contain;

          z-index: 5;
          pointer-events: none;

          filter:
            drop-shadow(
              0 7px 7px
              rgba(15,23,42,0.20)
            );

          animation:
            settingsPikachuBounce
            2.2s
            ease-in-out
            infinite;

          transform-origin:
            bottom center;
        }

        @keyframes settingsPikachuBounce {
          0%,
          100% {
            transform:
              translateY(0)
              rotate(4deg);
          }

          50% {
            transform:
              translateY(-6px)
              rotate(-4deg);
          }
        }

        .settings-pokemon-footer {
          position: absolute;

          left: 0;
          right: 0;
          bottom: 0;

          height: 78px;

          overflow: hidden;
          pointer-events: none;

          z-index: 20;

          border-radius: 0 0 24px 24px;

          background: transparent !important;
          background-image: none !important;

          border: none !important;
          box-shadow: none !important;

          opacity: 1 !important;

          filter: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        .settings-pokemon-runner {
          position: absolute;
          bottom: 0;

          width: 48px;
          height: 48px;

          object-fit: contain;

          filter:
            drop-shadow(
              0 4px 5px
              rgba(15,23,42,0.20)
            );

          animation:
            settingsStarterRun
            5.8s
            ease-in-out
            infinite;
        }

        .settings-pokemon-runner.bulbasaur {
          left: 8%;
          animation-delay: 0s;
          animation-duration: 5.8s;
        }

        .settings-pokemon-runner.charmander {
          left: 40%;
          animation-delay: -1.8s;
          animation-duration: 6.2s;
        }

        .settings-pokemon-runner.squirtle {
          left: 70%;
          animation-delay: -3.3s;
          animation-duration: 6s;
        }

        @keyframes settingsStarterRun {
          0% {
            transform:
              translateX(-12px)
              translateY(0)
              rotate(-3deg)
              scale(0.96);
          }

          25% {
            transform:
              translateX(12px)
              translateY(-5px)
              rotate(3deg)
              scale(1);
          }

          50% {
            transform:
              translateX(26px)
              translateY(0)
              rotate(-2deg)
              scale(1.03);
          }

          75% {
            transform:
              translateX(12px)
              translateY(-4px)
              rotate(3deg)
              scale(1);
          }

          100% {
            transform:
              translateX(-12px)
              translateY(0)
              rotate(-3deg)
              scale(0.96);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .settings-pikachu,
          .settings-pokemon-runner {
            animation:
              none !important;
          }
        }

        .settings-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(100,116,139,0.65) rgba(100,116,139,0.08);
        }

        .settings-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .settings-scroll::-webkit-scrollbar-track {
          background: rgba(100,116,139,0.08);
          border-radius: 9999px;
        }

        .settings-scroll::-webkit-scrollbar-thumb {
          background: rgba(100,116,139,0.65);
          border-radius: 9999px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .settings-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(100,116,139,0.75);
        }

        .theme-dark .settings-scroll {
          scrollbar-color: rgba(148,163,184,0.4) transparent;
        }

        .theme-dark .settings-scroll::-webkit-scrollbar-thumb {
          background: rgba(148,163,184,0.4);
        }

        .theme-dark .settings-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(148,163,184,0.6);
        }

        @media (max-width: 640px) {
          .glass-card {
            box-shadow:
              0 12px 44px
              rgba(100,130,200,0.16),
              0 2px 10px
              rgba(100,130,200,0.10),
              inset 0 1px 1px
              rgba(255,255,255,0.9);
          }

          .pikachu-btn {
            width:
              54px;

            height:
              54px;

            right:
              -9px;

            bottom:
              -13px;
          }

          .floating-sticker {
            max-width:
              24vw;
          }
        }
      `}</style>

      {/* ================================================================
          BACKGROUND
      ================================================================= */}

      <div
        className="absolute inset-0"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(145deg, #020617 0%, #0f172a 48%, #172554 100%)"
              : theme === "light"
                ? "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 48%, #dbeafe 100%)"
                : "linear-gradient(145deg, #dbeafe 0%, #ede9fe 38%, #fce7f3 68%, #e0f2fe 100%)",
        }}
      />

      {/* ================================================================
          CENTER GLASS CARD
      ================================================================= */}

      <div
        className="absolute inset-0 flex items-center justify-center p-3 sm:p-6 pointer-events-none"
        style={{
          zIndex:
            20,

          paddingTop:
            "max(12px, env(safe-area-inset-top))",

          paddingBottom:
            "max(12px, env(safe-area-inset-bottom))",
        }}
      >
        <div
          className="glass-card rounded-[24px] sm:rounded-3xl w-full max-w-md p-5 sm:p-8 flex flex-col gap-4 sm:gap-5 relative overflow-y-auto overflow-x-hidden pointer-events-auto"
          style={{
            zIndex:
              20,

            maxHeight:
              "calc(100dvh - max(24px, env(safe-area-inset-top) + env(safe-area-inset-bottom) + 24px))",

            WebkitOverflowScrolling:
              "touch",
          }}
        >
          {/* ==========================================================
              POKÉBALL WATERMARK
          =========================================================== */}

          {pokemonTheme && (
            <div
              className="absolute -top-8 -right-8 pointer-events-none select-none"
              style={{
                opacity:
                  0.07,
              }}
            >
              <svg
                width="160"
                height="160"
                viewBox="0 0 160 160"
                fill="none"
              >
                <circle
                  cx="80"
                  cy="80"
                  r="78"
                  stroke="#1e293b"
                  strokeWidth="4"
                />

                <path
                  d="M2 80 Q80 80 158 80"
                  stroke="#1e293b"
                  strokeWidth="4"
                />

                <path
                  d="M2 80 A78 78 0 0 1 158 80"
                  fill="#ef4444"
                />

                <circle
                  cx="80"
                  cy="80"
                  r="22"
                  fill="white"
                  stroke="#1e293b"
                  strokeWidth="4"
                />

                <circle
                  cx="80"
                  cy="80"
                  r="11"
                  fill="white"
                  stroke="#1e293b"
                  strokeWidth="3"
                />
              </svg>
            </div>
          )}

          {/* ==========================================================
              DECORATIVE POKÉBALL
          =========================================================== */}

          {pokemonTheme && (
            <div
              className="absolute -bottom-6 -left-6 pointer-events-none select-none"
              style={{
                opacity:
                  0.05,
              }}
            >
              <svg
                width="100"
                height="100"
                viewBox="0 0 160 160"
                fill="none"
              >
                <circle
                  cx="80"
                  cy="80"
                  r="78"
                  stroke="#1e293b"
                  strokeWidth="4"
                />

                <path
                  d="M2 80 Q80 80 158 80"
                  stroke="#1e293b"
                  strokeWidth="4"
                />

                <path
                  d="M2 80 A78 78 0 0 1 158 80"
                  fill="#ef4444"
                />

                <circle
                  cx="80"
                  cy="80"
                  r="22"
                  fill="white"
                  stroke="#1e293b"
                  strokeWidth="4"
                />

                <circle
                  cx="80"
                  cy="80"
                  r="11"
                  fill="white"
                  stroke="#1e293b"
                  strokeWidth="3"
                />
              </svg>
            </div>
          )}

          {/* ==========================================================
              HEADER
          =========================================================== */}

          <div className="flex flex-col gap-1">
            <h1 className="text-slate-800 text-[22px] sm:text-2xl font-semibold tracking-tight leading-tight">
              {mode === "hide"
                ? t.writeMessage
                : t.revealMessageTitle}
            </h1>

            <p className="text-slate-400 text-sm font-light">
              {mode === "hide"
                ? t.writeSubtitle
                : t.revealSubtitle}
            </p>
          </div>

          {/* ==========================================================
              DIVIDER WITH POKÉBALL
          =========================================================== */}

          <div className="flex items-center gap-3 -mt-1">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "rgba(30,41,59,0.08)",
              }}
            />

            {pokemonTheme && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 160 160"
                fill="none"
                style={{
                  opacity:
                    0.25,
                }}
              >
                <circle
                  cx="80"
                  cy="80"
                  r="78"
                  stroke="#1e293b"
                  strokeWidth="10"
                />

                <line
                  x1="2"
                  y1="80"
                  x2="158"
                  y2="80"
                  stroke="#1e293b"
                  strokeWidth="10"
                />

                <path
                  d="M2 80 A78 78 0 0 1 158 80"
                  fill="#ef4444"
                />

                <circle
                  cx="80"
                  cy="80"
                  r="24"
                  fill="white"
                  stroke="#1e293b"
                  strokeWidth="10"
                />

                <circle
                  cx="80"
                  cy="80"
                  r="10"
                  fill="#1e293b"
                />
              </svg>
            )}

            <div
              className="flex-1 h-px"
              style={{
                background:
                  "rgba(30,41,59,0.08)",
              }}
            />
          </div>

          {/* ==========================================================
              HIDE / REVEAL TOGGLE
          =========================================================== */}

          <div
            className="glass-input flex items-center rounded-2xl p-1 text-sm"
            style={{
              fontFamily:
                "'Inter', sans-serif",
            }}
          >
            <button
              type="button"
              onClick={() =>
                switchMode("hide")
              }
              className="mode-toggle-btn flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2"
              style={{
                background:
                  mode === "hide"
                    ? (theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(255,255,255,0.9)")
                    : "transparent",

                color:
                  mode === "hide"
                    ? (theme === "dark" ? "#f8fafc" : "#1e293b")
                    : "#94a3b8",

                boxShadow:
                  mode === "hide"
                    ? (theme === "dark" ? "0 1px 4px rgba(0,0,0,0.3)" : "0 1px 4px rgba(100,130,200,0.18)")
                    : "none",
              }}
            >
              <Lock size={13} />

              {t.hide}
            </button>

            <button
              type="button"
              onClick={() =>
                switchMode("reveal")
              }
              className="mode-toggle-btn flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2"
              style={{
                background:
                  mode === "reveal"
                    ? (theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(255,255,255,0.9)")
                    : "transparent",

                color:
                  mode === "reveal"
                    ? (theme === "dark" ? "#f8fafc" : "#1e293b")
                    : "#94a3b8",

                boxShadow:
                  mode === "reveal"
                    ? (theme === "dark" ? "0 1px 4px rgba(0,0,0,0.3)" : "0 1px 4px rgba(100,130,200,0.18)")
                    : "none",
              }}
            >
              <Unlock size={13} />

              {t.reveal}
            </button>
          </div>

          {/* ==========================================================
              KEY
          =========================================================== */}

          <input
            type="text"
            value={key}
            onChange={(e) =>
              setKey(e.target.value)
            }
            placeholder={t.enterKey}
            className="glass-input w-full rounded-2xl px-4 py-3 text-sm"
            style={{
              fontFamily:
                "'Inter', sans-serif",
            }}
            autoComplete="off"
          />

          {/* ==========================================================
              MESSAGE
          =========================================================== */}

          {mode === "hide" && (
            <textarea
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value,
                )
              }
              placeholder={t.whatsMessage}
              rows={5}
              className="glass-input w-full resize-none rounded-2xl px-4 py-3 text-sm leading-relaxed"
              style={{
                fontFamily:
                  "'Inter', sans-serif",
              }}
            />
          )}

          {/* ==========================================================
              FILE UPLOAD
          =========================================================== */}

          <div
            onDrop={handleDrop}
            onDragOver={(e) =>
              e.preventDefault()
            }
          >
            {!preview ? (
              <label
                htmlFor="file-input"
                className="drop-zone flex items-center gap-3 cursor-pointer rounded-2xl px-4 py-3.5 group"
              >
                <ImagePlus
                  size={18}
                  className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0"
                />

                <span className="text-slate-400 group-hover:text-slate-600 text-sm transition-colors truncate">
                  {t.attachImage}
                </span>

                <input
                  ref={fileRef}
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={
                    handleFileChange
                  }
                />
              </label>
            ) : (
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  height:
                    "clamp(120px, 24vw, 160px)",
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.32), transparent)",
                  }}
                />

                <div className="absolute bottom-2 left-3 text-white text-xs font-medium truncate max-w-[80%]">
                  {selectedFile?.name}
                </div>

                <button
                  type="button"
                  onClick={
                    handleRemoveFile
                  }
                  className="absolute top-2 right-2 rounded-full p-1.5 text-white hover:opacity-80 transition-opacity"
                  style={{
                    background:
                      "rgba(0,0,0,0.45)",
                  }}
                  aria-label={t.removeFile}
                >
                  <X size={13} />
                </button>
              </div>
            )}
          </div>

          {/* ==========================================================
              ERROR
          =========================================================== */}

          {error && (
            <div
              className="rounded-2xl px-4 py-3 text-sm"
              style={{
                background:
                  "rgba(254, 226, 226, 0.7)",

                border:
                  "1px solid rgba(248, 113, 113, 0.5)",

                color:
                  "#991b1b",

                fontFamily:
                  "'Inter', sans-serif",
              }}
            >
              {error}
            </div>
          )}

          {/* ==========================================================
              REVEALED MESSAGE
          =========================================================== */}

          {mode === "reveal" &&
            !error &&
            revealedMessage !== null && (
              <div
                className="glass-input rounded-2xl px-4 py-3 text-sm leading-relaxed break-words"
                style={{
                  fontFamily:
                    "'Inter', sans-serif",
                }}
              >
                {revealedMessage}
              </div>
            )}

          {/* ==========================================================
              RESULT IMAGE
          =========================================================== */}

          {mode === "hide" &&
            resultImageUrl && (
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  height:
                    "clamp(120px, 24vw, 160px)",
                }}
              >
                <img
                  src={resultImageUrl}
                  alt="Encoded result"
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={
                    handleDownload
                  }
                  className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white text-xs font-medium hover:opacity-90 transition-opacity"
                  style={{
                    background:
                      "rgba(0,0,0,0.55)",
                  }}
                >
                  <Download size={12} />

                  {t.download}
                </button>
              </div>
            )}

          {/* ==========================================================
              UPLOAD BUTTON
          =========================================================== */}

          <div className="relative mt-1">
            <button
              type="button"
              onClick={
                handleUpload
              }
              disabled={!canSubmit}
              className="upload-btn w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 px-4 sm:px-6 font-semibold text-sm tracking-wide"
            >
              {done && !error ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8.5l3.5 3.5 6.5-7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {mode === "hide"
                    ? t.uploaded
                    : t.revealed}
                </>
              ) : uploading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="rgba(30,41,59,0.2)"
                      strokeWidth="2"
                    />

                    <path
                      d="M8 2a6 6 0 0 1 6 6"
                      stroke="#1e293b"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>

                  {mode === "hide"
                    ? t.uploading
                    : t.revealing}
                </>
              ) : (
                <>
                  <Upload size={15} />

                  {mode === "hide"
                    ? t.upload
                    : t.reveal}
                </>
              )}

              {pokemonTheme &&
                UPLOAD_STICKER_URL && (
                  <img
                    src={
                      UPLOAD_STICKER_URL
                    }
                    alt=""
                    className="pikachu-btn"
                    draggable={false}
                    onError={(event) => {
                      event.currentTarget.onerror =
                        null;

                      event.currentTarget.src =
                        pikachuFallback;
                    }}
                  />
                )}
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================
          POKÉBALL / POKÉDEX
      ================================================================= */}

      {pokemonTheme && (
        <PokemonCorner />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SETTINGS COMPONENT
// ─────────────────────────────────────────────────────────────────────────

interface SettingsProps {
  theme: AppTheme;
  onThemeChange: (
    theme: AppTheme,
  ) => void;

  soundEffects: boolean;
  onSoundEffectsChange: (
    enabled: boolean,
  ) => void;

  music: boolean;
  onMusicChange: (
    enabled: boolean,
  ) => void;

  language: AppLanguage;
  onLanguageChange: (
    language: AppLanguage,
  ) => void;
}
function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}
function Settings({
  theme,
  onThemeChange,
  soundEffects,
  onSoundEffectsChange,
  music,
  onMusicChange,
  language,
  onLanguageChange,
}: SettingsProps) {
  const [open, setOpen] =
    useState(false);

  const [aboutOpen, setAboutOpen] =
    useState(false);

  const [trackIndex, setTrackIndex] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(true);

  const audioRef =
    useRef<HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] =
      useState(0);

  const [duration, setDuration] =
    useState(0);

  const unlockArmedRef =
    useRef(false);

  const removeUnlockListenersRef =
    useRef<() => void>(() => {});

  const attemptPlayRef =
    useRef<() => void>(() => {});

  const armAutoplayUnlock = useCallback(
    () => {
      if (unlockArmedRef.current) {
        return;
      }

      unlockArmedRef.current = true;

      const unlock = () => {
        unlockArmedRef.current = false;
        removeUnlockListenersRef.current();
        attemptPlayRef.current();
      };

      removeUnlockListenersRef.current = () => {
        document.removeEventListener(
          "pointerdown",
          unlock,
        );

        document.removeEventListener(
          "keydown",
          unlock,
        );

        document.removeEventListener(
          "touchstart",
          unlock,
        );
      };

      document.addEventListener(
        "pointerdown",
        unlock,
        { once: true },
      );

      document.addEventListener(
        "keydown",
        unlock,
        { once: true },
      );

      document.addEventListener(
        "touchstart",
        unlock,
        { once: true },
      );
    },
    [],
  );

  const attemptPlay = useCallback(
    () => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      const playResult = audio.play();

      if (
        playResult &&
        typeof playResult.catch ===
          "function"
      ) {
        playResult.catch(() => {
          armAutoplayUnlock();
        });
      }
    },
    [armAutoplayUnlock],
  );

  useEffect(() => {
    attemptPlayRef.current = attemptPlay;
  }, [attemptPlay]);

  useEffect(() => {
    return () => {
      removeUnlockListenersRef.current();
    };
  }, []);

  const nextTrack = () =>
    setTrackIndex(
      (i) => (i + 1) % MUSIC_PLAYLIST.length,
    );

  const prevTrack = () =>
    setTrackIndex(
      (i) =>
        (i - 1 + MUSIC_PLAYLIST.length) %
        MUSIC_PLAYLIST.length,
    );

  useEffect(() => {
    const audio = audioRef.current;
    const track = MUSIC_PLAYLIST[trackIndex];

    if (!audio || !track) {
      return;
    }

    audio.src = track.src;
    audio.load();

    setCurrentTime(0);
    setDuration(0);
  }, [trackIndex]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!music || theme !== "pokemon" ||!isPlaying) {
      audio.pause();
      return;
    }

    attemptPlay();
  }, [
    music,
    isPlaying,
    theme,
    trackIndex,
    attemptPlay,
  ]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(
        Number.isFinite(audio.duration)
          ? audio.duration
          : 0,
      );
    };

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate,
    );

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata,
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate,
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );
    };
  }, []);

  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    const handleEnded =
      () => {
        setTrackIndex(
          (current) =>
            (current + 1) %
            MUSIC_PLAYLIST.length,
        );

        setIsPlaying(true);
      };

    audio.addEventListener(
      "ended",
      handleEnded,
    );

    return () => {
      audio.removeEventListener(
        "ended",
        handleEnded,
      );
    };
  }, []);

  const panelRef =
    useRef<HTMLDivElement>(null);

  const scrollRef =
    useRef<HTMLDivElement>(null);

  const [showTopFade, setShowTopFade] =
    useState(false);

  const [showBottomFade, setShowBottomFade] =
    useState(false);

  const updateScrollFades = () => {
    const el = scrollRef.current;

    if (!el) {
      return;
    }

    setShowTopFade(el.scrollTop > 4);

    setShowBottomFade(
      el.scrollHeight -
        el.scrollTop -
        el.clientHeight >
        4,
    );
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const id = requestAnimationFrame(
      updateScrollFades,
    );

    return () =>
      cancelAnimationFrame(id);
  }, [open, theme, music]);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        theme,
        soundEffects,
        music,
        language,
      }),
    );
  }, [
    theme,
    soundEffects,
    music,
    language,
  ]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (
      event: PointerEvent,
    ) => {
      const target =
        event.target as Node;

      if (
        panelRef.current &&
        !panelRef.current.contains(
          target,
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open]);

  return (
    <>
    <audio
      ref={audioRef}
      preload="auto"
    />
      <div
        ref={panelRef}
        className="fixed top-4 left-4 sm:top-5 sm:left-5"
        style={{
          zIndex:
            100,
        }}
      >
        <button
          type="button"
          aria-label="Open settings"
          aria-expanded={open}
          onClick={() =>
            setOpen(
              (current) =>
                !current,
            )
          }
          className="flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            width:
              46,

            height:
              46,

            background:
              theme === "dark"
                ? "rgba(15,23,42,0.82)"
                : "rgba(255,255,255,0.78)",

            border:
              theme === "dark"
                ? "1px solid rgba(255,255,255,0.14)"
                : "1px solid rgba(255,255,255,0.9)",

            color:
              theme === "dark"
                ? "#f8fafc"
                : "#1e293b",

            boxShadow:
              "0 8px 25px rgba(15,23,42,0.16)",

            backdropFilter:
              "blur(14px)",

            WebkitBackdropFilter:
              "blur(14px)",
          }}
        >
          <SettingsIcon
            size={20}
            className={
              open
                ? "rotate-90 transition-transform duration-300"
                : "transition-transform duration-300"
            }
          />
        </button>

        {open && (
          <div
          className={`absolute left-0 ${
            theme === "pokemon"
              ? "top-[52px]"
              : "top-14"
          } w-[min(410px,calc(100vw-32px))] rounded-3xl ${
            theme === "pokemon"
              ? "settings-pokemon-panel"
              : "overflow-hidden"
          }`}
            style={{
              background:
                theme === "dark"
                  ? "rgba(15,23,42,0.97)"
                  : "rgba(255,255,255,0.96)",

              border: "1px solid transparent",

              color:
                theme === "dark"
                  ? "#f8fafc"
                  : "#1e293b",

              boxShadow:
                "0 24px 70px rgba(15,23,42,0.25)",

              backdropFilter:
                "blur(24px)",

              WebkitBackdropFilter:
                "blur(24px)",
            }}
          >
          {theme === "pokemon" && (
            <img
              src={POKEMON_SETTINGS_ART.pikachu}
              alt=""
              aria-hidden="true"
              className="settings-pikachu"
              draggable={false}
            />
          )}

          <div
              className="relative flex items-center justify-between px-5 py-3"
              style={{
                zIndex: 10,
                borderBottom:
                  theme === "dark"
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(15,23,42,0.07)",
              }}
            >
              <div>
                <div className="text-base font-semibold">
                  {t.settingsTitle}
                </div>

                <div
                  className="text-xs mt-0.5"
                  style={{
                    color:
                      theme === "dark"
                        ? "#94a3b8"
                        : "#64748b",
                  }}
                >
                  {t.customizeSubtitle}
                </div>
              </div>

              <button
                type="button"
                aria-label="Close settings"
                onClick={() =>
                  setOpen(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(15,23,42,0.06)",
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div
              ref={scrollRef}
              onScroll={updateScrollFades}
              className="settings-scroll relative max-h-[75vh] overflow-y-auto p-4"
              style={{
                zIndex: 10,
                paddingBottom:
                  theme === "pokemon"
                    ? 84
                    : 16,
              }}
            >

              <section>
                <div
                  className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color:
                      theme === "dark"
                        ? "#94a3b8"
                        : "#64748b",
                  }}
                >
                  {t.appearance}
                </div>

                <div className={`grid gap-2 ${ENABLE_POKEMON_THEME ? "grid-cols-3" : "grid-cols-2"}`}>
                  <ThemeButton
                    active={theme === "light"}
                    icon={<Sun size={17} />}
                    label={t.themeLight}
                    dark={theme === "dark"}
                    onClick={() => onThemeChange("light")}
                  />

                  <ThemeButton
                    active={theme === "dark"}
                    icon={<Moon size={17} />}
                    label={t.themeDark}
                    dark={theme === "dark"}
                    onClick={() => onThemeChange("dark")}
                  />

                  {ENABLE_POKEMON_THEME && (
                    <ThemeButton
                      active={theme === "pokemon"}
                      icon={<Sparkles size={17} />}
                      label={t.themePokemon}
                      dark={theme === "dark"}
                      pokemon
                      onClick={() => onThemeChange("pokemon")}
                    />
                  )}
                </div>
              </section>

              <section className="mt-5">
                <div
                  className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color:
                      theme === "dark"
                        ? "#94a3b8"
                        : "#64748b",
                  }}
                >
                  {t.audio}
                </div>

                <SettingToggle
                  icon={
                    soundEffects ? (
                      <Volume2
                        size={18}
                      />
                    ) : (
                      <VolumeX
                        size={18}
                      />
                    )
                  }
                  title={t.soundEffects}
                  description={t.soundEffectsDesc}
                  enabled={
                    soundEffects
                  }
                  dark={
                    theme ===
                    "dark"
                  }
                  onToggle={() =>
                    onSoundEffectsChange(
                      !soundEffects,
                    )
                  }
                />

                {theme === "pokemon" && (
                    <>
                      <div className="h-2" />

                      <SettingToggle
                        icon={
                          <Music size={18} />
                        }
                        title={t.music}
                        description={t.musicDesc}
                        enabled={music}
                        dark={
                          theme ===
                          "dark"
                        }
                        onToggle={() =>
                          onMusicChange(
                            !music,
                          )
                        }
                      />
                    </>
                )}

                {theme === "pokemon" && music && (
                  <div
                    className="mt-2 flex items-center justify-between gap-3 rounded-2xl p-3"
                    style={{
                      background:
                        theme === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(15,23,42,0.045)",
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {MUSIC_PLAYLIST[trackIndex]?.title}
                      </div>

                      <div
                        className="text-xs mt-0.5"
                        style={{
                          color:
                            theme === "dark"
                              ? "#94a3b8"
                              : "#64748b",
                        }}
                      >
                        {t.nowPlaying}
                      </div>
                      <div className="mt-3 w-full">
                        <input
                          type="range"
                          min={0}
                          max={duration || 0}
                          step={0.1}
                          value={Math.min(
                            currentTime,
                            duration || 0,
                          )}
                          disabled={!duration}
                          onChange={(event) => {
                            const nextTime =
                              Number(event.target.value);

                            setCurrentTime(nextTime);

                            const audio =
                              audioRef.current;

                            if (audio) {
                              audio.currentTime =
                                nextTime;
                            }
                          }}
                          className="w-full cursor-pointer accent-[#1F1F1F]"
                          style={{ accentColor: "#1F1F1F" }}
                        />

                        <div className="mt-1 flex justify-between text-[10px]">
                          <span>
                            {formatTime(currentTime)}
                          </span>

                          <span>
                            {formatTime(duration)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={prevTrack}
                        aria-label="Previous track"
                        className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
                        style={{
                          background:
                            theme === "dark"
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(255,255,255,0.75)",
                        }}
                      >
                        <SkipBack size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setIsPlaying((p) => !p)
                        }
                        aria-label={
                          isPlaying ? "Pause" : "Play"
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
                        style={{
                          background:
                            "linear-gradient(135deg,#ffcb05,#f59e0b)",
                          color: "#1e293b",
                        }}
                      >
                        {isPlaying ? (
                          <Pause size={15} />
                        ) : (
                          <Play size={15} />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={nextTrack}
                        aria-label="Next track"
                        className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
                        style={{
                          background:
                            theme === "dark"
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(255,255,255,0.75)",
                        }}
                      >
                        <SkipForward size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </section>

              <section className="mt-5">
                <div
                  className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color:
                      theme === "dark"
                        ? "#94a3b8"
                        : "#64748b",
                  }}
                >
                  {t.language}
                </div>

                <div
                  className="rounded-2xl p-3"
                  style={{
                    background:
                      theme ===
                      "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(15,23,42,0.045)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{
                        background:
                          theme ===
                          "dark"
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(255,255,255,0.75)",
                      }}
                    >
                      <Languages
                        size={18}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {t.language}
                      </div>

                      <div
                        className="text-xs mt-0.5"
                        style={{
                          color:
                            theme ===
                            "dark"
                              ? "#94a3b8"
                              : "#64748b",
                        }}
                      >
                        {t.languageDesc}
                      </div>
                    </div>

                    <select
                      value={
                        language
                      }
                      onChange={(
                        event,
                      ) =>
                        onLanguageChange(
                          event.target
                            .value as AppLanguage,
                        )
                      }
                      className="rounded-xl px-2.5 py-2 text-xs outline-none"
                      style={{
                        background:
                          theme ===
                          "dark"
                            ? "#1e293b"
                            : "#ffffff",

                        color:
                          theme ===
                          "dark"
                            ? "#f8fafc"
                            : "#1e293b",

                        border: "1px solid transparent",
                      }}
                    >
                      <option value="en">
                        English
                      </option>

                      <option value="ja">
                        日本語
                      </option>

                      <option value="hi">
                        हिन्दी
                      </option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="mt-5">
                <div
                  className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color:
                      theme === "dark"
                        ? "#94a3b8"
                        : "#64748b",
                  }}
                >
                  {t.information}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setAboutOpen(
                      true,
                    )
                  }
                  className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-transform hover:scale-[1.01]"
                  style={{
                    background:
                      theme ===
                      "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(15,23,42,0.045)",
                  }}
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      background:
                        theme ===
                        "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(255,255,255,0.75)",
                    }}
                  >
                    <UserRound
                      size={18}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      {t.aboutCreator}
                    </div>

                    <div
                      className="text-xs mt-0.5"
                      style={{
                        color:
                          theme ===
                          "dark"
                            ? "#94a3b8"
                            : "#64748b",
                      }}
                    >
                      {t.aboutCreatorDesc}
                    </div>
                  </div>

                  <span
                    className="text-xs"
                    style={{
                      color:
                        theme ===
                        "dark"
                          ? "#94a3b8"
                          : "#64748b",
                    }}
                  >
                    →
                  </span>
                </button>
              </section>

            </div>
            {theme === "pokemon" && (
            <div className="settings-pokemon-footer">
              <img
                src={POKEMON_SETTINGS_ART.bulbasaur}
                alt=""
                aria-hidden="true"
                className="settings-pokemon-runner bulbasaur"
                draggable={false}
              />

              <img
                src={POKEMON_SETTINGS_ART.charmander}
                alt=""
                aria-hidden="true"
                className="settings-pokemon-runner charmander"
                draggable={false}
              />

              <img
                src={POKEMON_SETTINGS_ART.squirtle}
                alt=""
                aria-hidden="true"
                className="settings-pokemon-runner squirtle"
                draggable={false}
              />
            </div>
          )}
          </div>
        )}
      </div>

      {aboutOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{
            zIndex: 200,
            background: "rgba(15,23,42,0.42)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onPointerDown={(event) => {
            event.stopPropagation(); 
            
            if (event.target === event.currentTarget) {
              setAboutOpen(false);
            }
          }}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6"
            style={{
              background:
                theme === "dark"
                  ? "#0f172a"
                  : "#ffffff",

              color:
                theme === "dark"
                  ? "#f8fafc"
                  : "#1e293b",

              border:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(255,255,255,0.9)",

              boxShadow:
                "0 30px 90px rgba(15,23,42,0.3)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">
                {t.aboutCreatorTitle}
              </div>

              <button
                type="button"
                aria-label="Close about"
                onClick={() =>
                  setAboutOpen(
                    false,
                  )
                }
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(15,23,42,0.06)",
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div
              className="mt-5 rounded-2xl p-4"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(15,23,42,0.045)",
              }}
            >
              <div className="text-base font-semibold">
                Aariv Kandwal
              </div>

              <div
                className="text-xs mt-0.5 font-medium"
                style={{
                  color:
                    theme === "dark"
                      ? "#94a3b8"
                      : "#64748b",
                }}
              >
                {t.creatorAka}
              </div>

              <div
                className="mt-3 text-sm leading-relaxed"
                style={{
                  color:
                    theme === "dark"
                      ? "#cbd5e1"
                      : "#475569",
                }}
              >
                {t.creatorBio}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setAboutOpen(
                  false,
                )
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold"
              style={{
                background:
                  theme === "dark"
                    ? "#f8fafc"
                    : "#1e293b",

                color:
                  theme === "dark"
                    ? "#0f172a"
                    : "#ffffff",
              }}
            >
              <Check size={16} />
              {t.done}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

interface ThemeButtonProps {
  active: boolean;
  icon: ReactNode;
  label: string;
  dark: boolean;
  pokemon?: boolean;
  onClick: () => void;
}

function ThemeButton({
  active,
  icon,
  label,
  dark,
  pokemon,
  onClick,
}: ThemeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-1.5 rounded-2xl px-2 py-3 text-xs font-medium transition-all duration-200 hover:scale-[1.02]"
      style={{
        background:
          active
            ? pokemon
              ? "linear-gradient(135deg,#ffcb05,#f59e0b)"
              : dark
                ? "#334155"
                : "#e2e8f0"
            : dark
              ? "rgba(255,255,255,0.05)"
              : "rgba(15,23,42,0.045)",

        color:
          active && pokemon
            ? "#1e293b"
            : dark
              ? "#f8fafc"
              : "#1e293b",

        border:
          active
            ? pokemon
              ? "1px solid rgba(245,158,11,0.6)"
              : "1px solid rgba(100,116,139,0.25)"
            : "1px solid transparent",
      }}
    >
      {active && (
        <span className="absolute right-2 top-2">
          <Check size={11} />
        </span>
      )}

      {icon}

      <span>
        {label}
      </span>
    </button>
  );
}

interface SettingToggleProps {
  icon: ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  dark: boolean;
  onToggle: () => void;
}

function SettingToggle({
  icon,
  title,
  description,
  enabled,
  dark,
  onToggle,
}: SettingToggleProps) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl p-3"
      style={{
        background:
          dark
            ? "rgba(255,255,255,0.05)"
            : "rgba(15,23,42,0.045)",
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          background:
            dark
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.75)",
        }}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">
          {title}
        </div>

        <div
          className="text-xs mt-0.5"
          style={{
            color:
              dark
                ? "#94a3b8"
                : "#64748b",
          }}
        >
          {description}
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={`${title} ${
          enabled
            ? "on"
            : "off"
        }`}
        onClick={onToggle}
        className="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200"
        style={{
          background:
            enabled
              ? "#22c55e"
              : dark
                ? "#475569"
                : "#cbd5e1",
        }}
      >
        <span
          className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{
            left:
              4,

            transform:
              enabled
                ? "translateX(20px)"
                : "translateX(0)",
          }}
        />
      </button>
    </div>
  );
}