import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AtmShellButtonLabelList,
  AtmShellButtonLabelListLayout,
  AtmShellButtonList,
  AtmShellLayout,
  AtmShellScreen,
  AtmShellScreenLayout,
} from "../../atm-shell";
import CreditCardList from "../../credit-card-list";
import { useUser } from "../../use-user";
import { logOut } from "../../server";
import { useNavigate } from "react-router";
import { getButtonLabels, getButtonProps } from "../../utils";

const Home: React.FC = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const handleLogout = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };
  const buttonsRight = [
    {
      id: "R1",
      buttonProps: {
        onClick: handleLogout,
      },
      label: "Exit",
    },
    {
      id: "R2",
      buttonProps: {
        onClick: () => {
          navigate("/balance");
        },
      },
      label: "Balance",
    },
    {
      id: "R3",
      buttonProps: {
        onClick: handleLogout,
      },
      label: "Re-Enter PIN",
    },
  ];
  const buttonsLeft = [
    {
      id: "L2",
      buttonProps: {
        onClick: () => {
          navigate("/withdraw");
        },
      },
      label: "Withdraw",
    },
    {
      id: "L3",
      buttonProps: {
        onClick: () => {
          navigate("/deposit");
        },
      },
      label: "Deposit",
    },
  ];
  return (
    <AtmShellLayout>
      <AtmShellButtonList
        buttons={getButtonProps(buttonsLeft)}
        position="left"
      />
      <AtmShellScreenLayout>
        <CreditCardList />
        <AtmShellScreen>
          <h1 className="text-white font-bold text-center mt-5">
            Hi {user.data?.name}!
          </h1>
          <span className="text-white pl-1">Please make a choice...</span>
          <AtmShellButtonLabelListLayout>
            <AtmShellButtonLabelList
              labels={getButtonLabels(buttonsLeft)}
              position="left"
            />
            <AtmShellButtonLabelList
              labels={getButtonLabels(buttonsRight)}
              position="right"
            />
          </AtmShellButtonLabelListLayout>
        </AtmShellScreen>
      </AtmShellScreenLayout>
      <AtmShellButtonList
        buttons={getButtonProps(buttonsRight)}
        position="right"
      />
    </AtmShellLayout>
  );
};

export default Home;
