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
// @material-ui/icons
import Dvr from '@material-ui/icons/Dvr';
import Close from '@material-ui/icons/Close';
import Colorize from '@material-ui/icons/Colorize';
import CreditCard from '@material-ui/icons/CreditCard';

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

export default function TransactionTables(props) {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [deleteTransactionId, setDeleteTransactionId] = useState(null);
    const [id, setId] = useState('');
    const [newBookingId, setNewBookingId] = useState('');
    const [newChargeId, setNewChargeId] = useState('');
    const [newTrackCode, setNewTrackCode] = useState('');
    const [newPaymentCode, setNewPaymentCode] = useState('');
    const [newGatewayCode, setNewGatewayCode] = useState('');
    const [newTransactionCode, setNewTransactionCode] = useState('');
    const [newOrderCode, setNewOrderCode] = useState('');
    const [newSecretHash, setNewSecretHash] = useState('');
    const [newResult, setNewResult] = useState('');
    const [newIsSuccess, setNewIsSuccess] = useState('');
    const [newCreatedOn, setNewCreatedOn] = useState('');
    const [failed, setFailed] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [deleteFailed, setDeleteFailed] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);

    const classes = useStyles();

    const setTransactionParam = (info) => {
        const { id, booking_id, charge_id, track_code, payment_code, gateway_code, transaction_code, order_code, secret_hash, result_text, is_success, created_on } = info;
        setId(id);
        setNewBookingId(booking_id);
        setNewChargeId(charge_id);
        setNewTrackCode(track_code);
        setNewPaymentCode(payment_code);
        setNewGatewayCode(gateway_code);
        setNewTransactionCode(transaction_code);
        setNewOrderCode(order_code);
        setNewSecretHash(secret_hash);
        setNewResult(result_text);
        setNewIsSuccess(is_success);
        setNewCreatedOn(created_on);
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
                            setTransactionParam(info);
                            setDeleteTransactionId(info.id);
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
                            setDeleteTransactionId(info.id);
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

    const getTransaction = () => {
        axios.get(`/api/transactions/${props.bookingId}`).then((res) => {
            setData([makeTableRow(res.data.transaction)]);
        });
    };

    useEffect(getTransaction, []);

    const deleteTransaction = (deleteId) => {
        axios
            .delete(`/api/transactions/${deleteId}`).then(() => {
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

    const addTransaction = () => {
        axios
            .post('/api/transactions/', {
                booking_id: newBookingId,
                charge_id: newChargeId,
                track_code: newTrackCode,
                payment_code: newPaymentCode,
                gateway_code: newGatewayCode,
                transaction_code: newTransactionCode,
                order_code: newOrderCode,
                secret_hash: newSecretHash,
                result_text: newResult,
                is_success: newIsSuccess,
                created_on: newCreatedOn,
            })
            .then((res) => {
                setData([...data, makeTableRow(res.data.transaction)]);
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

    const updateTransaction = () => {
        axios
            .patch(`/api/transactions/${deleteTransactionId}`, {
                booking_id: newBookingId,
                charge_id: newChargeId,
                track_code: newTrackCode,
                payment_code: newPaymentCode,
                gateway_code: newGatewayCode,
                transaction_code: newTransactionCode,
                order_code: newOrderCode,
                secret_hash: newSecretHash,
                result_text: newResult,
                is_success: newIsSuccess,
                created_on: newCreatedOn,
            })
            .then((res) => {
                setData(
                    data.map((prop) =>
                        prop.id === deleteTransactionId ? makeTableRow(res.data.transaction) : prop
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
                            <CreditCard />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Transaction</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="warning"
                                    onClick={() => {
                                        setTransactionParam({
                                            booking_id: '',
                                            charge_id: '',
                                            track_code: '',
                                            payment_code: '',
                                            gateway_code: '',
                                            transaction_code: '',
                                            order_code: '',
                                            secret_hash: '',
                                            result_text: '',
                                            is_success: '',
                                            created_on: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add Transaction
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
                                    Header: 'Charge ID',
                                    accessor: 'charge_id',
                                },
                                {
                                    Header: 'Track Code',
                                    accessor: 'track_code',
                                },
                                {
                                    Header: 'Payment Code',
                                    accessor: 'payment_code',
                                },
                                {
                                    Header: 'Gateway Code',
                                    accessor: 'gateway_code',
                                },
                                {
                                    Header: 'Transaction Code',
                                    accessor: 'transaction_code',
                                },
                                {
                                    Header: 'Order Code',
                                    accessor: 'order_code',
                                },
                                {
                                    Header: 'Secret Hash',
                                    accessor: 'secret_hash',
                                },
                                {
                                    Header: 'Result',
                                    accessor: 'result_text',
                                }, {
                                    Header: 'Success',
                                    accessor: 'is_success',
                                },
                                {
                                    Header: 'Created On',
                                    accessor: 'created_on',
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
                                        deleteTransaction(deleteTransactionId);
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
                                <h4 className={classes.modalTitle}>Add Transaction</h4>
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
                                        labelText="Charge ID"
                                        id="add_charge_id"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newChargeId,
                                            onChange: (e) => setNewChargeId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Track Code"
                                        id="add_track_code"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTrackCode,
                                            onChange: (e) => setNewTrackCode(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Payment Code"
                                        id="add_payment_code"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPaymentCode,
                                            onChange: (e) => setNewPaymentCode(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Gateway Code"
                                        id="add_gateway_code"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newGatewayCode,
                                            onChange: (e) => setNewGatewayCode(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Transaction Code"
                                        id="add_transaction_code"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTransactionCode,
                                            onChange: (e) => setNewTransactionCode(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Order Code"
                                        id="add_order_code"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newOrderCode,
                                            onChange: (e) => setNewOrderCode(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Secret Hash"
                                        id="add_secret_hash"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newSecretHash,
                                            onChange: (e) => setNewSecretHash(e.target.value),
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

                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Success
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newIsSuccess}
                                            onChange={(e) => setNewIsSuccess(e.target.value)}
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
                                                value="Yes"
                                            >
                                                Yes
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="No"
                                            >
                                                No
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <br />
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'Created On', }}
                                            onChange={(e) => setNewCreatedOn(e)}
                                            value={newCreatedOn}
                                        />
                                    </FormControl>
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)} style={{ background: '#041F5D' }}>Cancel</Button>
                                <Button onClick={() => addTransaction()} color="warning">Add</Button>
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
                                <h4 className={classes.modalTitle}>Edit Transaction</h4>
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
                                        labelText="Charge ID"
                                        id="add_charge_id"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newChargeId,
                                            onChange: (e) => setNewChargeId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Track Code"
                                        id="add_track_code"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTrackCode,
                                            onChange: (e) => setNewTrackCode(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Payment Code"
                                        id="add_payment_code"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPaymentCode,
                                            onChange: (e) => setNewPaymentCode(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Gateway Code"
                                        id="add_gateway_code"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newGatewayCode,
                                            onChange: (e) => setNewGatewayCode(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Transaction Code"
                                        id="add_transaction_code"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTransactionCode,
                                            onChange: (e) => setNewTransactionCode(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Order Code"
                                        id="add_order_code"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newOrderCode,
                                            onChange: (e) => setNewOrderCode(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Secret Hash"
                                        id="add_secret_hash"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newSecretHash,
                                            onChange: (e) => setNewSecretHash(e.target.value),
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
                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Success
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newIsSuccess}
                                            onChange={(e) => setNewIsSuccess(e.target.value)}
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
                                                value="Yes"
                                            >
                                                Yes
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="No"
                                            >
                                                No
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <br />
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'Created On', }}
                                            onChange={(e) => setNewCreatedOn(e)}
                                            value={newCreatedOn}
                                        />
                                    </FormControl>
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)} style={{ background: '#041F5D' }}>Cancel</Button>
                                <Button onClick={() => updateTransaction()} color="warning">
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
