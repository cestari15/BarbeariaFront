import axios from "axios";
import React,{Component, useState, ChangeEvent, FormEvent, useEffect} from "react";


import styles from "../App.module.css";

import {ProfissionalCadastroInterface} from '../interfaces/ProfissionalCadastroInterface';
import { Link, useNavigate } from "react-router-dom";

const Agenda = ()=>{
    console.log(Response)

    const [profissional,setProfissional]=useState<ProfissionalCadastroInterface[]>([]);
    const [error,setError]=useState("");
    const   navigate = useNavigate();




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
        <div className="container">
        <main className={styles.main}>
            <div className=''>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'> Profissionais</h5>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Celular</th>
                                    <th>E-mail</th>
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
                                        <td>
                                        <Link to={"/editar/agenda/profissional/"+ profissional.id} className='btn btn-primary btn-sm'>Agendar</Link>
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

export default Agenda;
