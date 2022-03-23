import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommentsPage = () => {
    // use a get request to get the information and some how get just that single post
        // and have comments under the post 
    // this will be a new page
    const [comments, setComments] =useState();

    async function getComments(){
       let response = await axios.get(`http://127.0.0.1:8000/api/comments/all/1/`)
    }
    
    const navigate = useNavigate();

    return ( 
        <div>
            <a onClick={() => navigate("/comments")}>comments</a>
        </div>
     );
}
 
export default CommentsPage;