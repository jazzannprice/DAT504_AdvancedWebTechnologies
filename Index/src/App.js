import React, { Component } from 'react'
import styles from './searchstyles.css'
import Select from 'react-select'

const API_ID = 'kGtT8SlF6H0LHyIL'

class App extends Component {
  state = {
    artistId: undefined
  }

  selectArtist = (id) => {
    this.setState({
      artistId: id
    })
  }

  render () {
    if (this.state.artistId == undefined) {
      return <Search selectArtist={this.selectArtist}/>
    } else {
      return <Events artistId={this.state.artistId}/>
    }
  }
}

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      artistevents: []
    }
  }

  componentDidMount() {
    console.log('component started, fetch me some events')
    const API_URL = `https://api.songkick.com/api/3.0/artists/${this.props.artistId}/calendar.json?apikey=${API_ID}`
    fetch(API_URL).then(response => response.json()).then((data) => {
      const events = data.resultsPage.results.event;
      console.log(events)
      const sortedOut = events.map(event => {
        console.log(event.displayName)
        return {
          label: event.displayName
          // value: event.type
        }
      })
      this.setState({
        artistevents: sortedOut
      })

    }).catch(err => {
      console.log(err)
      // do whatever when there is no valid response
    });

  }

  render () {
    return (
      <form className= 'mainsearch'>
        <Select className = 'searchBox'
          placeholder= 'Select Event'
          ref={input => this.search = input}
          onInputChange={this.handleInputChange}
          options={this.state.artistevents}
        />
      </form>
    )
  }

}

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      suggestions: [],
    }
  }

  handleInputChange = (text) => {
    this.setState({
      query: text //Takes search input
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }

  sendIt = (event) => {
    event.preventDefault();
    console.log(this.state.query)
    this.setState({
      query: this.state.query,
    })
  }


  getInfo = () => {
    console.log("get info")
    //const API_URL = `http://rest.bandsintown.com/artists/${this.state.query + '/'}events?app_id=${API_ID}`
    const API_URL = `https://api.songkick.com/api/3.0/search/artists.json?apikey=${API_ID}&query=${this.state.query}`
    fetch(API_URL).then(response => response.json()).then((data) => {
      const artists = data.resultsPage.results.artist;
      console.log(artists)

      const cleanedUp = artists.map(artist => {
        // console.log('artists', artist)
        return {
          label: artist.displayName,
          value: artist.id
        }
      })
      this.setState({
        suggestions: cleanedUp
      })
    }).catch(err => {
      console.log(err)
      // do whatever when there is no valid response
    });

  }

  findArtistEvents = (artistId) => {
    console.log('here we find the artis events', artistId)
  }


  render() {

    return (
      <div>
        <form className= 'mainsearch'>
          <Select className = 'searchBox'
            placeholder="Search Bandit"
            ref={input => this.search = input}
            onInputChange={this.handleInputChange}
            options={this.state.suggestions}
            onChange={(selected) => this.props.selectArtist(selected.value)}
          />
        </form>
      </div>
      )
    }
  }


export default App;
