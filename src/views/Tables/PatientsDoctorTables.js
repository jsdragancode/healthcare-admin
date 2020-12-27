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
import AccountCircle from '@material-ui/icons/AccountCircle';
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
import PictureUpload from 'components/CustomUpload/PictureUpload.js';

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

export default function PatientsDoctorTables() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [deletePatientId, setDeletePatientId] = useState(null);

    const [newFullNameEn, setNewFullNameEn] = useState('');
    const [id, setId] = useState('');
    const [newFullName, setNewFullName] = useState('');
    const [newGender, setNewGender] = useState('');
    const [newBirthday, setNewBirthday] = useState('');
    const [newCPRNumber, setNewCPRNumber] = useState('');
    const [newCPRFront, setNewCPRFront] = useState('');
    const [newCPRFrontURL, setNewCPRFrontURL] = useState('');
    const [newCPRBack, setNewCPRBack] = useState('');
    const [newCPRBackURL, setNewCPRBackURL] = useState('');
    const [newInsuranceFront, setNewInsuranceFront] = useState('');
    const [newInsuranceFrontURL, setNewInsuranceFrontURL] = useState('');
    const [newInsuranceBack, setNewInsuranceBack] = useState('');
    const [newInsuranceBackURL, setNewInsuranceBackURL] = useState('');
    const [newUserId, setUserId] = useState('');
    const [newIsUserMain, setNewIsUserMain] = useState('');
    const [newIsDeleted, setNewIsDeleted] = useState('');
    const [failed, setFailed] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [deleteFailed, setDeleteFailed] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);

    const [file, setFile] = React.useState(null);

    const classes = useStyles();

    let fileInput1 = React.createRef();
    let fileInput2 = React.createRef();
    let fileInput3 = React.createRef();
    let fileInput4 = React.createRef();

    const handleClick1 = () => {
        fileInput1.current.click();
    };

    const handleClick2 = () => {
        fileInput2.current.click();
    };

    const handleClick3 = () => {
        fileInput3.current.click();
    };

    const handleClick4 = () => {
        fileInput4.current.click();
    };

    const handleCPRFrontChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let newFile = e.target.files[0];
        reader.onloadend = () => {
            setFile(newFile);
            setNewCPRFrontURL(reader.result);
            setNewCPRFront(newFile.name);
        };
        if (newFile) {
            reader.readAsDataURL(newFile);
        }
    };

    const handleCPRBackChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let newFile = e.target.files[0];
        reader.onloadend = () => {
            setFile(newFile);
            setNewCPRBackURL(reader.result);
            setNewCPRBack(newFile.name);
        };
        if (newFile) {
            reader.readAsDataURL(newFile);
        }
    };

    const handleInsuranceFrontChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let newFile = e.target.files[0];
        reader.onloadend = () => {
            setFile(newFile);
            setNewInsuranceFrontURL(reader.result);
            setNewInsuranceFront(newFile.name);
        };
        if (newFile) {
            reader.readAsDataURL(newFile);
        }
    };

    const handleInsuranceBackChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let newFile = e.target.files[0];
        reader.onloadend = () => {
            setFile(newFile);
            setNewInsuranceBackURL(reader.result);
            setNewInsuranceBack(newFile.name);
        };
        if (newFile) {
            reader.readAsDataURL(newFile);
        }
    };

    const setPatientParam = (info) => {
        const { id, full_name, gender, date_of_birth, cpr_number, scanned_cpr_front, scanned_cpr_front_url, scanned_cpr_back, scanned_cpr_back_url, scanned_insurance_front, scanned_insurance_front_url, scanned_insurance_back, scanned_insurance_back_url, user_id, is_user_main, is_deleted } = info;
        setId(id);
        setNewFullName(full_name);
        setNewGender(gender);
        setNewBirthday(date_of_birth);
        setNewCPRNumber(cpr_number);
        setNewCPRFront(scanned_cpr_front);
        setNewCPRFrontURL(scanned_cpr_front_url);
        setNewCPRBack(scanned_cpr_back);
        setNewCPRBackURL(scanned_cpr_back_url);
        setNewInsuranceFront(scanned_insurance_front);
        setNewInsuranceFrontURL(scanned_insurance_front_url);
        setNewInsuranceBack(scanned_insurance_back);
        setNewInsuranceBackURL(scanned_insurance_back_url);
        setUserId(user_id);
        setNewIsUserMain(is_user_main);
        setNewIsDeleted(is_deleted);
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
                            setPatientParam(info);
                            setDeletePatientId(info.id);
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
                            setDeletePatientId(info.id);
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

    const getPatientResults = () => {
        axios.get('/api/patients/').then((res) => {
            setData(res.data.patients.map((prop) => makeTableRow(prop)));
        });
    };

    useEffect(getPatientResults, []);

    const deltePatients = (deleteId) => {
        axios
            .delete(`/api/patients/${deleteId}`).then(() => {
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

    const addPatients = () => {
        axios
            .post('/api/patients/', {
                full_name: newFullName,
                gender: newGender,
                date_of_birth: newBirthday,
                cpr_number: newCPRNumber,
                scanned_cpr_front: newCPRFront,
                scanned_cpr_front_url: newCPRFrontURL,
                scanned_cpr_back: newCPRBack,
                scanned_cpr_back_url: newCPRBackURL,
                scanned_insurance_front: newInsuranceFront,
                scanned_insurance_front_url: newInsuranceFrontURL,
                scanned_insurance_back: newInsuranceBack,
                scanned_insurance_back_url: newInsuranceBackURL,
                user_id: newUserId,
                is_user_main: newIsUserMain,
                is_deleted: newIsDeleted,
            })
            .then((res) => {
                setData([...data, makeTableRow(res.data.patient)]);
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

    const updatePatient = () => {
        axios
            .patch(`/api/patients/${deletePatientId}`, {
                full_name: newFullName,
                gender: newGender,
                date_of_birth: newBirthday,
                cpr_number: newCPRNumber,
                scanned_cpr_front: newCPRFront,
                scanned_cpr_front_url: newCPRFrontURL,
                scanned_cpr_back: newCPRBack,
                scanned_cpr_back_url: newCPRBackURL,
                scanned_insurance_front: newInsuranceFront,
                scanned_insurance_front_url: newInsuranceFrontURL,
                scanned_insurance_back: newInsuranceBack,
                scanned_insurance_back_url: newInsuranceBackURL,
                user_id: newUserId,
                is_user_main: newIsUserMain,
                is_deleted: newIsDeleted,
            })
            .then((res) => {
                setData(
                    data.map((prop) =>
                        prop.id === deletePatientId ? makeTableRow(res.data.patient) : prop
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
                            <AccountCircle />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Patients</h4>
                    </CardHeader>
                    <CardBody>
                        {/* <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="warning"
                                    onClick={() => {
                                        setPatientParam({
                                            full_name: '',
                                            gender: '',
                                            date_of_birth: '',
                                            cpr_number: '',
                                            scanned_cpr_front: '',
                                            scanned_cpr_front_url: '',
                                            scanned_cpr_back: '',
                                            scanned_cpr_back_url: '',
                                            scanned_insurance_front: '',
                                            scanned_insurance_front_url: '',
                                            scanned_insurance_back: '',
                                            scanned_insurance_back_url: '',
                                            user_id: '',
                                            is_user_main: '',
                                            is_deleted: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add Patient
                                </Button>
                            </GridItem>
                        </GridContainer> */}
                        <ReactTableBottomPagination
                            columns={[
                                {
                                    Header: 'ID',
                                    accessor: 'id',
                                },
                                {
                                    Header: 'Full Name',
                                    accessor: 'full_name',
                                },
                                {
                                    Header: 'Gender',
                                    accessor: 'gender',
                                },
                                {
                                    Header: 'Birthday',
                                    accessor: 'date_of_birth',
                                },
                                {
                                    Header: 'CPR Number',
                                    accessor: 'cpr_number',
                                },
                                {
                                    Header: 'CPR Front',
                                    accessor: 'scanned_cpr_front',
                                },
                                {
                                    Header: 'CPR Back',
                                    accessor: 'scanned_cpr_back',
                                },
                                {
                                    Header: 'Insurance Front',
                                    accessor: 'scanned_insurance_front',
                                },
                                {
                                    Header: 'Insurance Back',
                                    accessor: 'scanned_insurance_back',
                                },
                                {
                                    Header: 'User ID',
                                    accessor: 'user_id',
                                },
                                {
                                    Header: 'User Main',
                                    accessor: 'is_user_main',
                                },
                                {
                                    Header: 'Deleted',
                                    accessor: 'is_deleted',
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
                                <h5>Are you sure you want to delete this patient?</h5>
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
                                        deltePatients(deletePatientId);
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
                                <h4 className={classes.modalTitle}>Add Patient</h4>
                            </DialogTitle>
                            <DialogContent
                                id="add-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Full Name"
                                        id="add_full_name"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newFullName,
                                            onChange: (e) => setNewFullName(e.target.value),
                                        }}
                                    />
                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Gender
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newGender}
                                            onChange={(e) => setNewGender(e.target.value)}
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
                                                value="Male"
                                            >
                                                Male
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Female"
                                            >
                                                Female
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <br />
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'Birthday', }}
                                            onChange={(e) => setNewBirthday(e)}
                                            value={newBirthday}
                                        />
                                    </FormControl>
                                    <CustomInput
                                        labelText="CPR Number"
                                        id="add_cpr_number"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newCPRNumber,
                                            onChange: (e) => setNewCPRNumber(e.target.value),
                                        }}
                                    />

                                    <br />
                                    {/* <div className="picture-container">
                                        <div className="picture">
                                            <img src={newCPRFrontURL} className="picture-src" alt="..." />
                                            <input type="file" onChange={e => handleCPRFrontChange(e)} />
                                        </div>
                                        <h6 className="description">{(newCPRFront == '') ? 'Choose CPR Front' : newCPRFront}</h6>
                                    </div> */}

                                    <div className="fileinput text-center">
                                        <input type="file" onChange={handleCPRFrontChange} ref={fileInput1} />
                                        <div className={'thumbnail'}>
                                            <img src={newCPRFrontURL} alt="..." />
                                        </div>
                                        <div>
                                            <Button style={{ width: 180 }} onClick={() => handleClick1()}>
                                                Upload CPR Front
                                            </Button>
                                        </div>
                                    </div>

                                    <br />
                                    {/* <div className="picture-container">
                                        <div className="picture">
                                            <img src={newCPRBackURL} className="picture-src" alt="..." />
                                            <input type="file" onChange={e => handleCPRBackChange(e)} />
                                        </div>
                                        <h6 className="description">{(newCPRBack == '') ? 'Choose CPR Back' : newCPRBack}</h6>
                                    </div> */}

                                    <div className="fileinput text-center">
                                        <input type="file" onChange={handleCPRBackChange} ref={fileInput2} />
                                        <div className={'thumbnail'}>
                                            <img src={newCPRBackURL} alt="..." />
                                        </div>
                                        <div>
                                            <Button style={{ width: 180 }} onClick={() => handleClick2()}>
                                                Upload CPR Back
                                            </Button>
                                        </div>
                                    </div>

                                    <br />
                                    {/* <div className="picture-container">
                                        <div className="picture">
                                            <img src={newInsuranceFrontURL} className="picture-src" alt="..." />
                                            <input type="file" onChange={e => handleInsuranceFrontChange(e)} />
                                        </div>
                                        <h6 className="description">{(newInsuranceFront == '') ? 'Choose Insurance Front' : newInsuranceFront}</h6>
                                    </div> */}

                                    <div className="fileinput text-center">
                                        <input type="file" onChange={handleInsuranceFrontChange} ref={fileInput3} />
                                        <div className={'thumbnail'}>
                                            <img src={newInsuranceFrontURL} alt="..." />
                                        </div>
                                        <div>
                                            <Button style={{ width: 180 }} onClick={() => handleClick3()}>
                                                Upload Insurance Front
                                            </Button>
                                        </div>
                                    </div>

                                    <br />
                                    {/* <div className="picture-container">
                                        <div className="picture">
                                            <img src={newInsuranceBackURL} className="picture-src" alt="..." />
                                            <input type="file" onChange={e => handleInsuranceBackChange(e)} />
                                        </div>
                                        <h6 className="description">{(newInsuranceBack == '') ? 'Choose Insurance Back' : newInsuranceBack}</h6>
                                    </div> */}

                                    <div className="fileinput text-center">
                                        <input type="file" onChange={handleInsuranceBackChange} ref={fileInput4} />
                                        <div className={'thumbnail'}>
                                            <img src={newInsuranceBackURL} alt="..." />
                                        </div>
                                        <div>
                                            <Button style={{ width: 180 }} onClick={() => handleClick4()}>
                                                Upload Insurance Back
                                            </Button>
                                        </div>
                                    </div>
                                    <CustomInput
                                        labelText="Insurance Front"
                                        id="add_insurance_front"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newInsuranceFront,
                                            onChange: (e) => setNewInsuranceFront(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Insurance Back"
                                        id="add_insurance_back"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newInsuranceBack,
                                            onChange: (e) => setNewInsuranceBack(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="User ID"
                                        id="add_user_id"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newUserId,
                                            onChange: (e) => setUserId(e.target.value),
                                        }}
                                    />
                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            User Main
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newIsUserMain}
                                            onChange={(e) => setNewIsUserMain(e.target.value)}
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

                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Deleted
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newIsDeleted}
                                            onChange={(e) => setNewIsDeleted(e.target.value)}
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
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)} style={{ background: '#041F5D' }}>Cancel</Button>
                                <Button onClick={() => addPatients()} color="warning">Add</Button>
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
                                <h4 className={classes.modalTitle}>Edit Patient</h4>
                            </DialogTitle>
                            <DialogContent
                                id="edit-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Full Name"
                                        id="add_full_name"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newFullName,
                                            onChange: (e) => setNewFullName(e.target.value),
                                        }}
                                    />
                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Gender
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newGender}
                                            onChange={(e) => setNewGender(e.target.value)}
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
                                                value="Male"
                                            >
                                                Male
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="Female"
                                            >
                                                Female
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <br />
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'Birthday', }}
                                            onChange={(e) => setNewBirthday(e)}
                                            value={newBirthday}
                                        />
                                    </FormControl>
                                    <CustomInput
                                        labelText="CPR Number"
                                        id="add_cpr_number"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newCPRNumber,
                                            onChange: (e) => setNewCPRNumber(e.target.value),
                                        }}
                                    />
                                    {/* <CustomInput
                                        labelText="CPR Front"
                                        id="add_cpr_front"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newCPRFront,
                                            onChange: (e) => setNewCPRFront(e.target.value),
                                        }}
                                    /> */}
                                    <br />
                                    {/* <div className="picture-container">
                                        <div className="picture">
                                            <img src={newCPRFrontURL} className="picture-src" alt="..." />
                                            <input type="file" onChange={e => handleCPRFrontChange(e)} />
                                        </div>
                                        <h6 className="description">{(newCPRFront == '') ? 'Choose CPR Front' : newCPRFront}</h6>
                                    </div> */}

                                    <div className="fileinput text-center">
                                        <input type="file" onChange={handleCPRFrontChange} ref={fileInput1} />
                                        <div className={'thumbnail'}>
                                            <img src={newCPRFrontURL} alt="..." />
                                        </div>
                                        <div>
                                            <Button style={{ width: 180 }} onClick={() => handleClick1()}>
                                                Upload CPR Front
                                            </Button>
                                        </div>
                                    </div>

                                    <br />
                                    {/* <div className="picture-container">
                                        <div className="picture">
                                            <img src={newCPRBackURL} className="picture-src" alt="..." />
                                            <input type="file" onChange={e => handleCPRBackChange(e)} />
                                        </div>
                                        <h6 className="description">{(newCPRBack == '') ? 'Choose CPR Back' : newCPRBack}</h6>
                                    </div> */}
                                    <div className="fileinput text-center">
                                        <input type="file" onChange={handleCPRBackChange} ref={fileInput2} />
                                        <div className={'thumbnail'}>
                                            <img src={newCPRBackURL} alt="..." />
                                        </div>
                                        <div>
                                            <Button style={{ width: 180 }} onClick={() => handleClick2()}>
                                                Upload CPR Back
                                            </Button>
                                        </div>
                                    </div>

                                    <br />
                                    {/* <div className="picture-container">
                                        <div className="picture">
                                            <img src={newInsuranceFrontURL} className="picture-src" alt="..." />
                                            <input type="file" onChange={e => handleInsuranceFrontChange(e)} />
                                        </div>
                                        <h6 className="description">{(newInsuranceFront == '') ? 'Choose Insurance Front' : newInsuranceFront}</h6>
                                    </div> */}

                                    <div className="fileinput text-center">
                                        <input type="file" onChange={handleInsuranceFrontChange} ref={fileInput3} />
                                        <div className={'thumbnail'}>
                                            <img src={newInsuranceFrontURL} alt="..." />
                                        </div>
                                        <div>
                                            <Button style={{ width: 180 }} onClick={() => handleClick3()}>
                                                Upload Insurance Front
                                            </Button>
                                        </div>
                                    </div>

                                    <br />
                                    {/* <div className="picture-container">
                                        <div className="picture">
                                            <img src={newInsuranceBackURL} className="picture-src" alt="..." />
                                            <input type="file" onChange={e => handleInsuranceBackChange(e)} />
                                        </div>
                                        <h6 className="description">{(newInsuranceBack == '') ? 'Choose Insurance Back' : newInsuranceBack}</h6>
                                    </div> */}
                                    <div className="fileinput text-center">
                                        <input type="file" onChange={handleInsuranceBackChange} ref={fileInput4} />
                                        <div className={'thumbnail'}>
                                            <img src={newInsuranceBackURL} alt="..." />
                                        </div>
                                        <div>
                                            <Button style={{ width: 180 }} onClick={() => handleClick4()}>
                                                Upload Insurance Back
                                            </Button>
                                        </div>
                                    </div>

                                    <CustomInput
                                        labelText="CPR Back"
                                        id="add_cpr_back"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newCPRBack,
                                            onChange: (e) => setNewCPRBack(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Insurance Front"
                                        id="add_insurance_front"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newCPRNumber,
                                            onChange: (e) => setNewInsuranceFront(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Insurance Back"
                                        id="add_insurance_back"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newInsuranceBack,
                                            onChange: (e) => setNewInsuranceBack(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="User ID"
                                        id="add_user_id"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newUserId,
                                            onChange: (e) => setUserId(e.target.value),
                                        }}
                                    />
                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            User Main
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newIsUserMain}
                                            onChange={(e) => setNewIsUserMain(e.target.value)}
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

                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Deleted
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={newIsDeleted}
                                            onChange={(e) => setNewIsDeleted(e.target.value)}
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
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)} style={{ background: '#041F5D' }}>Cancel</Button>
                                <Button onClick={() => updatePatient()} color="warning">
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
