export type FilterCharacter = {
  name?: string
}

export type CharacterLocation = {
  id?: string
  name?: string
  type?: string
  dimension?: string
}

export type Episode = {
  id?: string
  name?: string
  air_date?: string
  episode?: string
}

export type Character = {
  id?: string
  name?: string
  status?: string
  species?: string
  type?: string
  gender?: string
  origin?: CharacterLocation
  location?: CharacterLocation
  image?: string
  episode?: Array<Episode>
}