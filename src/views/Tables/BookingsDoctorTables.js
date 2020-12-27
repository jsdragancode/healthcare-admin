import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import Datetime from 'react-datetime';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
// @material-ui/icons
import Dvr from '@material-ui/icons/Dvr';
import Close from '@material-ui/icons/Close';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Bookmark from '@material-ui/icons/Bookmark';
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
import Snackbar from "../../components/Snackbar/Snackbar.js";
import BookingHistory from "./BookingStatusHistoryTables.js";
import Transaction from "./TransactionTables.js";
import LabTest from "./LabTestTables.js";
import LabResult from "./LabResultTables.js";
import Consultation from "./ConsultationTables.js";
import LocationTracking from "./LocationTrackingTables.js";
import Doctors from "../Widgets/DoctorsTables.js";
import Drivers from "../Widgets/DriversTables.js";
import Nurses from "../Widgets/NursesTables.js";
import TrackVans from "../Widgets/TrackVansTables.js";
import Patients from "../Widgets/PatientsTables.js";
import Users from "../Widgets/UsersTables.js";
import ConsoleUsers from "../Widgets/ConsoleUsersTables.js";
import UserInstances from "../Widgets/UserInstanceIdTables.js";
import UserNotifcations from "../Widgets/UserNotificationTables.js";

import Table from 'components/Table/Table.js';
import { VectorMap } from 'react-jvectormap';

var mapData = {
    KP: 3760,
    KR: 3760,
    AU: 760,
    BR: 550,
    CA: 120,
    DE: 1300,
    FR: 540,
    GA: 540,
    GB: 690,
    GE: 200,
    IN: 200,
    SA: 600,
    RO: 600,
    RU: 300,
    US: 860,
};

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

export default function BookingsDoctorTables() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [showCard, setShowCard] = useState('flex');
    const [showState, setShowState] = useState(1);

    const [deleteBooksId, setDeleteBooksId] = useState(null);
    const [bookingId, setBookingId] = useState('');
    const [id, setId] = useState('');
    const [newUserId, setNnewUserId] = useState('');
    const [newPatientId, setNewPatientId] = useState('');
    const [newStartDateTime, setNewStartDateTime] = useState('');
    const [newEndDateTime, setNewEndDateTime] = useState('');
    const [newBookingType, setNewBookingType] = useState('');
    const [newLabTestId, setNewLabTestId] = useState('');
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
    const [newPrice, setNewPrice] = useState('');
    const [newVat, setNewVat] = useState('');
    const [newTotalPrice, setNewTotalPrice] = useState('');
    const [consoleUserId, setConsoleUserId] = useState('');
    const [userId, setUserId] = useState('');
    const [failed, setFailed] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [deleteFailed, setDeleteFailed] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);

    const classes = useStyles();

    const setBookingsParam = (info) => {
        const { id, user_id, patient_id, start_datetime, end_datetime, booking_type, lab_test_id, assigned_driver, assigned_van, assigned_doctor, assigned_nurse, status, payment_method, payment_url, placed_on, location_coordinates, location_address_line_1, location_address_line_2, location_city, price, vat, total_price } = info;
        setId(id);
        setNnewUserId(user_id);
        setNewPatientId(patient_id);
        setNewStartDateTime(start_datetime);
        setNewEndDateTime(end_datetime);
        setNewBookingType(booking_type);
        setNewLabTestId(lab_test_id);
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
        setNewPrice(price);
        setNewVat(vat);
        setNewTotalPrice(price + vat);
    };

    const selectBook = (info) => {
        setShowCard('none');
        setShowState(2);
        setId(info.id);
        setBookingId(info.id);
        setNnewUserId(info.user_id);
        setNewPatientId(info.patient_id);
        setNewStartDateTime(info.start_datetime);
        setNewEndDateTime(info.end_datetime);
        setNewBookingType(info.booking_type);
        setNewLabTestId(info.lab_test_id);
        setNewAssignedDriver(info.assigned_driver);
        setNewAssigned_van(info.assigned_van);
        setNewAssignedDoctor(info.assigned_doctor);
        setNewAssignedNurse(info.assigned_nurse);
        setNewStatus(info.status);
        setNewPaymentMethod(info.payment_method);
        setNewPaymentUrl(info.payment_url);
        setNewPlacedOn(info.placed_on);
        setNewCoordinates(info.location_coordinates);
        setNewAddress1(info.location_address_line_1);
        setNewAddress2(info.location_address_line_2);
        setNewCity(info.location_city);
        setNewPrice(info.price);
        setNewVat(info.vat);
        setNewTotalPrice(info.price + info.vat);
    };

    const handleDoctorCallback = (info) => {
        setConsoleUserId(info);
        setShowState(3);
    }

    const handleUserCallback = (info) => {
        setUserId(info);
        setShowState(4);
    }

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
                            selectBook(info);
                        }}
                        color="success"
                        className="like"
                    >
                        <Visibility />
                    </Button>{' '}
                    {/* <Button
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
                    </Button> */}
                </div>
            ),
        };
    };

    const getBookings = () => {
        axios.get('/api/bookings/').then((res) => {
            setData(res.data.bookings.map((prop) => makeTableRow(prop)));
        });
    };

    useEffect(getBookings, []);

    const deleteBookings = (deleteId) => {
        axios
            .delete(`/api/bookings/${deleteId}`).then(() => {
                setData(data.filter((prop) => prop.id !== deleteId));
                setDeleteSuccess(true);
                setTimeout(function () {
                    setDeleteSuccess(false);
                }, 3000);
            })
            .catch((e) => {
                console.log(e);
                setDeleteFailed(true);
                setTimeout(function () {
                    setDeleteFailed(false);
                }, 3000);
            });
    };

    const addBookings = () => {
        axios
            .post('/api/bookings/', {
                id: id,
                user_id: newUserId,
                patient_id: newPatientId,
                start_datetime: newStartDateTime,
                end_datetime: newEndDateTime,
                booking_type: newBookingType,
                lab_test_id: newLabTestId,
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
                price: newPrice,
                vat: newVat,
                total_price: newPrice + newVat,
            })
            .then((res) => {
                setData([...data, makeTableRow(res.data.booking)]);
                setAddModal(false);

                setSuccess(true);
                setTimeout(function () {
                    setSuccess(false);
                }, 3000);
            })
            .catch((e) => {
                console.log(e);
                setFailed(true);
                setTimeout(function () {
                    setFailed(false);
                }, 3000);
            });
    };

    const updateBookings = () => {
        axios
            .patch(`/api/bookings/${deleteBooksId}`, {
                id: id,
                user_id: newUserId,
                patient_id: newPatientId,
                start_datetime: newStartDateTime,
                end_datetime: newEndDateTime,
                booking_type: newBookingType,
                lab_test_id: newLabTestId,
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
                price: newPrice,
                vat: newVat,
                total_price: newPrice + newVat,
            })
            .then((res) => {
                setData(
                    data.map((prop) =>
                        prop.id === deleteBooksId ? makeTableRow(res.data.booking) : prop
                    )
                );
                setEditModal(false);

                setUpdateSuccess(true);
                setTimeout(function () {
                    setUpdateSuccess(false);
                }, 3000);
            })
            .catch((e) => {
                console.log(e);
                setUpdateFailed(true);
                setTimeout(function () {
                    setUpdateFailed(false);
                }, 3000);
            });
    };

    return (
        <GridContainer>
            <GridItem xs={12}>
                {/* {moment().format('HH:mm:ss.SSS')} */}
                <Card style={{ display: showCard }}>
                    <CardHeader color="warning" icon>
                        <CardIcon color="warning">
                            <Bookmark />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Bookings</h4>
                    </CardHeader>
                    <CardBody>
                        {/* <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="warning"
                                    onClick={() => {
                                        setBookingsParam({
                                            id: '',
                                            user_id: '',
                                            patient_id: '',
                                            start_datetime: '',
                                            end_datetime: '',
                                            booking_type: '',
                                            lab_test_id: '',
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
                                            price: '',
                                            vat: '',
                                            total_price: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add Booking
                                </Button>
                            </GridItem>
                        </GridContainer> */}
                        <ReactTableBottomPagination
                            columns={[
                                {
                                    Header: 'ID',
                                    accessor: 'id',
                                },
                                // {
                                //     Header: 'User ID',
                                //     accessor: 'user_id',
                                // },
                                // {
                                //     Header: 'Patient ID',
                                //     accessor: 'patient_id',
                                // },
                                {
                                    Header: 'Start',
                                    accessor: 'start_datetime',
                                },
                                {
                                    Header: 'End',
                                    accessor: 'end_datetime',
                                },
                                {
                                    Header: 'Type',
                                    accessor: 'booking_type',
                                },
                                // {
                                //     Header: 'Lab Test ID',
                                //     accessor: 'lab_test_id',
                                // },
                                // {
                                //     Header: 'Assigned Driver',
                                //     accessor: 'assigned_driver',
                                // },
                                // {
                                //     Header: 'Assigned Van',
                                //     accessor: 'assigned_van',
                                // },
                                // {
                                //     Header: 'Assigned Doctor',
                                //     accessor: 'assigned_doctor',
                                // },
                                // {
                                //     Header: 'Assigned Nurse',
                                //     accessor: 'assigned_nurse',
                                // },
                                {
                                    Header: 'Status',
                                    accessor: 'status',
                                },
                                {
                                    Header: 'Pay Way',
                                    accessor: 'payment_method',
                                },
                                {
                                    Header: 'Pay Url',
                                    accessor: 'payment_url',
                                },
                                {
                                    Header: 'Placed On',
                                    accessor: 'placed_on',
                                },
                                // {
                                //     Header: 'Coordinate',
                                //     accessor: 'location_coordinates',
                                // },
                                // {
                                //     Header: 'Address1',
                                //     accessor: 'location_address_line_1',
                                // },
                                // {
                                //     Header: 'Address2',
                                //     accessor: 'location_address_line_2',
                                // },
                                {
                                    Header: 'City',
                                    accessor: 'location_city',
                                },
                                {
                                    Header: 'Price',
                                    accessor: 'price',
                                },
                                {
                                    Header: 'Vat',
                                    accessor: 'vat',
                                },
                                // {
                                //     Header: 'Total',
                                //     accessor: 'total_price',
                                // },
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
                                    <br />
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'Start Datetime', }}
                                            onChange={(e) => setNewStartDateTime(e)}
                                            value={newStartDateTime}
                                        />
                                    </FormControl>
                                    <br />
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'End Datetime', }}
                                            onChange={(e) => setNewEndDateTime(e)}
                                            value={newEndDateTime}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Booking Type
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newBookingType}
                                            onChange={(e) => setNewBookingType(e.target.value)}
                                            inputProps={{
                                                name: 'simpleSelect',
                                                id: 'simple-select',
                                            }}
                                        >
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="General physician"
                                            >
                                                General physician
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Laboratory test"
                                            >
                                                Laboratory test
                                            </MenuItem>

                                        </Select>
                                    </FormControl>
                                    <CustomInput
                                        labelText="Lab Test ID"
                                        id="add_body_temp"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newLabTestId,
                                            onChange: (e) => setNewLabTestId(e.target.value),
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

                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Status
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value)}
                                            inputProps={{
                                                name: 'simpleSelect',
                                                id: 'simple-select',
                                            }}
                                        >
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Booking Placed"
                                            >
                                                Booking Placed
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Team Assigned"
                                            >
                                                Team Assigned
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Van Dispatched"
                                            >
                                                Van Dispatched
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Van Reached"
                                            >
                                                Van Reached
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Service Provided"
                                            >
                                                Service Provided
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Payment Failed"
                                            >
                                                Payment Failed
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Booking Cancelled"
                                            >
                                                Booking Cancelled
                                            </MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Payment Method
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newPaymentMethod}
                                            onChange={(e) => setNewPaymentMethod(e.target.value)}
                                            inputProps={{
                                                name: 'simpleSelect',
                                                id: 'simple-select',
                                            }}
                                        >
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="VISA / Mastercard Credit Card"
                                            >
                                                VISA / Mastercard Credit Card
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Benefit Debit Card"
                                            >
                                                Benefit Debit Card
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="insurance"
                                            >
                                                insurance
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
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
                                    <br />
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'Placed On', }}
                                            onChange={(e) => setNewPlacedOn(e)}
                                            value={newPlacedOn}
                                        />
                                    </FormControl>
                                    <br />
                                    <br />
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
                                    <CustomInput
                                        labelText="Price"
                                        id="add_price"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPrice,
                                            onChange: (e) => setNewPrice(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Vat"
                                        id="add_vat"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newVat,
                                            onChange: (e) => setNewVat(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Total Price"
                                        id="add_total_price"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTotalPrice,
                                            onChange: (e) => setNewTotalPrice(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)} style={{ background: '#041F5D' }}>Cancel</Button>
                                <Button onClick={() => addBookings()} color="warning">Add</Button>
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
                                    <br />
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'Start Datetime', }}
                                            onChange={(e) => setNewStartDateTime(e)}
                                            value={newStartDateTime}
                                        />
                                    </FormControl>
                                    <br />
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'End Datetime', }}
                                            onChange={(e) => setNewEndDateTime(e)}
                                            value={newEndDateTime}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Booking Type
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newBookingType}
                                            onChange={(e) => setNewBookingType(e.target.value)}
                                            inputProps={{
                                                name: 'simpleSelect',
                                                id: 'simple-select',
                                            }}
                                        >
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="General physician"
                                            >
                                                General physician
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Laboratory test"
                                            >
                                                Laboratory test
                                            </MenuItem>

                                        </Select>
                                    </FormControl>

                                    <CustomInput
                                        labelText="Lab Test ID"
                                        id="add_body_temp"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newLabTestId,
                                            onChange: (e) => setNewLabTestId(e.target.value),
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

                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Status
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value)}
                                            inputProps={{
                                                name: 'simpleSelect',
                                                id: 'simple-select',
                                            }}
                                        >
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Booking Placed"
                                            >
                                                Booking Placed
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Team Assigned"
                                            >
                                                Team Assigned
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Van Dispatched"
                                            >
                                                Van Dispatched
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Van Reached"
                                            >
                                                Van Reached
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Service Provided"
                                            >
                                                Service Provided
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Payment Failed"
                                            >
                                                Payment Failed
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Booking Cancelled"
                                            >
                                                Booking Cancelled
                                            </MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Payment Method
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newPaymentMethod}
                                            onChange={(e) => setNewPaymentMethod(e.target.value)}
                                            inputProps={{
                                                name: 'simpleSelect',
                                                id: 'simple-select',
                                            }}
                                        >
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="VISA / Mastercard Credit Card"
                                            >
                                                VISA / Mastercard Credit Card
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Benefit Debit Card"
                                            >
                                                Benefit Debit Card
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="insurance"
                                            >
                                                insurance
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
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
                                    <br />
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'Placed On', }}
                                            onChange={(e) => setNewPlacedOn(e)}
                                            value={newPlacedOn}
                                        />
                                    </FormControl>
                                    <br />
                                    <br />
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
                                    <CustomInput
                                        labelText="Price"
                                        id="add_price"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPrice,
                                            onChange: (e) => setNewPrice(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Vat"
                                        id="add_vat"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newVat,
                                            onChange: (e) => setNewVat(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Total Price"
                                        id="add_total_price"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTotalPrice,
                                            onChange: (e) => setNewTotalPrice(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)} style={{ background: '#041F5D' }}>Cancel</Button>
                                <Button onClick={() => updateBookings()} color="warning">Update</Button>
                            </DialogActions>
                        </Dialog>

                        <Snackbar
                            place="tr"
                            color="success"
                            // icon={AddAlert}
                            message="Your new data was added successfully."
                            open={success}
                            closeNotification={() => setSuccess(false)}
                            close
                        />
                        <Snackbar
                            place="tr"
                            color="rose"
                            // icon={AddAlert}
                            message="Failed to add new data. Please try again."
                            open={failed}
                            closeNotification={() => setFailed(false)}
                            close
                        />
                        <Snackbar
                            place="tr"
                            color="success"
                            // icon={AddAlert}
                            message="Your new data was updated successfully."
                            open={updateSuccess}
                            closeNotification={() => setUpdateSuccess(false)}
                            close
                        />
                        <Snackbar
                            place="tr"
                            color="rose"
                            // icon={AddAlert}
                            message="Failed to update new data. Please try again."
                            open={updateFailed}
                            closeNotification={() => setUpdateFailed(false)}
                            close
                        />
                        <Snackbar
                            place="tr"
                            color="success"
                            // icon={AddAlert}
                            message="Your new data was deleted successfully."
                            open={deleteSuccess}
                            closeNotification={() => setDeleteSuccess(false)}
                            close
                        />
                        <Snackbar
                            place="tr"
                            color="rose"
                            // icon={AddAlert}
                            message="Failed to delete data. Please try again."
                            open={deleteFailed}
                            closeNotification={() => setDeleteFailed(false)}
                            close
                        />
                    </CardBody>
                </Card>
                {showState == 2 &&
                    (
                        <div>
                            <GridContainer>
                                <GridItem xs={12}>
                                    <Card style={{ display: 'flex' }}>
                                        <CardHeader color="warning" icon>
                                            <CardIcon color="warning">
                                                <Bookmark />
                                            </CardIcon>
                                            <h4 className={classes.cardIconTitle}>
                                                Booking Info
                                            </h4>
                                        </CardHeader>
                                        <CardBody>
                                            <GridContainer justify="space-between">
                                                <GridItem xs={12} sm={12} md={5}>
                                                    <Table
                                                        tableData={[
                                                            [
                                                                'ID',
                                                                id,
                                                            ],
                                                            [
                                                                'User ID',
                                                                newUserId,
                                                            ],
                                                            [
                                                                'Patient ID',
                                                                newPatientId,
                                                            ],
                                                            [
                                                                'Start Datetime',
                                                                newStartDateTime,
                                                            ],
                                                            [
                                                                'End Datetime',
                                                                newEndDateTime,
                                                            ],
                                                            [
                                                                'Booking Type',
                                                                newBookingType,
                                                            ],
                                                            [
                                                                'Lab Test ID',
                                                                newLabTestId,
                                                            ],
                                                            [
                                                                'Assigned Driver',
                                                                newAssignedDriver,
                                                            ],
                                                            [
                                                                'Assigned Van',
                                                                newAssigned_van,
                                                            ],
                                                            [
                                                                'Assigned Doctor',
                                                                newAssignedDoctor,
                                                            ],
                                                            [
                                                                'Assigned Nurse',
                                                                newAssignedNurse
                                                            ],
                                                            [
                                                                'Status',
                                                                newStatus,
                                                            ],
                                                            [
                                                                'Payment Method',
                                                                newPaymentMethod,
                                                            ],
                                                            [
                                                                'Payment URL',
                                                                newPaymentUrl,
                                                            ],
                                                            [
                                                                'Placed On',
                                                                newPlacedOn,
                                                            ],
                                                            [
                                                                'Coordinates',
                                                                newCoordinates,
                                                            ],
                                                            [
                                                                'Address Line 1',
                                                                newAddress1,
                                                            ],
                                                            [
                                                                'Address Line 2',
                                                                newAddress2,
                                                            ],
                                                            [
                                                                'City',
                                                                newCity,
                                                            ],
                                                            [
                                                                'Price',
                                                                newPrice,
                                                            ],
                                                            [
                                                                'Vat',
                                                                newVat,
                                                            ],
                                                            [
                                                                'Total Price',
                                                                newPrice + newVat,
                                                            ],
                                                        ]}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <VectorMap
                                                        map={'world_mill'}
                                                        backgroundColor="transparent"
                                                        zoomOnScroll={false}
                                                        containerStyle={{
                                                            width: '100%',
                                                            height: '280px',
                                                        }}
                                                        containerClassName="map"
                                                        regionStyle={{
                                                            initial: {
                                                                fill: '#e4e4e4',
                                                                'fill-opacity': 0.9,
                                                                stroke: 'none',
                                                                'stroke-width': 0,
                                                                'stroke-opacity': 0,
                                                            },
                                                        }}
                                                        series={{
                                                            regions: [
                                                                {
                                                                    values: mapData,
                                                                    scale: ['#AAAAAA', '#444444'],
                                                                    normalizeFunction: 'polynomial',
                                                                },
                                                            ],
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>

                            {/* <BookingHistory bookingId={bookingId} />
                            <Users userId={newUserId} parentUserCallback={handleUserCallback} />
                            <Transaction bookingId={bookingId} />
                            <Patients patientId={newPatientId} />
                            <LabTest labTestId={newLabTestId} />
                            <LabResult bookingId={bookingId} />
                            <Consultation bookingId={bookingId} />
                            <LocationTracking bookingId={bookingId} />
                            <Doctors doctorId={newAssignedDoctor} parentDoctorCallback={handleDoctorCallback} />
                            <Nurses nurseId={newAssignedNurse} />
                            <Drivers driverId={newAssignedDriver} />
                            <TrackVans vanId={newAssigned_van} /> */}
                        </div>
                    )
                }

                {/* {showState == 3 &&
                    (
                        <div>
                            <ConsoleUsers consoleUserId={consoleUserId} />
                        </div>
                    )
                }

                {showState == 4 &&
                    (
                        <div>
                            <UserInstances userInstanceId={userId} />
                            <UserNotifcations userNotificationId={userId} />

                        </div>
                    )
                } */}
            </GridItem>
        </GridContainer>
    );
}
