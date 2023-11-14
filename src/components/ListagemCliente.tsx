import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Header from './Header';

import styles from "../App.module.css";
import '../components/style.css'
import { CLienteCadastroInterface } from '../interfaces/ClienteCadastroInterface';
import { Link, useNavigate } from 'react-router-dom';

const ListagemClientes = () => {



    const [cliente, setCliente] = useState<CLienteCadastroInterface[]>([]);
    const [error, setError] = useState("");
    const [pesquisa, setPesquisa] = useState<string>('');
    const navigate = useNavigate();



    function handleDelete(id: number) {
        const confirm = window.confirm('Você tem certeza que deseja excluir?');
        if (confirm)
            axios.delete('http://127.0.0.1:8000/api/cliente/delete/' + id)
                .then(function (response) {
                    window.location.href = "/cliente/listagem"
                }).catch(function (error) {
                    console.log('Ocorreu um erro ao excluir');
                })
    }


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }
    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/cliente/nome',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(function (response) {
                    if (true == response.data.status) {
                        setCliente(response.data.data)
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
                const response = await axios.get('http://127.0.0.1:8000/api/cliente/retornarTodos');
                setCliente(response.data.data);


            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (

        <div className=''>


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





            </div>
            <main className={styles.main}>
                <div className='container mw-100 w-auto'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'> Listagem de Clientes</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Celular</th>
                                        <th>E-mail</th>
                                        <th>CPF</th>
                                        <th>Data de Nascimento</th>
                                        <th>Cidade</th>
                                        <th>Pais</th>
                                        <th>Rua</th>
                                        <th>Numero</th>
                                        <th>Bairro</th>
                                        <th>CEP</th>
                                        <th>Estado</th>
                                        <th>Complemento</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cliente.map(cliente => (
                                        <tr key={cliente.id}>
                                            <td>{cliente.id}</td>
                                            <td>{cliente.nome}</td>
                                            <td>{cliente.celular}</td>
                                            <td>{cliente.email}</td>
                                            <td>{cliente.cpf}</td>
                                            <td>{cliente.dataNascimento}</td>
                                            <td>{cliente.cidade}</td>
                                            <td>{cliente.pais}</td>
                                            <td>{cliente.rua}</td>
                                            <td>{cliente.numero}</td>
                                            <td>{cliente.bairro}</td>
                                            <td>{cliente.cep}</td>
                                            <td>{cliente.estado}</td>
                                            <td>{cliente.complemento}</td>
                                            <td>
                                                <Link to={"/editarCliente/" + cliente.id} className='btn btn-primary btn-sm'>Editar</Link>
                                                <a onClick={e => handleDelete(cliente.id)} className='btn btn-danger btn-sm'>Excluir</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
}

export default ListagemClientes;