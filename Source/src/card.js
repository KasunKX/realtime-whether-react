import react, { useState, useRef } from 'react'
import axios from "axios";
import percip from "./scss/img/per.png"
import earth from "./scss/img/earth.png"
import cloudy from "./scss/img/cloudy.png"
import wind from "./scss/img/wind.png"
import humi from "./scss/img/humidity.png"

const Card = () => {

   const [current, setLocation] = useState("")
   const [location, setLocationObj] = useState({})
   const [weather, setWeatherObj] = useState({})
   const [able, setAble] = useState(false)
   const [tempBg, setTempBg] = useState("black")
   const [tempUnit, setTempUnit] = useState(0)


   const temps = {
      extremeCold: "rgb(94, 94, 255)",
      veryCold: "rgb(129, 129, 255)",
      cold: "rgb(2, 2, 34)",
      optimum: "rgb(4, 4, 88)",
      hot: "rgb(161, 68, 68)",
      veryHot: "rgb(180, 34, 34)",
      extremeHot: "rgb(223, 18, 18)"
   }


   function checkData(loc) {

      setLocation(loc)

      const options = {
         method: 'GET',
         url: 'https://weatherapi-com.p.rapidapi.com/current.json',
         params: { q: loc },
         headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': '271e3ecc26msh59d4354714d60ccp126908jsn1746ee8850b5'
         }
      };

      axios.request(options).then(function (response) {
         return response.data
      }).then((data) => {

         setLocationObj(data.location)
         setWeatherObj(data.current)
         setAble(true)

         let currentTemp = data.current.temp_c

         console.log(currentTemp)

         if (currentTemp <= 0) {
            setTempBg(temps.extremeCold)
            console.log("extreme cold")
         }
         else if (currentTemp <= 5) {
            setTempBg(temps.veryCold)
            console.log("very cold")
         }
         else if (currentTemp <= 12.5) {
            setTempBg(temps.cold)
            console.log("cold")
         }
         else if (currentTemp <= 23) {
            setTempBg(temps.optimum)
            console.log("optimum")
         }
         else if (currentTemp <= 28) {
            setTempBg(temps.hot)
            console.log("hot")
         }
         else if (currentTemp <= 35) {
            setTempBg(temps.veryHot)
            console.log("very hot")
         }
         else if (currentTemp > 35) {
            setTempBg(temps.extremeHot)
            console.log("extreme hot")
         }

         console.log(tempBg)
      }).catch(() => {
         setAble(false)
      })
   }



   const Container = (props) => {

      const { humidity, last_updated, precip_mm, pressure_in, wind_kph, temp_c, temp_f, condition } = weather

      const { country, name, region } = location

      const tempss = [
         {
            unit: "C",
            stat: temp_c
         },
         {
            unit: "F",
            stat: temp_f
         }
      ]

      function changeUnit() {
         if (tempUnit == 0) {
            setTempUnit(1)
         } else {
            setTempUnit(0)
         }
      }

      return <>
         <div className="container">

            <div className="left">

               {/* <div className="input">
                  <input type="text" placeholder='Location' onChange={e => checkData(e.target.value)} id='input' />
               </div> */}

               <div className="temp">
                  <div className="tmp" onClick={changeUnit}>
                     <h4 style={{ color: tempBg }}>{tempss[tempUnit].stat} &#176;{tempss[tempUnit].unit}  </h4>
                  </div>
                  <div className="state">
                     <img src={condition.icon} alt="" />
                     <h3>{condition.text}</h3>
                  </div>
               </div>

               <div className="address">
                  <h2>{name} / {region},</h2>
                  <h2 className='con'>{country}</h2>
               </div>

            </div>

            <div className="right">

               <h3 className="topic">React Weather App 2.0</h3>

               <div className="boxes">
                  <div className="inf1 inf">
                     <h3>Perciption</h3>
                     <img src={percip} alt="" />
                     <h2 className="condition">{precip_mm} mm</h2>
                  </div>

                  <div className="inf1 inf">
                     <h3>Air Pressure</h3>
                     <img src={cloudy} alt="" />
                     <h2 className="condition">{pressure_in} in</h2>
                  </div>

                  <div className="inf1 inf">
                     <h3>Wind Speed</h3>
                     <img src={wind} alt="" />
                     <h2 className="condition">{wind_kph} KPH</h2>
                  </div>

                  <div className="inf1 inf">
                     <h3>Humidity</h3>
                     <img src={humi} alt="" />
                     <h2 className="condition">{humidity} %</h2>
                  </div>

               </div>

               <h3 className="last">Last Updated - {last_updated}</h3>

            </div>

         </div>
      </>
   }

   const Empty = () => {

      return <>

         <div className="container empty">
            <img src={earth} alt="" />
            <h2 className="greeting">Search Somewhere</h2>
         </div>

      </>
   }

   return <>
      <div className="card">

         <div className="input inc">
            <input type="text" placeholder='Location' onChange={e => checkData(e.target.value)} id='input inpcm' />
         </div>


         {able ? <Container /> : <Empty />}

      </div>
   </>
}

export default Card