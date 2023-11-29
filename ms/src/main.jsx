import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { ChakraProvider} from "@chakra-ui/react"
import { Provider } from 'react-redux'
import {BrowserRouter} from "react-router-dom"
import { store } from './Redux/Store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<BrowserRouter>
<ChakraProvider>
    <App />
    </ChakraProvider>
    </BrowserRouter>
    </Provider>
)
