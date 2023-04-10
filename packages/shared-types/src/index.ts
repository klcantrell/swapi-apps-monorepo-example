import { z } from 'zod';

export const StarWarsPerson = z.object({
  name: z.string(),
  url: z.string(),
  films: z.array(z.string()),
  species: z.array(z.string()),
  vehicles: z.array(z.string()),
  starships: z.array(z.string()),
  homeworld: z.string(),
})

export type StarWarsPerson = z.infer<typeof StarWarsPerson>;

export const StarWarsPeople = z.array(StarWarsPerson);

export type StarWarsPeople = z.infer<typeof StarWarsPeople>

export const PeopleResponse = z.object({
  results: z.array(StarWarsPerson),
});

export type PeopleResponse = z.infer<typeof PeopleResponse>;

export const Film = z.object({
  title: z.string(),
})

export type Film = z.infer<typeof Film>;

export const Vehicle = z.object({
  name: z.string(),
});

export type Vehicle = z.infer<typeof Vehicle>;

export const Starship = z.object({
  name: z.string(),
});

export type Starship = z.infer<typeof Starship>;

export const Species = z.object({
  name: z.string(),
});

export type Species = z.infer<typeof Species>;

export const Planet = z.object({
  name: z.string(),
});

export type Planet = z.infer<typeof Planet>;

export function getPersonIdFromUrl(url: string) {
  return url.replace('https://swapi.dev/api/people/', '').replace('/', '');
}
