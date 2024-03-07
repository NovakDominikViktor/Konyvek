import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

function KonyvekSinglePage() {
    const [book, setBook] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7017/Konyv/${id}`);
            const data = await response.json();
            setBook(data);
        } catch (error) {
            console.error("Error fetching book details:", error);
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card" style={{ width: '30%' }}>
                <img src={book.kepneve} className="card-img-top" alt={book.nev} style={{ width: '100%' }} />
                <div className="card-body">
                    <h5 className="card-title">{book.nev}</h5>
                    <p className="card-text">Kiadás éve: {book.kiadasEve}</p>
                    <p className="card-text">Értékelés: {book.ertekeles}</p>
                    <NavLink to={`/`} className="card-link">
                        <i className="bi bi-arrow-left"></i>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default KonyvekSinglePage;
