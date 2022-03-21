import axios from "axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const CreatePost = (props) => {
    const [user, token] = useAuth();
    const [text , setText] = useState();
    
    async function createPost() {
        try {
            let post = {
                "text": text,
                "likes": 0,
                "dislikes": 0
            }
            let response = await axios.post('http://127.0.0.1:8000/api/posts/', post ,{ headers: 
            {Authorization: 'Bearer ' + token,},
            })
            console.log(response.data);
            props.setPost([...props.posts, response.data]);
        } catch (error) {
            console.log(error.response);
        }
    };
    
    function handleSubmit(event){
        event.preventDefault();
        createPost()
        
    }

    
    return ( 
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder="Say Something!" onChange={(event) => setText(event.target.value)} />
            <button >Post</button>
        </form>
     );
}
 
export default CreatePost;