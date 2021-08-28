import React, { Component } from 'react';
import BlogService from '../services/BlogService';
import '../components/CourseGoals/CourseGoalItem/CourseGoalItem.css'
import BlogListDB from './CourseGoals/BlogListDB/BlogListDB';



class ListBlogComponent extends Component {

    constructor (props) {
        super(props)
        this.state={ blogs: []
        }
    }

    componentDidMount(){
        BlogService.getBlogs().then((res) => {
            this.setState({ blogs:res.data})
        })

    }
    deleteBlog(id){
        BlogService.deleteBlog(id).then( res => {
            this.setState({blogs:this.state.blogs.filter(blog => blog.id !==id)});
            window.location.reload();
        })
        
    }
    deleteHandler = () => {
        this.props.onDeleteItem(this.props.id)
    } 
    render() {
        return (
            <ul className="goal-list">
                <div>
                    {
                        
                        this.state.blogs.map(blog =>
                           <center><BlogListDB key = {blog.id} id={blog.id}  noDisp="101" onDelete={this.props.onDeleteItem} >
                                  <center>{blog.title}</center>
                                        <br/><br/>
                                       <center> {blog.content}</center>
                                <button className="dbutton" onClick={ () => this.deleteBlog(blog.id)}> Delete Blog</button>
                                {/* <DeleteButton onclick={this.props.deleteHandler} onDelete={this.props.onDeleteItem}>Inside</DeleteButton> */}
                            </BlogListDB></center> 

                                )
                    }
                    
                </div>
            </ul>
        );
    }
}

export default ListBlogComponent;