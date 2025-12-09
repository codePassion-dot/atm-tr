import { Outlet, useNavigate } from "react-router";
import { useUser } from "./use-user";
import { useEffect } from "react";

const Layout: React.FC = () => {
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isFetching && !user.data) {
      navigate("/");
    }
  }, [navigate, user.data, user.isFetching]);
  return (
    <div className="h-screen font-press-start flex items-center justify-center overflow-hidden bg-purple-400">
      <div className="flex self-stretch flex-col">
        <header className="bg-blue-700 relative px-14 py-4 flex justify-center items-center rounded-xl">
          <img src="./atm_sign.png" />
          <img
            src="./graffiti.png"
            className="absolute top-[37.5%] left-[45.3%] -translate-y-[37.5%]"
          />
        </header>
        <div className="px-4 h-full">
          <div className="bg-gray-300 flex flex-col h-full">
            <div className="h-2 w-full bg-gray-500" />
            <main className="flex px-4 flex-col mt-2">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
