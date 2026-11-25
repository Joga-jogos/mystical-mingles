import { Outlet } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

import { ThemeProvider, createTheme } from '@mystical-mingles/ui/theme';

import type { PlayerData } from '@mystical-mingles/services/player';

import { PlayerProvider } from '@mystical-mingles/common/Player';
import { AuthProvider, useAuth } from '@mystical-mingles/common/Auth';

import {
  url,
  authServices,
  playerServices,
} from '@/services/core';

function Providers({ children }: PropsWithChildren) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>Carregando</div>
    );
  }

  return (
    <PlayerProvider playerServices={playerServices}>
      {children}
    </PlayerProvider>
  );
}

export default function App() {
  const handleAuthenticate = (user?: PlayerData) => {
    if (user) { return; }

    window.open(url.sso, '_self');
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <AuthProvider
        authServices={authServices}
        playerServices={playerServices}
        onAuthenticate={handleAuthenticate}
      >
        <Providers>
          <Outlet />
        </Providers>
      </AuthProvider>
    </ThemeProvider>
  );
};