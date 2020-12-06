import './App.css'
import React, { Component } from 'react'
import Nav from './Nav'
import Body from './Body'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      trips: [],
      showTrip: false,
      currentUserId: ''
    }
  }

  componentDidMount() {
  }

  getTrips = async () => {
  try {
    const url = process.env.REACT_APP_API_URL + "/api/trips/all"
    console.log(url)
    const tripsResponse = await fetch(url)
    const tripsJson = await tripsResponse.json()
    this.setState({
      trips: tripsJson.data
    })
    console.log(this.state.trips)

    } catch(err) {
    console.log("ERROR RETRIEVING Trip DATA.", err)
    }
  }

  getTrip = async (idOfTrip) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/trips/" + idOfTrip
      console.log(url)
      const tripResponse = await fetch(url)
      const tripJson = await tripResponse.json()
      this.setState({
        trips: tripJson.data,
        showTrip: !this.state.showTrip
      })

      console.log(this.state.trips)

    } catch(err) {
      console.log("ERROR RETRIEVING Trip DATA.", err)
    }
  }

  getMyTrips = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/trips/"

      console.log(url)

      const tripsResponse = await fetch(url, { credentials: 'include' })

      const tripsJson = await tripsResponse.json()

      this.setState({
        trips: tripsJson.data,
        showTrip: !this.state.showTrip
      })

      console.log(this.state.trips)

    } catch(err) {
      console.log("Error getting trip data.", err)
    }
  }

  createTrip = async (tripToCreate) => {
    console.log(tripToCreate)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/trips/'

      console.log(url)
      console.log(JSON.stringify(tripToCreate))

      const createTripResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(tripToCreate),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      console.log(createTripResponse)

      const createTripJson = await createTripResponse.json()

      console.log(createTripJson)

      if (createTripResponse.status === 200 || createTripResponse.status === 201) {
        console.log('Trip CREATED')
        this.setState({
          trips: [...this.state.trips, createTripJson.data]
        })
      }
      this.getMyTrips()
    } catch(err) {
      console.log('ERROR CREATING Trip', err)
    }
  }

  updateTrip = async (updatedTripInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/trips/' + this.state.tripIdToEdit
      const updateTripResponse = await fetch(url, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(updatedTripInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const updateTripJson = await updateTripResponse.json()

      if(updateTripResponse.status === 200) {
        console.log('Trip UPDATED.')
        this.setState({
          trips: updateTripJson.data,
          tripIdToEdit: -1
        })
      }
      this.getMyTrips()
    } catch(err) {
      console.log('ERROR UPDATING Trip.', err)
    }
  }

  deleteTrip = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/trips/' + this.state.tripIdToDelete
      const deleteTripResponse = await fetch(url, {
        credentials: 'include',
        method: 'DELETE'
      })
      const deleteTripJson = await deleteTripResponse.json()

      if(deleteTripResponse.status === 200) {
        console.log('Trip DELETED.', deleteTripJson)
        this.setState({
          trips: [],
          showTrip: false
        })
      }
      this.getMyTrips()
    } catch(err) {
      console.log('ERROR DELETING Trip.', err)
    }
  }

  createUser = async (userToAdd) => {
    console.log(userToAdd)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/users/register'
      const createUserResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToAdd)
      })

      const createUserJson = await createUserResponse.json()
      if (createUserResponse.status === 200 || createUserResponse.status === 201) {
        console.log('CREATED USER', createUserJson.data)
      }
    } catch(err) {
      console.log('ERROR CREATING USER', err)
    }
  }

  loginUser = async (userToLogin) => {
    console.log(userToLogin)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/users/login'
      console.log(url)
      console.log(JSON.stringify(userToLogin))
      const loginUserResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userToLogin),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      console.log(loginUserResponse)
      const loginUserJson = await loginUserResponse.json()
      console.log(loginUserJson)
      console.log(loginUserJson.data.id)
      if (loginUserResponse.status === 200 || loginUserResponse.status === 201) {
        console.log('USER LOGGED IN')
        this.setState({
          loggedIn: !this.state.loggedIn,
          currentUserId: loginUserJson.data.id
        })
      }
      this.getTrips()
    } catch(err) {
      console.log('ERROR LOGGING IN', err)
    }
  }


  logoutUser = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/users/logout"
      const logoutResponse = await fetch(url, {
        credentials: 'include'
      })
      const logoutJson = await logoutResponse.json()
      if(logoutResponse.status === 200) {
        this.setState({
          loggedIn: !this.state.loggedIn
        })
      }
    } catch(err) {
      console.error("ERROR LOGGING OUT", err)
    }
  }



  render() {
    return (
      <div className='App'>
        <Nav
          loggedIn={ this.state.loggedIn }
          createTrip={ this.createTrip }
          createUser={ this.createUser }
          loginUser={ this.loginUser }
          logoutUser={ this.logoutUser }
        />
        <Body
          trips={ this.state.trips }
          showTrip={ this.state.showTrip }
          loggedIn={ this.state.loggedIn }
          currentUserId={ this.state.currentUserId }

          getTrip={ this.getTrip }
          editTrip={ this.editTrip }
        />
      </div>
    )
  }
}
