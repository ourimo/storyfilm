import React, { Component } from 'react';

class Story extends Component {
  deleteStory(id){
    this.props.onDelete(id);
  }

  render() {
    return (
      <li className="Story">
        <strong>{this.props.story.title}</strong>
        <br />
        {this.props.story.content} <a href="#" onClick={this.deleteStory.bind(this, this.props.story._id)}>X</a>
        <hr />
      </li>
    );
  }
}

Story.propTypes = {
  story: React.PropTypes.object,
  onDelete: React.PropTypes.func
};

export default Story;
