"use client";
import { create } from "zustand";

export type ToastTone = "success" | "error" | "info";
export type Toast = { id: string; message: string; tone?: ToastTone };

type State = {
  toasts: Toast[];
  show: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
};

export const useToasts = create<State>((set, get) => ({
  toasts: [],
  show: (t) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, ...t }] }));
    setTimeout(() => get().dismiss(id), 3200);
  },
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
}));

// Convenience helper outside of components.
export function toast(message: string, tone?: ToastTone) {
  useToasts.getState().show({ message, tone });
}
