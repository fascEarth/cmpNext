import SurfaceHeader from "./Header";
import SurfaceFooter from "./Footer";
import SideMenu from "./SideMenu";
import { useContext } from "react";
import { DrawerContext } from "../../../pages/_app";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme, alpha } from "@mui/material/styles";

const SurfaceLayout = ({ setBackgrd, currentPage, children }) => {
  return (
    <>
      <Box>
        <main>
          <SideMenu currentPage={currentPage} setBackgrd={setBackgrd}>
            {children}
          </SideMenu>
        </main>
        <SurfaceFooter />
      </Box>
    </>
  );
};

export default SurfaceLayout;
