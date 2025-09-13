
import { createContext, useEffect, useMemo, useState } from 'react';

import Icon from '@mystical-mingles/ui/components/Icon';
import { useAlert } from '@mystical-mingles/ui/components/Alert';

import logger from '@mystical-mingles/toolkit/logger';
import { getParams } from '@mystical-mingles/toolkit/url';

import type { PlayerData } from '@mystical-mingles/services/player';
import type AuthServices from '@mystical-mingles/services/auth';
import type PlayerServices from '@mystical-mingles/services/player';

export interface AuthContextConfig {
    user?: PlayerData;
    token?: string;

    logout: () => Promise<void>;

    loginWithGoogle: () => Promise<string>;
}

const FIREBASE = {
    'auth/email-already-in-use': 'Email já em uso',
    'auth/user-not-found': 'Email ou senha inválidos',
    'auth/wrong-password': 'Email ou senha inválidos',
    // eslint-disable-next-line max-len
    'auth/too-many-requests': 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.',
};

export const AuthContext = createContext<AuthContextConfig>({
    user: undefined,
    token: undefined,

    logout: () => Promise.resolve(),

    loginWithGoogle: async () => Promise.resolve(''),
});

interface AuthProviderProps {
    authServices: AuthServices;
    playerServices: PlayerServices;
    children: React.JSX.Element;
    onAuthenticate?: (user?: any) => void;
}
export default function AuthProvider({
    children,
    authServices,
    playerServices,
    onAuthenticate = () => { },
}: AuthProviderProps) {
    const { addAlert } = useAlert();

    const [user, setUser] = useState<any>();

    const context = useMemo<AuthContextConfig>(() => ({
        user,
        token: authServices.access_token,

        logout: async () => logout(),

        loginWithGoogle: async () => loginWithGoogle(),
    }), [user]);

    useEffect(() => { getUser(); }, []);

    const logout = () => { authServices.logout(); };

    const getUser = () => {
        const params = getParams<{ email: string; }>();

        if (window.location.href.includes('error')) { return; }

        const email = params.email || playerServices.currentByToken.email;

        if (!email) {
            onAuthenticate();
            return;
        }

        return playerServices.getByEmail(email)
            .then((user) => {
                setUser(user);
                return user;
            })
            .then((user) => onAuthenticate(user))
            .catch(() => {
                authServices.logout()
                    .then(() => onAuthenticate())
                    .then(() => logger.info('Usuário não encontrado'));
            });
    };

    const loginWithGoogle = async () => {
        try {
            const googleUser = await authServices.loginWithGoogle();

            if (!googleUser) { throw new Error('Erro ao autenticar'); }

            logger.info('usuário criado no autenticador!', googleUser);

            const userByEmail = await playerServices.getByEmail(googleUser.email);

            if (userByEmail) { return authServices.access_token; }

            const createdUser = await playerServices.createByAuth({
                id: googleUser?.user_id as string,
                name: googleUser.name || '',
                email: googleUser?.email || '',
                picture: googleUser?.picture || ''
            });

            logger.info('usuario criado!', createdUser);

            return authServices.access_token;
        } catch (error: any) {
            addAlert({
                color: 'error',
                message: FIREBASE[error?.code] || 'Erro ao fazer login',
                icon: <Icon name="error" />,
            });

            logger.info('Error on login:', { error });

            throw error;
        }
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}