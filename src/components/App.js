import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
import { getByID } from '../data/pets'
import { getAll } from '../data/pets'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateType = (type) => {
    this.setState({
      filters: { ...this.state.filters, type: type }
    })
  }

  retrievePets = () => {
    let URL 
    if (this.state.filters.type === 'all')
      URL = '/api/pets'
    else
      URL = `/api/pets?type=${this.state.filters.type}`
      fetch(URL)
        .then(resp => resp.json())
        .then(allPets => this.setState({
          pets: allPets
        }));
  }

  adoptPet = id => {
    const pet = getByID(id)
    const pets = this.state.pets
    const indx = pets.findIndex(p => p.id === pet.id)
    pet.isAdopted = true
    pets[indx] = pet
    this.setState({
      pets: pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={(type) => this.updateType(type)}
                onFindPetsClick={this.retrievePets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
