import "../../assets/css/post.css";
import placeImg from "../../assets/images/place.jpeg";

import { useNavigate } from "react-router-dom";

const PostList = ()=>{
    const navigate = useNavigate();

    return (
        <div>
            <button className="button button-block" onClick={()=>navigate("new-post")} >Add New Post</button>
            <h2 className="table-title" >Post List</h2>

            <input className="search-input" type="text" name="search" placeholder="Search here" />

            <div className="flexbox-container-wrap" >
                
                <div className="post-card" onClick={()=>navigate("detail-post")} >
                    <h4 className="card-title" >Create Post Blog</h4>
                    <p className="card-desc" >
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur natus totam 
                        eligendi molestias? Esse provident delectus veritatis iste sunt ducimus, corrupti 
                        et laborum non architecto excepturi harum sequi! Consectetur, consequuntur.
                    </p>
                    <img src={placeImg} alt="mern" className="card-img" />
                </div>

                <div className="post-card" onClick={()=>navigate("detail-post")} >
                    <h4 className="card-title" >Create Post Blog</h4>
                    <p className="card-desc" >
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur natus totam 
                        eligendi molestias? Esse provident delectus veritatis iste sunt ducimus, corrupti 
                        et laborum non architecto excepturi harum sequi! Consectetur, consequuntur.
                    </p>
                    <img src={placeImg} alt="mern" className="card-img" />
                </div>

                <div className="post-card"  onClick={()=>navigate("detail-post")}>
                    <h4 className="card-title" >Create Post Blog</h4>
                    <p className="card-desc" >
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur natus totam 
                        eligendi molestias? Esse provident delectus veritatis iste sunt ducimus, corrupti 
                        et laborum non architecto excepturi harum sequi! Consectetur, consequuntur.
                    </p>
                    <img src={placeImg} alt="mern" className="card-img" />
                </div>

                <div className="post-card" onClick={()=>navigate("detail-post")} >
                    <h4 className="card-title" >Create Post Blog</h4>
                    <p className="card-desc" >
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur natus totam 
                        eligendi molestias? Esse provident delectus veritatis iste sunt ducimus, corrupti 
                        et laborum non architecto excepturi harum sequi! Consectetur, consequuntur.
                    </p>
                    <img src={placeImg} alt="mern" className="card-img" />
                </div>

                <div className="post-card" onClick={()=>navigate("detail-post")} >
                    <h4 className="card-title" >Create Post Blog</h4>
                    <p className="card-desc" >
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur natus totam 
                        eligendi molestias? Esse provident delectus veritatis iste sunt ducimus, corrupti 
                        et laborum non architecto excepturi harum sequi! Consectetur, consequuntur.
                    </p>
                    <img src={placeImg} alt="mern" className="card-img" />
                </div>

                <div className="post-card" onClick={()=>navigate("detail-post")} >
                    <h4 className="card-title" >Create Post Blog</h4>
                    <p className="card-desc" >
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur natus totam 
                        eligendi molestias? Esse provident delectus veritatis iste sunt ducimus, corrupti 
                        et laborum non architecto excepturi harum sequi! Consectetur, consequuntur.
                    </p>
                    <img src={placeImg} alt="mern" className="card-img" />
                </div>

                <div className="post-card" onClick={()=>navigate("detail-post")} >
                    <h4 className="card-title" >Create Post Blog</h4>
                    <p className="card-desc" >
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur natus totam 
                        eligendi molestias? Esse provident delectus veritatis iste sunt ducimus, corrupti 
                        et laborum non architecto excepturi harum sequi! Consectetur, consequuntur.
                    </p>
                    <img src={placeImg} alt="mern" className="card-img" />
                </div>

            </div>
        </div>
    );
};
export default PostList;