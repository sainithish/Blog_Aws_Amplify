import React, { Component } from 'react';
import { useState } from 'react/cjs/react.production.min';
import BlogService from '../../services/BlogService';
import CourseGoalItem from '../CourseGoals/CourseGoalItem/CourseGoalItem';
 const ListBlogs = (props) => {
    const [blogCont,setBlogCont]=useState({blogs:[]});

    componentDidMount( () => {
        BlogService.getBlogs().then( (res)=> {
            setBlogCont( { blogs:res.data})  
        })

    }
    );

    return (
        <div>
            <ul>
                blogCont.blogs.map (blog =
                    <CourseGoalItem key = {blog.id} id={blog.id} onDelete={this.props.onDeleteItem}>
                                  <center>{blog.title}</center>
                                        <br/><br/>
                                        {blog.content}
                            </CourseGoalItem>
                )


            </ul>

        </div>

    )
    


 }

//     render() {
//         return (
//             <div>
//                 <h2>Blogs List</h2>
//                 <div>
//                     {
//                         this.state.blogs.map(blog =>
//                             <tr key = {blog.id}>
//                                 <td> {blog.title}</td>
//                                 <td>{blog.content}</td>
//                             </tr>

//                                 )
//                     }
                    
//                 </div>
//             </div>
//         );
//     }
// }

export default ListBlogs;