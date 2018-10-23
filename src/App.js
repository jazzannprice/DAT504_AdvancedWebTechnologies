import React, { Component } from 'react' //Import React
import styles from './searchstyles.css' //Import styling
import Select from 'react-select'//Import Select component for searchbox

const API_ID = 'kGtT8SlF6H0LHyIL' // Api key

class App extends Component { //Main App component, houses all other components. Allows for global variables.
  state = {
    artistId: undefined //Initially set as undefined to run the Search component
  }

  selectArtist = (id) => { //Function once run recalls the artists unique id number from the Api Array
    this.setState({
      artistId: id
    })
  }

  render () {
    if (this.state.artistId == undefined) {
      return <Search selectArtist={this.selectArtist}/> //If statement returns Search component first but once an artist id is present it will change to the Events component.
    } else {
      return <Events artistId={this.state.artistId}/> //Once an artist id is present the component will change to display Events.
    }
  }
}

class Events extends Component { //Events component, displays any information regarding artist events.
  constructor(props) {
    super(props)
    this.state = {
      artistevents: [] //Set to display an array once the api is called.
    }
  }

  componentDidMount() { //Second api call that returns events for the specified artist
    console.log('component started, fetch me some events') //Making sure that the component runs when called.
    const API_URL = `https://api.songkick.com/api/3.0/artists/${this.props.artistId}/calendar.json?apikey=${API_ID}` //Api Url which is setup to allow an artist id to be added and display specific results.
    fetch(API_URL).then(response => response.json()).then((data) => { //Takes information from the api and displays it in Json form.
      const events = data.resultsPage.results.event; //Allows for the cleanup of the Json data.
      console.log(events) //Let's me view the data that has been cleaned
      const sortedOut = events.map(event => { //Another deeper level of cleaning, helps with managing data.
        console.log(event.displayName)
        return {
          label: event.displayName
        }
      })
      this.setState({
        artistevents: sortedOut //Sets the state of the array to display the cleaned data.
      })

    }).catch(err => { //Catches any errors
      console.log(err)
    });

  }

  render () { //Render method.
    return ( //Display's the react-select component that was previously imported.
      <form className= 'mainsearch'>
        <Select className = 'searchBox'
          placeholder= 'Select Event'
          ref={input => this.search = input}
          onInputChange={this.handleInputChange} //Calls handleinput function and allows the user to set the state of the query, which will return the artist from the api
          options={this.state.artistevents} //Displays artists events in dropdown box. The intention being that once clicked these events would be saved to a watchlist.
        />
      </form>
    )
  }

}

class Search extends Component { //Search component which is displayed first and allows the user to search for an artist using data from the api.
  constructor(props) {
    super(props)
    this.state = {
      query: '', //Allows the query state to be defined by user input. Once handleinput function is run.
      suggestions: [], //Displays data from the api in an array.
    }
  }

  handleInputChange = (text) => { //Takes the users text input.
    this.setState({
      query: text //Takes search input
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo() //Once user input is detected, it will trigger the getInfo function and call artist data from the Api.
        }
      } else if (!this.state.query) {
      }
    })
  }

  getInfo = () => { //getInfo function calls data from the Api once triggered.
    console.log("get info") //Check if the function is being called correctly
    const API_URL = `https://api.songkick.com/api/3.0/search/artists.json?apikey=${API_ID}&query=${this.state.query}` //Api that allows the user to search through a list of artists. User input changes the url of the api to return an artists name.
    fetch(API_URL).then(response => response.json()).then((data) => { //Similar to the componentDidMount function, this displays the Api data as Json data.
      const artists = data.resultsPage.results.artist; //Cleans results.
      console.log(artists) //Checking if the data is being returned correctly.

      const cleanedUp = artists.map(artist => { //Maps the Json data and allows for further cleanup.
        return {
          label: artist.displayName, //Defines the exact information that is needed.
          value: artist.id //Collects the unique artist id, this is needed for the second api call in events. It inserts the artist id into the events api url and brings up the list of events.
        }
      })
      this.setState({
        suggestions: cleanedUp //Stores the cleaned up Json data in the state.
      })
    }).catch(err => { //Catches any errors.
      console.log(err)

    });

  }


  render() { //Renders Search box from React-Select that has been imported

    return ( //Main search box.
      <div>
        <form className= 'mainsearch'>
          <Select className = 'searchBox'
            placeholder="Search Bandit"
            ref={input => this.search = input}
            onInputChange={this.handleInputChange} //Calls function to take input from the user.
            options={this.state.suggestions} //Takes data from the Array and displays it in the dropdown.
            onChange={(selected) => this.props.selectArtist(selected.value)} //Once the user has found an artist. They are able to call a function that brings the artist id into the events component.
          />
        </form>
      </div>
      )
    }
  }


export default App;
