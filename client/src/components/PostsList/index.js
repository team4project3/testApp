import React, { useEffect } from "react";
import { ListItem, List } from "../List";
import DeleteBtn from "../DeleteBtn";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_POST, UPDATE_POSTS, LOADING } from "../../utils/actions";
import API from "../../utils/API";
import "./postlist.css";

const NoteList = () => {

  const [state, dispatch] = useStoreContext();

  const removePost = id => {
    API.deletePost(id)
      .then(() => {
        dispatch({
          type: REMOVE_POST,
          _id: id
        });
      })
      .catch(err => console.log(err));
  };

  const getPosts = () => {
    dispatch({ type: LOADING });
    API.getPosts()
      .then(results => {
        dispatch({
          type: UPDATE_POSTS,
          posts: results.data
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="container mb-5 mt-5">
        {/* <h2 className="text-center">Note List:</h2> */}
        <div className="card z-depth-4">
          <div className="card-content noteListContent">

            {state.posts.length ? (

              <List>
                {state.posts.map(post => (
                  <ListItem key={post._id}>
                    <Link to={"/posts/" + post._id}>
                      <strong>
                        {post.title} : {post.body} | {post.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => removePost(post._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h4 className="emptyNoteList">Note List is Empty for Now!</h4>
              )}
          </div>

          {/* <div className="mt-5">
            <Link to="home">Back to home</Link>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default NoteList;



