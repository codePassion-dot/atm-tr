import { type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import { cn } from "./utils";
import { useUser } from "./use-user";
import { useLocation } from "react-router";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isRight?: boolean;
}

const AtmShellButton: React.FC<ButtonProps> = ({
  isRight = false,
  onClick,
  type,
}) => {
  const button = (
    <button
      onClick={onClick}
      type={type ?? "button"}
      className="bg-gray-400 border-y-2 border-b-gray-600 border-t-gray-100 rounded-md w-11 h-7"
    />
  );
  const line = <div className="w-3.3 h-1.2 bg-gray-600"></div>;
  return (
    <div className="flex items-center">
      {isRight ? (
        <>
          {line}
          {button}
        </>
      ) : (
        <>
          {button}
          {line}
        </>
      )}
    </div>
  );
};

const AtmShellButtonLabelListLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return <div className="flex justify-between h-full">{children} </div>;
};

interface AtmShellButtonLabelListProps {
  labels: string[];
  position: "right" | "left";
}
const AtmShellButtonLabelList: React.FC<AtmShellButtonLabelListProps> = ({
  labels = [],
  position,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 mt-auto w-fit pb-4",
        position === "right" && "mt-auto self-stretch ml-auto",
      )}
    >
      {labels.map((label) => {
        const line = <div className="h-1.2 bg-white w-3.3" />;
        const labelJsx = (
          <span className="text-white text-nowrap">{label}</span>
        );
        return (
          <div
            key={label}
            className={cn(
              "flex h-7 items-center gap-1",
              position === "right" ? "self-end" : "self-start",
            )}
          >
            {position === "right" ? (
              <>
                {labelJsx}
                {line}
              </>
            ) : (
              <>
                {line}
                {labelJsx}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

const AtmShellScreenLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children} </div>;
};

const AtmShellScreen: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useUser();
  const location = useLocation();
  return (
    <div className="w-[380px] flex flex-col relative h-[340px] outline-4 outline-gray-200 self-stretch bg-blue-300">
      {user.isFetching ||
      (!user.data && location.pathname !== "/") ||
      (user.data && location.pathname === "/") ? (
        <div className="flex justify-center items-center flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="animate-spin text-white"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      ) : (
        children
      )}
      <img src="./sticker_graf.png" className="absolute -bottom-25 -left-10" />
      <img src="./systems.png" className="absolute right-0 -bottom-4" />
    </div>
  );
};

interface AtmShellButton {
  id: string;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

//NOTE: children is now discourage for composition that's why I'm sending the buttons as props https://react.dev/reference/react/Children#accepting-an-array-of-objects-as-a-prop
interface AtmShellButtonListProps {
  buttons?: AtmShellButton[];
  position: "right" | "left";
}
const AtmShellButtonList: React.FC<AtmShellButtonListProps> = ({
  buttons = [],
  position,
}) => {
  const allButtons = Array.from(
    { length: 4 - buttons.length },
    (_, idx): AtmShellButton => ({
      id: `${position === "right" ? "R" : "L"}${idx}`,
    }),
  ).concat(buttons);
  return (
    <div className="flex self-end pb-4 gap-4 flex-col">
      {allButtons.map((button) => {
        return (
          <AtmShellButton
            key={button.id}
            {...button.buttonProps}
            isRight={position === "right"}
          />
        );
      })}
    </div>
  );
};

const AtmShellLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex">{children}</div>;
};

export {
  AtmShellScreen,
  AtmShellButtonLabelList,
  AtmShellButtonList,
  AtmShellLayout,
  AtmShellButtonLabelListLayout,
  AtmShellScreenLayout,
};
