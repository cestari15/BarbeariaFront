import axios from "axios";
import React,{Component, useState, ChangeEvent, FormEvent, useEffect} from "react";


import styles from "../App.module.css";


import { AgendaCadstroInterface } from "../interfaces/AgendaCadastroInterface";
import { Link, useNavigate } from "react-router-dom";

const Agenda = ()=>{
    console.log(Response)

    const [agenda,setAgenda]=useState<AgendaCadstroInterface[]>([]);
    const [error,setError]=useState("");
    const   navigate = useNavigate();




    useEffect(() =>{
        async function fetchData(){
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/agenda/all');
                setAgenda(response.data.data)
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
                                    <th>Horário e Data</th>
                                    <th>Cliente</th>
                                    <th>Serviço</th>
                                    <th>Preço</th>
                                    <th>Tipo de Pagamento</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agenda.map(agenda => (
                                    <tr key={agenda.id}>
                                        <td>{agenda.id}</td>
                                        <td>{agenda.data_hora}</td>
                                        <td>{agenda.cliente}</td>
                                        <td>{agenda.servico}</td>
                                        <td>{agenda.valor}</td>
                                        <td>{agenda.tipo_pagamento}</td>
                                        <td>
                                        <Link to={"/editar/agenda/profissional/"+ agenda.id} className='btn btn-primary btn-sm'>Agendar</Link>
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
