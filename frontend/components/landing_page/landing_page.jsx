var React = require('react'),
    ReactConstants = require('../../constants/react_constants'),
    SessionStore = require('../../stores/sessions_store'),
    UserStore = require('../../stores/users_store'),
    TrackStore = require('../../stores/tracks_store'),
    LandingPageActions = require('../../actions/landing_page_actions'),
    Face = require('../music_search/face');

var LandingPage = React.createClass({
  getInitialState: function() {
    return({
      user: false
    });
  },

  componentDidMount: function() {
    this.listener = SessionStore.addListener(this.onSessionChange);
    this.listener2 = UserStore.addListener(this.onUserChange);

    setTimeout(function() {
      $('.demo').css( "bottom", "0px");
      $('.get-info').css( "visibility", "hidden");
      $('.guest-button').css( "right", "20px");
    }, 4000);
  },

  componentWillUnmount: function() {
    this.listener.remove();
    this.listener2.remove();
  },

  onSessionChange: function() {
    if (SessionStore.currentUserId() !== null && SessionStore.errors().length <= 0) {
      this.setState({ user: true });
    } else {
      this.setState({ user: false });
    }
  },

  onUserChange: function() {
    if (UserStore.currentUser() && UserStore.errors().length <= 0) {
      this.props.history.pushState(null, "music");
    } else {
      this.setState({ user: false });
    }
  },

  showGuest: function() {
    $('.demo').css( "bottom", "0px");
    $('.guest-button').css( "right", "20px");
    $('.get-info').css( "visibility", "hidden");
  },

  goToMusic: function() {
    this.props.history.pushState(null, "music");
  },

  signInAsGuest: function() {
    LandingPageActions.loginGuest(this.goToMusic);
  },

  showVideo: function() {
    this.setState({ video: true });
  },

  render: function() {
    var button;
    if (!this.state.user) {
      var button = (
        <div className="start-buttons">
          <div className="signup-button" data-toggle="modal" data-target="#myModal">sign up</div>
          <div className="signin-button" data-toggle="modal" data-target="#myModal2">sign back in</div>

        </div>
      );
    } else {
      button = <div></div>
    }

    return(
      <div className="landing-wrapper">
        <div className="guest-button" onClick={this.signInAsGuest}>guest login</div>
        <iframe className="demo" id="demo" width="400" height="300" allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/6lLfZSUTdU4"></iframe>
        {button}
        <img className="get-info" onClick={this.showGuest} src="assets/info.png"></img>
      </div>
    );
  }

});

module.exports = LandingPage;
