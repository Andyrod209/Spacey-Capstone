import keys from "./API_Keys.json"
import {Card} from 'react-bootstrap'
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


    useEffect(() => {
        getAPOD1();
        
      }, [showText]);

    async function getAPOD1(){
        let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${keys.NasaApiKey}&thumbs=true`)
        setApod1(response.data.url)
        setExplanation1(response.data.explanation)
        setTitle1(response.data.title)
      }

    async function getAPOD2(){
        let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${keys.NasaApiKey}&thumbs=true`)
        setApod1(response.data.url)
        setExplanation1(response.data.explanation)
        setTitle1(response.data.title)
      }

    async function getAPOD3(){
        let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${keys.NasaApiKey}&thumbs=true`)
        setApod1(response.data.url)
        setExplanation1(response.data.explanation)
        setTitle1(response.data.title)
      }

      const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      }
    // try and find a way to set the date
      function getDate(){
        let dt = new Date();
        dt.setDate(dt.getDate()-2)
        console.log(dt)
      }

      const handleClick = (e) => {
        e.preventDefault();
        setShowText(true);
      }

    return ( 
        <>
        <Card style={{ width: '35rem', marginLeft:'27.5%', backgroundColor:'black' }}>
            {/* Added iframe for a videos change of pictures don't end up looking normal or try to find a way to refactor some how */}
            <Card.Img variant="top" src={apod1} style={{ width: '35rem'}}/>
            <Card.Body style={{ backgroundColor:'black' }}>
                <Card.Title style={{color:'beige'}}>{title1}</Card.Title>
                <Card.Text style={{color:'beige'}}>
                {explanation1}
                </Card.Text>
            </Card.Body>
        </Card>
        

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
                <img
                className="d-block w-100"
                src="holder.js/800x400?text=Second slide&bg=282c34"
                alt="Second slide"
                />

            <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="holder.js/800x400?text=Third slide&bg=20232a"
                alt="Third slide"
                />

            <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </>
     );
}
 
export default APOD;