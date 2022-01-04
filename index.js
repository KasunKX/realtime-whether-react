import React, { Component, useState, useEffect, useRef } from 'react'
import reactDom from 'react-dom'
import App from './App'
import "./scss/styles.css"



class Index extends Component {

   componentDidMount() {

   }


   render() {
      return <App></App>
   }


}


reactDom.render(<Index />, document.getElementById("root"))