import type { PropsWithChildren } from "react";

const ErrorMessage: React.FC<PropsWithChildren> = ({ children }) => {
  return <span className="text-gray-300 text-sm">{children}</span>;
};
export default ErrorMessage;
