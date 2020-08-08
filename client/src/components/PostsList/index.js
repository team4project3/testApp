import React, { useEffect } from "react";
import { ListItem, List } from "../List";
import DeleteBtn from "../DeleteBtn";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_POST, UPDATE_POSTS, LOADING } from "../../utils/actions";
import API from "../../utils/API";
import PostIt from "../PostsList/postit.jpg"


function PostsList() {
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
    <div>
      <div class="card">

          <div class="card-image">
            <img src={ PostIt }/>
            <span class="card-title">Card Title</span>
          </div>

          <div class="card-content">
          <h3 className="dashboardH3">Click on a note to view</h3>
                {state.posts.length ? (
                <List>
                  {state.posts.map(post => (
                    <ListItem key={post._id}>
                      <Link to={"/posts/" + post._id}>
                        <strong>
                          {post.title} by {post.author}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => removePost(post._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3 className="dashboardH3">You haven't added any notes yet.</h3>
              )}
          </div>

            <div class="card-action">
              <div className="mt-5 viewImportant">
                <Link to="favorites">View Important Items</Link>
              </div>
              <div className="mt-5 viewImportant">
                <Link to="calendar">View Calendar</Link>
              </div>
              <div className="mt-5 viewImportant">
                <Link to="register">Register</Link>
              </div>
              <div className="mt-5 viewImportant">
                <Link to="login">Login In</Link>
              </div>
            </div>
      </div>

    </div>
  );
}

export default PostsList;
