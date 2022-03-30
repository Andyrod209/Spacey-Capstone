import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const ClickedUserProfile = (props) => {

    const [modalToggle, setModalToggle] = useState(false);
    const [profiles, setProfiles] = useState([]);
    
    const fetchProfiles = async () => {
        try {
          let response = await axios.get("http://127.0.0.1:8000/api/profiles/get_profiles/");
          let data = response.data
          console.log(data)
          setProfiles(data);
          
        } catch (error) {
          console.log(error.message);
        }
    }

    const getUserId = profiles.filter( id => {
        return id.id === props.userId
      });

    //   find a way to pass other users about me 
    // use filter to search for usersId
    // it will display on the modal below about me.
      const handleClick = (e) =>{
          e.preventDefault();
          console.log('this works')
          setModalToggle(true)
          fetchProfiles();
      }

    return ( 
        <>
            <li onClick={handleClick}>{props.username}</li>
            <><Modal
                size="lg"
                show={modalToggle}
                onHide={() => setModalToggle(false)}
                aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {props.username}'s Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src='https://i.ibb.co/pdJfzx9/profile-picture.jpg'/>
                    <h3>About Me :</h3>
                    
                        <p>{profiles.about}</p>
                </Modal.Body>
            </Modal>
        </>
        </>
     );
}
 
export default ClickedUserProfile;