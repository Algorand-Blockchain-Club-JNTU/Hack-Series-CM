import { useMemo } from "react"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"

type ThemeName = keyof typeof Colors
type ThemeColorName<T extends ThemeName> = keyof typeof Colors[T]

interface ThemeProps<T extends ThemeName> {
  light?: string
  dark?: string
  // in future, you can add system?, highContrast?, etc.
}

export function useThemeColor<T extends ThemeName>(
  props: ThemeProps<T>,
  colorName: ThemeColorName<T>
) {
  const theme = (useColorScheme() as ThemeName) ?? "light"

  return useMemo(() => {
    // If caller provided an override, use it
    if (props?.[theme]) return props[theme] as string

    // Otherwise fallback to Colors definition
    return Colors[theme]?.[colorName] ?? "#000" // safe fallback
  }, [theme, props, colorName])
}
