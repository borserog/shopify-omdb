import { MoviesDTO } from './movieDTO.model';

export interface MovieItem {
  imdbId: string;
  title: string;
  year: string;
  poster: string;
}

export interface MovieItems {
  movies: MovieItem[];
  totalMovies: number;
}

export const emptyMovieItems: MovieItems = {
  movies: [],
  totalMovies: 0
};

export const mapMoviesDtoToItems = (moviesDto: MoviesDTO): MovieItems => {
  const movies = moviesDto.Search.reduce((acc, movieDto) => {
    return [
      ...acc,
      {
        title: movieDto.Title,
        year: movieDto.Year,
        poster: movieDto.Poster,
        imdbId: movieDto.imdbID
      }
    ];
  }, [] as MovieItem[]);

  return {
    movies,
    totalMovies: Number(moviesDto.totalResults)
  };
};
