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
import AddAlert from '@material-ui/icons/AddAlert';
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

export default function UserNotificationTables() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteUserNotificationId, setDeleteUserNotificationId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [newUserId, setNewUserId] = useState('');
    const [newOnDatetime, setNewOnDatetime] = useState('');
    const [newIsRead, setNewIsRead] = useState('');
    const classes = useStyles();
    const [failed, setFailed] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const setUserNotification = (info) => {
        const { title, message, user_id, on_datetime, is_read, } = info;

        setNewTitle(title);
        setNewMessage(message);
        setNewUserId(user_id);
        setNewOnDatetime(on_datetime);
        setNewIsRead(is_read);
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
                            setUserNotification(info);
                            setDeleteUserNotificationId(info.id);
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
                            setDeleteUserNotificationId(info.id);
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

    const getUserNotification = () => {
        axios.get('/api/userNotifications/').then((res) => {
            // console.log('get', res.data.userNotifications);
            setData(res.data.userNotifications.map((prop) => makeTableRow(prop)));
        });
    };

    useEffect(getUserNotification, []);

    const delteUserNotification = (deleteId) => {
        axios.delete(`/api/userNotifications/${deleteId}`).then(() => {
            setData(data.filter((prop) => prop.id !== deleteId));
        });
    };

    const addUserNotification = () => {
        const userId = parseInt(Math.random() * 10000);
        const onDate = moment().format();
        const isRead = '0';

        const randCheck = parseInt(Math.random() * 10)

        if (randCheck < 5) {
            // setData([...data, makeTableRow(res.data.userNotification)]);
            setAddModal(false);
            setFailed(true);
            setTimeout(function () {
                setFailed(false);
            }, 3000);
        } else {
            axios
                .post('/api/userNotifications/', {
                    title: newTitle,
                    message: newMessage,
                    // user_id: newUserId,
                    // on_datetime: newOnDatetime,
                    // is_read: newIsRead,
                    user_id: userId,
                    on_datetime: onDate,
                    is_read: isRead,
                })
                .then((res) => {
                    setData([...data, makeTableRow(res.data.userNotification)]);
                    setAddModal(false);

                    setSuccess(true);
                    setTimeout(function () {
                        setSuccess(false);
                    }, 3000);
                });
        }

    };

    const updateUserNotification = () => {
        axios
            .patch(`/api/userNotifications/${deleteUserNotificationId}`, {
                title: newTitle,
                message: newMessage,
                user_id: newUserId,
                on_datetime: newOnDatetime,
                is_read: newIsRead,
            })
            .then((res) => {
                setData(
                    data.map((prop) =>
                        prop.id === deleteUserNotificationId ? makeTableRow(res.data.userNotification) : prop
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
                            <AddAlert />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>User Notification</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setUserNotification({
                                            title: '',
                                            message: '',
                                            user_id: '',
                                            on_datetime: '',
                                            is_read: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add User Notification
                </Button>
                            </GridItem>
                        </GridContainer>
                        <ReactTableBottomPagination
                            columns={[
                                {
                                    Header: 'Title',
                                    accessor: 'title',
                                },
                                {
                                    Header: 'Message',
                                    accessor: 'message',
                                },
                                {
                                    Header: 'User ID',
                                    accessor: 'user_id',
                                },
                                {
                                    Header: 'On Datetime',
                                    accessor: 'on_datetime',
                                },
                                {
                                    Header: 'Is Read',
                                    accessor: 'is_read',
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
                                <h5>Are you sure you want to delete this user notification?</h5>
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
                                        delteUserNotification(deleteUserNotificationId);
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
                                <h4 className={classes.modalTitle}>Add User Notification</h4>
                            </DialogTitle>
                            <DialogContent
                                id="add-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Title"
                                        id="add_full_name_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTitle,
                                            onChange: (e) => setNewTitle(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Message"
                                        id="add_full_name_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            multiline: true,
                                            rows: 10,
                                            value: newMessage,
                                            onChange: (e) => setNewMessage(e.target.value),
                                        }}
                                    />
                                    {/* <CustomInput
                                        labelText="User ID"
                                        id="add_mobile_number"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newUserId,
                                            onChange: (e) => setNewUserId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="On Datetime"
                                        id="add_mobile_number"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newOnDatetime,
                                            onChange: (e) => setNewOnDatetime(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Is Read"
                                        id="add_mobile_number"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newIsRead,
                                            onChange: (e) => setNewIsRead(e.target.value),
                                        }}
                                    /> */}
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)}>Cancel</Button>
                                <Button onClick={() => addUserNotification()} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Snackbar
                            place="tr"
                            color="success"
                            // icon={AddAlert}
                            message="Congratulations! Your notification was pushed successfully."
                            open={success}
                            closeNotification={() => setSuccess(false)}
                            close
                        />
                        <Snackbar
                            place="tr"
                            color="rose"
                            // icon={AddAlert}
                            message="Sorry, but your notification was failed. "
                            open={failed}
                            closeNotification={() => setFailed(false)}
                            close
                        />
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
                                <h4 className={classes.modalTitle}>Edit User Notification</h4>
                            </DialogTitle>
                            <DialogContent
                                id="edit-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Title"
                                        id="add_full_name_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTitle,
                                            onChange: (e) => setNewTitle(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Message"
                                        id="add_full_name_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newMessage,
                                            multiline: true,
                                            rows: 10,
                                            onChange: (e) => setNewMessage(e.target.value),
                                        }}
                                    />
                                    {/* <CustomInput
                                        labelText="User ID"
                                        id="add_mobile_number"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newUserId,
                                            onChange: (e) => setNewUserId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="On Datetime"
                                        id="add_mobile_number"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newOnDatetime,
                                            onChange: (e) => setNewOnDatetime(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Is Read"
                                        id="add_mobile_number"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newIsRead,
                                            onChange: (e) => setNewIsRead(e.target.value),
                                        }}
                                    /> */}
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)}>Cancel</Button>
                                <Button onClick={() => updateUserNotification()} color="primary">
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
