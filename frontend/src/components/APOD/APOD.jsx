import keys from "./API_Keys.json"
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel'

const APOD = () => {

    const [apod1, setApod1] = useState();
    const [title1, setTitle1] = useState();
    const [explanation1, setExplanation1] = useState();

    const [apod2, setApod2] = useState();
    const [title2, setTitle2] = useState();
    const [explanation2, setExplanation2] = useState();
    
    const [apod3, setApod3] = useState();
    const [title3, setTitle3] = useState();
    const [explanation3, setExplanation3] = useState();
    
    const [index, setIndex] = useState(0);
    const [showText, setShowText] = useState(false);
    const [date1, setDate1] = useState()
    const [date2, setDate2] = useState()


    useEffect(() => {
      getDate();
      getAPOD1();
      getAPOD2();
      getAPOD3();
      }, [showText, date1, date2]);

    async function getAPOD1(){
        let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${keys.NasaApiKey}&thumbs=true`)
        setApod1(response.data.url)
        setExplanation1(response.data.explanation)
        setTitle1(response.data.title)
      }

    async function getAPOD2(){
        let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${keys.NasaApiKey}&thumbs=true&date=${date1}`)
        setApod2(response.data.url)
        setExplanation2(response.data.explanation)
        setTitle2(response.data.title)
      }

    async function getAPOD3(){
        let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${keys.NasaApiKey}&thumbs=true&date=${date2}`)
        setApod3(response.data.url)
        setExplanation3(response.data.explanation)
        setTitle3(response.data.title)
      }

      const handleSelect = (selectedIndex, e) => {
        e.preventDefault();
        setIndex(selectedIndex);
      }

      function getDate(){
        let dt = new Date();
        let dd1 = String(dt.getDate()-1).padStart(2, '0');
        let dd2 = String(dt.getDate()-2).padStart(2, '0');
        let mm = String(dt.getMonth() + 1).padStart(2, '0');
        let yyyy = dt.getFullYear();
        setDate1(yyyy+'-'+mm+"-"+dd1);
        setDate2(yyyy+'-'+mm+"-"+dd2);
      }
      
      const handleClick = (e) => {
        e.preventDefault();
        setShowText(true);
      }

    return ( 
        <>
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
             <h3 style={{color:'beige'}}>{title1}</h3>  {/* This the title for the first carousel.*/}
                <img
                className="d-block w-100"
                src={apod1}
                alt="First slide"
                />
            <Carousel.Caption>
                
                {showText  
                ?<p onClick={() => setShowText(false)}>{explanation1}</p>
                :<button onClick={handleClick}>Read more</button>
              }
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <h3 style={{color:'beige'}}>{title2}</h3>  {/* This the title for the first carousel.*/}
                <img
                className="d-block w-100"
                src={apod2}
                alt="First slide"
                />

            <Carousel.Caption>
            {showText  
                ?<p onClick={() => setShowText(false)}>{explanation2}</p>
                :<button onClick={handleClick}>Read more</button>
              }
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <h3 style={{color:'beige'}}>{title3}</h3>  {/* This the title for the first carousel.*/}
                <img
                className="d-block w-100"
                src={apod3}
                alt="First slide"
                />

            <Carousel.Caption>
            {showText  
                ?<p onClick={() => setShowText(false)}>{explanation3}</p>
                :<button onClick={handleClick}>Read more</button>
              }
            </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </>
     );
}
 
export default APOD;