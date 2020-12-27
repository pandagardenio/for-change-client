import { makeStyles, Theme, Typography, Card, CardContent, CardHeader, Button, CardActions } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import collaborate from './collaborate.jpg';
import volunteer from './volunteer.jpg';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        marginBottom: theme.spacing(8)
    },
    card: {
        margin: 'auto',
        maxWidth: theme.spacing(64),
        padding: theme.spacing(4)
    },
    figure: {
        margin: 0,
        textAlign: 'center',
        width: '100%'
    },
    figureImage: {
        borderRadius: '50%',
        width: theme.spacing(12)
    },
    action: {
        width: '50%'
    }
}));

export const JoinUs: React.FunctionComponent = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

    const formHref = 'https://forms.gle/3XBbijYGe1cuqkpm7';
    const mailHref = 'mailto:luis.grande@pandagarden.io';
    return (
        <section className={classes.root} id="join-us">
            <Card className={classes.card}>
                <CardHeader title={t('home.join-us.title')}/>
                <CardContent>
                    <Typography>{t('home.join-us.text')}</Typography>
                </CardContent>
                <CardActions>
                    <Button
                        className={classes.action}
                        rel="noopener"
                        target="_blank"
                        href={formHref}
                        variant="outlined"
                    >
                        <figure className={classes.figure}>
                            <img className={classes.figureImage} src={collaborate} alt=""/>
                            <figcaption>
                                <Typography>{t('home.join-us.actions.join')}</Typography>
                            </figcaption>
                        </figure>
                    </Button>
                    <Button
                        className={classes.action}
                        href={mailHref}
                        variant="outlined"
                    >
                        <figure className={classes.figure}>
                            <img className={classes.figureImage} src={volunteer} alt=""/>
                            <figcaption>
                                <Typography>{t('home.join-us.actions.volunteer')}</Typography>
                            </figcaption>
                        </figure>
                    </Button>
                </CardActions>
            </Card>
        </section>
    )
};