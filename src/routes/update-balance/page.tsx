import { useLocation, useNavigate } from "react-router";
import {
  AtmShellButtonLabelList,
  AtmShellButtonLabelListLayout,
  AtmShellButtonList,
  AtmShellLayout,
  AtmShellScreen,
  AtmShellScreenLayout,
} from "../../atm-shell";
import { getButtonLabels, getButtonProps } from "../../utils";
import CreditCardList from "../../credit-card-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBalance } from "../../server";
import NumberInput from "../../number-input";

const UpdateBalance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateBalance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const handleDeposit = async (formData: FormData) => {
    const deposit = formData.get("addition");
    mutation.mutate(
      location.pathname === "/withdraw"
        ? Number(deposit) * -1
        : Number(deposit),
      {
        onSuccess: () => {
          navigate("/home");
        },
      },
    );
  };
  const buttons = [
    {
      id: "R2",
      label: "Cancel",
      buttonProps: {
        onClick: () => {
          navigate(-1);
        },
      },
    },
    {
      id: "R3",
      label: "OK",
      buttonProps: {
        type: "submit" as const,
        disabled: mutation.isPending,
      },
    },
  ];
  return (
    <form action={handleDeposit}>
      <AtmShellLayout>
        <AtmShellButtonList buttons={getButtonProps(buttons)} position="left" />
        <AtmShellScreenLayout>
          <CreditCardList />
          <AtmShellScreen>
            <div className="px-10 mt-20">
              <NumberInput />
              <span className="text-gray-300 text-sm">
                {mutation.error?.message}
              </span>
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
          buttons={getButtonProps(buttons)}
          position="right"
        />
      </AtmShellLayout>
    </form>
  );
};

export default UpdateBalance;
