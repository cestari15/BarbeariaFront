import React from 'react';

import styles from "./HeaderCliente.module.css";

const HeaderServico = () => {
    return (
        <header className={styles.header}>
            <nav className="navbar bg-body-tertiarynavbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Serviços</a>
                    <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </header>
    );
}

export default HeaderServico;