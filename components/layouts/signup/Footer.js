import styles from './Footer.module.css';
function SignupFooter() {
    return (
      <footer className="bg-gray-800 py-4">
      <div className="container mx-auto text-center">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      </div>
    </footer>
    );
  }
  
  export default SignupFooter;
  