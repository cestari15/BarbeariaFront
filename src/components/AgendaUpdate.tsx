import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";

import styles from "../App.module.css";
import HeaderProfissional from "./HeaderProfissional";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditarAgenda = () => {


    const [id, setId] = useState<number>();
    const [nome, setNome] = useState<string>("");
    const [celular, setCelular] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [data,setData]=useState<string>("");
    const [horario,setHorario]=useState<string>("");
  
 


    const parametro = useParams();

    const AtualizarProfissional = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            id: id,
            nome: nome,
            celular: celular,
            email: email,
        }

        axios.put("http://127.0.0.1:8000/api/profissional/update",
            dados,
            {
                headers: {
                    "Accept": "application",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                window.location.href = "/profissional/listagem";
            }).catch(function (error) {
                console.log("Ocorreuum erro ao atualizar")
            });
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/profissionais/find/" + parametro.id);
                setNome(response.data.data.nome);
                setCelular(response.data.data.celular);
                setEmail(response.data.data.email);
                setId(response.data.data.id);
            } catch (error) {
                console.log("erro ao buscar dados da api")
            }
        }

        fetchData();
    }, [])


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "nome"){
            setNome(e.target.value);
        }
        if(e.target.name === "celular"){
            setCelular(e.target.value);
        }
     
        if(e.target.name === "email"){
            setEmail(e.target.value);
        }
        if(e.target.name === "data"){
            setData(e.target.value);
        }
        if(e.target.name === "horario"){
            setHorario(e.target.value);
        }
    }

    return (
        <div>
            <HeaderProfissional/>
            <main className={styles.main}>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Profissional</h5>
                            <form onSubmit={AtualizarProfissional} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" name='nome' className='form-control' required onChange={handleState} value={nome} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="celular" className='form-label'>Celular</label>
                                    <input type="text" name='celular' className='form-control' required onChange={handleState} value={celular} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label' >E-mail</label>
                                    <input type="text" name='email' className='form-control' required onChange={handleState} value={email} />

                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label' >Data</label>
                                    <input type="date" name='email' className='form-control' required onChange={handleState} value={data} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label' >Horario</label>
                                    <input type="time" name='email' className='form-control' required onChange={handleState} value={horario} />

                                </div>
                                <div className='col-12'>
                                    <button type='submit' className='btn btn-success btn-sm'>Atualizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default EditarAgenda;

