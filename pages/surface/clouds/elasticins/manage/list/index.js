import SurfaceLayout from '../../../../../../components/layouts/surface/Layout';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import styles from './index.module.css';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import MinsDataTable from '../../../../../../components/pages/surface/clouds/elasticins/manage/list/minsDatatable';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function MinstanceList() {
  /*useEffect(() => {
    const loadWMKS = async () => {
      try {
        const WMKS = await import('../../../../../../public/js/wmks.min.js');
        console.log(WMKS)
        var rescale = true;
        var changeResolution = true;
        var position = 0;

        var options = {
          retryConnectionInterval: 2000,
          rescale: rescale,
          changeResolution: changeResolution,
          position: WMKS.CONST.Position.LEFT_TOP,
          useVNCHandshake: true
        };

        var wmks = WMKS.createWMKS("wmksContainer", options);

        // Event registration example
        registerEvents(wmks);

        connectWMKS(wmks);
      } catch (error) {
        console.error('Error loading WMKS:', error);
      }
    };

   loadWMKS();
  }, []);

  function registerEvents(wmks) {
    wmks.register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE, function (evt, data) {
      switch (data.state) {
        case WMKS.CONST.ConnectionState.CONNECTING:
          console.warn("The console is connecting");
          break;

        case WMKS.CONST.ConnectionState.CONNECTED:
          console.warn("The console has been connected");
          // You can perform actions when connected here
          break;

        case WMKS.CONST.ConnectionState.DISCONNECTED:
          console.error("The console has been disconnected");
          wmks.destroy();
          // You can handle disconnection here
          break;
      }
    });

    wmks.register(WMKS.CONST.Events.ERROR, function (evt, data) {
      console.error("Error: " + data.errorType);
      // Handle errors here
    });

    // Add more event handlers as needed
  }

  function connectWMKS(wmks) {
    var host = "detacloud-ruh.detasad.com";
    var port = "8443";
    var ticket = 'cst-GF7gHVusRJj0wFpbI8HE\/g+xdax39dgi0mjiEDAoB+X2aiNbWsBit3GLHccnRd2w0XFDhE4UpXe9f83WlRnBMWTkm3MGkxSzwBOxYPLxXqTINYiow325alAxUIf88Agcg4Dy72xsJiXNdJwRMl5nw07SiBwEZ+MXCNH7PM4gkKgHkql7tjqxpzTv5Le8\/woAr9FHr4R9fSmXeGsF+Gkj8M8b\/xS318URS36GlBwm8\/qWLbFirHRpt5KennZcmsNizPqJSJV92+AA9gnx+g0uQ7NL9+5UaFWKZ0xO3N2iqrICli0Ryre3Uyh98VeXaQ3No8hMOC3updKF5YQcDl7wpw==-KLpCBULFK4cpP\/B2DEi9EtIuhMAuHGty0yKxFwkD8cXkjAD2Pu3CzAtXO3OIBhzCn7SzBcqjIZi5NmvR8ZnnWDsXSYWZOrPC--tp-5C:39:23:47:4D:52:C7:CB:F3:BC:7F:BE:6A:A7:57:F1:80:6E:C5:B6--';
    var ckurl = "ws://" + host + ":" + port;

    if (connectionTicket) {
      ckurl = "wss://" + host + ":" + "443" + "/443;" + connectionTicket;

      try {
        wmks.connect(ckurl);
        console.warn("Connected successfully!");
      } catch (err) {
        console.error("Main - Connection error: " + err);
        wmks.destroy();
      }
    }
  }*/

  return (
    <>
      {/* Your component JSX */}
      <SurfaceLayout currentPage={0} setBackgrd={true}>
        <Box className={styles.contentWrapper}></Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography component="h4" variant="h5" align="left" color="#fff" fontSize={20}>
            Manage Instance
          </Typography>
        </Breadcrumbs>
        <Card sx={{ mt: 2, borderRadius: '7px' }}>
          <CardContent sx={{ padding: '24px' }}>
            <MinsDataTable />
          </CardContent>
        </Card>
      </SurfaceLayout>
    </>
  );
}

export default MinstanceList;
