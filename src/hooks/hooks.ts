import { useState, useEffect, Dispatch, SetStateAction } from "react";

type SaveableData = string | number | object | boolean | undefined | null;

export default function useStickyState<T extends SaveableData>(
  defaultValue: T,
  key: string,
  initialization?: (savedValue: T) => T,
): [
  value: T,
  setValue: Dispatch<SetStateAction<T>>,
] {
  const [value, setValue] = useState(() => {
    const v = typeof localStorage === "object" ? localStorage.getItem(key) : null;
    if (v === null) {
      return defaultValue;
    }
    
    try {
      const saved = JSON.parse(v) as T;
      return initialization ? initialization(saved) : saved;
    } catch (e) {
      console.error("error parsing saved state from useStickyState");
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof localStorage === "object") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
