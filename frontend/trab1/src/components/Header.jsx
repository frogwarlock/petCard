import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const isHome = location.pathname === "/";
  
    return (
      <header className="bg-purple-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold" > <a href="/">PetCard</a> </h1>
  
        {isHome ? (
          <Link
            to="/novo"
            className="bg-white text-purple-800 px-4 py-2 rounded hover:bg-gray-200 font-medium"
          >
            + Novo Pet
          </Link>
        ) : (
          <Link
            to="/"
            className="bg-white text-purple-800 px-4 py-2 rounded hover:bg-gray-200 font-medium"
          >
            ← Meus Pets
          </Link>
        )}
      </header>
    );
  }
  