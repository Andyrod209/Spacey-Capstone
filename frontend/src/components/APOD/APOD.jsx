import keys from "./API_Keys.json"
import {Card} from 'react-bootstrap'
import axios from "axios";
import { useEffect, useState } from "react";


const APOD = () => {

    const [apod, setApod] = useState();
    const [title, setTitle] = useState();
    const [explanation, setExplanation] = useState();

    useEffect(() => {
        getAPOD();
      }, []);

    async function getAPOD(){
        let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${keys.NasaApiKey}`)
        setApod(response.data.url)
        setExplanation(response.data.explanation)
        setTitle(response.data.title)
      }

    return ( 
        <>
            <Card style={{ width: '35rem', marginLeft:'27.5%', backgroundColor:'black' }}>
            {/* Added iframe for a videos change of pictures don't end up looking normal or try to find a way to refactor some how */}
            <Card.Img variant="top" src={apod} style={{ width: '35rem'}}/>
            <Card.Body style={{ backgroundColor:'black' }}>
                <Card.Title style={{color:'beige'}}>{title}</Card.Title>
                <Card.Text style={{color:'beige'}}>
                {explanation}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
     );
}
 
export default APOD;