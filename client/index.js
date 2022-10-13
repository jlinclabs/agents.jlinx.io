import React from 'react'
import { render } from 'app-shared/client/render.js'
import Routes from './Routes'
import theme from './theme'
console.log({ React })
render({
  React,
  Routes,
  theme,
})


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import { ThemeProvider, CssBaseline } from '@mui/material'
//
// import theme from './css/theme'
// import App from './App'
// import reportWebVitals from './reportWebVitals'
//
// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ThemeProvider {...{theme}}>
//         <CssBaseline />
//         <App />
//       </ThemeProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// )
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
//
//
