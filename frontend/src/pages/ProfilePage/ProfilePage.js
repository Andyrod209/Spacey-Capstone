import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./ProfilePage.css"
const ProfilePage = () => {

    const [user, token] = useAuth()
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        getProfile();

    }, [token]);

    async function getProfile(){
        let response = await axios.get(`http://127.0.0.1:8000/api/profiles/edit/${user.user_id}/`, { headers: 
        {Authorization: 'Bearer ' + token,},
        })
        setProfiles(response.data)
    }

    async function editProfile(){
        let response = await axios.get(`http://127.0.0.1:8000/api/profiles/edit/${user.user_id}/`)
    }

    return ( 
        <div className="container">
            <h1>{user.username}</h1>
                <h3>Profile</h3>
                <img src="https://i.ibb.co/pdJfzx9/profile-picture.jpg" alt="profile-picture" border="0" />
            <a><h4>About Me</h4></a>
                <p>{profiles.about}</p>
                <br/>
        <div className="listFlex">
        </div>
    </div>
     );
}
 
export default ProfilePage;