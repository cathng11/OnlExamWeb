import React from 'react';
import ReactDOM from 'react-dom';
import SearchBtn from './components/Helper/SearchBtn';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import Dashboard from './Dashboard';
import Appbar from './views/Appbar';
// import Appbar from './Appbar';
// import Library from './Library';
// import Folders from './Folders';
// import Assignment from './Assignment';
// import CreateAssginment from './CreateAssginment';
// import CreateAssgin from './CreateAssgin';
// import BriefInfo from './BriefInfo';
// import RandQuizOptions from './RandQuizOptions';
// import Profile from './Profile';
// import TransferQuizList from './TransferQuizList';
ReactDOM.render(
  <React.StrictMode>
    <Appbar/>
    {/* <SearchBtn/> */}
    {/* <App /> */}
    {/* <Appbar/> */}
    {/* <Dashboard/> */}
    {/* <Library/> */}
    {/* <Profile/> */}
    {/* <BriefInfo/> */}
    {/* <RandQuizOptions/> */}
    {/* <TransferQuizList/> */}
    {/* <Folders/> */}
    {/* <Assignment/> */}
    {/* <CreateAssgin/> */}
    {/* <CreateAssginment/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
