import React, { Component } from 'react'
import TripContainer from '../Trip/TripContainer'
import ShowTrip from '../Trip/ShowTrip'


export default class Body extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayEditTripForm: false,
      displayNewPostForm: false
    }
  }

  toggleEditTripForm = (tripToEdit) => {
    this.setState({
      displayEditTripForm: !this.state.displayEditTripForm,
      //TripIdToEdit: TripIdToEdit-1
    })
  }

  toggleNewPostForm =() => {
    this.setState({
      displayNewPostForm: !this.state.displayNewPostForm
    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.showTrip
          ? <ShowTrip
            trips={ this.props.trips }
            currentUserId={ this.props.currentUserId }
            />
          : <TripContainer
              trips={ this.props.trips }
              loggedIn={ this.props.loggedIn }
              getTrip={ this.props.getTrip }
              toggleEditTripForm={ this.toggleEditTripForm }
              togglePostForm={ this.togglePostForm }
            />
        }
      </React.Fragment>
    )
  }
}
