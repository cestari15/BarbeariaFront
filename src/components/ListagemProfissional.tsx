import axios from "axios";
import React,{Component, useState, ChangeEvent, FormEvent, useEffect} from "react";


import styles from "../App.module.css";

import {ProfissionalCadastroInterface} from '../interfaces/ProfissionalCadastroInterface';
import { Link } from "react-router-dom";

const ListagemProfissional = ()=>{
    console.log(Response)

    const [profissional,setProfissional]=useState<ProfissionalCadastroInterface[]>([]);
    const [error,setError]=useState("");

    useEffect(() =>{
        async function fetchData(){
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/profissional/retornarTodos');
                setProfissional(response.data.data)
            } catch (error){
                setError("Ocorreu um erro");
                console.log(error);
            }
        }

        fetchData();
    },[]);

    return (
        <div>
        <main className={styles.main}>
            <div className='container'>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'> Listagem de Profissionais</h5>
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
                                    <th>Salario</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profissional.map(profissional => (
                                    <tr key={profissional.id}>
                                        <td>{profissional.id}</td>
                                        <td>{profissional.nome}</td>
                                        <td>{profissional.celular}</td>
                                        <td>{profissional.email}</td>
                                        <td>{profissional.cpf}</td>
                                        <td>{profissional.dataNascimento}</td>
                                        <td>{profissional.cidade}</td>
                                        <td>{profissional.pais}</td>
                                        <td>{profissional.rua}</td>
                                        <td>{profissional.numero}</td>
                                        <td>{profissional.bairro}</td>
                                        <td>{profissional.cep}</td>
                                        <td>{profissional.estado}</td>
                                        <td>{profissional.salario}</td>
                                        <td>{profissional.complemento}</td>
                                        <td>
                                        <Link to={"/editarProfissional/"+ profissional.id} className='btn btn-primary btn-sm'>Editar</Link>
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

export default ListagemProfissional;
