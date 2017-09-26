import React, { Component } from 'react';
import Story from './Story';

class Stories extends Component {
  deleteStory(id){
    this.props.onDelete(id);
  }

  render() {
    let stories;
    if(this.props.stories){
      stories = this.props.stories.map(story => {
        return (
          <Story onDelete={this.deleteStory.bind(this)} key={story.title} story={story} />
        );
      });
    }
    return (
      <div className="Stories">
        <h3>Latest Stories</h3>
        {stories}
      </div>
    );
  }
}

Stories.propTypes = {
  stories: React.PropTypes.array,
  onDelete: React.PropTypes.func
};

export default Stories;
