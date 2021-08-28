import React from 'react';

import './CourseGoalItem.css';
import DeleteButton from '../../UI/DeleteButton/DeleteButton';
const CourseGoalItem = props => {
  // const [deleteText, setDeleteText] = useState('');

  const deleteHandler = () => {
    // setDeleteText('(Deleted!)');
    props.onDelete(props.id);
  };
      
  

  return (
    <li className="goal-item" >
      {props.children}
      
      <DeleteButton onClick={deleteHandler}/>
          
    </li>
  );
};

export default CourseGoalItem;
