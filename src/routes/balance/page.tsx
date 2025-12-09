import { useNavigate } from "react-router";
import {
  AtmShellButtonLabelList,
  AtmShellButtonLabelListLayout,
  AtmShellButtonList,
  AtmShellLayout,
  AtmShellScreen,
  AtmShellScreenLayout,
} from "../../components/atm-shell";
import CreditCardList from "../../components/credit-card-list";
import { getButtonLabels, getButtonProps } from "../../utils";
import { useUser } from "../../hooks";

const Balance = () => {
  const navigate = useNavigate();
  const user = useUser();
  const buttons = [
    {
      id: "R3",
      label: "Back",
      buttonProps: {
        onClick: () => {
          navigate(-1);
        },
      },
    },
  ];
  return (
    <AtmShellLayout>
      <AtmShellButtonList buttons={getButtonProps(buttons)} position="left" />
      <AtmShellScreenLayout>
        <CreditCardList />
        <AtmShellScreen>
          <h1 className="text-white font-bold text-center mt-30">
            Balance: ${user.data?.balance}
          </h1>
          <AtmShellButtonLabelListLayout>
            <AtmShellButtonLabelList
              labels={getButtonLabels(buttons)}
              position="right"
            />
          </AtmShellButtonLabelListLayout>
        </AtmShellScreen>
      </AtmShellScreenLayout>
      <AtmShellButtonList buttons={getButtonProps(buttons)} position="right" />
    </AtmShellLayout>
  );
};

export default Balance;
