import React, { useState, useEffect, ChangeEvent } from 'react'
import { Container, Typography, TextField, Button, Paper } from "@material-ui/core";
import './CadastroTema.css';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';




function CadastroTema() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    const [tema, setTema] = useState<Tema>({
        id: 0,
        categoria: "",
        descricao: ""
    });

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado");
            navigate("/login");
        }
    }, [token]);

    useEffect(() => {
        if (id != undefined) {
            findById(id);
        }
    }, [id]);

    const findById = async (id: string) => {
        buscaId(`/tema/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    };

    const updatedTema = async (e: ChangeEvent<HTMLInputElement>) => {
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("tema " + JSON.stringify(tema))

        if (id !== undefined) {
            console.log(tema)
            put(`/tema`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema atualizado com sucesso');
        } else {
            post(`/tema`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema cadastrado com sucesso');
        }
        back()

    }

    function back() {
        navigate('/temas')
    }
    return (
        <Paper className="paper-tema">
            <Container maxWidth="sm" className="topo container-form-cadastro">
                <form onSubmit={onSubmit}>
                    <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                    <TextField value={tema.categoria} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="categoria" label="Categoria" variant="outlined" name="categoria" margin="normal" fullWidth />
                    <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="Texto" multiline rows={5} variant="outlined" name="descricao" margin="normal" fullWidth />
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </form>
            </Container>
        </Paper>
    )
}

export default CadastroTema;