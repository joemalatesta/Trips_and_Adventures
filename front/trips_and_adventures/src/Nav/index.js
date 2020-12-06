import React, {Component} from 'react'
import { Menu } from 'semantic-ui-react'
import LoginUserForm from '../LoginUserForm'
import NewUserForm from '../NewUserForm'
import NewTripForm from '../NewTripForm'
import TitlePage from '../TitlePage'


export default class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayTitleScreen: true,
      displayLoginUserForm: false,
      displayRegisterUserForm: false,
      displayCreateTripForm: false
    }
  }

  toggleTitleScreen = () => {
    this.setState({
      displayTitleScreen: !this.state.displayTitleScreen
    })
  }

  toggleLoginUserForm = () => {
    this.setState({
      displayLoginUserForm: !this.state.displayLoginUserForm
    })
  }

  toggleRegisterUserForm = () => {
    this.setState({
      displayRegisterUserForm: !this.state.displayRegisterUserForm
    })
  }

  toggleCreateTripForm = () => {
    this.setState({
      displayCreateTripForm: !this.state.displayCreateTripForm
    })
  }

  render() {
    return (
      <Menu pointing secondary>
        {
          this.props.loggedIn
            ?
            <React.Fragment>
              <Menu.Item icon='box' name='All Trips' onClick={this.props.getTrips} />
              <Menu.Item icon='map' name='My Trips' onClick={this.props.getMyTrips} />
              <Menu.Item icon='edit' name='New Trip' onClick={this.toggleCreateTripForm} />
              <Menu.Item icon='sign-out' name='Log Out' position='right' onClick={this.props.logoutUser} />
            </React.Fragment>
            :
            <React.Fragment>
              <Menu.Item icon='sign-in' name='Log In' position='right' onClick={this.toggleLoginUserForm}/>
              <Menu.Item icon='compass' name='Register' onClick={this.toggleRegisterUserForm}/>
            </React.Fragment>
        }
        {
          this.state.displayLoginUserForm
          && <LoginUserForm
            loginUser={this.props.loginUser}
            toggleLoginUserForm={this.toggleLoginUserForm}
            displayLoginUserForm={this.state.displayLoginUserForm}
          />
        }
        {
          this.state.displayRegisterUserForm
          && <NewUserForm
            createUser={this.props.createUser}
            toggleRegisterUserForm={this.toggleRegisterUserForm}
            displayRegisterUserForm={this.state.displayRegisterUserForm}
          />
        }
        {
          this.state.displayCreateTripForm
          && <NewTripForm
            createTrip={this.props.createTrip}
            toggleCreateTripForm={this.toggleCreateTripForm}
            displayCreateTripForm={this.state.displayCreateTripForm}
          />
        }
        {
          this.state.displayTitleScreen
          && <TitlePage
            titlePage={this.props.showTitlePage}
            toggleTitleScreen={this.toggleTitleScreen}
            displayTitleScreen={this.state.displayTitleScreen}
          />
        }
      </Menu>
    )
  }
}
