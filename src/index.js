import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserContext from './context/UserContext';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes from './routes';
import DoAssignmentContext from './context/DoAssignmentContext';
import QuestionContext from './context/QuestionContext';

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
      gradient: 'linear-gradient(60deg, #29323c 0%, #485563 100%);'
    },
    info: {
      light: '#a8ff78',
      main: '#76b852',
      dark: '#0B4619',
      gradient: 'linear-gradient(60deg, #29323c 0%, #485563 100%);'
    },
    error: {
      main: '#630000',
      dark: '#3D0000',
      light: '#911F27'
    },
    success: {
      main: '#4E9F3D',
      dark: '#1E5128',
      light: '#D8E9A8'
    }
  },
  // typography: { 
  //    useNextVariants: true
  // }
});
function App() {
  const [user, setUser] = useState(null);
  // window.location.reload(false);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [assignment, setAssignment] = React.useState(null)
  const [question, setQuestion] = React.useState([])

  const valueAssignment = React.useMemo(() => ({ assignment, setAssignment }), [assignment, setAssignment]);
  const valueQuestion = React.useMemo(() => ({ question, setQuestion }), [question, setQuestion]);
  return (
    <UserContext.Provider value={value}>
      <DoAssignmentContext.Provider value={valueAssignment} >
        <QuestionContext.Provider value={valueQuestion}>
          <Router>
            <Routes />
          </Router>
        </QuestionContext.Provider>
      </DoAssignmentContext.Provider>
    </UserContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
