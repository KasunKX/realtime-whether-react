import react from 'react'
import reactDom from 'react-dom'
import "./scss/main.css"
import App from "./App"

const Index = () => {


   return <>

      <App />

   </>
}


reactDom.render(<Index />, document.getElementById("root"))