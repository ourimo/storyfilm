import React, { Component } from 'react';
import uuid from 'uuid';

class AddStory extends Component {
  constructor(){
    super();
    this.state = {
      newStory:{},
      active: '',
      text: 'Add Story'
    };
  }
  
  handleSubmit(e){
    if(this.refs.title.value === '' && this.refs.content.value === ''){
      alert('Field is required');
    } else {
      this.setState({newStory:{
        id: uuid.v4(),
        title: this.refs.title.value,
        author: this.refs.author.value,
        content: this.refs.content.value,
        url: this.refs.url.value
      }}, function(){
        this.props.addStory(this.state.newStory);
      });
      
      this.refs.title.value = '';
      this.refs.author.value = '';
      this.refs.content.value = '';
      this.refs.url.value = '';
      
      this.setState({
        active: '',
        text: 'Add Story'
      });
    }
    e.preventDefault();
  }
  
  handleOnClick(){
    if ( this.state.active === '' ) {
      this.setState({
        active: 'AddStory-active',
        text: 'Tell me that story'
      });
    } else {
      this.setState({
        active: '',
        text: 'Add Story'
      });
    }
  }

  render() {
    return (
      <div className={'AddStory ' + this.state.active}>
        <div className="AddStory_intro">
          <svg onClick={this.handleOnClick.bind(this)} className="icon-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="1651 397.5 24.8 24.8">
            <path d="M0,0V24.8" transform="translate(1663.4 397.5)"/>
            <path d="M0,0V24.8" transform="translate(1675.8 409.9) rotate(90)"/>
          </svg>
          <h3>{this.state.text}</h3>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="title" placeholder="Title" required/>
          <input type="text" ref="author" placeholder="Author"/>
          <textarea ref="content" placeholder="Once upon a time.." maxLength="700" required/>
          <div className="AddStory_footer">
            <input type="submit" value="Submit" />
            <div className="input-url">
              <input type="text" ref="url" placeholder="Add url.."/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddStory;
