import SurfaceHeader from "./Header";
import SurfaceFooter from "./Footer";
import SideMenu from "./SideMenu";
const SurfaceLayout = ({ setBackgrd,currentPage,children }) => {
    return (
      <>
        
        <div>
        
        <main>
          <SideMenu currentPage={currentPage} setBackgrd={setBackgrd} >
          {children}
          </SideMenu>
          </main>
        <SurfaceFooter />
      </div>
      
      </>
      
    );
  };
  
  export default SurfaceLayout;