import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


function KonyvekList() {
    const [konyvek, setKonyvek] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://localhost:5001/Konyv")
            .then((response) => response.json())
            .then((konyvek) => setKonyvek(konyvek))
            .catch((error) => console.log(error));
    };

    return (
        <div className="container">
            <div className="row">
                {konyvek.map((konyv) => (
                    <div key={konyv.id} className="col-md-4 mb-3">
                        <NavLink to={`/Konyv/${konyv.id}`} className="card-link">
                            <div className="card">
                                <img src={konyv.kepneve} className="card-img-top" alt={konyv.nev} />
                                <div className="card-body">
                                    <h5 className="card-title">{konyv.nev}</h5>
                                    <p className="card-text">Kiadás éve: {konyv.kiadasEve}</p>
                                    <p className="card-text">Értékelés: {konyv.ertekeles}</p>
                                </div>
                            </div>
                        </NavLink>
                        <div className="mt-2">
                        <NavLink to={`/modosit/${konyv.id}`} className="card-link text-warning">
                            <i className="bi bi-pencil-square mx-1"></i>Módosítás
                        </NavLink>
                        <NavLink to={`/torol/${konyv.id}`} className="card-link text-danger">
                            <i className="bi bi-trash3 mx-1"></i>Törlés
                        </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default KonyvekList;