import React, { Component } from 'react';
import uuid from 'uuid';

class AddStory extends Component {
  constructor(){
    super();
    this.state = {
      newStory:{}
    };
  }

  handleSubmit(e){
    if(this.refs.title.value === '' && this.refs.content.value === ''){
      alert('Field is required');
    } else {
      this.setState({newStory:{
        id: uuid.v4(),
        title: this.refs.title.value,
        content: this.refs.content.value
      }}, function(){
        this.props.addStory(this.state.newStory);
      });
    }
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Add Story</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type="text" ref="title" />
          </div>
          <div>
            <label>Content</label><br />
            <input type="text" ref="content" />
          </div>
          <br />
          <input type="submit" value="Submit" />
          <br />
        </form>
      </div>
    );
  }
}

AddStory.propTypes = {
  addStory: React.PropTypes.func
};

export default AddStory;
