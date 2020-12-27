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
import Colorize from '@material-ui/icons/Colorize';
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

export default function LabResultDoctorTables() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [deleteLabResultId, setDeleteLabResultId] = useState(null);
    const [id, setId] = useState('');
    const [newBookingId, setNewBookingId] = useState('');
    const [newFullNameEn, setNewFullNameEn] = useState('');
    const [newFullNameAr, setNewFullNameAr] = useState('');
    const [newResult, setNewResult] = useState('');
    const [failed, setFailed] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [deleteFailed, setDeleteFailed] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);

    const classes = useStyles();

    const setLabParam = (info) => {
        const { id, booking_id, line_name_en, line_name_ar, result } = info;
        setId(id);
        setNewBookingId(booking_id);
        setNewFullNameEn(line_name_en);
        setNewFullNameAr(line_name_ar);
        setNewResult(result);
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
                            setLabParam(info);
                            setDeleteLabResultId(info.id);
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
                            setDeleteLabResultId(info.id);
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

    const getLabResults = () => {
        axios.get('/api/labresults/').then((res) => {
            setData(res.data.labresults.map((prop) => makeTableRow(prop)));
        });
    };

    useEffect(getLabResults, []);

    const deleteLabResults = (deleteId) => {
        axios
            .delete(`/api/labresults/${deleteId}`).then(() => {
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

    const addLabResult = () => {
        axios
            .post('/api/labresults/', {
                booking_id: newBookingId,
                line_name_en: newFullNameEn,
                line_name_ar: newFullNameAr,
                result: newResult,
            })
            .then((res) => {
                setData([...data, makeTableRow(res.data.labresult)]);
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

    const updateLabResult = () => {
        axios
            .patch(`/api/labresults/${deleteLabResultId}`, {
                booking_id: newBookingId,
                line_name_en: newFullNameEn,
                line_name_ar: newFullNameAr,
                result: newResult,
            })
            .then((res) => {
                setData(
                    data.map((prop) =>
                        prop.id === deleteLabResultId ? makeTableRow(res.data.labresult) : prop
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
                            <Colorize />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Lab Results</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="warning"
                                    onClick={() => {
                                        setLabParam({
                                            booking_id: '',
                                            line_name_en: '',
                                            line_name_ar: '',
                                            result: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add Lab Result
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
                                    Header: 'Full Name EN',
                                    accessor: 'line_name_en',
                                },
                                {
                                    Header: 'Full Name AR',
                                    accessor: 'line_name_ar',
                                },
                                {
                                    Header: 'Result',
                                    accessor: 'result',
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
                                <h5>Are you sure you want to delete this lab result?</h5>
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
                                        deleteLabResults(deleteLabResultId);
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
                                <h4 className={classes.modalTitle}>Add Lab Result</h4>
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
                                        labelText="Full Name EN"
                                        id="add_full_name_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newFullNameEn,
                                            onChange: (e) => setNewFullNameEn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Full Name AR"
                                        id="add_full_name_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newFullNameAr,
                                            onChange: (e) => setNewFullNameAr(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Result"
                                        id="add_result"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newResult,
                                            onChange: (e) => setNewResult(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)} style={{ background: '#041F5D' }}>Cancel</Button>
                                <Button onClick={() => addLabResult()} color="warning">Add</Button>
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
                                <h4 className={classes.modalTitle}>Edit Lab</h4>
                            </DialogTitle>
                            <DialogContent
                                id="edit-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Booking ID"
                                        id="edit_booking_id"
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
                                        labelText="Full Name EN"
                                        id="edit_full_name_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newFullNameEn,
                                            onChange: (e) => setNewFullNameEn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Full Name AR"
                                        id="edit_full_name_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newFullNameAr,
                                            onChange: (e) => setNewFullNameAr(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Result"
                                        id="edit_result"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newResult,
                                            onChange: (e) => setNewResult(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)} style={{ background: '#041F5D' }}>Cancel</Button>
                                <Button onClick={() => updateLabResult()} color="warning">
                                    Update
                                </Button>
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
