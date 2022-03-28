import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
import CreatePost from "../../components/CreatePost/CreatePost";
import EditPost from "../../components/EditPost/EditPost";
import keys from "./API_Keys.json"
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import { useNavigate } from "react-router-dom";
import PeopleInSpace from "../../components/PeopleInSpace/PeopleInSpace";
import Comments from "../../components/Comments/Comments";
import { MDBBtn } from 'mdb-react-ui-kit';
import {Card} from 'react-bootstrap'

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);
  const [apod, setApod] = useState();
  const [title, setTitle] = useState();
  const [explanation, setExplanation] = useState();

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

  async function getAPOD(){
    let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${keys.NasaApiKey}`)
    setApod(response.data.url)
    setExplanation(response.data.explanation)
    setTitle(response.data.title)
  }

  return (
      <>
    <div className="container">
        {!token &&
          <h1 style={{margin:'1%', color:'beige'}}>Welcome Guest!</h1>}
        {token &&
          <h1 style={{margin:'1%', color:'beige'}}>Welcome {user.username}!</h1>}
      <div className="APOD">
      <Card style={{ width: '35rem', marginLeft:'27.5%', backgroundColor:'black' }}>
      <Card.Img variant="top" src={apod} style={{ width: '35rem'}}/>
      <Card.Body style={{ backgroundColor:'black' }}>
        <Card.Title style={{color:'beige'}}>{title}</Card.Title>
        <Card.Text style={{color:'beige'}}>
          {explanation}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
        <br />
        <b style={{color:'beige'}}>People In Space: </b>
        <PeopleInSpace />
        <br />
        {!token &&
        <h3 style={{color:'beige'}}>Login to Post</h3>
        }
        {token&&
        <CreatePost setPost={setPosts} posts={posts} fetchPosts={fetchPosts} />
        }
        <>{[...posts].reverse().map((post, id) => {
          return (
            <div className="post" key={id}>
              {!token &&
                <ul>
                  <div className="username">
                    <li>{post.user.username}</li>
                  </div>
                  <div className="text">
                    <p><b>Post:</b> {post.text}</p>
                  </div>
                  <li style={{color:'beige'}}>Likes {post.likes}</li>
                  <li style={{color:'beige'}}>Dislikes {post.dislikes}</li>
                </ul>}
              {token &&
                <ul>
                  <div className="username">
                    <li>{post.user.username}</li>
                  </div>
                  <div className="text">
                  <p><b>Post:</b> {post.text}</p>
                  </div>
      
                  <div className="userOptions">
                  <Comments postId={post.id} />
                  <ToggleButton 
                    fetchPosts={fetchPosts}
                    likes={post.likes}
                    dislikes={post.dislikes}
                    postId={post.id}
                    postUsername={post.user.username}
                    postText={post.text}/>
                  {/* this is a ternary statement for conditional rendering */}
                  {user.id === post.user.id &&
                      <><EditPost postId={post.id} text={post.text} fetchPosts={fetchPosts} />
                      <MDBBtn className='mx-2' color='danger' onClick={() => postDelete(post.id)} style={{ position:'relative', left:'50%' }}>DELETE</MDBBtn></>
                    }
                    </div>
                </ul>}
            </div>
          );
        })}
        </>
      </div>
      </>


   
  );
};

export default HomePage;
