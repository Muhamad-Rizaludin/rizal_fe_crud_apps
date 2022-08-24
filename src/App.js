import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from "react";
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Routers from './config/Router';
import Header from './layout/Header';

const AlertTemplate2 = ({ style, options, message, close }) => {
  function getBackround() {
    if (options.type === 'info') {
      return '#00bcd4'
    }
    if (options.type === 'success') {
      return '#73CA5C'
    }
    if (options.type === 'error') {
      return 'red'
    }
  }
  return (
    <div className="alert flex justify-left items-center" style={{
      ...style,
      width: '400px',
      backgroundColor: getBackround(),
      textAlign: 'center'
    }}>
      <div className="flex">
        {message}
        <div style={{
          position: 'relative'
        }}>
          <IconButton onClick={close} style={{ color: "white", position: "absolute", right: '-150px', top: '-10px' }}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.FADE
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#7126B5',
      contrastText: '#fff'
    },
    secondary: {
      main: '#E2D4F0',
      contrastText: '#000'
    },
    success: {
      main: '#73CA5C',
      contrastText: '#fff'
    }
  },
});

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {
            Routers.map((o, i) => {
              return (
                <Route key={i} path={o.path} element={<Layout Component={o.component} header={o.withOutHeader ? false : true} />} />
              )
            })
          }
        </Routes>
      </Router>
    </>
  )
}

function Layout({ Component, header }) {
  let [onLoad, setOnLoad] = React.useState(true);
  useEffect(() => {
    let checked = localStorage.getItem("TaskBigio");
    let urlNotChecked = [
      "/login",
      "/register",
      "/",
    ];
    if (!urlNotChecked.find(o => o === window.location.pathname)) {
      if (!checked) {
        window.location.href = "/login";
      } else {
        setOnLoad(false)
      }
    } else {
      if (window.location.pathname === "/login") {
        if (localStorage.getItem("TaskBigio")) {
          window.location.href = "/";
        }else{
          setOnLoad(false)
        }
      }else{
        setOnLoad(false)
      }
    }
  }, [])
  return <>
    {!onLoad &&
      <ThemeProvider theme={theme}>
        <AlertProvider template={AlertTemplate2} {...options}>
          {
            header ?
              <>
                <Header />
                <div style={{
                  margin: '20px'
                }}>
                  <Component />
                </div>
              </>
              :
              <>
              <div style={{maxHeight: '100vh', overflow: 'hidden'}}>
                <Component />
              </div>
              </>
          }
        </AlertProvider>
      </ThemeProvider>
    }
  </>
}