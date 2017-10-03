import React, { Component } from 'react';

class Story extends Component {
  deleteStory(id, story){
    this.props.onDelete(id, story);
  }
  
  updateStory(id, story, chevron, likeCount){
    this.props.onUpdate(id, story, chevron, likeCount);
  }
  
  checkLike(){
    let id = `${this.props.story.title}by${this.props.story.author}like`;
    let getId = localStorage.getItem(id);
    
    if (getId === 'likeActive') {
      this.refs.chevron.classList.add('icon-stroke-active');
      this.refs.likeCount.classList.add('likeCount-active');
    } else {
      this.refs.chevron.classList.remove('icon-stroke-active');
      this.refs.likeCount.classList.remove('likeCount-active');
    }
  }
  
  enableDelete(){
    let id = `${this.props.story.title}by${this.props.story.author}`;
    let item = localStorage.getItem(id);
    if (item === 'deleteActive'){
      this.refs.delete.style.display = 'inherit';
    } else {
      this.refs.delete.style.display = 'none';
    }
  }
  
  addUrlDots(){
    let url = this.props.story.url;
    let content = this.props.story.content;
    let dots = this.refs.dots;
    
    if (url !== ''){
      dots.style.display = 'inline-block';
    } else {
      dots.style.display = 'none';
    }
  }
  
  componentDidMount(){
    this.addUrlDots();
    this.enableDelete();
    this.checkLike();
  }

  render() {
    return (
      <article className="Story">
        <h2>{this.props.story.title}</h2>
        <div className="Story-info">
          <p>by {this.props.story.author}</p>
          <div>
            <svg onClick={this.deleteStory.bind(this, this.props.story._id, this.props.story)} ref="delete" className="icon-fill" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M21 6l-3 18h-12l-3-18h2.028l2.666 16h8.611l2.666 -16h2.029zm-4.711-4c-.9 0-1.631-1.099-1.631-2h-5.316c0 .901-.73 2-1.631 2h-5.711v2h20v-2h-5.711z"/>
            </svg>
            <svg onClick={this.updateStory.bind(this, this.props.story._id, this.props.story, this.refs.chevron, this.refs.likeCount)} ref="chevron" className="icon-chevron icon-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="1521.147 399.146 21.306 11.007">
              <g transform="translate(1426 -12)">
                <path d="M10.3,0,20.6,10.3Zm0,0L0,10.3Z" transform="translate(95.5 411.5)"/>
              </g>
            </svg>
            <div ref="likeCount">{this.props.story.like}</div>
          </div>
        </div>
        <p>
          {this.props.story.content}
          <a ref="dots" className="dots" href={this.props.story.url}>...</a>
        </p>
      </article>
    );
  }
}

export default Story;