import { createContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import type { Species } from '@mystical-mingles/engine/species';
import type { TeamOptions } from '@mystical-mingles/engine/team';
import type { MingleBasicOptions } from '@mystical-mingles/engine/mingle';
import Team from '@mystical-mingles/engine/team';
import Mingle from '@mystical-mingles/engine/mingle';
import Champion from '@mystical-mingles/engine/champion';

import type PlayerServices from '@mystical-mingles/services/player';
import type { ChampionData, TeamData } from '@mystical-mingles/services/player';

import { useAuth } from '../Auth';

export interface PlayerContextConfig {
    teams: TeamData[];
    mingles: Mingle<Species>[];

    createMingle: (options: MingleBasicOptions<Species>) => Promise<void>;
    createTeam: (options: Pick<TeamOptions, 'champions' | 'name'>) => Promise<void>;

    selectedTeam: (teamId: string) => Team;
}

export const PlayerContext = createContext<PlayerContextConfig>({
  teams: [],
  mingles: [],

  createMingle: () => Promise.resolve(),
  createTeam: () => Promise.resolve(),

  selectedTeam: () => new Team({ name: '', champions: [] })
});

export function PlayerProvider({
  children,
  playerServices
}: PropsWithChildren<{
    playerServices: PlayerServices
}>) {
  const { user } = useAuth();

  const [teams, setTeams] = useState<TeamData[]>([]);
  const [mingles, setMingles] = useState<Mingle<Species>[]>([]);

  const context = useMemo<PlayerContextConfig>(() => ({
    teams,
    mingles,

    createTeam: (options) => createTeam(options),
    createMingle: (options) => createMingle(options),

    selectedTeam: (teamId) => selectedTeam(teamId),
  }), [teams, mingles]);

  useEffect(() => {
    Promise.all([getMingles(), getTeams()]);
  }, []);

  const pickChampions = (champions: ChampionData[]): Champion<Species>[] => {
    return champions.reduce<Champion<Species>[]>((acc, champion) => {
      const mingle = mingles.find(m => m.id === champion.id);

      if (!mingle) { return acc; }

      acc.push(new Champion({ mingle, ...champion }));

      return acc;
    }, []);
  };

  const getMingles = async () => {
    if (!user) { return; }

    return playerServices.getMingles(user.email)
      .then(res => { setMingles(res); });
  };

  const getTeams = async () => {
    if (!user) { return; }

    return playerServices.getTeams(user.email)
      .then(res => { setTeams(res); });
  };

  const createMingle = async (options: MingleBasicOptions<Species>) => {
    if (!user) { return; }

    return playerServices
      .createMingle(user.email, options)
      .then(res => {
        setMingles(prev => {
          return [...prev, new Mingle(res)];
        });
      });
  };

  const createTeam = async (options: Pick<TeamOptions, 'champions' | 'name'>) => {
    if (!user) { return; }

    return playerServices
      .createTeam(user.email, options)
      .then(res => {
        setTeams(prev => [...prev, res]);
      });
  };

  const selectedTeam = (teamId: string) => {
    const team = teams.find(t => t.name === teamId);

    if (!team) { throw new Error(`O time ${teamId} não existe`); }

    return new Team({
      name: team.name,
      champions: pickChampions(team.champions)
    });
  };

  return (
    <PlayerContext.Provider value={context}>
      {children}
    </PlayerContext.Provider>
  );
}