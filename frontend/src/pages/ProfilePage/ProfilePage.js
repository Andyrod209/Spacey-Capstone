import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./ProfilePage.css"
const ProfilePage = () => {

    const [user, token] = useAuth()
    const [profiles, setProfiles] = useState([])
    const [profileChange, setProfileChange] = useState()
    console.log(profileChange)
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
        let about = {
            user: user.user_id,
            about: profileChange 
        };
        let response = await axios.put(`http://127.0.0.1:8000/api/profiles/edit/${user.user_id}/`, about, { headers: 
        {Authorization: 'Bearer ' + token,},})
        console.log(response) 
        await getProfile()
    }

    function handleSubmit(event){
        event.preventDefault();
        editProfile();
    }

    return ( 
        <div className="container">
            <h1>{user.username}</h1>
                <h3>Profile</h3>
                <img src="https://i.ibb.co/pdJfzx9/profile-picture.jpg" alt="profile-picture" border="0" />
            <h4>About Me</h4>
                <input type='textbox' onChange={(event) => setProfileChange(event.target.value)}/>
                <button type="submit" onClick={handleSubmit}>Change</button>
                <p>{profiles.about}</p>
                <br/>
        <div className="listFlex">
        </div>
    </div>
     );
}
 
export default ProfilePage;