import React, { Component } from 'react';
import $ from 'jquery';

//const EVENT_API = 'rest.bandsintown.com/artists/Serum/events?app_id=03a9930170197e5df8bd23391de0be4a';

    class App extends Component {
      constructor() {
        super();
        this.state = { data: [] };
      }
      async componentDidMount() {
        const response = await fetch(`https://api.songkick.com/api/3.0/search/artists.json?apikey=kGtT8SlF6H0LHyIL&query=Flume`)
          const json = await response.json()
            this.setState({ data: json });
      }
      render() {
        return (
          <div>
            <ul>
              {this.state.data.map(artists => (
                <li>
                  {artists.events}: {artists.location}
                </li>
              ))}
            </ul>
          </div>
        );
      }
    }
    export default App;
