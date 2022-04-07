import { useState, useEffect } from "react";
import './ToggleButton.css'
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const ToggleButton = (props) => {

    const [user, token] = useAuth();
    const [likes, setLikes] = useState(props.likes);
    const [dislikes, setDislikes] = useState(props.dislikes);
    
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);

    const[like, setLike] = useState('normal')
    const[dislike, setDislike] = useState('normal')

    async function ChangePost(){
        try {
        let post = {
            "user": props.postUsername,
            "post": props.postId,
            "text": props.postText,
            "likes": likes,
            "dislikes": dislikes
        }
            let response = await axios.put(`http://127.0.0.1:8000/api/posts/edit/${props.postId}/`, post , 
            { headers: {Authorization: 'Bearer ' + token}}); 
                console.log(response.data);
                await props.fetchPosts();
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        ChangePost();
      }, [likes, dislikes]);

    function handleLikeClick (){
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
        if (like === 'normal'){
            setLike('like');
        }
        else {
            setLike('normal')
        }
        if (dislike === "dislike"){
            setDislike("normal")
        }
        props.fetchPosts();
    }
    

    function handleDislikeClick (){
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
        if (dislike === 'normal'){
            setDislike('dislike');
        }
        else {
            setDislike('normal')
        }
        if (like === 'like') {
            setLike('normal');
        }
        props.fetchPosts();
    }

    function thumbsUpOrDown(x){
        x.classList.toggle("fa-thumbs-down");
      }

    return ( 
            
            <><button className={[likeActive? 'like':null, 'normal'].join(' ')} type='button' onClick={() => handleLikeClick()} style={{margin:'1%'}}>
            <i onclick={() => thumbsUpOrDown(this)} className="fa fa-thumbs-up">{props.likes}</i>
        </button><button className={[dislikeActive? 'dislike' :null, 'normal'].join(' ')} type='button' onClick={handleDislikeClick}>
                <i onclick={() => thumbsUpOrDown(this)} className="fa fa-thumbs-down">{props.dislikes}</i>
            </button></>
     );
}
 
export default ToggleButton;