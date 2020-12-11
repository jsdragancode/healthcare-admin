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
import Edit from '@material-ui/icons/Edit';
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

export default function LabTestTables() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedLabTestId, setSelectedLabTestId] = useState(null);

    const [newTestNameAr, setNewTestNameAr] = useState('');
    const [newTestNameEn, setNewTestNameEn] = useState('');
    const [newTestShortDescAr, setNewTestShortDescAr] = useState('');
    const [newTestShortDescEn, setNewTestShortDescEn] = useState('');
    const [newAvailable, setNewAvailable] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [failed, setFailed] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [deleteFailed, setDeleteFailed] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);

    const classes = useStyles();

    const setLabTestParam = (info) => {
        const {
            test_name_ar,
            test_name_en,
            test_short_desc_ar,
            test_short_desc_en,
            is_available,
            price,
        } = info;

        setNewTestNameAr(test_name_ar);
        setNewTestNameEn(test_name_en);
        setNewTestShortDescAr(test_short_desc_ar);
        setNewTestShortDescEn(test_short_desc_en);
        setNewAvailable(is_available);
        setNewPrice(price);
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
                            setLabTestParam(info);
                            setSelectedLabTestId(info.id);
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
                            setSelectedLabTestId(info.id);
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

    const getLabTest = () => {
        axios.get('/api/labtests/').then((res) => {
            setData(res.data.labtests.map((prop) => makeTableRow(prop)));
        });
    };

    useEffect(getLabTest, []);

    const delteLabTest = (deleteId) => {
        axios
            .delete(`/api/labtests/${deleteId}`).then(() => {
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

    const addLabTest = () => {
        axios
            .post('/api/labtests/', {
                test_name_ar: newTestNameAr,
                test_name_en: newTestNameEn,
                test_short_desc_ar: newTestShortDescAr,
                test_short_desc_en: newTestShortDescEn,
                is_available: newAvailable,
                price: newPrice,
            })
            .then((res) => {
                // console.log('post', res.data.doctor);
                setData([...data, makeTableRow(res.data.labtest)]);
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

    const updateDoctor = () => {
        axios
            .patch(`/api/labtests/${selectedLabTestId}`, {
                test_name_ar: newTestNameAr,
                test_name_en: newTestNameEn,
                test_short_desc_ar: newTestShortDescAr,
                test_short_desc_en: newTestShortDescEn,
                is_available: newAvailable,
                price: newPrice,
            })
            .then((res) => {
                // console.log('patch', res.data.doctor);

                setData(
                    data.map((prop) =>
                        prop.id === selectedLabTestId ? makeTableRow(res.data.labtest) : prop
                    )
                );

                setLabTestParam({
                    test_name_ar: '',
                    test_name_en: '',
                    test_short_desc_ar: '',
                    test_short_desc_en: '',
                    is_available: '',
                    price: '',
                });

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
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <Edit />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Lab Tests</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setLabTestParam({
                                            test_name_ar: '',
                                            test_name_en: '',
                                            test_short_desc_ar: '',
                                            test_short_desc_en: '',
                                            is_available: '',
                                            price: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add Lab Test
                </Button>
                            </GridItem>
                        </GridContainer>
                        <ReactTableBottomPagination
                            columns={[
                                {
                                    Header: 'Test Name AR',
                                    accessor: 'test_name_ar',
                                },
                                {
                                    Header: 'Test Name EN',
                                    accessor: 'test_name_en',
                                },
                                {
                                    Header: 'Test Desc AR',
                                    accessor: 'test_short_desc_ar',
                                },
                                {
                                    Header: 'Test Desc EN',
                                    accessor: 'test_short_desc_en',
                                },
                                {
                                    Header: 'Availalble',
                                    accessor: 'is_available',
                                },
                                {
                                    Header: 'Price',
                                    accessor: 'price',
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
                                <h5>Are you sure you want to delete this lab test?</h5>
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
                                        delteLabTest(selectedLabTestId);
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
                                <h4 className={classes.modalTitle}>Add Lab Test</h4>
                            </DialogTitle>
                            <DialogContent
                                id="add-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Test Name AR"
                                        id="add_test_name_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTestNameAr,
                                            onChange: (e) => setNewTestNameAr(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Test Name EM"
                                        id="add_test_name_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTestNameEn,
                                            onChange: (e) => setNewTestNameEn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Test Desc AR"
                                        id="add_test_desc_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTestShortDescAr,
                                            onChange: (e) => setNewTestShortDescAr(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Test Desc EN"
                                        id="add_test_desc_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTestShortDescEn,
                                            onChange: (e) => setNewTestShortDescEn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Available"
                                        id="add_available"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAvailable,
                                            onChange: (e) => setNewAvailable(e.target.value),
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
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)}>Cancel</Button>
                                <Button onClick={() => addLabTest()} color="primary">
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
                                <h4 className={classes.modalTitle}>Edit Doctor</h4>
                            </DialogTitle>
                            <DialogContent
                                id="edit-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Test Name AR"
                                        id="add_test_name_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTestNameAr,
                                            onChange: (e) => setNewTestNameAr(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Test Name EM"
                                        id="add_test_name_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTestNameEn,
                                            onChange: (e) => setNewTestNameEn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Test Desc AR"
                                        id="add_test_desc_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTestShortDescAr,
                                            onChange: (e) => setNewTestShortDescAr(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Test Desc EN"
                                        id="add_test_desc_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newTestShortDescEn,
                                            onChange: (e) => setNewTestShortDescEn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Available"
                                        id="add_available"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAvailable,
                                            onChange: (e) => setNewAvailable(e.target.value),
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
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)}>Cancel</Button>
                                <Button onClick={() => updateDoctor()} color="primary">
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
