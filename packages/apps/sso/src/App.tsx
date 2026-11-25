import { Outlet } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mystical-mingles/ui/theme';

import type { PlayerData } from '@mystical-mingles/services/player';

import { AuthProvider } from '@mystical-mingles/common/Auth';

import { authServices, playerServices } from '@/services/core';

function Content() {
  return (
    <Outlet />
  );
}

export default function App() {
  const handleAuthenticate = (user?: PlayerData) => {
    if (!user) { return; }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <AuthProvider
        authServices={authServices}
        playerServices={playerServices}
        onAuthenticate={handleAuthenticate}
      >
        <Content />
      </AuthProvider>
    </ThemeProvider>
  );
};