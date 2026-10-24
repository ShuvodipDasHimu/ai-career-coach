"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Updater<T> = T | ((prev: T) => T);

/**
 * SSR-safe localStorage state. `ready` flips to true once the stored value has
 * been loaded on the client, so callers can avoid flashing empty UI.
 * Passing `key = null` disables persistence (e.g. while logged out).
 */
export function useLocalStorage<T>(key: string | null, initial: T) {
  const initialRef = useRef(initial);
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!key) {
      setValue(initialRef.current);
      setReady(false);
      return;
    }
    try {
      const raw = window.localStorage.getItem(key);
      setValue(raw ? (JSON.parse(raw) as T) : initialRef.current);
    } catch {
      setValue(initialRef.current);
    }
    setReady(true);
  }, [key]);

  const set = useCallback(
    (updater: Updater<T>) => {
      setValue((prev) => {
        const next = typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater;
        if (key) {
          try {
            window.localStorage.setItem(key, JSON.stringify(next));
          } catch {
            /* storage full or blocked: keep in-memory state */
          }
        }
        return next;
      });
    },
    [key],
  );

  return [value, set, ready] as const;
}
