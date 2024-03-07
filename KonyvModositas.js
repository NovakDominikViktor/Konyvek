import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

function KonyModositas() {
    const [formData, setFormData] = useState({
        nev: "",
        kiadasEve: "",
        ertekeles: "",
        kepneve: ""
    });

    const { id } = useParams();
    const navigate = useNavigate(); // Hook a navigációhoz

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7017/Konyv/${id}`);
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error("Error fetching book details:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7017/Konyv/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log("Book successfully updated.");
                navigate('/'); // Visszanavigálás a főoldalra
            } else {
                console.error("Error updating book.");
            }
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <div className="container">
            <h2>Módosítás: {formData.nev}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nev" className="form-label">Név:</label>
                    <input type="text" className="form-control" id="nev" name="nev" value={formData.nev} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="kiadasEve" className="form-label">Kiadás éve:</label>
                    <input type="number" className="form-control" id="kiadasEve" name="kiadasEve" value={formData.kiadasEve} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="ertekeles" className="form-label">Értékelés:</label>
                    <input type="number" className="form-control" id="ertekeles" name="ertekeles" value={formData.ertekeles} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="kepneve" className="form-label">Képneve:</label>
                    <input type="text" className="form-control" id="kepneve" name="kepneve" value={formData.kepneve} onChange={handleChange} required />
                </div>
                <NavLink to={`/`} className="card-link">
                    <i className="bi bi-arrow-left"></i>
                </NavLink>
                <span style={{ marginRight: "10px" }}></span>
                <button type="submit" className="btn btn-primary">Mentés</button>
            </form>
        </div>
    );
}

export default KonyModositas;
