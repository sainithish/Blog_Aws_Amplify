import React, { useState , useEffect } from 'react';
import BlogService from './services/BlogService';
import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from './components/CourseGoals/CourseInput/CourseInput';
import './App.css';
import ListBlogComponent from './components/ListBlogComponent';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { API , Storage  } from 'aws-amplify';  
import { listTodos } from './graphql/queries';
import { createTodo as createNoteMutation, deleteTodo as deleteNoteMutation } from './graphql/mutations';
import "./components/UI/Button/Button.css";
const initialFormState = { name: '', description: '' }
const App = () => {
  const [courseGoals, setCourseGoals] = useState([
    
]);

// ********************************************************
const [notes, setNotes] = useState([]);
const [formData, setFormData] = useState(initialFormState);

useEffect(() => {
  fetchNotes();
}, []);

useEffect(() => {
  fetchNotes();
}, []);

async function fetchNotes() {
  const apiData = await API.graphql({ query: listTodos });
  const notesFromAPI = apiData.data.listTodos.items;
  await Promise.all(notesFromAPI.map(async note => {
    if (note.image) {
      const image = await Storage.get(note.image);
      note.image = image;
    }
    return note;
  }))
  setNotes(apiData.data.listTodos.items);
}

async function createNote() {
  if (!formData.name || !formData.description) return;
  await API.graphql({ query: createNoteMutation, variables: { input: formData } });
  if (formData.image) {
    const image = await Storage.get(formData.image);
    formData.image = image;
  }
  setNotes([ ...notes, formData ]);
  setFormData(initialFormState);
}

async function deleteNote({ id }) {
  const newNotesArray = notes.filter(note => note.id !== id);
  setNotes(newNotesArray);
  await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
}

async function onChange(e) {
  if (!e.target.files[0]) return
  const file = e.target.files[0];
  setFormData({ ...formData, image: file.name });
  await Storage.put(file.name, file);
  fetchNotes();
}
//***************************************************************
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
      {/* <Router>
               
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
       
      </Router>  */}

  <section id="goal-form">
      <div  className="form-control">
      <h1>Add New Blog</h1>
      <div className="form-control">
      <label>Blog Title:</label>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Name Your Blog"
        value={formData.name}
      />
      <br/>
      <label >Content:</label>
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Enter Blog Content"
        value={formData.description}
      />
      <br/>
      <input
         type="file"
        onChange={onChange}
      />
      </div>
      <button  className='button' onClick={createNote}>Publish Blog</button>
      <br/>
      <AmplifySignOut />
      
      
      
    </div>
      </section>
      <div  className="goal-form" style={{marginBottom: 30}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              <button className="button" onClick={() => deleteNote(note)}>Delete Blog</button>
              {
        note.image && <img src={note.image} style={{width: 400}} />
      }
            </div>
          ))
        }
      </div>
      
    </div>
  );
};

export default withAuthenticator(App);
