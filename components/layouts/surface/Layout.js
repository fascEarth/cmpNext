import SurfaceHeader from "./Header";
import SurfaceFooter from "./Footer";

const SurfaceLayout = ({ children }) => {
    return (
      <>
        
        <div>
        <SurfaceHeader />
        <main>{children}</main>
        <SurfaceFooter />
      </div>
      
      </>
      
    );
  };
  
  export default SurfaceLayout;