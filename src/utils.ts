import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Button } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getButtonLabels = (buttons: Button[]) => {
  return buttons.map((button) => button.label);
};

export const getButtonProps = (buttons: Button[]) => {
  return buttons.map(({ id, buttonProps }) => ({
    id,
    buttonProps,
  }));
};
