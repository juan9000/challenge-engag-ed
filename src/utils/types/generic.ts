export type FilterCharacter = {
  name?: string
}

export type CharacterLocation = {
  id?: string
  name?: string
  type?: string
  dimension?: string
}

export type CharactersResult = {
  id?: string
  name?: string
  status?: string
  location?: Location
  image?: string
}