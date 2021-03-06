import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_POST, LOADING } from "../../utils/actions";
import API from "../../utils/API";
import "./style.css";
import Corner from "../../img/smallCornerOrange.png"
// import Corner from "../../img/corner.png"
// import Corner from "../../img/smallCornerMagenta.png"
// import { Link } from "react-router-dom";


function CreatePostForm() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const authorRef = useRef();
  const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: LOADING });
    API.savePost({
      title: titleRef.current.value,
      body: bodyRef.current.value,
      author: authorRef.current.value
    })
      .then(result => {
        dispatch({
          // type: ADD_FAVORITE,
          type: ADD_POST,
          post: result.data
        });
        console.log(result);
      })
      .catch(err => console.log(err));

    titleRef.current.value = "";
    bodyRef.current.value = "";
    authorRef.current.value = "";
  };

  return (
    <>

      <div className="card orange z-depth-3">
        <div className="card-content">
          <span className="noteBoxTitle">Need to Add a Note?</span>
          <form className="form-group mt-3 mb-3 formBox" onSubmit={handleSubmit}>
            <input className="form-control mb-3" required ref={titleRef} placeholder="Title" />
            <textarea className="form-control mb-3 bodyPlaceholder" required ref={bodyRef} placeholder="Body" />
            <input className="form-control mb-3" ref={authorRef} placeholder="Name" />

            <button className="orangeAddButton" type="submit">
              Add
            </button>
          </form>
        </div>
        <img className="orangePageCorner" src={Corner} alt="orange page corner"></img>

      </div>

    </>
  );
}

export default CreatePostForm;

      {/* <div className="card magentaCard z-depth-3">
        <div className="container">
          <div className="card-content">
            <h5>View: </h5>
            <div className="card-action">
              <div className="mt-5 homeList">
                <Link to="notelist">&#8226; Notes</Link>
              </div>
              <div className="mt-5 homeList">
                <Link to="calendar">&#8226; Calendar</Link>
              </div>
              <div className="mt-5 homeList">
                <Link to="gallery">&#8226; Photo Gallery</Link>
              </div>
              <div className="mt-5 homeList">
                <Link to="login">&#8226; Log Out</Link>
              </div>
            </div>
            <img className="magentaPageCorner" src={Corner} alt="page corner"></img>
          </div>
        </div>
      </div> */}
