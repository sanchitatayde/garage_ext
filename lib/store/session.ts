"use client";
import { create } from "zustand";
import type { Garage } from "@/types";
import { SAI_GARAGE } from "@/lib/mock-data";

type State = {
  mobile: string | null;
  isVerified: boolean;
  garage: Garage | null;
  setMobile: (m: string) => void;
  setVerified: (v: boolean) => void;
  setGarage: (g: Garage) => void;
  reset: () => void;
};

export const useSession = create<State>((set) => ({
  mobile: null,
  isVerified: false,
  // Pre-populated for the prototype so the drawer + dashboard always have data
  garage: SAI_GARAGE,
  setMobile: (m) => set({ mobile: m }),
  setVerified: (v) => set({ isVerified: v }),
  setGarage: (g) => set({ garage: g }),
  reset: () => set({ mobile: null, isVerified: false, garage: null }),
}));
