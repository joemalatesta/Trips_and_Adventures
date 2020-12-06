import React from 'react'
import { Card } from 'semantic-ui-react'

export default function TripCard(props) {

  const trips = props.trips.map(trip => {
    return (
      <Card key={ trip.id } onClick={ () => props.getTrip(trip.id) }>
        <Card.Content>
          <Card.Header>{ trip.trip_name }</Card.Header>
          <Card.Meta>{ trip.trip_date }</Card.Meta>
          <Card.Description>{ trip.about_trip }</Card.Description>
        </Card.Content>
      </Card>
    )
  })

  return (
    <Card.Group centered={ true }>
      { trips }
    </Card.Group>
  )
}
