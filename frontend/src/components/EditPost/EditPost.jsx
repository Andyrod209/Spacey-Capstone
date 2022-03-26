import axios from "axios";
import { useState, useEffect} from "react";
import useAuth from "../../hooks/useAuth";
import Button from 'react-bootstrap/Button'


const Editpost = (props) => {

    const [user, token] = useAuth();
    const [text, setText] = useState(props.text);
    const [editPost, setEditPost] = useState(false)
    
    async function postEdit(){
        let post = {
            "id": props.postId,
            "user": user.user_id,
            "text": text,
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
        setEditPost(false)
    }
    
    return ( 
        <>
        {editPost &&
        <form onSubmit={handleSubmit}>
            <input type="textbox" placeholder={text} onChange={(event) => setText(event.target.value)}/>
            <button type="submit">Submit</button>
        </form>
        }
            <Button variant="link" onClick={() => setEditPost(true)} style={{ position:'relative', left:'50%' }}>Edit</Button>
        </>
     );
}
 
export default Editpost;