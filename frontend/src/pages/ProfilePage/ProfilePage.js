import useAuth from "../../hooks/useAuth";
import "./ProfilePage.css"
const ProfilePage = () => {

    const [user, token] = useAuth()

    return ( 
        <div className="container">
            <h1>{user.username}</h1>
                <h3>Profile</h3>
                <a href="https://imgbb.com/"><img src="https://i.ibb.co/pdJfzx9/profile-picture.jpg" alt="profile-picture" border="0" /></a>
            <h4>About Me</h4>
                <p>Hi, I'm Dan Englishby, I have a huge passion for Space and our universe. I love to learn and thrive from challenges. I am part of NASA</p>
            <h4>My Skills</h4>
        <div className="listFlex">
            <div>
                        <ul>
                            <li>PHP</li>
                            <li>HTML</li>
                            <li>CSS</li>
                        </ul>
                    </div>
            <div>
                <ul>
                    <li>JavaScript</li>
                    <li>JQuery</li>
                    <li>C#</li>
                </ul>
            </div>
        </div>
        <h4>Social Media</h4>
        Catch me on Twitter - <a href="https://twitter.com/DanEnglishby">@JoshA</a>
    </div>
     );
}
 
export default ProfilePage;