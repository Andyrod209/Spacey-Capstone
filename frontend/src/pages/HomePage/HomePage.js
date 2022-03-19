import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
import CreatePost from "../../components/CreatePost/CreatePost";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  // const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/posts/view_posts/");
        console.log(response.data);
        setPosts(response.data)
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="container">
      <h1>Home Page for test</h1>
      <CreatePost />
      <>{posts.map((post, index) => {
        return (
          <div className="post" key={index}>
          <ul>
              <li>Username: {post.user}</li>
              <li>Post: {post.text}</li>
              <li>Likes {post.likes}</li>
              <li>Dislikes {post.dislikes}</li>
          </ul>
          </div>
        )
      })}
      </>
    </div>
  );
};

export default HomePage;
