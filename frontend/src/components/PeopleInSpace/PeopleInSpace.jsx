import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table'
import './PeopleInSpace.css'

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
            <Table className="table" striped bordered hover variant="dark" size="sm">
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Craft</th>
                      </tr>
                    </thead>
            {people.map((e) => {
                return(
                    <tbody>
                      <tr>
                        <td>{e.name}</td>
                        <td>{e.craft}</td>
                      </tr>
                    </tbody>
            )})}
            </Table>
        </div>
     );
}
 
export default PeopleInSpace;