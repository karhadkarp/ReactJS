import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FormControlLabel, Grid, Switch } from '@material-ui/core';
import { useEffect, useState } from 'react';
import logo from'../dilSeDigital.png';

export default function ResponsiveDialog({showDialog, closeDialog, showLocal, htmlContent, converttoLocal, customerLanguage}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    closeDialog && closeDialog();
  };

  const [local, setLocal] = useState(false);

  useEffect(() => {
    setLocal(showLocal);
  }, [showLocal]);


  const handleChange = (event) => {
    setLocal(!local);
    converttoLocal && converttoLocal();
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'left'
                  }}>
                <img src={logo} alt='Dil se Digital' height={40} />
                {customerLanguage && customerLanguage !== 'English' && (
                  <FormControlLabel
                    style={{}}
                    control={
                      <Switch checked={local} onChange={handleChange} name="local" color='primary'/>
                    }
                  label={`Show in ${customerLanguage}`}
                />
                )}
            </div>
           {htmlContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}