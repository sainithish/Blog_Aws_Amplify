import axios from "axios";

const Blog_API_Base_URL="http://localhost:51083/api/v1/blogs"

class BlogServices {

    getBlogs(){
        return axios.get(Blog_API_Base_URL);
    }
    createBlog (blog){
        return (axios.post(Blog_API_Base_URL,blog ))
    }
    deleteBlog(blogId){
        return axios.delete(Blog_API_Base_URL+'/'+blogId)
    }
}

export default new BlogServices();