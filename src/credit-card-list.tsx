import { cn } from "./utils";
import { useUser } from "./use-user";

const cardOptions = [
  { id: "star", left: 0, width: 44 },
  { id: "pulse", left: 56, width: 72 },
  { id: "maestro", left: 134, width: 60 },
  { id: "mastercard", left: 200, width: 60 },
  { id: "plus", left: 265, width: 55 },
  { id: "visa", left: 325, width: 55 },
];

const CreditCardList = () => {
  const user = useUser();

  return (
    <div className="relative -mb-7 self-stretch inline-block">
      <img
        src="./creditcard_sprite.png"
        alt="credit-card-sprite"
        className="block w-full"
      />

      {cardOptions.map((card) => {
        const isSelected = card.id === user.data?.franchise;

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
