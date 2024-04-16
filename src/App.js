import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Application from './containers/Application';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import logo from'./dilSeDigital.png';
import small_logo from'./dilSeDigital_small.png';


function App() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div className="App">
      <header className="App-header">
        <img src={small? small_logo: logo} alt='Dil se Digital' height={40} />
        <h1>Generate Content</h1>
      </header>
      <Grid container direction="row" justifyContent='center' style={{padding:'1rem 2rem'}}>
        <Grid item xs={12}>
          <Application />
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
