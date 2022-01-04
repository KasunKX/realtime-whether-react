import react, { useState, useRef, useContext, useEffect } from 'react'
import Whether from './whether.'
import axios from 'axios'

import hum from "./img/humidity.png"
import wind from "./img/wind.png"
import airP from "./img/cloudy.png"
import raining from "./img/raining.png"

const App = () => {

   const ref = useRef()
   const [city, setCity] = useState("auto:ip")
   const [theme, setTheme] = useState("light")
   const [error, setError] = useState(0)
   const [able, setAble] = useState({})
   const [current, setCurrent] = useState({})
   const [change, setChange] = useState(0)
   const [show, setShow] = useState(0)

   let obj = {
   }
   let country = "waiting.."

   function getData() {

      const options = {
         method: 'GET',
         url: 'https://weatherapi-com.p.rapidapi.com/current.json',
         params: { q: JSON.stringify(document.getElementById("inp").value) },
         headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': '271e3ecc26msh59d4354714d60ccp126908jsn1746ee8850b5'
         }
      };

      axios.request(options).then(function (response) {
         return response.data

      }).then(res => {

         return res

      }).then(loc => {

         obj = loc
         console.log()
         setAble(obj.location)
         setCurrent(obj.current)
         console.log(obj)
         setError(0)
         setShow(1)

      }).catch(function (error) {
         setError(1)
      })

      if (obj) {
         let { lat, lon, name, region, localtime } = obj.location

         obj = {
            con: country,
            lati: lat,
            lon: lon,
            name: name,
            region: region,
            time: localtime
         }

         setAble(1)


      }



   }

   useEffect(() => {

      console.log(able)

   })

   const Empty = () => {


      return <>

         <div className="empty">
            <div>

               <img src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX31719982.jpg" alt="" />
               <h1>Search somewhere</h1>
            </div>
         </div>

      </>
   }

   const Available = () => {

      const { temp_c, temp_f, humidity, wind_kph, pressure_in, precip_mm } = current

      const temps = [temp_c, temp_f]
      const f = ["C", "F"]

      function cf() {

         if (change == 0) {
            setChange(1)
         } else {
            setChange(0)
         }

      }


      return <>

         <div className="able">

            <h2>React weather app</h2>

            <div className="main">

               <div className="left" onClick={cf}>
                  <h2>{temps[change]} &#xb0; {f[change]}</h2>
               </div>

               <div className="right">
                  <img src={current.condition.icon} />
                  <h2>{current.condition.text}</h2>

               </div>

            </div>

            <h3 className='city'>{able.name}/ {able.country}</h3>

            <div className="info">

               <div className="humidi a">

                  <h4 className="title">Humidity</h4>
                  <div className="bottom">
                     <img src={hum} alt="Humidity" />
                     {humidity} %
                  </div>

               </div>

               <div className="wind a">
                  <h4 className="title">Wind Speed</h4>
                  <div className="bottom">
                     <img src={wind} alt="ws" />
                     {wind_kph} KPH
                  </div>
               </div>

               <div className="pressure a">
                  <h4 className="title">Air Pressure</h4>
                  <div className="bottom">
                     <img src={airP} alt="ws" />
                     {pressure_in} In
                  </div>
               </div>

               <div className="percip a">

                  <h4 className="title">Perciption</h4>
                  <div className="bottom">
                     <img src={raining} alt="ws" />
                     {precip_mm} mm
                  </div>

               </div>
            </div>

         </div>

      </>

   }

   return <>

      <div className={theme} id='container'>

         <div className="search" >
            <input type="text" onChange={getData} placeholder='Search Location' id='inp' ref={ref} />
         </div>

         <div className='card'>
            {show === 1 ? <Available /> : <Empty />}
         </div>

         <div className="location">

            <h2>{able ? able.name : "Waiting..."}</h2>
            <h3>{able ? able.region : ""} \ {able ? able.country : ""}</h3>
         </div>

      </div>

   </>
}


export default App