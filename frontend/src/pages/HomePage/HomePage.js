import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/posts/view_posts/");
        console.log(response);
        setPosts(response.data)
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [token]);
  return (
    <div className="container">
      <h1>Home Page for {user.username}</h1>
      <>{posts.map((post) => {
        return (
          <ul style={{ }}>
              <li>username:{post.user}</li>
              <li>{post.text}</li>
              <li>{post.likes}</li>
              <li>{post.dislikes}</li>
          </ul>
        )
      })}
      </>
    </div>
  );
};

export default HomePage;
