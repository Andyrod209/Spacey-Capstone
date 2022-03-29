import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./ProfilePage.css"
const ProfilePage = () => {

    const [user, token] = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [catchError, setCatchError] = useState();
    const [aboutChange, setAboutChange] = useState('');
    const [aboutText, setAboutText] = useState();
    
    useEffect(() => {
        getProfile();
    }, [aboutText, aboutChange]);

    async function getProfile(){
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/profiles/edit/${user.id}/`, { headers: 
            {Authorization: 'Bearer ' + token,},})
            setProfiles(response.data)
        } catch (error) {
            setCatchError(error.response)
        }
        }
    
    async function CreateAbout(){
        let about = {
            user: user.id,
            about: aboutText 
        };
        let response = await axios.post(`http://127.0.0.1:8000/api/profiles/`, about, { headers: 
        {Authorization: 'Bearer ' + token}})
        console.log(response) 
        await getProfile()
    }

    async function editProfile(){
        let about = {
            user: user.id,
            about: aboutChange 
        };
        let response = await axios.put(`http://127.0.0.1:8000/api/profiles/edit/${user.id}/`, about, { headers: 
        {Authorization: 'Bearer ' + token}})
        console.log(response) 
        await getProfile()
    }

    function handleSubmit(event){
        event.preventDefault();
        editProfile();
        setAboutChange('');
    }
    
    function handleCreateSubmit(event){
        event.preventDefault();
        CreateAbout();
    }
    
    return ( 
        <div className="container">
            <h1 style={{color:'beige'}}>{user.username}</h1>
                <h3 style={{color:'beige'}}>{user.first_name}'s Profile</h3>
                <img src="https://i.ibb.co/pdJfzx9/profile-picture.jpg" alt="profile-picture" border="0" />
            <h3 style={{color:'beige'}}>About Me :</h3>
                <p style={{color:'beige'}}>{profiles.about}</p>
                {catchError 
                    ?<><input type='textbox' onChange={(event) => setAboutText(event.target.value)}/>
                    <button type="submit" onClick={handleCreateSubmit}>Create</button></>
            
                    :<><input type='textbox' value={aboutChange} onChange={(event) => setAboutChange(event.target.value)}/>
                    <button type="submit" onClick={handleSubmit}>Change</button></>
                }
                <br/>
        <div className="listFlex">
        </div>
    </div>
     );
}
//  find a way to inplument create and when it is created removed and left wit.
export default ProfilePage;