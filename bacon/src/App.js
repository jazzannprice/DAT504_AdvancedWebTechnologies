import React, { Component } from 'react'
import axios from 'axios'
import Suggestions from './components/Suggestions'



const API_KEY = 'kGtT8SlF6H0LHyIL'
//const ARTIST_NAME = 'flume'

class Search extends Component {
  state = {
    query: '',
    results: [],
    suggestions: [],
  }

  componentDidMount () {

    const ARTIST_NAME = this.search.value
    const API_URL = `https://api.songkick.com/api/3.0/search/artists.json?apikey=${API_KEY}&query=${ARTIST_NAME}`
    fetch(API_URL).then(response => response.json()).then((data) => {
      const artists = data.resultsPage.results.artist;
      console.log(artists)
      const cleanedUp = artists.map(artist => {
        return {
          name: artist.displayName,
          id: artist.id
        }
      })
      // pretend to parse data
      // let artistData = [
      //   { name: 'Muse', id: 123 },
      //   { name: 'MuteMath', id: 456 }
      // ]
      this.setState({
        suggestions: cleanedUp
      })
    });
  }


  getEventsForArtist = (artistName) => {
    // fetch event data for artists here

  }

  buttonPressed(){
      console.log('pressed')
  }


  getInfo = () => {
    // axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
    //   .then(({ data, config}) => {
    //     //debugger;
    //     this.setState({
    //       results: data
    //     })
    //   })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value //Takes search input
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }

  render() {
    return (
      <div>
        <form>
          <input
            placeholder="Search for..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
        </form>
        <button onClick = {this.buttonPressed}>Submit</button>
        <Suggestions results={this.state.suggestions} />
      </div>
    )
  }
}

export default Search
