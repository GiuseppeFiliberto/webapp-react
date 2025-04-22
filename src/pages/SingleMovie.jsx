import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReviewForm from "../components/ReviewForm"

export default function SingleMovie() {
  const [movie, setMovie] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:3006/api/v1/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data)
      })
  }, [id])

  const handleReviewAdded = (newReview) => {
    setMovie(prev => ({
      ...prev,
      review: [...(prev.review || []), newReview]
    }))
  }

  if (!movie) {
    return <p>Wait for this movie to be loaded</p>
  }
  return (
    <>
      <main>


        <div className="container p-5 mb-4">
          <div className="container-fluid py-5 d-flex justify-content-center rounded-3 shadow bg-light">
            <div className="row p-5">
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



        <div className="container">
          <h3 className="mb-3 fw-bolder">Recensioni</h3>
          <div className="row row-cols-1 g-3">
            {(movie.reviews && movie.reviews.length > 0) ? movie.reviews.map((reviews, index) => (
              <div key={`reviews-${index}`} className="col">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center justify-content-between gap-2">
                    <div className="user">
                      <h5 >Username</h5>
                      <div>{reviews.name}</div>
                    </div>

                    <div className="vote">
                      <h5>Vote</h5>
                      <div>{(() => {
                        const stars = []
                        for (let i = 1; i <= 5; i++) {
                          stars.push(
                            <i
                              key={i}
                              className={`bi ${i <= reviews.vote ? 'bi-star-fill text-warning' : 'bi-star text-muted'}`}
                            ></i>
                          )
                        }
                        return <div>{stars}</div>
                      })()}</div>
                    </div>

                  </div>
                  <div className="card-body">
                    <p>{reviews.text}</p>
                  </div>
                  <div className="card-footer">
                    <div>Reviewed on: {new Date(reviews.created_at).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col">
                <div className="alert alert-info">Nessuna recensione presente per questo film.</div>
              </div>
            )}
          </div>

          <h3 className="my-5 fw-bolder">Aggiungi una recensione</h3>

          <div className="container mb-5">
            <ReviewForm movieId={id} onReviewAdded={handleReviewAdded} />
          </div>

        </div>



      </main>
    </>
  )
}