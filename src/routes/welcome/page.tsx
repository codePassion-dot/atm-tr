import CreditCardList from "../../components/credit-card-list";
import {
  AtmShellScreen,
  AtmShellLayout,
  AtmShellButtonList,
  AtmShellButtonLabelList,
  AtmShellScreenLayout,
  AtmShellButtonLabelListLayout,
} from "../../components/atm-shell";
import { PinInput } from "./pin-input";
import { setLoggedUser } from "../../server";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getButtonLabels, getButtonProps } from "../../utils";
import { useEffect } from "react";
import { useUser } from "../../hooks";

const Welcome: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: setLoggedUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isFetching && user.data) {
      navigate("/home");
    }
  }, [navigate, user.data, user.isFetching]);

  const buttons = [
    {
      id: "R3",
      label: "Enter PIN",
      buttonProps: {
        onClick: undefined,
        type: "submit" as const,
        disabled: mutation.isPending,
      },
    },
  ];

  const handleSubmit = async (formData: FormData) => {
    const pin = formData.getAll("pin").join("");
    mutation.mutate(pin, {
      onSuccess: () => {
        navigate("/home");
      },
    });
  };

  return (
    <form action={handleSubmit}>
      <AtmShellLayout>
        <AtmShellButtonList position="left" />
        <AtmShellScreenLayout>
          <CreditCardList />
          <AtmShellScreen>
            <h1 className="text-white mx-3 font-bold text-xl text-center mt-5">
              Welcome to the ATM
            </h1>
            <div className="flex justify-center items-center basis-xl">
              <PinInput />
            </div>
            <AtmShellButtonLabelListLayout>
              <AtmShellButtonLabelList
                labels={getButtonLabels(buttons)}
                position="right"
              />
            </AtmShellButtonLabelListLayout>
          </AtmShellScreen>
        </AtmShellScreenLayout>
        <AtmShellButtonList
          position="right"
          buttons={getButtonProps(buttons)}
        />
      </AtmShellLayout>
    </form>
  );
};

export default Welcome;
