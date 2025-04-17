import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function SingleMovie() {
  const [movie, setMovie] = useState({})
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:3006/api/v1/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data)
      })
  }, [id])

  if (!movie) {
    return <p>Wait for this movie to be loaded</p>
  }
  return (
    <>
      <main>


        <div className="p-5 mb-4 bg-light">
          <div className="container-fluid py-5 d-flex justify-content-center">
            <div className="row">
              <div className="col-8 d-flex flex-column justify-content-center">
                <h1 className="display-5 fw-bold">{movie?.title}</h1>
                <p className="col-md-8 fs-4">
                  {movie?.abstract}
                </p>

                <span>Director: {movie.director}</span>
              </div>

              <img className="col-4" src={`http://localhost:3006/images/${movie?.image}`} alt="" />
            </div>
          </div>
        </div>





      </main>
    </>
  )
}