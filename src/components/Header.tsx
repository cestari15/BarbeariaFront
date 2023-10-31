import React from 'react';

import styles from "./HeaderCliente.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className="navbar bg-body-tertiarynavbar  bg-body-tertiary border-bottom border-body" data-bs-theme="">
                <div className="container-fluid">
                    <a className="navbar-brand">Clientes</a>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" />
                        <button className="botao type1" type='submit'>
                            <span className="btn-txt">Pesquisar</span>
                        </button>
                    </form>
                </div>
            </nav>
        </header>
    );
}

export default Header;