import React from 'react';
import {Form, Table, Header, Grid, Divider} from 'semantic-ui-react';
import axios from 'axios';
import CityCost from './CityCost'

const cities = [
  'Sandy',
  'Draper',
  'SLC',
  'Orem',
  'Provo',
  'Ogden',
  'Layton',
  'Midvale',
  'Murray'
]

const options = cities.map(c => {return {key: c, text: c, value: c}})

class Cities extends React.Component {
  state = {city: null, properties: [], page: 1, total_pages: 0}

  handleChange = (e, {value}) => {
    this.setState({city: value, properties: []}, () => {
      this.getProperties();
    });
  }

  getProperties = () => {
    const {city, properties, page} = this.state;
    axios.get(`/api/cities/${city}?page=${page}`)
      .then(res => {
        const {properties, total_pages} = res.data;
        this.setState({
          properties: [...this.state.properties, ...properties],
          total_pages,
          page: page + 1
        })
      });
  }

  render() {
    const {page, total_pages, properties, city} = this.state;
    return (
      <Grid centered>
        <Divider hidden />
        <Grid.Row>
          <Grid.Column width={6}>
            <Form.Select options={options} onChange={this.handleChange} />
            <Divider hidden />
            <CityCost />
          </Grid.Column>
          <Grid.Column width={10}>
            <Header>Homes in {city}</Header>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Beds</Table.HeaderCell>
                  <Table.HeaderCell>Baths</Table.HeaderCell>
                  <Table.HeaderCell>Sq. Ft.</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {properties.map(p =>
                  <Table.Row key={p.id}>
                    <Table.Cell>${p.price}</Table.Cell>
                    <Table.Cell>{p.beds}</Table.Cell>
                    <Table.Cell>{p.baths}</Table.Cell>
                    <Table.Cell>{p.sq_ft}</Table.Cell>
                  </Table.Row>
                )
                }
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Cities;