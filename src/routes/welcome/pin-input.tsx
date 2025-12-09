import React, {
  useState,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "../../utils";

interface PinInputProps {
  length?: number; // default 4
  onChange?: (pin: string) => void;
}

export const PinInput: React.FC<PinInputProps> = ({ length = 4, onChange }) => {
  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const notifyChange = (vals: string[]) => {
    onChange?.(vals.join(""));
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    //NOTE: Strip non-digits and only keep the *last* digit typed
    const inputValue = e.target.value.replace(/\D/g, "").slice(-1);

    setValues((prev) => {
      const next = [...prev];
      next[index] = inputValue || "";
      notifyChange(next);
      return next;
    });

    // If a digit was entered, move to the next box
    if (inputValue && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const isGoingToDeleteCurrVal = values[index].length > 0;
      if (isGoingToDeleteCurrVal) {
        e.preventDefault();
        setValues((prev) => {
          const next = [...prev];
          next[index] = "";
          notifyChange(next);
          return next;
        });
      } else if (index > 0) {
        e.preventDefault();
        focusInput(index - 1);
        setValues((prev) => {
          const next = [...prev];
          next[index - 1] = "";
          notifyChange(next);
          return next;
        });
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    setValues((prev) => {
      const next = [...prev];
      for (let i = 0; i < length; i++) {
        next[i] = pasted[i] ?? "";
      }
      notifyChange(next);
      return next;
    });

    const lastIndex = Math.min(pasted.length, length) - 1;
    if (lastIndex >= 0) focusInput(lastIndex);
  };

  return (
    <div className="flex gap-4">
      {values.map((val, index) => (
        <input
          // eslint-disable-next-line react-x/no-array-index-key
          key={`${val}-${index}`} // since count/order of input never changes it's fine to include the index here
          name="pin"
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="password"
          inputMode="numeric"
          autoComplete="off"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          className={cn(
            "w-12 h-14 text-white text-center text-3xl",
            "border-b-2 border-gray-300",
            "bg-transparent",
            "focus:outline-none focus:border-blue-500",
          )}
        />
      ))}
    </div>
  );
};
