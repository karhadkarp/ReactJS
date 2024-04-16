import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Application from './containers/Application';
import { Box, Grid, Tab, useMediaQuery, useTheme } from '@material-ui/core';
import logo from'./dilSeDigital.png';
import small_logo from'./dilSeDigital_small.png';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SimpleApp from './containers/SimpleApp';


function App() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('md'));

  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={small? small_logo: logo} alt='Dil se Digital' height={40} />
        <h1>Generate Content</h1>
      </header>
      <Grid container direction="row" justifyContent='center' style={{padding:'1rem 2rem'}}>
        <Grid item xs={12}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label={'General Purpose Prompt'} value="1" />
                <Tab label="Customer Specific Prompt" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">{<SimpleApp />}</TabPanel>
            <TabPanel value="2">{<Application />}</TabPanel>
          </TabContext>
          {/* <BrowserRouter>
            <Routes>
              <Route path="/" element={<Application />} />
              <Route path="/about" element={<h3>This is the About page</h3>} />
            </Routes>
          </BrowserRouter> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
