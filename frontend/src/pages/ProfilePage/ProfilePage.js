import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./ProfilePage.css"
const ProfilePage = () => {

    const [user, token] = useAuth()
    const [profiles, setProfiles] = useState([])
    const [profileChange, setProfileChange] = useState('')
    console.log(profileChange)
    useEffect(() => {
        getProfile();
    }, [token]);

    async function getProfile(){
        let response = await axios.get(`http://127.0.0.1:8000/api/profiles/edit/${user.id}/`, { headers: 
        {Authorization: 'Bearer ' + token,},
        })
        setProfiles(response.data)
    }
    
    // async function CreateAbout(){
    //     let about = {
    //         user: user.user_id,
    //         about: profileChange 
    //     };
    //     let response = await axios.put(`http://127.0.0.1:8000/api/profiles/`, about, { headers: 
    //     {Authorization: 'Bearer ' + token,},})
    //     console.log(response) 
    //     await getProfile()
    // }

    async function editProfile(){
        let about = {
            user: user.id,
            about: profileChange 
        };
        let response = await axios.put(`http://127.0.0.1:8000/api/profiles/edit/${user.id}/`, about, { headers: 
        {Authorization: 'Bearer ' + token}})
        console.log(response) 
        await getProfile()
    }

    function handleSubmit(event){
        event.preventDefault();
        editProfile();
    }

    return ( 
        <div className="container">
            <h1 style={{color:'beige'}}>{user.username}</h1>
                <h3 style={{color:'beige'}}>{user.first_name}'s Profile</h3>
                <img src="https://i.ibb.co/pdJfzx9/profile-picture.jpg" alt="profile-picture" border="0" />
            <h3 style={{color:'beige'}}>About Me :</h3>
                <p style={{color:'beige'}}>{profiles.about}</p>
                <input type='textbox' onChange={(event) => setProfileChange(event.target.value)}/>
                <button type="submit" onClick={handleSubmit}>Change</button>
                <br/>
        <div className="listFlex">
        </div>
    </div>
     );
}
 
export default ProfilePage;