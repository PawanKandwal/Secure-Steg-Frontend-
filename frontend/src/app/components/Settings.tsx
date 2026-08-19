import { useEffect, useRef, type ReactNode } from "react";
import {
  Settings as SettingsIcon,
  X,
  Sun,
  Moon,
  Sparkles,
  Volume2,
  VolumeX,
  Music,
  Languages,
  UserRound,
  Check,
} from "lucide-react";

export type AppTheme = "pokemon" | "light" | "dark";
export type AppLanguage = "en" | "hi";

interface SettingsProps {
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;

  soundEffects: boolean;
  onSoundEffectsChange: (enabled: boolean) => void;

  music: boolean;
  onMusicChange: (enabled: boolean) => void;

  language: AppLanguage;
  onLanguageChange: (language: AppLanguage) => void;
}

const SETTINGS_KEY = "secure-steg-settings";

export default function Settings({
  theme,
  onThemeChange,
  soundEffects,
  onSoundEffectsChange,
  music,
  onMusicChange,
  language,
  onLanguageChange,
}: SettingsProps) {
  const [open, setOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({
        theme,
        soundEffects,
        music,
        language,
      }),
    );
  }, [theme, soundEffects, music, language]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        panelRef.current &&
        !panelRef.current.contains(target)
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
    if (!open) return;

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
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
      {/* ================================================================
          SETTINGS BUTTON
      ================================================================= */}

      <div
        ref={panelRef}
        className="fixed top-4 left-4 sm:top-5 sm:left-5"
        style={{
          zIndex: 100,
        }}
      >
        <button
          type="button"
          aria-label="Open settings"
          aria-expanded={open}
          onClick={() =>
            setOpen((current) => !current)
          }
          className="flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            width: 46,
            height: 46,

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

            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
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

        {/* ================================================================
            SETTINGS PANEL
        ================================================================= */}

        {open && (
          <div
            className="absolute left-0 top-14 w-[min(360px,calc(100vw-32px))] rounded-3xl"
            style={{
              background:
                theme === "dark"
                  ? "rgba(15,23,42,0.97)"
                  : "rgba(255,255,255,0.96)",

              border:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.12)"
                  : "1px solid rgba(255,255,255,0.9)",

              color:
                theme === "dark"
                  ? "#f8fafc"
                  : "#1e293b",

              boxShadow:
                "0 24px 70px rgba(15,23,42,0.25)",

              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}

            <div
              className="flex items-center justify-between px-5 py-4"
              style={{
                borderBottom: "none",
            }}
            >
              <div>
                <div className="text-base font-semibold">
                  Settings
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
                  Customize Secure Steg
                </div>
              </div>

              <button
                type="button"
                aria-label="Close settings"
                onClick={() => setOpen(false)}
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
            {/* Content */}

            <div
            className="max-h-[75vh] overflow-y-auto p-4 settings-scroll"
            style={{
                paddingBottom:
                theme === "pokemon"
                    ? "82px"
                    : undefined,
            }}
            >

              {/* ==========================================================
                  APPEARANCE
              =========================================================== */}

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
                  Appearance
                </div>

                <div className="grid grid-cols-3 gap-2">

                  <ThemeButton
                    active={theme === "light"}
                    icon={<Sun size={17} />}
                    label="Light"
                    dark={theme === "dark"}
                    onClick={() =>
                      onThemeChange("light")
                    }
                  />

                  <ThemeButton
                    active={theme === "dark"}
                    icon={<Moon size={17} />}
                    label="Dark"
                    dark={theme === "dark"}
                    onClick={() =>
                      onThemeChange("dark")
                    }
                  />

                  <ThemeButton
                    active={theme === "pokemon"}
                    icon={<Sparkles size={17} />}
                    label="Pokémon"
                    dark={theme === "dark"}
                    pokemon
                    onClick={() =>
                      onThemeChange("pokemon")
                    }
                  />

                </div>
              </section>

              {/* ==========================================================
                  AUDIO
              =========================================================== */}

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
                  Audio
                </div>

                <SettingToggle
                  icon={
                    soundEffects ? (
                      <Volume2 size={18} />
                    ) : (
                      <VolumeX size={18} />
                    )
                  }
                  title="Sound Effects"
                  description="Interface and action sounds"
                  enabled={soundEffects}
                  dark={theme === "dark"}
                  onToggle={() =>
                    onSoundEffectsChange(
                      !soundEffects,
                    )
                  }
                />

                <div className="h-2" />

                <SettingToggle
                  icon={<Music size={18} />}
                  title="Music"
                  description="Background music"
                  enabled={music}
                  dark={theme === "dark"}
                  onToggle={() =>
                    onMusicChange(!music)
                  }
                />

              </section>

              {/* ==========================================================
                  LANGUAGE
              =========================================================== */}

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
                  Language
                </div>

                <div
                  className="rounded-2xl p-3"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(15,23,42,0.045)",
                  }}
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{
                        background:
                          theme === "dark"
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(255,255,255,0.75)",
                      }}
                    >
                      <Languages size={18} />
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        Language
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
                        Choose your preferred language
                      </div>
                    </div>

                    <select
                      value={language}
                      onChange={(event) =>
                        onLanguageChange(
                          event.target
                            .value as AppLanguage,
                        )
                      }
                      className="rounded-xl px-2.5 py-2 text-xs outline-none"
                      style={{
                        background:
                          theme === "dark"
                            ? "#1e293b"
                            : "#ffffff",

                        color:
                          theme === "dark"
                            ? "#f8fafc"
                            : "#1e293b",

                        border:
                          theme === "dark"
                            ? "1px solid rgba(255,255,255,0.12)"
                            : "1px solid rgba(15,23,42,0.1)",
                      }}
                    >
                      <option value="en">
                        English
                      </option>

                      <option value="hi">
                        हिन्दी
                      </option>
                    </select>

                  </div>
                </div>

              </section>

              {/* ==========================================================
                  ABOUT CREATOR
              =========================================================== */}

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
                  Information
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setAboutOpen(true)
                  }
                  className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-transform hover:scale-[1.01]"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(15,23,42,0.045)",
                  }}
                >

                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      background:
                        theme === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(255,255,255,0.75)",
                    }}
                  >
                    <UserRound size={18} />
                  </div>

                  <div className="flex-1">

                    <div className="text-sm font-medium">
                      About Creator
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
                      About the creator and Secure Steg
                    </div>

                  </div>

                  <span
                    className="text-xs"
                    style={{
                      color:
                        theme === "dark"
                          ? "#94a3b8"
                          : "#64748b",
                    }}
                  >
                    →
                  </span>

                </button>

              </section>

            </div>
          </div>
        )}
      </div>

      {/* ================================================================
          ABOUT CREATOR MODAL
      ================================================================= */}

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
            if (
              event.target ===
              event.currentTarget
            ) {
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
                About Creator
              </div>

              <button
                type="button"
                aria-label="Close about"
                onClick={() =>
                  setAboutOpen(false)
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
                className="mt-2 text-sm leading-relaxed"
                style={{
                  color:
                    theme === "dark"
                      ? "#cbd5e1"
                      : "#475569",
                }}
              >
                Creator and developer of Secure Steg,
                a secure image steganography web
                application.
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                setAboutOpen(false)
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
              Done
            </button>

          </div>

        </div>
      )}
    </>
  );
}

/* ==========================================================================
   THEME BUTTON
============================================================================ */

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

/* ==========================================================================
   TOGGLE
============================================================================ */

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
          enabled ? "on" : "off"
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
            left: 4,

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