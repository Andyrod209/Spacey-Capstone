import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const ClickedUserProfile = (props) => {

    const [modalToggle, setModalToggle] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [userClicked, setUserClicked] = useState();
    
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

    useEffect(() => {
        fetchProfiles();
      }, []);

    const handleClick = (e) =>{
        e.preventDefault();
        setModalToggle(true)
        fetchProfiles();
        const getUserId = profiles.find(id => id.user === props.userId)
        setUserClicked(getUserId.about)
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
                    {userClicked 
                    ?<p>{userClicked}</p>
                    :<p>Nothing about {props.username}</p>
                    }   
                    </Modal.Body>
            </Modal>
        </>
        </>
     );
}
 
export default ClickedUserProfile;