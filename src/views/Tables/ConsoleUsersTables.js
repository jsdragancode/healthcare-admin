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
import AssignmentInd from '@material-ui/icons/AssignmentInd';
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

export default function ConsoleUsersTables() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedConsoleUserId, setSelectedConsoleUserId] = useState(null);

    const [newUserName, setNewUserName] = useState('');
    const [newPasswordHash, setNewPasswordHash] = useState('');
    const [newRole, setNewRole] = useState('');
    const [newLastLogin, setNewLastLogin] = useState('');
    const [newLastFailedLogin, setNewLastFailedLogin] = useState('');
    const [newConsecutiveFailedLoginsCount, setNewConsecutiveFailedLoginsCount] = useState('');
    const [newDoctorId, setNewDoctorId] = useState('');

    const classes = useStyles();

    const setConsoleUsersParam = (info) => {
        const {
            username,
            password_hash,
            role,
            last_login,
            last_failed_login,
            consecutive_failed_logins_count,
            doctor_id,
        } = info;

        setNewUserName(username);
        setNewPasswordHash(password_hash);
        setNewRole(role);
        setNewLastLogin(last_login);
        setNewLastFailedLogin(last_failed_login);
        setNewConsecutiveFailedLoginsCount(consecutive_failed_logins_count);
        setNewDoctorId(doctor_id);
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
                            setConsoleUsersParam(info);
                            setSelectedConsoleUserId(info.id);
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
                            setSelectedConsoleUserId(info.id);
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

    const getConsoleUser = () => {
        axios.get('/api/consoleUsers/').then((res) => {
            setData(res.data.consoleUsers.map((prop) => makeTableRow(prop)));
        });
    };

    useEffect(getConsoleUser, []);

    const deleteConsoleUser = (deleteId) => {
        axios.delete(`/api/consoleUsers/${deleteId}`).then(() => {
            setData(data.filter((prop) => prop.id !== deleteId));
        });
    };

    const addConsoleUser = () => {
        axios
            .post('/api/consoleUsers/', {
                username: newUserName,
                password_hash: newPasswordHash,
                role: newRole,
                last_login: newLastLogin,
                last_failed_login: newLastFailedLogin,
                consecutive_failed_logins_count: newConsecutiveFailedLoginsCount,
                doctor_id: newDoctorId,
            })
            .then((res) => {
                setData([...data, makeTableRow(res.data.consoleUser)]);
                setAddModal(false);
            });
    };

    const updateConsoleUser = () => {
        axios
            .patch(`/api/consoleUsers/${selectedConsoleUserId}`, {
                username: newUserName,
                password_hash: newPasswordHash,
                role: newRole,
                last_login: newLastLogin,
                last_failed_login: newLastFailedLogin,
                consecutive_failed_logins_count: newConsecutiveFailedLoginsCount,
                doctor_id: newDoctorId,
            })
            .then((res) => {
                // console.log('patch', res.data.doctor);

                setData(
                    data.map((prop) =>
                        prop.id === selectedConsoleUserId ? makeTableRow(res.data.consoleUser) : prop
                    )
                );

                setConsoleUsersParam({
                    username: '',
                    password_hash: '',
                    role: '',
                    last_login: '',
                    last_failed_login: '',
                    consecutive_failed_logins_count: '',
                    doctor_id: '',
                });

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
                            <AssignmentInd />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Console users</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setConsoleUsersParam({
                                            username: '',
                                            password_hash: '',
                                            role: '',
                                            last_login: '',
                                            last_failed_login: '',
                                            consecutive_failed_logins_count: '',
                                            doctor_id: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add Console User
                </Button>
                            </GridItem>
                        </GridContainer>
                        <ReactTableBottomPagination
                            columns={[
                                {
                                    Header: 'User Name',
                                    accessor: 'username',
                                },
                                {
                                    Header: 'Password',
                                    accessor: 'password_hash',
                                },
                                {
                                    Header: 'Role',
                                    accessor: 'role',
                                },
                                {
                                    Header: 'Last Login',
                                    accessor: 'last_login',
                                },
                                {
                                    Header: 'Last Failed Login',
                                    accessor: 'last_failed_login',
                                },
                                {
                                    Header: 'Failed Login Count',
                                    accessor: 'consecutive_failed_logins_count',
                                },
                                {
                                    Header: 'Doctor ID',
                                    accessor: 'doctor_id',
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
                                <h5>Are you sure you want to delete this console user?</h5>
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
                                        deleteConsoleUser(selectedConsoleUserId);
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
                                <h4 className={classes.modalTitle}>Add Console User</h4>
                            </DialogTitle>
                            <DialogContent
                                id="add-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="User Name"
                                        id="add_test_name_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newUserName,
                                            onChange: (e) => setNewUserName(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Password"
                                        id="add_test_name_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPasswordHash,
                                            onChange: (e) => setNewPasswordHash(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Role"
                                        id="add_test_desc_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newRole,
                                            onChange: (e) => setNewRole(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Last Login"
                                        id="add_available"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newLastLogin,
                                            onChange: (e) => setNewLastLogin(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Last Failed Login"
                                        id="add_price"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newLastFailedLogin,
                                            onChange: (e) => setNewLastFailedLogin(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Failed Login Count"
                                        id="add_test_desc_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newConsecutiveFailedLoginsCount,
                                            onChange: (e) => setNewConsecutiveFailedLoginsCount(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Doctor ID"
                                        id="add_test_desc_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newDoctorId,
                                            onChange: (e) => setNewDoctorId(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)}>Cancel</Button>
                                <Button onClick={() => addConsoleUser()} color="primary">
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
                                <h4 className={classes.modalTitle}>Edit Console User</h4>
                            </DialogTitle>
                            <DialogContent
                                id="edit-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="User Name"
                                        id="add_test_name_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newUserName,
                                            onChange: (e) => setNewUserName(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Password"
                                        id="add_test_name_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPasswordHash,
                                            onChange: (e) => setNewPasswordHash(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Role"
                                        id="add_test_desc_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newRole,
                                            onChange: (e) => setNewRole(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Last Login"
                                        id="add_available"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newLastLogin,
                                            onChange: (e) => setNewLastLogin(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Last Failed Login"
                                        id="add_price"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newLastFailedLogin,
                                            onChange: (e) => setNewLastFailedLogin(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Failed Login Count"
                                        id="add_test_desc_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newConsecutiveFailedLoginsCount,
                                            onChange: (e) => setNewConsecutiveFailedLoginsCount(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Doctor ID"
                                        id="add_test_desc_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newDoctorId,
                                            onChange: (e) => setNewDoctorId(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)}>Cancel</Button>
                                <Button onClick={() => updateConsoleUser()} color="primary">
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
