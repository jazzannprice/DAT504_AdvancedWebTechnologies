import React, { Component } from 'react';
import $ from 'jquery';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {results: []};
  }

  componentDidMount() {
    this.UserList();
  }

  UserList() {
    $.getJSON('https://api.songkick.com/api/3.0/artists/calendar.json?apikey=kGtT8SlF6H0LHyIL')
      .then(({ results }) => {
        console.log({ results })
        this.setState({ person: results })
      });
  }

  render() {
    return (
      <div id="layout-content" className="layout-content-wrapper">
        <div className="panel-list"></div>
      </div>
    );
  }
}
