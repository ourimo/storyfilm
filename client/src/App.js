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
        console.log(json);
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
        stories.push(json);
        this.setState({stories:stories});
    });
  }

  handleDeleteStory(id){
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
  }

  render() {
    return (
      <div className="App">
        <AddStory addStory={this.handleAddStory.bind(this)} />
        <Stories stories={this.state.stories} onDelete={this.handleDeleteStory.bind(this)} />
      </div>
    );
  }
}

export default App;
