import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { MatchmakingProvider } from '@mystical-mingles/common/Matchmaking';

import App from '@/App';
import { matchmakingServices } from '@/services/core';

const GamePage = lazy(() => import('@/pages/Game'));
const LobbyPage = lazy(() => import('@/pages/Lobby'));

export const router = createBrowserRouter([
  {
    path: '',
    element: (
      <App />
    ),
    children: [
      {
        path: '/',
        element: <Navigate to='/lobby' />,
      },
      {
        path: '/lobby',
        loader: () => document.title = 'Mystical Mingles - Lobby',
        element: (
          <MatchmakingProvider matchmakingServices={matchmakingServices}>
            <LobbyPage />
          </MatchmakingProvider>
        ),
      },
      {
        path: '/game/:id',
        loader: () => document.title = 'Mystical Mingles',
        element: (
          <MatchmakingProvider matchmakingServices={matchmakingServices}>
            <GamePage />
          </MatchmakingProvider>
        ),
      },
      {
        path: '*',
        element: <Navigate to='/lobby' />,
      }
    ],
  }
]);
