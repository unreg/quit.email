'use strict';

var React = require('react');
var $ = require('zeptojs');
var CustomProtoHelper = require('../utils/CustomProtoHelper');
const { appName, path } = require('../utils/settings');


var App = React.createClass({
  getInitialState: function() {
    return ({
      isLoading: true
    });
  },

  componentWillMount: function() {
    var token = CustomProtoHelper.token;
    var component = this;

    $.getJSON(path.apiLink + '/v1/groups/invites/' + token,
      {
        dataType: 'jsonp'
      },
      function(resp) {
        console.debug(resp);
        component.setState({
          isLoading: false,
          group: resp.group,
          inviter: resp.inviter
        });
      });

  },

  onClick: function() {
    var joinLink = CustomProtoHelper.joinLink;
    var timeout = 100;
    var clicked = +new Date();

    if (CustomProtoHelper.isMobile) {
      joinLink = CustomProtoHelper.isAndroid ? path.androidDownload : path.iosDownload;
    }
    window.setTimeout(function () {
      if (+new Date() - clicked < timeout * 2) {
        window.location.replace(joinLink);
      }
    }, timeout);

    if (CustomProtoHelper.isMobile) {
      window.location.replace(CustomProtoHelper.customProtocolLink);
    }
  },

  render: function() {
    if (this.state.isLoading) {
      return null
    }

    var group = this.state.group;
    var inviter = this.state.inviter;

    return (
      <div className="container">
        <section className="invite">
          {
            group.avatars
              ? <img className="invite__avatar" src={group.avatars.small} alt={group.title}/>
              : null
          }

          <div className="invite__title">
            Join <strong>{group.title}</strong> on Actor
          </div>

          {
            inviter
              ?
                <div className="invite__body">
                  <p>
                    <strong>{inviter.name}</strong> invites you to join a <strong>group chat</strong>.
                  </p>
                </div>
              :
                null
          }
          <footer className="invite__footer">
            <a className="button" onClick={this.onClick}>Join group</a>
          </footer>
        </section>

        <section className="install">
          <div className="large">
            Not using <strong>{appName}</strong> yet?
            <br/>
            <a className="down-button" href={path.downloadLink}>Download</a> our apps. It's free and secure!
          </div>
          <a className="small" href={path.downloadLink}>
            Not using <strong>Actor</strong> yet? Download right now.
            <img src="/img/download_icon.png" alt=""/>
          </a>
        </section>
      </div>
    )
  }
});

module.exports = App;
