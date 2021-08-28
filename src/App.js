import React, { useState } from 'react';
import BlogService from './services/BlogService';
import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from './components/CourseGoals/CourseInput/CourseInput';
import './App.css';
import ListBlogComponent from './components/ListBlogComponent';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

const App = () => {
  const [courseGoals, setCourseGoals] = useState([
    
]);
// { title: 'Blog 1', content:'This is from React ' , id:'1'},

  const addGoalHandler = (enteredTitle,enteredContent) => {
    
    setCourseGoals(prevGoals => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({ title: enteredTitle, content: enteredContent, id: Math.random().toString() });
      let blog = {title : enteredTitle, content:enteredContent }
      BlogService.createBlog(blog).then( res => {
        console.log(res);
      })
      return updatedGoals;
    });
  };



  const deleteItemHandler = goalId => {
    setCourseGoals(prevGoals => {
      const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
      BlogService.deleteBlog(goalId)
      return updatedGoals;
    });
  };

  let content = (
    <p style={{ textAlign: 'center' }}>No Blogs found. Maybe add one?</p>
  );

  if (courseGoals.length >= 0) {
    content = (
      <CourseGoalList items={courseGoals} onDeleteItem={deleteItemHandler} />
    );
  }
  return (
    <div>
      <Router>
               
          <section id="goal-form">
            <CourseInput onAddGoal={addGoalHandler} />
          </section>
                       
          <section id="goals">
            {content}
            <Switch> 
            <Route path="/" component= {ListBlogComponent}></Route>
            <Route path="/blogs" component= {ListBlogComponent}></Route>
            <ListBlogComponent items= {courseGoals} onDeleteItem={deleteItemHandler}/>
          </Switch>     
            
          </section>
       
      </Router> 
    </div>
  );
};

export default App;
