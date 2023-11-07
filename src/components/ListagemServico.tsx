import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

import styles from "../App.module.css";

import { ServicoCadastroInterface } from "../interfaces/ServicoCadastroInterface";
import { Link } from "react-router-dom";

const ListagemServico = () => {
    console.log(Response)
    const [servico, setServico] = useState<ServicoCadastroInterface[]>([]);
    const [error, setError] = useState("");
    const [pesquisa, setPesquisa] = useState<string>('');

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/servico/nome',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(function (response) {
                    if (true == response.data.status) {
                        setServico(response.data.data)
                    }
                }).catch(function (error) {
                    console.log(error)
                });

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }

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
    }, [])

    return (



        <div className='col-md-10 '>
            <div className='col-md mb-3'>
                <div className='card'>
                    <div className='card-body'>

                        <h5 className='card-title'>
                            Pesquisar por nome
                        </h5>
                        <form onSubmit={buscar} className='row'>
                            <div className='col-10'>
                                <input type="text" name='pesquisa' className='form-control'
                                    onChange={handleState} />

                            </div>
                            <div className='col-1'>
                                <button className="botao type1" type='submit'>
                                    <span className="btn-txt">Pesquisar</span>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>




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
                                                <Link to={"/editarServico/" + servico.id} className='btn btn-primary btn-sm'>Editar</Link>
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