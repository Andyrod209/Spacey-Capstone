import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
import CreatePost from "../../components/CreatePost/CreatePost";
import EditPost from "../../components/EditPost/EditPost";
import keys from "./API_Keys.json"
import ToggleButton from "../../components/ToggleButton/ToggleButton";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([{}]);
  const [postId, setPostId] = useState(Number);
  const [apod, setApod] = useState();

  const fetchPosts = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/posts/view_posts/");
      let data = response.data
      setPosts(data);
      
    } catch (error) {
      console.log(error.message);
    }
  };
  
  useEffect(() => {
    fetchPosts();
    getAPOD();
  }, [token]);

  async function postDelete(id){
    try {
    let response = await axios.delete(`http://127.0.0.1:8000/api/posts/delete/${id}/`, { headers: 
    {Authorization: 'Bearer ' + token,},
    }) 
    await fetchPosts();
    console.log(response)
  } catch (error) {
    console.log(error.response);
}
};

  // increnment = () => {
  //   let newcount = 
  //   let post = {
  //     "user": user.user_id,
  //     "text": postInfo,
  //     "likes": 0,
  //     "dislikes": 0
  // };
  // let response = await axios.put(`http://127.0.0.1:8000/api/posts/edit/${postId}/`, post,
  //   { headers: {Authorization: 'Bearer ' + token,}}); 
  //     await fetchPosts();
  //     console.log(response.data);
  // }
  
  let getId = (id) => {
    setPostId(id)
    console.log(id)
    };
    
    async function getAPOD(){
      let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${keys.NasaApiKey}`)
      console.log(response)
      setApod(response.data.url)
    }
 
  return (
    <div className="container">
      <h1>Home Page for test</h1>
      <img src={apod} alt='Picture of the day'/>
      <CreatePost setPost={setPosts} posts={posts} fetchPosts = {fetchPosts} />
      <EditPost postId={postId} fetchPosts = {fetchPosts}/>
      <>{[...posts].reverse().map((post, id) => {
        return (
            <div className="post" key={id}>
            {!token && 
          <ul>
              <li>Username: {post.user}</li>
              <li>Post: {post.text}</li>
              <li>Likes {post.likes}</li>
              <li>Dislikes {post.dislikes}</li>
          </ul>
            }
            {token &&
          <ul>
              <li>Username: {post.user}</li>
              <li>Post: {post.text}</li>
              
              <ToggleButton />
              <button onClick={() => getId(post.id)}>Edit</button>
              <button onClick={()=> postDelete(post.id)}>DELETE</button>
          </ul>
            }
          </div>
        )
      })}
      </>
    </div>
  );
};

export default HomePage;
