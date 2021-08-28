import React from 'react';


import CourseGoalItem from '../CourseGoalItem/CourseGoalItem';
import './CourseGoalList.css';


const CourseGoalList = props => {

  

  return (
    <ul className="goal-list">
      {props.items.map(goal => (
        <CourseGoalItem
          key={goal.id}
          id={goal.id}
          onDelete={props.onDeleteItem}
          noDisp="1"
        >
          
          <center>{goal.title}</center>
          <br/><br/>
          {goal.content}
          
        </CourseGoalItem>
      ))}
      
    </ul>
  );
};

export default CourseGoalList;
