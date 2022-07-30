import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
    return (
        <>
            <Grid container direction='row' justifyContent='center' alignItems='center'>{/*style={{ backgroundColor: "#222", color: "white", minHeight:"70vh"}} */}
                <Grid alignItems='center' xs={6}>
                    <Box paddingX={20} >
                        <form>
                            <Typography
                                variant="h3"
                                gutterBottom
                                color="textPrimary"
                                component="h3"
                                align="center"
                                className="textos1"
                            >
                                Entrar
                            </Typography>
                            <TextField id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                            <TextField id='senha' label='Senha' variant='outlined' name='senha' type='password' margin='normal' fullWidth />
                            <Box textAlign='center'  >
                                <Link to={"/home"} className='text-decorator-none'>
                                    <Button type='submit' variant='contained' color="primary" fullWidth >
                                        Logar
                                    </Button>
                                </Link>
                            </Box>
                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant='subtitle1' gutterBottom alignItems='center' >Não tem uma conta ?</Typography>
                            </Box>
                            <Typography variant='subtitle1' gutterBottom alignItems='center' className="textos1" >Cadastre-se</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid xs={6} className="imagem" >
                </Grid>

            </Grid>
        </>
    );
}

export default Login;