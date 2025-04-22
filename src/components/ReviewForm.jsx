import { useState } from "react"

export default function ReviewForm({ movieId, onReviewAdded }) {
    const [form, setForm] = useState({ name: "", text: "", vote: 1 })

    const handleChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3006/api/v1/movies/${movieId}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        const newReview = await res.json()
        if (res.ok) {
            onReviewAdded(newReview)
            setForm({ name: "", text: "", vote: 1 })
        }
    }

    return (

        <div className="form-container bg-light p-4 rounded-3 shadow my-5">
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <label className="form-label">Nome</label>
                    <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label className="form-label">Recensione</label>
                    <textarea name="text" className="form-control" value={form.text} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label className="form-label">Voto</label>
                    <select name="vote" className="form-select" value={form.vote} onChange={handleChange}>
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">Invia recensione</button>
            </form>
        </div>

    )
}
