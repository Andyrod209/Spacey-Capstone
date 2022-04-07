import { useState, useEffect} from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import './LikeOrDislikeComment.css'

const LikeOrDislikeComment = (props) => {

    const [user, token] = useAuth();
    const [likes, setLikes] = useState(props.likes);
    const [dislikes, setDislikes] = useState(props.dislikes);
    
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);

    async function ChangeComment(){
        try {
        let comment = {
            "user": props.commentUsername,
            "post": props.postId,
            "text": props.commentText,
            "likes": likes,
            "dislikes": dislikes
        }
            let response = await axios.put(`http://127.0.0.1:8000/api/comments/edit/${props.commentId}/`, comment , 
            { headers: {Authorization: 'Bearer ' + token}}); 
                console.log(response.data);
                await props.getComments();
        } catch (error) {
            console.log(error.response);
        }
    }
    
    useEffect(() => {
        ChangeComment();
      }, [likes, dislikes]);

    function giveLike(){
        if(likeActive){
            setLikeActive(false);
            setLikes(likes - 1);
        } else {
            setLikeActive(true);
            setLikes(likes + 1);
            if(dislikeActive){
                setDislikeActive(false);
                setLikes(likes + 1);
                setDislikes(dislikes - 1);
            }
        }
        props.getComments();
    }
    function giveDislike() {
        if(dislikeActive){
            setDislikeActive(false);
            setDislikes(dislikes - 1);
        } else {
            setDislikeActive(true);
            setDislikes(dislikes + 1);
            if(likeActive){
                setLikeActive(false);
                setDislikes(dislikes + 1);
                setLikes(likes - 1);
            }
        }
        props.getComments();
    }

    return ( 
    <div>
        <button className={[likeActive? 'commentLike':null, 'commentNormal'].join(' ')} type='button' onClick={() => giveLike()}>{props.likes} Like</button>
        <button className={[dislikeActive? 'commentDislike' :null, 'commentNormal'].join(' ')} type='button' onClick={() => giveDislike()}>{props.dislikes} Dislike</button>
    </div> 
    );
}
 
export default LikeOrDislikeComment;