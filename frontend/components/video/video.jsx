import React from 'react';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      root: 'http://res.cloudinary.com/dylanpt16/video/upload/v1517613759/video_c1yvd3.mp4'
    }
  }

  render() {
    return (
      <div className="fullscreen-bg">
        <video
          loop muted="true"
          autoPlay="true"
          poster="http://res.cloudinary.com/dylanpt16/image/upload/v1517614425/eventfuls/1_iW7i51bEZSnoPwGgWW93Kg.jpg"
          className="fullscreen-bg__video">
          <source src={this.state.root} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default Video;
