import * as React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import './ListaPostagem.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';
import Postagem from '../../../models/Postagem';
import { TokenState } from '../../../store/tokens/tokensReducer';

function ListaPostagem() {

    const [postagens, setPostagens] = React.useState<Postagem[]>([]);
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    let navigate = useNavigate();

    React.useEffect(() => {
        if (token == '') {
            alert("Você precisa estar logado para acessar essa página");
            navigate('/login');
        }
    }, [token]);

    const getPostagens = async () => {

        //adicionar try catch
        await busca("/postagem", setPostagens, {
            headers: {
                'Authorization': token
            }
        });
    }
    React.useEffect(() => {
        getPostagens();
    }, [postagens.length]);



    return (
        <>
            <Grid className='grid-container-posts' container spacing={3}>
                {
                    postagens.map(postagem => (
                        <Box m={2} className="box-card-post" >
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Postagens
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {postagem.titulo}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {postagem.texto}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {postagem.tema?.categoria}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Box className='box-button' >

                                        <Link to={`/formularioPostagem/${postagem.id}`} className="text-decorator-none" >
                                            <Box mx={1}>
                                                <Button variant="contained" className="botao-post botao-atualizar" size='small' color="primary" >
                                                    atualizar
                                                </Button>
                                            </Box>
                                        </Link>
                                        <Link to={`/deletarPostagem/${postagem.id}`} className="text-decorator-none">
                                            <Box mx={1}>
                                                <Button variant="contained" className='botao-post' size='small' color="secondary">
                                                    deletar
                                                </Button>
                                            </Box>
                                        </Link>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Box>
                    ))
                }
            </Grid>
        </>
    );
}

export default ListaPostagem;