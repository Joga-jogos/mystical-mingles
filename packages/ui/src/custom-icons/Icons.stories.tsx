import { useState, type PropsWithChildren } from 'react';

import copy from 'copy-to-clipboard';

import type { Meta, StoryObj } from '@storybook/react';

import { wait } from '@mystical-mingles/toolkit/promise';

import Zoom from '../animations/Zoom';
import Icon from '../components/Icon';
import Stack from '../components/Stack';
import Typography from '../components/Typography';
import { Grid, GridItem } from '../components/Grid';

import * as Icons from './index';

const meta: Meta = {
    title: 'gallery/Custom-Icons',
};

function BoxCopy({ name, children }: PropsWithChildren<{ name: string }>) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (copied) { return; }

        copy(`import ${name} from "@mystical-mingles/ui/custom-icons/${name}";`);

        setCopied(true);

        wait(() => setCopied(false), 500);
    };

    return (
        <div style={{
            border: '1px solid #E9E9E9',
            borderRadius: 8,
        }}>
            <Stack gap={0} flexDirection="row" alignItems="center" justifyContent="space-between">
                <div style={{ padding: 10 }}>
                    {children}
                </div>
                <div style={{
                    width: '100%',
                    padding: 10,
                }}>
                    <Typography>{name}</Typography>
                </div>
                <button
                    style={{
                        padding: 10,
                        border: 'none',
                        background: 'transparent',
                        borderLeft: '1px solid #E9E9E9',
                        cursor: 'pointer'
                    }}
                    onClick={handleCopy}
                >
                    {
                        !copied && (
                            <Zoom enter={!copied} delay={10}>
                                <Icon name="copy-alt" color="text.secondary" />
                            </Zoom>
                        )
                    }
                    {
                        copied && (
                            <Zoom enter={copied} delay={10}>
                                <Icon name="check" color="success.main" />
                            </Zoom>
                        )
                    }
                </button>
            </Stack>
        </div >
    );
}

export const Default: StoryObj = {
    render: () => {
        return (
            <Grid xl={3}>
                {
                    Object.keys(Icons).map(key => {
                        const Component = Icons[key as keyof typeof Icons];
                        return (
                            <GridItem key={key}>
                                <BoxCopy name={key}>
                                    <Component size={20} color="text.primary" />
                                </BoxCopy>
                            </GridItem>
                        );
                    })
                }
            </Grid>
        );
    }
};

export default meta;