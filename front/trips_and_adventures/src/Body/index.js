import React, { Component } from 'react'
import TripContainer from '../TripContainer'
import ShowTrip from '../ShowTrip'


export default class Body extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayEditTripForm: false
    }
  }

  toggleEditTripForm = (tripToEdit) => {
    this.setState({
      displayEditTripForm: !this.state.displayEditTripForm,
      // TripIdToEdit: TripToEdit-1
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
            />
        }
      </React.Fragment>
    )
  }
}
