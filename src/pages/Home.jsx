import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      fetch('http://localhost:3006/api/v1/movies')
        .then(res => res.json())
        .then(data => {
          setMovies(data)
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false)
        })
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <>

      <main>

        <div className="container">
          <div className="title-page mt-5">
            <h1 className="text-white fw-bolder">Best Movies ever</h1>
            <p className="text-white">The very best</p>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-3 mt-2">

            {
              movies?.map(movie => (
                <div className="col" key={`movie-${movie.id}`}>
                  <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }} >
                    <div className="card h-100 shadow">
                      <div className="card-header h-100">
                        <img className="card-img-top" src={`http://localhost:3006/images/${movie.image}`} alt={movie.title} />

                      </div>

                      <div className="card-body h-100">
                        <h2 className="fw-bolder">{movie.title}</h2>
                        <h5 className="fw-bold">{movie.director}</h5>
                        <p className="mt-5">{movie.abstract}</p>


                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }


          </div>
        </div>

      </main>

    </>


  )
}