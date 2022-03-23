import axios from "axios";
import { useEffect, useState } from "react";

const PeopleInSpace = () => {

    const[people, setPeople] = useState([])
    
    useEffect(() => {
        personsInSpace();
    }, [])

    async function personsInSpace(){
        let response = await axios.get("http://api.open-notify.org/astros.json")
        console.log(response.data.people)
        setPeople(response.data.people)
    }

    return ( 
        <div>
            {people.map((e) => {
                return(
                <ul>        
                    <li><small>{e.name}</small></li>
                    <li><small>{e.craft}</small></li>
                </ul>
            )})}
        </div>
     );
}
 
export default PeopleInSpace;