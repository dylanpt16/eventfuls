import React from 'react';

class AnnouncementForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.group.owned_by_current_user) {
      let Obj = { user_id: this.props.currentUserId, group_id: this.props.group.id }
      const announcement = Object.assign({}, this.state, Obj);
      this.props.createAnnouncement({announcement});
    }
  }

  render() {
    if (this.props.group.owned_by_current_user) {
      return(
        <div className="announcement-form-container">
          <input
            type="text"
            value={this.state.content}
            onChange={this.update('content')}
            placeholder="announcement"
          />
          <button
            onClick={this.handleSubmit}
            className="btn btn-outline-danger"
          >
            Submit
          </button>
        </div>
      );
    }
    return null;
  }
};

export default AnnouncementForm;
