import { Injectable } from '@nestjs/common';
import {
  Film,
  PeopleResponse,
  Planet,
  Species,
  StarWarsPerson,
  Starship,
  Vehicle,
} from 'shared-types';
import { PeopleRequestDto } from 'dtos/peopleRequestDto';

const DEFAULT_ERROR_MESSAGE =
  'Yikes, we ran into some trouble. Try again, please';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPeople(params: PeopleRequestDto): Promise<StarWarsPerson[]> {
    const people = PeopleResponse.parse(
      await this.getData(`https://swapi.dev/api/people?page=${params.page}`),
    );

    return people.results;
  }

  async getPerson(id: string): Promise<StarWarsPerson> {
    const person = StarWarsPerson.parse(
      await this.getData(`https://swapi.dev/api/people/${id}`),
    );
    return person;
  }

  async getPersonSpecies(id: string): Promise<Species[]> {
    const person = StarWarsPerson.parse(
      await this.getData(`https://swapi.dev/api/people/${id}`),
    );

    return Promise.all(
      person.species.map(async (speciesUrl) =>
        Species.parse(await this.getData(speciesUrl)),
      ),
    );
  }
  async getPersonMovies(id: string): Promise<Film[]> {
    const person = StarWarsPerson.parse(
      await this.getData(`https://swapi.dev/api/people/${id}`),
    );

    return Promise.all(
      person.films.map(async (filmUrl) =>
        Film.parse(await this.getData(filmUrl)),
      ),
    );
  }

  async getPersonVehicles(id: string): Promise<Vehicle[]> {
    const person = StarWarsPerson.parse(
      await this.getData(`https://swapi.dev/api/people/${id}`),
    );

    return Promise.all(
      person.vehicles.map(async (vehicleUrl) =>
        Vehicle.parse(await this.getData(vehicleUrl)),
      ),
    );
  }

  async getPersonStarships(id: string): Promise<Starship[]> {
    const person = StarWarsPerson.parse(
      await this.getData(`https://swapi.dev/api/people/${id}`),
    );

    return Promise.all(
      person.starships.map(async (starshipUrl) =>
        Starship.parse(await this.getData(starshipUrl)),
      ),
    );
  }

  async getPersonHomeworld(id: string): Promise<Planet> {
    const person = StarWarsPerson.parse(
      await this.getData(`https://swapi.dev/api/people/${id}`),
    );

    return Planet.parse(await this.getData(person.homeworld));
  }

  private async getData(url: string): Promise<unknown> {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error(DEFAULT_ERROR_MESSAGE);
    }

    return response.json();
  }
}
