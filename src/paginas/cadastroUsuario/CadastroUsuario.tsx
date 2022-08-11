import React, { useState, useEffect, ChangeEvent } from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { cadastroUsuario } from "../../services/Service";
import "./CadastroUsuario.css";
import { Link, useNavigate } from "react-router-dom";
import User from "../../models/User";

function CadastroUsuario() {
    let navigate = useNavigate();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("");
    const [user, setUser] = useState<User>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
    });
    const [userResult, setUserResult] = useState<User>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
    });

    useEffect(() => {
        if (userResult.id != 0) {
            navigate("/login");
        }
    }, [userResult]);

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value);
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (confirmarSenha === user.senha && user.senha.length >= 8) {
            try {
                await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult);
                alert("Usuário cadastrado com sucesso");
            } catch (error) {
                console.log(`Error: ${error}`);
                alert("Usuário já existente");
            }
        } else if (confirmarSenha !== user.senha) {
            alert("As senhas não combinam.");
        } else {
            alert("Insira no miníno 8 caracteres na senha.");
            setUser({ ...user, senha: "" });
            setConfirmarSenha("");
        }
    }
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6} className="imagem2"></Grid>
            <Grid item xs={6} className="" alignItems="center">
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography
                            variant="h3"
                            gutterBottom
                            color="textPrimary"
                            component="h3"
                            align="center"
                            className="textos2"
                        >
                            Cadastrar
                        </Typography>
                        <TextField
                            value={user.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="nome"
                            label="Nome"
                            variant="outlined"
                            name="nome"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            value={user.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="usuario"
                            label="Usuário"
                            variant="outlined"
                            name="usuario"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            value={user.foto}
                            id="foto"
                            label="Foto"
                            variant="outlined"
                            name="foto"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            value={user.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="senha"
                            label="Senha"
                            variant="outlined"
                            name="senha"
                            type="password"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            value={confirmarSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                confirmarSenhaHandle(e)
                            }
                            id="confirmarSenha"
                            label="Confirmar Senha"
                            variant="outlined"
                            name="confirmarSenha"
                            type="password"
                            margin="normal"
                            fullWidth
                        />
                        <Box textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="btnCadastrar"
                            >
                                Cadastrar
                            </Button>

                            <Link to={"/login"} className="text-decorator-none">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className="btnCancelar"
                                >
                                    Cancelar
                                </Button>
                            </Link>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CadastroUsuario;