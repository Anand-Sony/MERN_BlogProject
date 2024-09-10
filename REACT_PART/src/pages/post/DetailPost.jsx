import placeImg from "../../assets/images/place.jpeg";

import { useLocation, useNavigate } from "react-router-dom";

const DetailPost = ()=>{
    const location = useLocation();

    const navigate = useNavigate();

    return (
        <div>
            <button className="button button-block" onClick={()=>navigate(-1)} >Go Back</button>
            <button className="button button-block" onClick={()=>navigate("/posts/update-post")} >Update Button</button>
            <div className="detail-container" >
                <h2 className="post-title" >React Blog Post</h2>
                <h5 className="post-category" >Category: Category 1</h5>
                <h5 className="post-category" >created at: 10/7/2023</h5>
                <h5 className="post-category" >updated at: 10/7/2023</h5>

                <p className="post-desc" >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nobis
                    labore, provident magnam deleniti in id amet unde vitae suscipit modi a molestiae
                    voluptates, voluptate porro nemo ipsam alias similique? Debitis dolore enim, quo velit 
                    ut minus maxime excepturi aspernatur optio reprehenderit quisquam. Ea quae magnam fugit
                    doloribus quidem. Cumque quibusdam laudantium, sint laboriosam corporis modi nam quia error
                    quas, maiores provident repellat voluptate! Dolorum est excepturi minima, asperiores itaque 
                    culpa fuga autem, provident illo saepe suscipit perferendis pariatur sequi odio sed tempore deserunt.
                    Consectetur alias repellendus deleniti odit nemo ex sint debitis sed itaque. Repellendus 
                    voluptatem blanditiis nostrum veniam!
                </p>
                <img src={placeImg} alt="mern" />
            </div>

        </div>
    )
};
export default DetailPost;