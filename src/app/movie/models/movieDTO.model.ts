export interface MovieDTO {
  Title?: string;
  Year?: string;
  imdbID?: string;
  Type?: string;
  Poster?: string;
}

export interface MoviesDTO {
  Search?: MovieDTO[];
  totalResults?: string;
}

export const isMovieDTOValid = (moviesDTO: MoviesDTO): boolean => {
  // tslint:disable-next-line: no-string-literal
  return moviesDTO !== null && !('Error' in moviesDTO);
};
