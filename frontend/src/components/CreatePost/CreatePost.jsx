import axios from "axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import './CreatePost.css'
import { MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';

const CreatePost = (props) => {
    const [user, token] = useAuth();
    const [text , setText] = useState('');
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    
    async function createPost() {
        try {
            let post = {
                "user": user.username,
                "text": text,
                "likes": 0,
                "dislikes": 0
            }
            console.log(post)
            let response = await axios.post('http://127.0.0.1:8000/api/posts/', post ,{ headers: 
            {Authorization: 'Bearer ' + token,},
            })
            console.log(response.data);
            await props.fetchPosts();
        } catch (error) {
            console.log(error.response);
        }
    };

    const restText = () => {
        setText('')
    }
    
    function handleSubmit(event){
        event.preventDefault();
        createPost();
        toggleShow();
        restText();
        
    }

    
    return ( 
        <>
            <MDBBtn onClick={toggleShow}>Post</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                <MDBModalHeader>
                    <MDBModalTitle>Post</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
            <div className="grow-wrap">
                <textarea type='text' value={text} placeholder="Say Something!" onChange={(event) => setText(event.target.value)} ></textarea>
                </div>
                </MDBModalBody>

                <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={(event) => handleSubmit(event)}>
                    Post
                    </MDBBtn>
                </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
            </MDBModal>
        </>
     );
}
 
export default CreatePost;