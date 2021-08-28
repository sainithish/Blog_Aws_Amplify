import React from 'react';
import '../CourseGoalItem/CourseGoalItem.css'
const BlogListDB = props => {  
      
    return (
      <li className="goal-item" >
        {props.children}
          
      </li>
    );
  };
  
  export default BlogListDB;