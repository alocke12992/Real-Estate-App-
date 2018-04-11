import React from 'react';
import axios from 'axios';
import {List, Header, Table} from 'semantic-ui-react';

class Available extends React.Component {
  state = {agents: []}

  componentDidMount() {
    axios.get('/api/properties')
      .then(res => {
        let agents = [];
        let {data} = res;
        let ids = [...new Set(data.map(d => d.agent_id))]
        ids.map(id => {
          let properties = data.filter(d => d.agent_id === id);
          let {agent_id, first_name, last_name, email, phone} = properties[0];
          let agentProperties = properties.map(p => {
            let {price, beds, baths, sq_ft, city, street, zip, id} = p
            return {price, beds, baths, sq_ft, city, street, zip, id}
          });

          let detail = {agent_id, first_name, last_name, email, phone, properties: agentProperties}

          agents.push(detail)
        });

        this.setState({agents});
      });
  }

  render() {
    const {agents} = this.state;
    return (
      <List>
        {agents.map(agent => {
          let {agent_id, first_name, last_name, email, phone, properties} = agent;
          return (
            <List.Item key={agent_id}>
              <List.Header>{first_name} {last_name} - {email}</List.Header>
              <List.Item>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                      <Table.HeaderCell>Beds</Table.HeaderCell>
                      <Table.HeaderCell>Baths</Table.HeaderCell>
                      <Table.HeaderCell>Sq. Ft.</Table.HeaderCell>
                      <Table.HeaderCell>Street</Table.HeaderCell>
                      <Table.HeaderCell>City</Table.HeaderCell>
                      <Table.HeaderCell>ZIP</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {properties.map(p =>
                      <Table.Row key={p.id}>
                        <Table.Cell>${p.price}</Table.Cell>
                        <Table.Cell>{p.beds}</Table.Cell>
                        <Table.Cell>{p.baths}</Table.Cell>
                        <Table.Cell>{p.sq_ft}</Table.Cell>
                        <Table.Cell>{p.street}</Table.Cell>
                        <Table.Cell>{p.city}</Table.Cell>
                        <Table.Cell>{p.zip}</Table.Cell>
                      </Table.Row>
                    )
                    }
                  </Table.Body>
                </Table>
              </List.Item>
            </List.Item>
          )
        })
        }
      </List>
    )
  }

}

export default Available