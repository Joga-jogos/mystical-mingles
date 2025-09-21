import { useEffect, useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import Icon from '@mystical-mingles/ui/components/Icon';
import Stack from '@mystical-mingles/ui/components/Stack';
import Input from '@mystical-mingles/ui/components/Input';
import Button from '@mystical-mingles/ui/components/Button';
import BugIcon from '@mystical-mingles/ui/custom-icons/Bug';
import Loading from '@mystical-mingles/ui/components/Loading';
import Typography from '@mystical-mingles/ui/components/Typography';
import { Grid, GridItem } from '@mystical-mingles/ui/components/Grid';
import { Form, Control, useForm, FormControl } from '@mystical-mingles/ui/components/Form';

import logger from '@mystical-mingles/toolkit/logger';
import { getFilledArray } from '@mystical-mingles/toolkit/array';

import Player from '@mystical-mingles/engine/player';
import Champion from '@mystical-mingles/engine/champion';
import { generateMingle } from '@mystical-mingles/engine/mingle';
import { generateTeamName } from '@mystical-mingles/engine/team';
import type { Coordinates } from '@mystical-mingles/engine/champion';

import { useAuth } from '@mystical-mingles/common/Auth';
import { usePlayer } from '@mystical-mingles/common/Player';
import { useMatchmaking } from '@mystical-mingles/common/Matchmaking';

export default function Lobby() {
    const navigate = useNavigate();

    const { user } = useAuth();
    const { mingles, teams, createMingle, createTeam, selectedTeam } = usePlayer();
    const { matchmaking, leaveRoom, createMatchmaking, joinMatchmaking, subscriptionMatchmaking } = useMatchmaking();

    const [formGroup] = useForm<{ roomId: string }>({
        form: {
            roomId: new FormControl({ defaultValue: '', required: true })
        },
        handle: {
            submit: ({ values }) => { handleJoinMatchmaking(values.roomId); }
        }
    }, []);

    const [isWaitingMatchMaking, setIsWaitingMatchMaking] = useState(false);

    const [loading, setLoading] = useState({ mingle: false, team: false });

    useEffect(() => {
        if (!leaveRoom) { return; }
        if (!matchmaking) { return; }
        if (!isWaitingMatchMaking) { return; }
        if (!subscriptionMatchmaking) { return; }

        subscriptionMatchmaking(matchmaking.id, (matchmaking) => {
            if (matchmaking.status === 'waiting') { return; }

            goToGame(matchmaking.id);
        });

        return () => { leaveRoom(); };
    }, [isWaitingMatchMaking]);

    const goToGame = (roomId: string) => {
        navigate(generatePath('/game/:id', { id: roomId }));
    };

    const handleLeaveRoom = () => {
        if (!leaveRoom) { return; }

        leaveRoom();
        setIsWaitingMatchMaking(false);
    };

    const handleJoinMatchmaking = async (roomId: string) => {
        if (!joinMatchmaking) { return; }
        if (!user) { return; }

        const player = new Player({
            id: user.id,
            team: selectedTeam(teams[0].name)
        });

        return joinMatchmaking(roomId, player)
            .then(() => setIsWaitingMatchMaking(true));
    };

    const handleCreateMatchmaking = () => {
        if (!createMatchmaking) { return; }
        if (!user) { return; }

        const player = new Player({
            id: user.id,
            team: selectedTeam(teams[0].name)
        });

        return createMatchmaking(player)
            .then(() => setIsWaitingMatchMaking(true));
    };

    const handleCreateMingle = async () => {
        setLoading(prev => ({ ...prev, mingle: true }));

        return createMingle(generateMingle())
            .catch(e => logger.error('ERROR', e))
            .finally(() => setLoading(prev => ({ ...prev, mingle: false })));
    };

    const handleCreateTeam = async () => {
        setLoading(prev => ({ ...prev, team: true }));

        const COORDINATES: Coordinates[] = [
            { x: 1, y: 2 },
            { x: 3, y: 2 },
            { x: 4, y: 1 },
        ];

        const pickedMingles = getFilledArray(3)
            .map((_, index) => mingles[index]);

        return createTeam({
            name: generateTeamName(),
            champions: pickedMingles.map((m, i) => new Champion({
                mingle: m,
                coordinates: COORDINATES[i]
            }))
        })
            .catch(e => logger.error('ERROR', e))
            .finally(() => setLoading(prev => ({ ...prev, team: false })));
    };

    if (isWaitingMatchMaking && matchmaking) {
        return (
            <Stack flexDirection="column" alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
                <Typography variant="h3">Aguardando oponente</Typography>
                <Typography variant="body1">{matchmaking.id}</Typography>
                <Loading size={50} />
                <Button variant="outlined" onClick={handleLeaveRoom}>
                    Sair da fila
                </Button>
            </Stack>
        );
    }

    return (
        <Stack flexDirection="column">
            <h1>Lobby</h1>

            <Stack>
                <Button
                    loading={loading.mingle && <Loading />}
                    startIcon={<Icon name="bug" />}
                    onClick={handleCreateMingle}
                >
                    criar mingle
                </Button>
                <Button
                    loading={loading.team && <Loading />}
                    startIcon={<Icon name="users-alt" />}
                    onClick={handleCreateTeam}
                >
                    create Team
                </Button>
                <Button
                    loading={loading.team && <Loading />}
                    startIcon={<BugIcon />}
                    onClick={handleCreateMatchmaking}
                >
                    criar sala
                </Button>
            </Stack>

            <Typography>Mingles:</Typography>

            <Grid xl={4}>
                {
                    mingles.map(mingle => (
                        <GridItem key={mingle.id}>
                            <span>{mingle.name}</span>
                        </GridItem>
                    ))
                }
            </Grid>

            <Typography>Teams:</Typography>

            <Grid xl={4}>
                {
                    teams.map(team => (
                        <GridItem key={team.name}>
                            <span>{team.name}</span>
                        </GridItem>
                    ))
                }
            </Grid>

            <Typography>roomID: {matchmaking?.id}</Typography>

            <Form formGroup={formGroup}>
                <Stack>
                    <Control
                        controlName="roomId"
                        field={(control) => (
                            <Input
                                value={control.value}
                            />
                        )}
                    />
                    <Button type="submit">Entrar</Button>
                </Stack>
            </Form>
        </Stack>
    );
}