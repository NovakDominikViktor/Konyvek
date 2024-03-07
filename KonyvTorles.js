import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

function KonyTorles() {
    const [book, setBook] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:5001/Konyv/${id}`);
            const data = await response.json();
            setBook(data);
        } catch (error) {
            console.error("Error fetching book details:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://localhost:5001/Konyv/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Book successfully deleted.");
                navigate('/'); 
            } else {
                console.error("Error deleting book.");
            }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card" style={{ width: '30%' }}>
                <img src={book.kepneve} className="card-img-top" alt={book.nev} />
                <div className="card-body">
                    <h5 className="card-title">{book.nev}</h5>
                    <p className="card-text">Kiadás éve: {book.kiadasEve}</p>
                    <p className="card-text">Értékelés: {book.ertekeles}</p>
                    <NavLink to={`/`} className="card-link">
                    <i className="bi bi-arrow-left"></i>
                    </NavLink>
                <   span style={{ marginRight: "10px" }}></span>
                    <button onClick={handleDelete} className="btn btn-danger">Törlés</button>
                </div>
            </div>
        </div>
    );
}

export default KonyTorles;
