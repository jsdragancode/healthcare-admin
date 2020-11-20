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
import Dvr from '@material-ui/icons/Dvr';
import Close from '@material-ui/icons/Close';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Book from '@material-ui/icons/Book';
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

export default function BookingsTables() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [deleteBooksId, setDeleteBooksId] = useState(null);
    const [newUserId, setNnewUserId] = useState('');
    const [newPatientId, setNewPatientId] = useState('');
    const [newStartDateTime, setNewStartDateTime] = useState('');
    const [newEndDateTime, setNewEndDateTime] = useState('');
    const [newBookingType, setNewBookingType] = useState('');
    const [newLapTestId, setNewLapTestId] = useState('');
    const [newAssignedDriver, setNewAssignedDriver] = useState('');
    const [newAssigned_van, setNewAssigned_van] = useState('');
    const [newAssignedDoctor, setNewAssignedDoctor] = useState('');
    const [newAssignedNurse, setNewAssignedNurse] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [newPaymentMethod, setNewPaymentMethod] = useState('');
    const [newPaymentUrl, setNewPaymentUrl] = useState('');
    const [newPlacedOn, setNewPlacedOn] = useState('');
    const [newCoordinates, setNewCoordinates] = useState('');
    const [newAddress1, setNewAddress1] = useState('');
    const [newAddress2, setNewAddress2] = useState('');
    const [newCity, setNewCity] = useState('');

    const classes = useStyles();

    const setBookingsParam = (info) => {
        const { user_id, patient_id, start_datetime, end_datetime, booking_type, lap_test_id, assigned_driver, assigned_van, assigned_doctor, assigned_nurse, status, payment_method, payment_url, placed_on, location_coordinates, location_address_line_1, location_address_line_2, location_city } = info;
        setNnewUserId(user_id);
        setNewPatientId(patient_id);
        setNewStartDateTime(start_datetime);
        setNewEndDateTime(end_datetime);
        setNewBookingType(booking_type);
        setNewLapTestId(lap_test_id);
        setNewAssignedDriver(assigned_driver);
        setNewAssigned_van(assigned_van);
        setNewAssignedDoctor(assigned_doctor);
        setNewAssignedNurse(assigned_nurse);
        setNewStatus(status);
        setNewPaymentMethod(payment_method);
        setNewPaymentUrl(payment_url);
        setNewPlacedOn(placed_on);
        setNewCoordinates(location_coordinates);
        setNewAddress1(location_address_line_1);
        setNewAddress2(location_address_line_2);
        setNewCity(location_city);
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
                            setBookingsParam(info);
                            setDeleteBooksId(info.id);
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
                            setDeleteBooksId(info.id);
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

    const getBookings = () => {
        console.log(123123);
        axios.get('/api/bookings/').then((res) => {
            setData(res.data.bookings.map((prop) => makeTableRow(prop)));
            console.log(res);
        });
    };

    useEffect(getBookings, []);

    const deleteBookings = (deleteId) => {
        axios.delete(`/api/bookings/${deleteId}`).then(() => {
            setData(data.filter((prop) => prop.id !== deleteId));
        });
    };

    const addBookings = () => {
        axios
            .post('/api/bookings/', {
                user_id: newUserId,
                patient_id: newPatientId,
                start_datetime: newStartDateTime,
                end_datetime: newEndDateTime,
                booking_type: newBookingType,
                lap_test_id: newLapTestId,
                assigned_driver: newAssignedDriver,
                assigned_van: newAssigned_van,
                assigned_doctor: newAssignedDoctor,
                assigned_nurse: newAssignedNurse,
                status: newStatus,
                payment_method: newPaymentMethod,
                payment_url: newPaymentUrl,
                placed_on: newPlacedOn,
                location_coordinates: newCoordinates,
                location_address_line_1: newAddress1,
                location_address_line_2: newAddress2,
                location_city: newCity,
            })
            .then((res) => {
                setData([...data, makeTableRow(res.data.booking)]);
                setAddModal(false);
            });
    };

    const updateBookings = () => {
        axios
            .patch(`/api/bookings/${deleteBooksId}`, {
                user_id: newUserId,
                patient_id: newPatientId,
                start_datetime: newStartDateTime,
                end_datetime: newEndDateTime,
                booking_type: newBookingType,
                lap_test_id: newLapTestId,
                assigned_driver: newAssignedDriver,
                assigned_van: newAssigned_van,
                assigned_doctor: newAssignedDoctor,
                assigned_nurse: newAssignedNurse,
                status: newStatus,
                payment_method: newPaymentMethod,
                payment_url: newPaymentUrl,
                placed_on: newPlacedOn,
                location_coordinates: newCoordinates,
                location_address_line_1: newAddress1,
                location_address_line_2: newAddress2,
                location_city: newCity,
            })
            .then((res) => {
                setData(
                    data.map((prop) =>
                        prop.id === deleteBooksId ? makeTableRow(res.data.booking) : prop
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
                            <Book />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Bookings</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setBookingsParam({
                                            user_id: '',
                                            patient_id: '',
                                            start_datetime: '',
                                            end_datetime: '',
                                            booking_type: '',
                                            lap_test_id: '',
                                            assigned_driver: '',
                                            assigned_van: '',
                                            assigned_doctor: '',
                                            assigned_nurse: '',
                                            status: '',
                                            payment_method: '',
                                            payment_url: '',
                                            placed_on: '',
                                            location_coordinates: '',
                                            location_address_line_1: '',
                                            location_address_line_2: '',
                                            location_city: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add Booking
                                </Button>
                            </GridItem>
                        </GridContainer>
                        <ReactTableBottomPagination
                            columns={[
                                {
                                    Header: 'User ID',
                                    accessor: 'user_id',
                                },
                                {
                                    Header: 'Patient ID',
                                    accessor: 'patient_id',
                                },
                                {
                                    Header: 'Start Datetime',
                                    accessor: 'start_datetime',
                                },
                                {
                                    Header: 'End Datetime',
                                    accessor: 'end_datetime',
                                },
                                {
                                    Header: 'Booking Type',
                                    accessor: 'booking_type',
                                },
                                {
                                    Header: 'Lap Test ID',
                                    accessor: 'lap_test_id',
                                },
                                {
                                    Header: 'Assigned Driver',
                                    accessor: 'assigned_driver',
                                },
                                {
                                    Header: 'Assigned Van',
                                    accessor: 'assigned_van',
                                },
                                {
                                    Header: 'Assigned Doctor',
                                    accessor: 'assigned_doctor',
                                },
                                {
                                    Header: 'Assigned Nurse',
                                    accessor: 'assigned_nurse',
                                },
                                {
                                    Header: 'Status',
                                    accessor: 'status',
                                },
                                {
                                    Header: 'Payment Method',
                                    accessor: 'payment_method',
                                },
                                {
                                    Header: 'Payment Url',
                                    accessor: 'payment_url',
                                },
                                {
                                    Header: 'Placed On',
                                    accessor: 'placed_on',
                                },
                                {
                                    Header: 'Coordinates',
                                    accessor: 'location_coordinates',
                                },
                                {
                                    Header: 'Address Line1',
                                    accessor: 'location_address_line_1',
                                },
                                {
                                    Header: 'Address Line 2',
                                    accessor: 'location_address_line_2',
                                },
                                {
                                    Header: 'City',
                                    accessor: 'location_city',
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
                                <h5>Are you sure you want to delete this booking?</h5>
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
                                        deleteBookings(deleteBooksId);
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
                                <h4 className={classes.modalTitle}>Add Booking</h4>
                            </DialogTitle>
                            <DialogContent
                                id="add-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="User ID"
                                        id="add_booking_id"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newUserId,
                                            onChange: (e) => setNnewUserId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Patient ID"
                                        id="add_examination"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPatientId,
                                            onChange: (e) => setNewPatientId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Start Datetime"
                                        id="add_diagnosis"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newStartDateTime,
                                            onChange: (e) => setNewStartDateTime(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="End Datetime"
                                        id="add_follow_up"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newEndDateTime,
                                            onChange: (e) => setNewEndDateTime(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Booking Type"
                                        id="add_medication"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBookingType,
                                            onChange: (e) => setNewBookingType(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Lap Test ID"
                                        id="add_body_temp"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newLapTestId,
                                            onChange: (e) => setNewLapTestId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Assigned Driver"
                                        id="add_pulse_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAssignedDriver,
                                            onChange: (e) => setNewAssignedDriver(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Assigned Van"
                                        id="add_respiration_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAssigned_van,
                                            onChange: (e) => setNewAssigned_van(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Assigned Doctor"
                                        id="add_blood_pressure"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAssignedDoctor,
                                            onChange: (e) => setNewAssignedDoctor(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Assigned Nurse"
                                        id="add_weight"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAssignedNurse,
                                            onChange: (e) => setNewAssignedNurse(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Status"
                                        id="add_height"
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
                                        labelText="Payment Method"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPaymentMethod,
                                            onChange: (e) => setNewPaymentMethod(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Payment Url"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPaymentUrl,
                                            onChange: (e) => setNewPaymentUrl(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Placed On"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPlacedOn,
                                            onChange: (e) => setNewPlacedOn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Coordinates"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newCoordinates,
                                            onChange: (e) => setNewCoordinates(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Address Line1"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAddress1,
                                            onChange: (e) => setNewAddress1(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Address Line 2"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAddress2,
                                            onChange: (e) => setNewAddress2(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="City"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newCity,
                                            onChange: (e) => setNewCity(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)}>Cancel</Button>
                                <Button onClick={() => addBookings()} color="primary">Add</Button>
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
                                <h4 className={classes.modalTitle}>Edit Booking</h4>
                            </DialogTitle>
                            <DialogContent
                                id="edit-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="User ID"
                                        id="add_booking_id"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newUserId,
                                            onChange: (e) => setNnewUserId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Patient ID"
                                        id="add_examination"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPatientId,
                                            onChange: (e) => setNewPatientId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Start Datetime"
                                        id="add_diagnosis"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newStartDateTime,
                                            onChange: (e) => setNewStartDateTime(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="End Datetime"
                                        id="add_follow_up"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newEndDateTime,
                                            onChange: (e) => setNewEndDateTime(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Booking Type"
                                        id="add_medication"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBookingType,
                                            onChange: (e) => setNewBookingType(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Lap Test ID"
                                        id="add_body_temp"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newLapTestId,
                                            onChange: (e) => setNewLapTestId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Assigned Driver"
                                        id="add_pulse_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAssignedDriver,
                                            onChange: (e) => setNewAssignedDriver(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Assigned Van"
                                        id="add_respiration_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAssigned_van,
                                            onChange: (e) => setNewAssigned_van(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Assigned Doctor"
                                        id="add_blood_pressure"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAssignedDoctor,
                                            onChange: (e) => setNewAssignedDoctor(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Assigned Nurse"
                                        id="add_weight"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAssignedNurse,
                                            onChange: (e) => setNewAssignedNurse(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Status"
                                        id="add_height"
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
                                        labelText="Payment Method"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPaymentMethod,
                                            onChange: (e) => setNewPaymentMethod(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Payment Url"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPaymentUrl,
                                            onChange: (e) => setNewPaymentUrl(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Placed On"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPlacedOn,
                                            onChange: (e) => setNewPlacedOn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Coordinates"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newCoordinates,
                                            onChange: (e) => setNewCoordinates(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Address Line1"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAddress1,
                                            onChange: (e) => setNewAddress1(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Address Line 2"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAddress2,
                                            onChange: (e) => setNewAddress2(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="City"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newCity,
                                            onChange: (e) => setNewCity(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)}>Cancel</Button>
                                <Button onClick={() => updateBookings()} color="primary">Update</Button>
                            </DialogActions>
                        </Dialog>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}