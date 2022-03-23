import axios from "axios";
import { useState, useEffect} from "react";
import useAuth from "../../hooks/useAuth";


const Editpost = (props) => {

    const [user, token] = useAuth();
    const [postInfo, setPostInfo] = useState('');
    
    useEffect(() => {
        const fetchPostsInfo = async () => {
        try {
        let response = await axios.get(`http://127.0.0.1:8000/api/posts/edit/${props.postId}/`, { 
            headers: 
                {Authorization: 'Bearer ' + token,}
                });
                await props.fetchPosts();
            setPostInfo(response.data.text)
            console.log(response)
        } catch(error) {
          console.log(error.message);
        }
    };
    fetchPostsInfo();
    }, [token]);
    
    async function postEdit(){
        let post = {
            "user": user.user_id,
            "text": postInfo,
            "likes": 0,
            "dislikes": 0
        };
        let response = await axios.put(`http://127.0.0.1:8000/api/posts/edit/${props.postId}/`, post,
        { 
            headers: 
                {Authorization: 'Bearer ' + token,}
                }); 
                await props.fetchPosts();
            console.log(response.data);
            
    }

    function handleSubmit(event){
        event.preventDefault();
        postEdit();
    }
    
    return ( 
        <form onSubmit={handleSubmit}>
            <label>Post Id: {props.postId}</label>
            <input type="textbox" placeholder={postInfo} onChange={(event) => setPostInfo(event.target.value)}/>
            <button type="submit">Submit</button>

        </form>
     );
}
 
export default Editpost;