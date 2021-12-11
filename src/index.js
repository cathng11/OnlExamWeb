import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes from './routes';
import UserContext from './context/UserContext';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#A2DBFA',
      main: '#3D4E81',
      dark: '#6E7FF3',
      gradient: 'linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)'
    },
    secondary: {
      light: '#a8ff78',
      main: '#A2DBFA',
      dark: '#0B4619',
      gradient: 'linear-gradient(to right, #dce35b, #45b649)'
    },
    info:{
      light: '#a8ff78',
      main: '#76b852',
      dark: '#0B4619',
      gradient: 'linear-gradient(to right, #dce35b, #45b649)'     
    }
  },
  // typography: { 
  //    useNextVariants: true
  // }
});
function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <UserContext.Provider value={value}>
      <Router>
        <Routes />
      </Router>
    </UserContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider  theme={theme}>
      <App />
    </ThemeProvider >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
