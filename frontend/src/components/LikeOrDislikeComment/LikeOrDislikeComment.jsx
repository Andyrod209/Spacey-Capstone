import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const LikeOrDislikeComment = (props) => {

    const [user, token] = useAuth();
    const [likes, setLikes] = useState(Number);
    const [dislikes, setDislikes] = useState(Number);
    
    async function ChangeComment(){
        let comment = {
            "user": props.commentUsername,
            "post": props.postId,
            "text": props.commentText,
            "likes": likes,
            "dislikes": dislikes
        }
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/comments/edit/${props.commentId}/`, comment , 
            { headers: {Authorization: 'Bearer ' + token}}); 
                console.log(response.data);
                await props.getComments();
        } catch (error) {
            console.log(error.response);
        }
    }

    const giveLike = () => {
        setLikes(likes + 1);
        ChangeComment();
    }
    const giveDislike = () => {
        setDislikes(likes + 1);
        ChangeComment();
    }

    return ( 
    <div>
        <button onClick={giveLike}>{props.likes} Like</button>
        <button onClick={giveDislike}>{props.dislikes} Dislike</button>
    </div> 
    );
}
 
export default LikeOrDislikeComment;