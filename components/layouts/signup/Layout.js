import SignupFooter from "./Footer";
import SignupHeader from "./Header";

const SignupLayout = ({ children }) => {
    return (
      <>
      
      <div>
        <SignupHeader />
        <main>{children}</main>
        <SignupFooter />
      </div>
      </>
      
    );
  };
  
  export default SignupLayout;