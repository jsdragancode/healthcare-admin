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

export default function ConsultationDoctorTables() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [deleteConsId, setDeleteConsId] = useState(null);
    const [id, setId] = useState('');
    const [newBookingId, setNnewBookingId] = useState('');
    const [newExamination, setNewExamination] = useState('');
    const [newDiagnosis, setNewDiagnosis] = useState('');
    const [newFollowUp, setNewFollowUp] = useState('');
    const [newMedication, setNewMedication] = useState('');
    const [newBodyTemp, setNewBodyTemp] = useState('');
    const [newPulseRate, setNewPulseRate] = useState('');
    const [newRespirationRate, setNewRespirationRate] = useState('');
    const [newBloodPressure, setNewBloodPressure] = useState('');
    const [newWeight, setNewWeight] = useState('');
    const [newHeight, setNewHeight] = useState('');
    const [failed, setFailed] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [deleteFailed, setDeleteFailed] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);

    const classes = useStyles();

    const setConsultationParam = (info) => {
        const { id, booking_id, examination, diagnosis, follow_up, medication, body_temp, pulse_rate, respiration_rate, blood_pressure, weight, height, } = info;
        setId(id);
        setNnewBookingId(booking_id);
        setNewExamination(examination);
        setNewDiagnosis(diagnosis);
        setNewFollowUp(follow_up);
        setNewMedication(medication);
        setNewBodyTemp(body_temp);
        setNewPulseRate(pulse_rate);
        setNewRespirationRate(respiration_rate);
        setNewBloodPressure(blood_pressure);
        setNewWeight(weight);
        setNewHeight(height);
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
                            setConsultationParam(info);
                            setDeleteConsId(info.id);
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
                            setDeleteConsId(info.id);
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

    const getCons = () => {
        axios.get('/api/consultations/').then((res) => {
            setData(res.data.consultations.map((prop) => makeTableRow(prop)));
        });
    };

    useEffect(getCons, []);

    const delteCons = (deleteId) => {
        axios
            .delete(`/api/consultations/${deleteId}`).then(() => {
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

    const addCons = () => {
        axios
            .post('/api/consultations/', {
                booking_id: newBookingId,
                examination: newExamination,
                diagnosis: newDiagnosis,
                follow_up: newFollowUp,
                medication: newMedication,
                body_temp: newBodyTemp,
                pulse_rate: newPulseRate,
                respiration_rate: newRespirationRate,
                blood_pressure: newBloodPressure,
                weight: newWeight,
                height: newHeight,
            })
            .then((res) => {
                setData([...data, makeTableRow(res.data.consultation)]);
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

    const updateCons = () => {
        axios
            .patch(`/api/consultations/${deleteConsId}`, {
                booking_id: newBookingId,
                examination: newExamination,
                diagnosis: newDiagnosis,
                follow_up: newFollowUp,
                medication: newMedication,
                body_temp: newBodyTemp,
                pulse_rate: newPulseRate,
                respiration_rate: newRespirationRate,
                blood_pressure: newBloodPressure,
                weight: newWeight,
                height: newHeight,
            })
            .then((res) => {
                setData(
                    data.map((prop) =>
                        prop.id === deleteConsId ? makeTableRow(res.data.consultation) : prop
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
                <Card>
                    <CardHeader color="warning" icon>
                        <CardIcon color="warning">
                            <RecordVoiceOverIcon />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Consultation</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="warning"
                                    onClick={() => {
                                        setConsultationParam({
                                            booking_id: '',
                                            examination: '',
                                            diagnosis: '',
                                            follow_up: '',
                                            medication: '',
                                            body_temp: '',
                                            pulse_rate: '',
                                            respiration_rate: '',
                                            blood_pressure: '',
                                            weight: '',
                                            height: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add Consultation
                                </Button>
                            </GridItem>
                        </GridContainer>
                        <ReactTableBottomPagination
                            columns={[
                                {
                                    Header: 'ID',
                                    accessor: 'id',
                                },
                                // {
                                //     Header: 'Booking ID',
                                //     accessor: 'booking_id',
                                // },
                                {
                                    Header: 'Examination',
                                    accessor: 'examination',
                                },
                                {
                                    Header: 'Diagnosis',
                                    accessor: 'diagnosis',
                                },
                                {
                                    Header: 'Follow Up',
                                    accessor: 'follow_up',
                                },
                                {
                                    Header: 'Medication',
                                    accessor: 'medication',
                                },
                                {
                                    Header: 'Body Temp',
                                    accessor: 'body_temp',
                                },
                                {
                                    Header: 'Pulse Rate',
                                    accessor: 'pulse_rate',
                                },
                                {
                                    Header: 'Respiration Rate',
                                    accessor: 'respiration_rate',
                                },
                                {
                                    Header: 'Blood Pressure',
                                    accessor: 'blood_pressure',
                                },
                                {
                                    Header: 'Weight',
                                    accessor: 'weight',
                                },
                                {
                                    Header: 'Height',
                                    accessor: 'height',
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
                                <h5>Are you sure you want to delete this consu?</h5>
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
                                        delteCons(deleteConsId);
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
                                <h4 className={classes.modalTitle}>Add Consultation</h4>
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
                                            onChange: (e) => setNnewBookingId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Examination"
                                        id="add_examination"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newExamination,
                                            onChange: (e) => setNewExamination(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Diagnosis"
                                        id="add_diagnosis"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newDiagnosis,
                                            onChange: (e) => setNewDiagnosis(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Follow Up"
                                        id="add_follow_up"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newFollowUp,
                                            onChange: (e) => setNewFollowUp(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Medication"
                                        id="add_medication"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newMedication,
                                            onChange: (e) => setNewMedication(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Body Temp"
                                        id="add_body_temp"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBodyTemp,
                                            onChange: (e) => setNewBodyTemp(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Pulse Rate"
                                        id="add_pulse_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPulseRate,
                                            onChange: (e) => setNewPulseRate(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Respiration Rate"
                                        id="add_respiration_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newRespirationRate,
                                            onChange: (e) => setNewRespirationRate(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Blood Pressure"
                                        id="add_blood_pressure"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBloodPressure,
                                            onChange: (e) => setNewBloodPressure(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Weight"
                                        id="add_weight"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newWeight,
                                            onChange: (e) => setNewWeight(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Height"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newHeight,
                                            onChange: (e) => setNewHeight(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)} style={{ background: '#041F5D' }}>Cancel</Button>
                                <Button onClick={() => addCons()} color="warning">Add</Button>
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
                                <h4 className={classes.modalTitle}>Edit Consultation</h4>
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
                                            onChange: (e) => setNnewBookingId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Examination"
                                        id="add_examination"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newExamination,
                                            onChange: (e) => setNewExamination(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Diagnosis"
                                        id="add_diagnosis"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newDiagnosis,
                                            onChange: (e) => setNewDiagnosis(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Follow Up"
                                        id="add_follow_up"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newFollowUp,
                                            onChange: (e) => setNewFollowUp(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Medication"
                                        id="add_medication"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newMedication,
                                            onChange: (e) => setNewMedication(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Body Temp"
                                        id="add_body_temp"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBodyTemp,
                                            onChange: (e) => setNewBodyTemp(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Pulse Rate"
                                        id="add_pulse_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPulseRate,
                                            onChange: (e) => setNewPulseRate(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Respiration Rate"
                                        id="add_respiration_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newRespirationRate,
                                            onChange: (e) => setNewRespirationRate(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Blood Pressure"
                                        id="add_blood_pressure"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBloodPressure,
                                            onChange: (e) => setNewBloodPressure(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Weight"
                                        id="add_weight"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newWeight,
                                            onChange: (e) => setNewWeight(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Height"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newHeight,
                                            onChange: (e) => setNewHeight(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)} style={{ background: '#041F5D' }}>Cancel</Button>
                                <Button onClick={() => updateCons()} color="warning">Update</Button>
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
            </GridItem>
        </GridContainer>
    );
}
