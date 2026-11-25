import Box from '@mystical-mingles/ui/components/Box';
import Slide from '@mystical-mingles/ui/animations/Slide';
import Stack from '@mystical-mingles/ui/components/Stack';
import Button from '@mystical-mingles/ui/components/Button';
import Container from '@mystical-mingles/ui/components/Container';
import Typography from '@mystical-mingles/ui/components/Typography';

import { useAuth } from '@mystical-mingles/common/Auth';

import { release, url } from '@/services/core';

export default function Signin() {
    const { loginWithGoogle } = useAuth();

    const handleLoginWithGoogle = async () => {
        const token = await loginWithGoogle();

        window.open(`${url.game}?token=${token}`, '_self');
    };

    return (
        <Slide enter direction="top">
            <Stack
                gap={16}
                justifyContent="center"
                style={{ height: '100vh' }}
                sx={{ backgroundColor: ({ primary }) => primary.main }}
            >
                <Container sm="100%" md={500} lg={500}>
                    <Box sx={{ mb: 2 }} textAlign="center">
                        <Typography
                            variant="h1"
                            family="zuera"
                            style={{
                                position: 'absolute',
                                left: '49%',
                                whiteSpace: 'nowrap',
                                transform: 'translate(-50%, 5%)',
                                color: 'rgba(0, 0, 0, 0.5)',
                                fontSize: '3.75rem',
                                zIndex: 1
                            }}
                        >
                            Mystical Mingles
                        </Typography>
                        <Typography
                            variant="h1"
                            color="primary.contrastText"
                            family="zuera"
                            style={{
                                zIndex: 2,
                                position: 'relative',
                                whiteSpace: 'nowrap',
                                fontSize: '3.75rem',
                            }}
                        >
                            Mystical Mingles
                        </Typography>
                    </Box>
                    <Button
                        fullWidth
                        size="large"
                        type="button"
                        color="secondary"
                        variant="contained"
                        startIcon={
                            <img
                                src="https://cdn.clubedoafiliado.com/assets/icons/google.svg"
                                width={15}
                            />
                        }
                        sx={{
                            background: ({ primary }) => primary.contrastText,
                            color: ({ text }) => text.secondary,
                        }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onClick={handleLoginWithGoogle}
                    >
                        Entrar com o Google
                    </Button>
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            variant="body2"
                            color="primary.contrastText"
                            style={{ textAlign: 'center' }}
                        >
                            Equipe joga jogos © 2025
                        </Typography>
                        <Typography
                            variant="body2"
                            color="primary.contrastText"
                            style={{ textAlign: 'center' }}
                        >
                            Versão: {release}
                        </Typography>
                    </Box>
                </Container>
            </Stack>
        </Slide >
    );
}