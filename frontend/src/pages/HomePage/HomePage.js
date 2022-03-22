import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
import CreatePost from "../../components/CreatePost/CreatePost";
import EditPost from "../../components/EditPost/EditPost";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([{}]);
  const [postId, setPostId] = useState(Number)

  useEffect(() => {
    fetchPosts();
  }, [token]);
  const fetchPosts = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/posts/view_posts/");
      let data = response.data
      setPosts(data);

    } catch (error) {
      console.log(error.message);
    }
  };
  
  let getId = (id) => {
    setPostId(id)
    console.log(id)
    }; 
 
  return (
    <div className="container">
      <h1>Home Page for test</h1>
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
              <li>Likes {post.likes}</li>
              <li>Dislikes {post.dislikes}</li>
              <button onClick={() => getId(post.id)}>Edit</button>
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
