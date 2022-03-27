import { useState } from "react";
import './ToggleButton.css'

const ToggleButton = () => {

    const[like, setLike] = useState('normal')
    const[dislike, setDislike] = useState('normal')

    function handleLikeClick (){
        if (like === 'normal'){
            setLike('like');
        }
        else {
            setLike('normal')
        }
        if (dislike === "dislike"){
            setDislike("normal")
        }
    }

    function handleDislikeClick (){
        if (dislike === 'normal'){
            setDislike('dislike');
        }
        else {
            setDislike('normal')
        }
        if (like === 'like') {
            setLike('normal');
        }
    }

    function thumbsUpOrDown(x){
        x.classList.toggle("fa-thumbs-down");
      }

    return ( 
            
            <><button className={like} type='button' onClick={handleLikeClick} style={{margin:'1%'}}>
            <i onclick={() => thumbsUpOrDown(this)} className="fa fa-thumbs-up">1</i>
        </button><button className={dislike} type='button' onClick={handleDislikeClick}>
                <i onclick={() => thumbsUpOrDown(this)} className="fa fa-thumbs-down"></i>
            </button></>
     );
}
 
export default ToggleButton;