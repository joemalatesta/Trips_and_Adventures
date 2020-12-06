import React, { Component } from 'react'
import { Button, Form, Grid, Modal, Image } from 'semantic-ui-react'

export default class TitlePage extends Component {


  render() {
    return (
      <Modal
        as={Form}
        open={this.props.displayTitleScreen}
        onSubmit={this.handleSubmit}
      >
        <Modal.Header>This is Trips and Adventures Page</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src="https://previews.123rf.com/images/fpwing/fpwing1611/fpwing161100121/66833965-mountain-trails-three-peaks-lavaredo.jpg" wrapped />
          <Modal.Description>
            <Grid columns={1}>
              <Grid.Column>
                <h1>Blah blah blab </h1>

              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.props.toggleTitleScreen}>View the posts</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
