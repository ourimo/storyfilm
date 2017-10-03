import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Stories from './Components/Stories';
import AddStory from './Components/AddStory';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      stories: []
    };
  }

  getStories(){
    fetch('/api/stories').then(function(data){
        return data.json();
    }).then( json => {
        this.setState({
            stories: json
        });
    });
  }

  componentWillMount(){
    this.getStories();
  }

  componentDidMount(){
    this.getStories();
  }

  handleAddStory(story){
    fetch('/api/stories', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(story)
    }).then(function(data){
        return data.json();
    }).then( json => {
        let stories = this.state.stories;
        stories.unshift(json);
        this.setState({stories:stories});
    });
    
    localStorage.setItem(`${story.title}by${story.author}`, 'deleteActive');
  }

  handleDeleteStory(id, story){
    fetch('/api/stories/'+id, {
      method: 'DELETE'
    }).then(function(data){
        return data.json();
    }).then( json => {
        let stories = this.state.stories;
        let index = stories.findIndex(x => x._id === id);
        stories.splice(index, 1);
        this.setState({stories:stories});
    });
    localStorage.removeItem(`${story.title}by${story.author}`);
    localStorage.removeItem(`${story.title}by${story.author}like`);
  }
  
  handleUpdateStory(id, story, chevron, likeCount){
    this.likeStory(story, chevron, likeCount);
    
    fetch('/api/stories/'+id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(story)
    }).then(function(data){
        return data.json();
    }).then( json => {
        let stories = this.state.stories;
        this.setState({stories:stories});
    });
  }
    
  likeStory(story, chevron, likeCount){
    let id = `${story.title}by${story.author}like`;
    let getId = localStorage.getItem(id);
    
    if (getId === 'likeActive') {
      if (story.like > 0){
        story.like --;
        localStorage.removeItem(id);
        chevron.classList.remove('icon-stroke-active');
        likeCount.classList.remove('likeCount-active');
      }
    } else {
      chevron.classList.add('icon-stroke-active');
      likeCount.classList.add('likeCount-active');
      
      if (likeCount.classList.contains('likeCount-active')) {
        localStorage.setItem(id, 'likeActive');
        story.like ++;
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="layout-header">
          <img src="images/filmtape.png" />
          <div>
            <p>Storyfilm<span>.</span></p>
            <h1>Your story worth a film</h1>
          </div>
        </header>
        <AddStory addStory={this.handleAddStory.bind(this)} />
        <Stories stories={this.state.stories} onDelete={this.handleDeleteStory.bind(this)} onUpdate={this.handleUpdateStory.bind(this)} />
        <div className="imagery">
          <img src="images/typewriter.png"/>
        </div>
      </div>
    );
  }
}

export default App;
