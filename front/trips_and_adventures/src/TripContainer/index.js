import React from 'react'
import TripCard from '../TripCard'

export default function TripContainer(props) {
  return (
    <TripCard
      trips={ props.trips }
      loggedIn={ props.loggedIn }
      getTrip={ props.getTrip }
      toggleEditTripForm={ props.toggleEditTripForm }
    />
  )
}
