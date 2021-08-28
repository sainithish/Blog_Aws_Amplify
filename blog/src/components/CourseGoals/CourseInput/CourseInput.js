import React, { Fragment, useState } from 'react';

import Button from '../../UI/Button/Button';
import './CourseInput.css';

const CourseInput = props => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredContent,setEnteredContent]=useState('');

  const goalInputChangeHandler = event => {
    setEnteredTitle(event.target.value);
  };
  const contentInputChangeHandler = event => {
    setEnteredContent(event.target.value);
  };
  const formSubmitHandler = event => {
    event.preventDefault();
    props.onAddGoal(enteredTitle , enteredContent);
    
  };

  return (
    <Fragment>
      <form onSubmit={formSubmitHandler}>
        <div className="form-control">
          <h2>Add New Blog</h2>
          <label>Blog Title:</label>
          <input type="text" placeholder="Name Your Blog" onChange={goalInputChangeHandler} /><br/>          
          <label >Content:</label>
          <input type="text" placeholder="Enter Blog content" onChange={contentInputChangeHandler}></input>
        </div>
        <Button type="submit">Publish Blog</Button>
      </form>
    </Fragment>
  );
};

export default CourseInput;
