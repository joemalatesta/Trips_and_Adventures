import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import EditTripForm from '../EditTripForm'

export default class ShowTrip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayEditTripForm: false
    }
  }

  toggleEditTripForm = () => {
    this.setState({
      displayEditTripForm: !this.state.displayEditTripForm
    })
  }

  render() {
    return (
      <React.Fragment>
        <Card key={this.props.trips.id}  raised={true} color={'blue'} centered={true}>
          <Card.Content>
            <Card.Header>{this.props.trips.trip_name}</Card.Header>
            <Card.Meta>{this.props.trips.trip_date}</Card.Meta>
            <Card.Description>{this.props.trips.about_trip}</Card.Description>
            {
              this.props.trips.user.id === this.props.currentUserId
              &&
                <React.Fragment>
                  <Button onClick={this.props.deleteTrip}>DELETE</Button>
                  <Button onClick={this.toggleEditTripForm}>EDIT</Button>
                </React.Fragment>
            }
          </Card.Content>
        </Card>
        {
          this.state.displayEditTripForm
          && <EditTripForm
                trips={this.props.trips}
                displayEditTripForm={this.state.displayEditTripForm}
                toggleEditTripForm={this.toggleEditTripForm}
                updateTrip={this.props.updateTrip}
              />
        }
      </React.Fragment>
    )
  }
}
