import CreditCardList from "../credit-card-list";
import {
  AtmShellScreen,
  AtmShellLayout,
  AtmShellButtons,
  AtmShellButtonLabel,
  AtmShellButtonLabelContainer,
  AtmShellScreenLayout,
} from "../atm-shell";

const Welcome: React.FC = () => {
  return (
    <AtmShellLayout>
      <AtmShellButtons isRight={false} />
      <AtmShellScreenLayout>
        <CreditCardList />
        <AtmShellScreen>
          <h1 className="text-white mx-1 font-bold text-xl text-center mt-5">
            Welcome to the ATM
          </h1>
          <AtmShellButtonLabelContainer isRight>
            <AtmShellButtonLabel isRight>Enter PIN</AtmShellButtonLabel>
          </AtmShellButtonLabelContainer>
        </AtmShellScreen>
      </AtmShellScreenLayout>
      <AtmShellButtons isRight />
    </AtmShellLayout>
  );
};

export default Welcome;
