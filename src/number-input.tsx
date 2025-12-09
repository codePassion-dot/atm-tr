import { useState } from "react";

const NumberInput = () => {
  const [value, setValue] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value;

    // Allow: "", "123", "123.", "123.45"
    const isAllowed = /^\d*\.?\d*$/.test(v);
    if (!isAllowed) return;

    setValue(v);
  };

  return (
    <input
      type="text"
      name="addition"
      inputMode="decimal"
      value={value}
      onChange={handleChange}
      className="w-full bg-transparent border-b-2 border-gray-400 text-white py-2 focus:outline-none focus:border-white transition-colors text-xl"
    />
  );
};

export default NumberInput;
