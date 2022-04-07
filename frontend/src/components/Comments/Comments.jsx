import React, { useState } from 'react';
import axios from "axios";
import { MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
import CommentsForum from '../CommentsForum/CommentsForum';
import LikeOrDislikeComment from '../LikeOrDislikeComment/LikeOrDislikeComment';

const Comments = (props) => {

    const [scrollableModal, setScrollableModal] = useState(false);
    const [comments, setComments] = useState([]);

    async function getComments(){
        let response = await axios.get(`http://127.0.0.1:8000/api/comments/all/${props.postId}/`)
        console.log(response)
        setComments(response.data)
     }

    function handleClick(){
      setScrollableModal(!scrollableModal)
      getComments();
    }

  return (
    <>
      <MDBBtn onClick={() => handleClick()} style={{marginRight:'.5%'}}>Comments</MDBBtn>

      <MDBModal show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Comments</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={() => setScrollableModal(!scrollableModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {[...comments].reverse().map((comment, id) => {
                return (
                  <div className="form-grid">
                    <div key={id} className="form-control" >
                    <h4 className="form-heading">{comment.user.username}</h4>
                    <div  className="post-content">{comment.text} 
                    <LikeOrDislikeComment 
                      getComments={getComments} 
                      commentId={comment.id}
                      commentUsername={comment.user.username}
                      commentUserId={comment.user.id} 
                      postId={props.postId} 
                      commentText={comment.text}
                      likes={comment.likes}
                      dislikes={comment.dislikes}/> </div>
                  </div>
                  </div>
                );
              })}
            </MDBModalBody>
            <MDBModalFooter>
              <CommentsForum postId={props.postId} getComments={getComments}/>
              {/* <MDBBtn color='secondary' onClick={() => setScrollableModal(!setScrollableModal)}>
                Close
              </MDBBtn> */}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
        </MDBModal>
        </>
        );
}
 
export default Comments;