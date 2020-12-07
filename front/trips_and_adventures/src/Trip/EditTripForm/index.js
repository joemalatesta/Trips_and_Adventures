import React, { Component } from 'react'
import { Button, Form, Header, Image, Label, Modal } from 'semantic-ui-react'
import ShowTrip from '../ShowTrip'
export default class EditTripForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      trip_name: props.trips[props.tripIdToEdit].trip_name,
      trip_date: props.trips[props.tripIdToEdit].trip_date,
      about_trip: props.trips[props.tripIdToEdit].about_trip
    }
    console.log(props.trips[props.tripIdToEdit])
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDropChange = (event, data) => {
    this.setState({
      status: data.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.editTrip(this.state)
    this.props.toggleEditTripForm()

    this.setState({
      trip_name: '',
      trip_date: '',
      about_trip: ''
    })
  }

  render() {


    return (
      <Modal
        as={ Form }
        open={ this.props.displayEditTripForm }
        onSubmit={ this.handleSubmit }
      >
        <Modal.Header>Edit Trip Listing</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src="https://t4.ftcdn.net/jpg/02/11/73/73/360_F_211737333_nxBcIVfrybNy6nRiewn9Ynh20UJQCfSp.jpg" wrapped />
          <Modal.Description>
            <Header>Enter Trip Listing Information</Header>
            <Label>Trip Name:</Label>
              <Form.Input
                type="text"
                name="trip_name"
                value={ this.state.trip_name }
                onChange={ this.handleChange }
              />
              <Label>Date of Trip:</Label>
              <Form.Input
                type="text"
                name="trip_date"
                value={ this.state.trip_date }
                onChange={ this.handleChange }
              />
              <Label>About the Trip:</Label>
              <Form.Input
                type="text"
                name="about_trip"
                value={ this.state.about_trip }
                onChange={ this.handleChange }
              />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={ this.props.toggleEditTripForm }>Cancel</Button>
          <Button
            content="Create Trip Listing"
            labelPosition="right"
            icon="checkmark"
            type="Submit"
            positive
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
