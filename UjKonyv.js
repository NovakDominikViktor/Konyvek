import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UjKonyvFelvetel() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nev: "",
        kiadasEve: "",
        ertekeles: "",
        kepneve: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://localhost:5001/Konyv", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.text();
                alert(data);
                navigate("/");
            } else {
                const errorData = await response.text();
                alert(`Hiba történt az adatok tárolása során: ${errorData}`);
            }
        } catch (error) {
            console.error("Hiba történt az adatok tárolása során:", error);
        }
    };
    

    return (
        <div className="container">
            <h2>Új könyv felvétele</h2>
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
                <button type="submit" className="btn btn-primary">Könyv felvétele</button>
                <Link to="/" className="btn btn-secondary ms-2">Vissza</Link>
            </form>
        </div>
    );
}

export default UjKonyvFelvetel;
