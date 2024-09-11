import { useEffect , useState } from "react";
import "../../assets/css/categoryList.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import moment from "moment/moment";
import { Modal , Button } from "react-bootstrap";

const CategoryList = ()=>{
    const [loading , setLoading] = useState(false);
    const [categories , setCategories] = useState([]);
    const [totalPage , setTotalPage] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [pageCount , setPageCount] = useState([]);
    const [searchValue , setSearchValue] = useState("");
    const [showModal , setShowModal] = useState(false);
    const [categoryId , setCategoryId] = useState(null)

    const navigate = useNavigate();

    useEffect(()=>{
        const getCategories = async ()=>{
            try{
                setLoading(true);

                // Api request
                const response = await axios.get(`/category?page=${currentPage}&q=${searchValue}`);
                const data = response.data.data;
                setCategories(data.categories);
                setTotalPage(data.pages);
                console.log(data);
                
                setLoading(false);
            }
            catch(error){
                setLoading(false);

                const response = error.response;
                const data = response.data;
                toast.error(data.message , {
                    position: "top-right",
                    autoClose: true,
                })
            }
        }
        getCategories();

    } , [currentPage])

    useEffect(()=>{
        if (totalPage > 1) {
            let tempPageCount = [];
            for (let i = 1; i <= totalPage; i++) {
                tempPageCount = [...tempPageCount , i];
            }
            setPageCount(tempPageCount);
        }
        else{
            setPageCount([]);
        }
    } , [totalPage]);

    const handlePageChange = (page)=>{
        setCurrentPage(page);
    }
    console.log(pageCount);
    
    const handleSearch = async (e)=>{
        try{
            const input = e.target.value;
            setSearchValue(input);

            // Api request
            const response  = await axios.get(`/category?q=${input}&page=${currentPage}`);
            const data = response.data.data;
            setCategories(data.categories);
            setTotalPage(data.page);
        }
        catch(error){
            const response  = error.message;
            const data = response.data;
            toast.error(data.message , {
                position: "top-right",
                autoClose: true,
            })
        }
    }

    const handleDelete = async ()=>{
        // Api request
        try{
            const response = await axios.delete(`/category/${categoryId}`);
            
            setShowModal(false);
            const data = response.data;
            toast.success(data.message , {
                position: "top-right",
                autoClose: true,
            });

            // Api request
            const response2 = await axios.get(`/category?page=${currentPage}&q=${searchValue}`);
            const data2 = response2.data.data;
            setCategories(data2.categories);
            setTotalPage(data2.pages);
            
            
        }
        catch(error){
            setShowModal(false);
            const response  = error.message;
            const data = response.data;
            toast.error(data.message , {
                position: "top-right",
                autoClose: true,
            })
        }
    }

    return(
        <div>
            <button className="button button-block" onClick={()=>navigate("new-category")} >Add New Category</button>
            <h2 className="table-title" > Category List </h2>

            <input type="text" className="search-input" name="search" placeholder="Search Here" onChange={handleSearch} />

            {loading ? "Loading..." : (
                <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id} >
                        <td> {category.title} </td>
                        <td> {category.desc} </td>
                        <td> {moment(category.createdAt).format("DD-MM-YYYY HH:mm:ss a")} </td>
                        <td> {moment(category.updatedAt).format("DD-MM-YYYY HH:mm:ss a")} </td>
                        <th>
                            <button className="categorybutton" onClick={()=>navigate(`update-category/${category._id}`)}>Update</button>
                            <button className="categorybutton" onClick={()=> {setShowModal(true) ; setCategoryId(category._id) }} >Delete</button> 
                        </th>
                    </tr>                    
                    ))}
                </tbody>
            </table>
            )}

            {pageCount.length > 0 && (
            <div className="pag-container">
                <button
                className="pag-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                >
                prev
                </button>
                {pageCount.map((page) => (
                <button
                    key={page}
                    className={`pag-button ${currentPage === page ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
                ))}
                <button
                className="pag-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                >
                next
                </button>
            </div>
            )}

            <Modal show={showModal} onHide={()=> {setShowModal(false) ; setCategoryId(null) }} >
                <Modal.Header closeButton={true} >
                    <Modal.Title>Are you sure you want to delete ?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <div style={{margin: "0 auto"}} >
                        <Button className="no-button" onClick={()=> {setShowModal(false) ; setCategoryId(null) }} >No</Button>
                        <Button className="yes-button" onClick={handleDelete} >Yes</Button>
                    </div>
                </Modal.Footer>
            </Modal>

        </div>
    )
};
export default CategoryList;