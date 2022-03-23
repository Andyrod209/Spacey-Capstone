import axios from "axios";
import { useState } from "react"

const CommentsPage = (props) => {
    // use a get request to get the information and some how get just that single post
        // and have comments under the post 
    // this will be a new page
    const [comments, setComments] =useState();
    console.log("props.postId: ", props.postId)
    console.log("All Props: ", props)
    async function getComments(){
       let response = await axios.get(`http://127.0.0.1:8000/api/comments/all/${props.postId}/`)
       console.log(response)
    }

    return ( 
        <div>
            <h1>comments</h1>
        </div>
     );
}
 
export default CommentsPage;