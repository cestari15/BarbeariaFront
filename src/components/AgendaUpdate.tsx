import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";

import styles from "../App.module.css";
import HeaderProfissional from "./HeaderProfissional";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditarAgenda = () => {


   
    const [nome, setNome] = useState<string>("");
    const [valor, setValor] = useState<string>("");
    const [servico, setServico] = useState<number>();
    const [cliente,setCliente]=useState<number>();
    const [data_hora,setHorario]=useState<string>("");
    const [tipo_pagamento,setPagamento]=useState<string>("");
   
 


    const parametro = useParams();

    const AtualizarProfissional = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            
            data_hora:data_hora,
            valor: valor,
            servico: servico,
            tipo_pagamento:tipo_pagamento,
            cliente:cliente
        }

        axios.put("http://127.0.0.1:8000/api/agenda/update",
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
                const response = await axios.get("http://127.0.0.1:8000/api/agenda/find/" + parametro.id);
                if(response.data.status === true){
                    setNome(response.data.data.nome);
                setValor(response.data.data.valor);
                setServico(response.data.data.servico);
                setPagamento(response.data.data.pagamento);
                }
                
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
        if(e.target.name === "valor"){
            setValor(e.target.value);
        }
        if(e.target.name === "cliente"){
            setCliente(e.target.valueAsNumber);
        }
        if(e.target.name === "servico"){
            setServico(e.target.valueAsNumber);
        }
        if(e.target.name === "data_hora"){
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
                                    <label htmlFor="valor" className='form-label'>Preço</label>
                                    <input type="text" name='valor' className='form-control' required onChange={handleState} value={valor} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="servico" className='form-label' >Serviço</label>
                                    <input type="text" name='servico' className='form-control' required onChange={handleState} value={servico} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cliente" className='form-label' >Cliente</label>
                                    <input type="text" name='cliente' className='form-control' required onChange={handleState} value={servico} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="data_hora" className='form-label' >Data e hora</label>
                                    <input type="datetime-local" name='data_hora' className='form-control' required onChange={handleState} value={data_hora} />
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

