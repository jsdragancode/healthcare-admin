import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
// @material-ui/icons
import DriveEta from '@material-ui/icons/DriveEta';
import Dvr from '@material-ui/icons/Dvr';
import Close from '@material-ui/icons/Close';
import Bookmarks from '@material-ui/icons/Bookmarks';

// core components
import CustomInput from 'components/CustomInput/CustomInput.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardIcon from '../../components/Card/CardIcon.js';
import CardHeader from 'components/Card/CardHeader.js';
import ReactTableBottomPagination from '../../components/ReactTableBottomPagination/ReactTableBottomPagination.js';

import { cardTitle } from '../../assets/jss/material-dashboard-pro-react.js';

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: '15px',
        marginBottom: '0px',
    },
};

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function BookingStatusHistoryTables() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteBookingHistoryId, setDeleteBookingHistoryId] = useState(null);
    const [newBookingId, setNewBookingId] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [newOnDatetime, setNewOnDatetime] = useState('');
    const classes = useStyles();

    const setLocationTrackParam = (info) => {
        const { booking_id, status, on_datetime } = info;

        setNewBookingId(booking_id);
        setNewStatus(status);
        setNewOnDatetime(on_datetime);
    };

    const makeTableRow = (info) => {
        return {
            ...info,
            actions: (
                <div className="actions-right">
                    <Button
                        justIcon
                        round
                        simple
                        onClick={() => {
                            setLocationTrackParam(info);
                            setDeleteBookingHistoryId(info.id);
                            setEditModal(true);
                        }}
                        color="warning"
                        className="edit"
                    >
                        <Dvr />
                    </Button>
                    <Button
                        justIcon
                        round
                        simple
                        onClick={() => {
                            setDeleteBookingHistoryId(info.id);
                            setDeleteModal(true);
                        }}
                        color="danger"
                        className="remove"
                    >
                        <Close />
                    </Button>
                </div>
            ),
        };
    };

    const getBookingHistory = () => {
        console.log(123);
        axios.get('/api/bookingHistories/').then((res) => {
            console.log(456);
            setData(res.data.bookingHistories.map((prop) => makeTableRow(prop)));
        });
    };

    useEffect(getBookingHistory, []);

    const deleteBookingHistory = (deleteId) => {
        axios.delete(`/api/bookingHistories/${deleteId}`).then(() => {
            // console.log('delete', res);
            setData(data.filter((prop) => prop.id !== deleteId));
        });
    };

    const addBookingHistory = () => {
        axios
            .post('/api/bookingHistories/', {
                booking_id: newBookingId,
                status: newStatus,
                on_datetime: newOnDatetime,
            })
            .then((res) => {
                // console.log('post', res.data.driver);
                setData([...data, makeTableRow(res.data.bookingHistory)]);
                setAddModal(false);
            });
    };

    const updateBookingHistory = () => {
        axios
            .patch(`/api/bookingHistories/${deleteBookingHistoryId}`, {
                booking_id: newBookingId,
                status: newStatus,
                on_datetime: newOnDatetime,
            })
            .then((res) => {
                // console.log('patch', res.data.driver);

                setData(
                    data.map((prop) =>
                        prop.id === deleteBookingHistoryId ? makeTableRow(res.data.bookingHistory) : prop
                    )
                );
                setEditModal(false);
            });
    };

    return (
        <GridContainer>
            <GridItem xs={12}>
                {/* {moment().format('HH:mm:ss.SSS')} */}
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <Bookmarks />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Booking History</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setLocationTrackParam({
                                            booking_id: '',
                                            status: '',
                                            on_datetime: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add Booking Hisotry
                                </Button>
                            </GridItem>
                        </GridContainer>
                        <ReactTableBottomPagination
                            columns={[
                                {
                                    Header: 'Booking ID',
                                    accessor: 'booking_id',
                                },
                                {
                                    Header: 'Status',
                                    accessor: 'status',
                                },
                                {
                                    Header: 'On Datetime',
                                    accessor: 'on_datetime',
                                },
                                {
                                    Header: 'Actions',
                                    accessor: 'actions',
                                },
                            ]}
                            data={data}
                        />
                        <Dialog
                            classes={{
                                root: classes.center + ' ' + classes.modalRoot,
                                paper: classes.modal + ' ' + classes.modalSmall,
                            }}
                            open={deleteModal}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => setDeleteModal(false)}
                            aria-describedby="small-modal-slide-description"
                        >
                            <DialogContent
                                id="small-modal-slide-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <h5>Are you sure you want to delete this booking history?</h5>
                            </DialogContent>
                            <DialogActions
                                className={
                                    classes.modalFooter + ' ' + classes.modalFooterCenter
                                }
                            >
                                <Button
                                    onClick={() => setDeleteModal(false)}
                                    color="transparent"
                                    className={classes.modalSmallFooterFirstButton}
                                >
                                    Never Mind
                </Button>
                                <Button
                                    onClick={() => {
                                        setDeleteModal(false);
                                        deleteBookingHistory(deleteBookingHistoryId);
                                    }}
                                    color="success"
                                    simple
                                    className={
                                        classes.modalSmallFooterFirstButton +
                                        ' ' +
                                        classes.modalSmallFooterSecondButton
                                    }
                                >
                                    Yes
                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            classes={{
                                root: classes.center + ' ' + classes.modalRoot,
                                paper: classes.modal + ' ' + classes.modalSmall,
                            }}
                            open={addModal}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => setDeleteModal(false)}
                            aria-labelledby="add-driver-dialog-title-modal-title"
                            aria-describedby="add-driver-dialog-modal-description"
                        >
                            <DialogTitle
                                id="add-driver-dialog-title-modal-title"
                                disableTypography
                                className={classes.modalHeader}
                            >
                                <h4 className={classes.modalTitle}>Add Booking History</h4>
                            </DialogTitle>
                            <DialogContent
                                id="add-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Booking ID"
                                        id="add_booking_id"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBookingId,
                                            onChange: (e) => setNewBookingId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Status"
                                        id="add_status"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newStatus,
                                            onChange: (e) => setNewStatus(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="On Datetime"
                                        id="add_on_datetime"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newOnDatetime,
                                            onChange: (e) => setNewOnDatetime(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)}>Cancel</Button>
                                <Button onClick={() => addBookingHistory()} color="primary">
                                    Add
                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            classes={{
                                root: classes.center + ' ' + classes.modalRoot,
                                paper: classes.modal + ' ' + classes.modalSmall,
                            }}
                            open={editModal}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => setDeleteModal(false)}
                            aria-labelledby="edit-driver-dialog-title-modal-title"
                            aria-describedby="edit-driver-dialog-modal-description"
                        >
                            <DialogTitle
                                id="edit-driver-dialog-title-modal-title"
                                disableTypography
                                className={classes.modalHeader}
                            >
                                <h4 className={classes.modalTitle}>Edit Booking History</h4>
                            </DialogTitle>
                            <DialogContent
                                id="edit-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Booking ID"
                                        id="add_booking_id"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBookingId,
                                            onChange: (e) => setNewBookingId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Status"
                                        id="add_status"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newStatus,
                                            onChange: (e) => setNewStatus(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="On Datetime"
                                        id="add_on_datetime"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newOnDatetime,
                                            onChange: (e) => setNewOnDatetime(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)}>Cancel</Button>
                                <Button onClick={() => updateBookingHistory()} color="primary">
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}