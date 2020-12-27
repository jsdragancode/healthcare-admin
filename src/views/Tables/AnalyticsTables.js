import React, { useEffect, useState } from 'react';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// react plugin for creating vector maps
import { VectorMap } from 'react-jvectormap';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import ReactTableBottomPagination from '../../components/ReactTableBottomPagination/ReactTableBottomPagination.js';

import axios from 'axios';

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from '@material-ui/icons/Store';
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Refresh from '@material-ui/icons/Refresh';
import Edit from '@material-ui/icons/Edit';
import Place from '@material-ui/icons/Place';
import ArtTrack from '@material-ui/icons/ArtTrack';
import Language from '@material-ui/icons/Language';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Visibility from '@material-ui/icons/Visibility';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Table from 'components/Table/Table.js';
import Button from 'components/CustomButtons/Button.js';
import Danger from 'components/Typography/Danger.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart,
} from 'variables/charts';

import styles from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle.js';

import priceImage1 from 'assets/img/card-2.jpeg';
import priceImage2 from 'assets/img/card-3.jpeg';
import priceImage3 from 'assets/img/card-1.jpeg';

const us_flag = require('assets/img/flags/US.png');
const de_flag = require('assets/img/flags/DE.png');
const au_flag = require('assets/img/flags/AU.png');
const gb_flag = require('assets/img/flags/GB.png');
const ro_flag = require('assets/img/flags/RO.png');
const br_flag = require('assets/img/flags/BR.png');

var mapData = {
    AU: 760,
    BR: 550,
    CA: 120,
    DE: 1300,
    FR: 540,
    GB: 690,
    GE: 200,
    IN: 200,
    RO: 600,
    RU: 300,
    US: 2920,
};

const useStyles = makeStyles(styles);

export default function Dashboard() {
    const [acceptedPatient, setAcceptedPatient] = useState('');
    const [currentServed, setCurrentServed] = useState('');
    const [bookingCompleted, setBookingCompleted] = useState('');
    const [waitingDate, setWaitingDate] = useState([]);

    const classes = useStyles();

    const getAdminParam = () => {
        axios.get('/api/acceptedPatient/').then((res) => {
            setAcceptedPatient(res.data)
        });

        axios.get('/api/currentServed/').then((res) => {
            setCurrentServed(res.data)
        });

        axios.get('/api/bokingCompleted/').then((res) => {
            setBookingCompleted(res.data)
        });

        axios.get('/api/waitingPatients/').then((res) => {
            setWaitingDate(res.data);
        });
    };

    useEffect(getAdminParam, []);

    return (
        <GridContainer>
            <GridContainer>
                <GridItem xs={12}>
                    <Card style={{ display: 'flex', width: '100%', float: 'left', marginRight: '50px' }}>
                        <CardHeader color="warning" icon>
                            <CardIcon color="warning">
                                <DashboardIcon />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>
                                Analytics Info
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer justify="space-between">
                                <GridItem xs={12} sm={12} md={12}>
                                    <Table
                                        tableData={[
                                            [
                                                'How many patients are accepted?',
                                                acceptedPatient,
                                            ],
                                            [
                                                'How many are being served currently?',
                                                currentServed,
                                            ],
                                            [
                                                'Number of bookings completed',
                                                bookingCompleted
                                            ],
                                            [
                                                'How long patients have been waiting?',
                                                waitingDate
                                            ],


                                        ]}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </GridContainer>
    );
}
