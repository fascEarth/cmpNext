import SurfaceHeader from "./Header";
import SurfaceFooter from "./Footer";
import SideMenu from "./SideMenu";
const SurfaceLayout = ({ currentPage,children }) => {
    return (
      <>
        
        <div>
        
        <main>
          <SideMenu currentPage={currentPage} >
          {children}
          </SideMenu>
          </main>
        <SurfaceFooter />
      </div>
      
      </>
      
    );
  };
  
  export default SurfaceLayout;