import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';
import Routes from './routes';
import DoAssignmentContext from './context/DoAssignmentContext';
import QuestionContext from './context/QuestionContext';
import AssignmentService from './services/assignment.service';

const theme = createTheme({
  palette: {
    primary: {
      light: '#A2DBFA',
      main: '#000C40',
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
});
function App() {
  const [assignment, setAssignment] = React.useState(null)
  const [question, setQuestion] = React.useState([])

  const valueAssignment = React.useMemo(() => ({ assignment, setAssignment }), [assignment, setAssignment]);
  const valueQuestion = React.useMemo(() => ({ question, setQuestion }), [question, setQuestion]);
  React.useState(() => {
    let mounted = true;
    if (localStorage.getItem('assignment')) {
      let assignmentService = AssignmentService.getInstance()
      assignmentService.submitAssignment(JSON.parse(localStorage.getItem('assignment')))
        .then(items => {
          if (mounted) {
            if (items.status.Code === 200) {
              localStorage.removeItem('assignment')
            }
          }
        })
        .catch((err) => {
          console.error(err)
        });
    }
    return () => { mounted = false }
  }, [])

  return (
    <DoAssignmentContext.Provider value={valueAssignment} >
      <QuestionContext.Provider value={valueQuestion}>
        <Router>
          <Routes />
        </Router>
      </QuestionContext.Provider>
    </DoAssignmentContext.Provider>
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
reportWebVitals();
