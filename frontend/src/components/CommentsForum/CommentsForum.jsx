import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from "axios";



const CommentsForum = (props) => {
    
    const [user, token] = useAuth();
    const [commentText, setCommentText] = useState('');
    
    
    async function postComment(){
        let newComment = {
            user: user.username,
            post: props.postId,
            text: commentText,
            likes: 0,
            dislikes: 0
        }
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/comments/', newComment, { headers: {Authorization: 'Bearer ' + token}});
            await props.getComments();
            console.log(response)
        } catch (ex) {
            console.log(ex.response);
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        postComment();
        setCommentText('');
    }
    
    return ( 
        <form onSubmit={handleSubmit}>
            <MDBInput label='Comment' id='form1' value={commentText} type='text' onChange={(event) => setCommentText(event.target.value)}/>
            <MDBBtn type='submit'>Post Comment</MDBBtn>
        </form> 
    );
}
 
export default CommentsForum;