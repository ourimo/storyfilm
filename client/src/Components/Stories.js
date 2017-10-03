import React, { Component } from 'react';
import Story from './Story';

class Stories extends Component {
  deleteStory(id, story){
    this.props.onDelete(id, story);
  }
  updateStory(id, story, chevron, likeCount){
    this.props.onUpdate(id, story, chevron, likeCount);
  }

  render() {
    let stories;
    if(this.props.stories){
      stories = this.props.stories.map(story => {
        return (
          <Story onDelete={this.deleteStory.bind(this)} onUpdate={this.updateStory.bind(this)} key={story.title} story={story} />
        );
      });
    }
    return (
      <div className="Stories">
        {stories}
      </div>
    );
  }
}

export default Stories;
