import type { ButtonHTMLAttributes } from "react";

export interface Button {
  id: string;
  label: string;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
}
