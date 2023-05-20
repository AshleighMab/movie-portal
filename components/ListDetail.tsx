import * as React from 'react'

import { IMovie } from '../providers/movies/context'

type ListDetailProps = {
  item: IMovie
}

const ListDetail = ({ item: movie }: ListDetailProps) => (
  <div>
    <h1>Detail for {movie.title}</h1>
    <p>ID: {movie.id}</p>
  </div>
)

export default ListDetail
