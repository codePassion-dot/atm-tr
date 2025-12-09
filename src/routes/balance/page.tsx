import { useNavigate } from "react-router";
import {
  AtmShellButtonLabelList,
  AtmShellButtonLabelListLayout,
  AtmShellButtonList,
  AtmShellLayout,
  AtmShellScreen,
  AtmShellScreenLayout,
} from "../../atm-shell";
import CreditCardList from "../../credit-card-list";
import { getButtonLabels, getButtonProps } from "../../utils";
import { useUser } from "../../use-user";

const Balance = () => {
  const navigate = useNavigate();
  const user = useUser();
  const buttons = [
    {
      id: "R3",
      label: "Ok",
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
