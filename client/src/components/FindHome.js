import React from 'react';
import axios from 'axios';
import {Form, Grid} from 'semantic-ui-react';

class FindHome extends React.Component {
  state = {
    agents: [],
    agent: null,
    buyers: [],
    buyer: null,
    properties: []
  }

  componentDidMount() {
    axios.get('/api/agents')
      .then(res => this.setState({agents: res.data}))
  }

  agentList = () => {
    const {agents} = this.state;
    let options = [
      {key: 0, text: 'Unselect', value: 0}
    ]
    let agentOptions = agents.map(agent => {
      return {
        key: agent.id,
        text: `${agent.first_name} ${agent.last_name}`,
        value: agent.id
      }
    });
    return [...options, ...agentOptions]
  }

  buyerList = () => {
    const {buyers} = this.state;
    return buyers.map(buyer => {
      return {
        key: buyer.id,
        text: `${buyer.first_name} ${buyer.last_name}`,
        value: buyer.id
      }
    })
  }

  getBuyers = (e, {value}) => {
    this.setState({agent: value}, () => {
      axios.get(`/api/agents/${this.state.agent}`)
        .then(res => this.setState({buyers: res.data}))
    });
  }

  getProperties = (e, {value}) => {
    this.setState({buyer: value}, () => {
      axios.get(`/api/buyers/${this.state.buyer}`)
        .then(res => this.setState({properties: res.data}))
    });
  }

  showProperties = () => {
    const {properties} = this.state;
    return properties.map(p =>
      <List key={p.id}>
        <List.Content>
          <List.Header>${p.price} - {p.sq_ft}</List.Header>
          <List.Description>{p.city}</List.Description>
        </List.Content>
      </List>
    )
  }

  render() {
    const {properties, agent} = this.state;
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={6}>
            <Form.Select
              fluid
              label="Agent:"
              placeholder="Agent"
              options={this.agentList()}
              onChange={this.getBuyers}
            />
            {this.state.agent &&
              <Form.Select
                fluid
                placeholder='Buyer'
                label="Buyer:"
                options={this.buyerList()}
                onChange={this.getProperties}
              />
            }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>
            {properties.length > 0 && this.showProperties()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default FindHome