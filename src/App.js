import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Application from './containers/Application';
import { Box, Grid, Tab, useMediaQuery, useTheme } from '@material-ui/core';
import logo from'./dilSeDigital.png';
import small_logo from'./dilSeDigital_small.png';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SimpleApp from './containers/SimpleApp';


function App() {
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.down('md'));
  const small = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const styleValue = small ? '1rem .5rem' : '1rem 2rem';

  return (
    <div className="App">
      <header className="App-header">
        <img src={medium? small_logo: logo} alt='Dil se Digital' height={40} />
        <h1 className={small ? 'App-title-small' : 'App-title'}>Content Composer</h1>
      </header>
      <Grid 
        container 
        direction="row" 
        justifyContent='center' 
        style={{padding: styleValue}}
        >
        <Grid item xs={12}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Customer Focussed" value="1" />
                <Tab label={'General Purpose'} value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">{<Application />}</TabPanel>
            <TabPanel value="2">{<SimpleApp />}</TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
