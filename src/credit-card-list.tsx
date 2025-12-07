import { useState } from "react";
import { cn } from "./utils";

const cardOptions = [
  { id: "star", left: 0, width: 29 },
  { id: "pulse", left: 39, width: 44 },
  { id: "maestro", left: 91, width: 32 },
  { id: "mastercard", left: 129, width: 32 },
  { id: "plus", left: 169, width: 32 },
  { id: "visa", left: 208, width: 29 },
];

const CreditCardList = () => {
  const [selected, setSelected] = useState("visa");

  return (
    <div className="relative inline-block">
      <img
        src="./creditcard_sprite.png"
        alt="credit-card-sprite"
        className="block"
      />

      {cardOptions.map((card) => {
        const isSelected = card.id === selected;

        //NOTE: since all logos are part of the same image (sprite) there's no way of having individual semantic img elements
        return (
          <button
            key={card.id}
            onClick={() => setSelected(card.id)}
            className={cn(
              "absolute top-0 h-full",
              !isSelected && "bg-white/90",
            )}
            style={{
              left: card.left,
              width: card.width,
            }}
          ></button>
        );
      })}
    </div>
  );
};

export default CreditCardList;
