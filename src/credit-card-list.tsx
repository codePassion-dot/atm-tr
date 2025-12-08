import { useState } from "react";
import { cn } from "./utils";

const cardOptions = [
  { id: "star", left: 0, width: 40 },
  { id: "pulse", left: 51, width: 60 },
  { id: "maestro", left: 120, width: 44 },
  { id: "mastercard", left: 170, width: 46 },
  { id: "plus", left: 220, width: 50 },
  { id: "visa", left: 280, width: 40 },
];

const CreditCardList = () => {
  const [selected, setSelected] = useState("visa");

  return (
    <div className="relative -mb-7 self-stretch inline-block">
      <img
        src="./creditcard_sprite.png"
        alt="credit-card-sprite"
        className="block w-full"
      />

      {cardOptions.map((card) => {
        const isSelected = card.id === selected;

        //NOTE: since all logos are part of the same image (sprite) there's no way of having individual semantic img elements
        return (
          <div
            key={card.id}
            className={cn(
              "absolute top-0 h-full",
              !isSelected && "bg-gray-300/90",
            )}
            style={{
              left: card.left,
              width: card.width,
            }}
          />
        );
      })}
    </div>
  );
};

export default CreditCardList;
