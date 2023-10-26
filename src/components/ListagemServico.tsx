import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

import styles from "../App.module.css";

import { ServicoCadastroInterface } from "../interfaces/ServicoCadastroInterface";

const ListagemServico = () => {
    console.log(Response)
    const [servico, setServico] = useState<ServicoCadastroInterface[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/servico/all');
                setServico(response.data.data);
            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error)
            }
        }
        fetchData();
    },[])

    return (
        <div>
        <main className={styles.main}>
            <div className='container'>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'> Listagem de Serviços</h5>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Duração</th>
                                    <th>Preço</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servico.map(servico => (
                                    <tr key={servico.id}>
                                        <td>{servico.id}</td>
                                        <td>{servico.nome}</td>
                                        <td>{servico.duracao}</td>
                                        <td>{servico.preco}</td>
                                        <td>
                                            <a href="#" className='btn btn-primary btn-sm'>Editar</a>
                                            <a href="#" className='btn btn-danger btn-sm'>Excluir</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
    );
}

export default ListagemServico;