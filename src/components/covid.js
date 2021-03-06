import React, { useState,useEffect } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';

import axios from 'axios';
const useStyles = makeStyles(({ palette }) => ({
    card: {
        borderRadius: 12,
        minWidth: 256,
        textAlign: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        margin: 'auto',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        marginTop: 8,
        marginBottom: 0,
    },
    subheader: {
        fontSize: 14,
        color:'#d5d5d5',
        marginBottom: '0.875em',
    },
    statLabel: {
        fontSize: 12,
        color:'#d5d5d5',
        fontWeight: 500,
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        margin: 0,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        letterSpacing: '1px',
    },
}));


function Covid() {
    const styles = useStyles();
    const shadowStyles = useFadedShadowStyles();
    const borderedGridStyles = useGutterBorderedGridStyles({
        borderColor: 'rgba(0, 0, 0, 0.08)',
        height: '50%',
    });
    const [data, setData] = useState({ covid: [] });


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://covid19.th-stat.com/api/open/today',
            );

            setData({
                covid: result.data
            });
        };

        fetchData();
    }, []);



    return (


        <Card className={cx(styles.card, shadowStyles.root)}>
            <CardContent>
                <Avatar className={styles.avatar} src={'data:image/jpeg;base64,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'} />
                <h3 className={styles.heading}>Covid Report</h3>
                <span className={styles.subheader}>Thail</span>
            </CardContent>
            <Divider light />
            <Box display={'flex'}>
                <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
                    <p className={styles.statLabel}>NewConfirmed</p>
                    <p className={styles.statValue}>{data.covid.NewConfirmed}</p>
                </Box>
                <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
                    <p className={styles.statLabel}>Confirmed</p>
                    <p className={styles.statValue}>{data.covid.Confirmed}</p>
                </Box>
            </Box>
        </Card>
    );
}

export default Covid;


