import type { PropsWithChildren } from "react";
import { cn } from "./utils";

interface ButtonProps {
  isRight: boolean;
}

const Button: React.FC<ButtonProps> = ({ isRight }) => {
  return (
    <div className="flex items-center">
      {isRight && <div className="w-3.3 h-1.2 bg-gray-600"></div>}
      <button className="bg-gray-400 border-y-2 border-b-gray-600 border-t-gray-100 rounded-md w-11 h-7"></button>
      {!isRight && <div className="w-3.3 bg-gray-600 h-1.2"></div>}
    </div>
  );
};

const AtmShellButtonLabelContainer: React.FC<
  PropsWithChildren & { isRight: boolean }
> = ({ children, isRight }) => {
  return (
    <div
      className={cn("flex flex-col gap-4 mt-auto pb-4", isRight && "self-end")}
    >
      {children}{" "}
    </div>
  );
};

const AtmShellButtonLabel: React.FC<
  PropsWithChildren & { isRight: boolean }
> = ({ children, isRight }) => {
  return (
    <div className="flex h-7 items-center">
      {!isRight && <div className="h-1.2 bg-white w-3.3" />}
      <span className="text-white">{children}</span>
      {isRight && <div className="h-1.2 bg-white w-3.3" />}
    </div>
  );
};

const AtmShellScreenLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children} </div>;
};

const AtmShellScreen: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-[320px] flex flex-col relative h-[290px] outline-4 outline-gray-200 self-stretch bg-blue-300">
      {children}
      <img src="./sticker_graf.png" className="absolute -bottom-25 -left-10" />
    </div>
  );
};

//NOTE: since we would be rendering always 4 buttons on each column there's no need to let the user compose them as the number is static
const AtmShellButtons: React.FC<ButtonProps> = ({ isRight }) => {
  return (
    <div className="flex self-end pb-4 gap-4 flex-col">
      <Button isRight={isRight}></Button>
      <Button isRight={isRight}></Button>
      <Button isRight={isRight}></Button>
      <Button isRight={isRight}></Button>
    </div>
  );
};

const AtmShellLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex">{children}</div>;
};

export {
  AtmShellScreen,
  AtmShellButtonLabelContainer,
  AtmShellButtonLabel,
  AtmShellButtons,
  AtmShellLayout,
  AtmShellScreenLayout,
};
