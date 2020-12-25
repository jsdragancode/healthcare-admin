import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from 'react-datetime';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// @material-ui/icons
import Group from '@material-ui/icons/Group';
import Dvr from '@material-ui/icons/Dvr';
import Close from '@material-ui/icons/Close';

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
import customSelectStyle from '../../assets/jss/material-dashboard-pro-react/customSelectStyle.js';
import customCheckboxRadioSwitch from 'assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js';

import Snackbar from "../../components/Snackbar/Snackbar.js";

const styles = {
    ...customSelectStyle,
    ...customCheckboxRadioSwitch,
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

export default function UsersTables(props) {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [simpleSelect, setSimpleSelect] = useState('');
    const [editModal, setEditModal] = useState(false);
    const [deleteDriverId, setDeleteDriverId] = useState(null);

    const [id, setId] = useState('');
    const [newFullNameEn, setNewFullNameEn] = useState('');
    const [gender, setGender] = useState('');
    const [newMobileNumber, setNewMobileNumber] = useState('');
    const [location, setLocation] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [active, setActive] = useState('');
    const [firebaseURL, setFirebaseURL] = useState('');
    const [registeredOn, setRegisteredOn] = useState('');
    const [checkedA, setCheckedA] = React.useState(true);
    const [newFullNameAr, setNewFullNameAr] = useState('');
    const [failed, setFailed] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [deleteFailed, setDeleteFailed] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);

    const classes = useStyles();

    const setUserParam = (info) => {
        const {
            id,
            full_name,
            full_name_ar,
            gender,
            mobile_number,
            default_location_coordinates,
            default_address_line_1,
            default_address_line_2,
            default_city,
            is_active,
            firebase_uid,
            registered_on,
        } = info;

        setId(id);
        setNewFullNameEn(full_name);
        setNewFullNameAr(full_name_ar);
        setNewMobileNumber(mobile_number);
        setGender(gender);
        setLocation(default_location_coordinates);
        setAddress1(default_address_line_1);
        setAddress2(default_address_line_2);
        setCity(default_city);
        setActive(is_active);
        setFirebaseURL(firebase_uid);
        setRegisteredOn(registered_on);
    };

    const makeTableRow = (info) => {
        return {
            ...info,
            address: `${info.default_address_line_1} ${info.default_address_line_2} ${info.default_city}`,
            actions: (
                <div className="actions-right">
                    <Button
                        justIcon
                        round
                        simple
                        onClick={() => {
                            setUserParam(info);
                            setDeleteDriverId(info.id);
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
                            setDeleteDriverId(info.id);
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

    const getUser = () => {
        axios.get(`/api/users/${props.userId}`).then((res) => {
            setData([makeTableRow(res.data.user)]);
        });
    };

    useEffect(getUser, []);

    const deleteUser = (deleteId) => {
        axios
            .delete(`/api/drivers/${deleteId}`).then(() => {
                // console.log('delete', res);
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

    const addUser = () => {
        axios
            .post('/api/users/', {
                full_name: newFullNameEn,
                gender: gender,
                mobile_number: newMobileNumber,
                default_location_coordinates: location,
                default_address_line_1: address1,
                default_address_line_2: address2,
                default_city: city,
                is_active: active,
                firebase_uid: firebaseURL,
                registered_on: registeredOn,
            })
            .then((res) => {
                setData([...data, makeTableRow(res.data.user)]);
                setUserParam({
                    full_name: '',
                    full_name_ar: '',
                    gender: '',
                    mobile_number: '',
                    default_location_coordinates: '',
                    default_address_line_1: '',
                    default_address_line_2: '',
                    default_city: '',
                    is_active: '',
                    firebase_uid: '',
                    registered_on: '',
                });
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

    const updateDriver = () => {
        axios
            .patch(`/api/users/${deleteDriverId}`, {
                full_name: newFullNameEn,
                gender: gender,
                mobile_number: newMobileNumber,
                default_location_coordinates: location,
                default_address_line_1: address1,
                default_address_line_2: address2,
                default_city: city,
                is_active: active,
                firebase_uid: firebaseURL,
                registered_on: registeredOn,
            })
            .then((res) => {
                setData(
                    data.map((prop) =>
                        prop.id === deleteDriverId ? makeTableRow(res.data.user) : prop
                    )
                );
                // setUserParam('', '', '');
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

    const handleSimple = (event) => {
        // setSimpleSelect(event.target.value);
        // let selectedGender = event.target.value - 2;
        // if (selectedGender == 0) {
        //   setGender("Male");
        // } else if (selectedGender == 1) {
        //   setGender("Female");
        // }
        setGender(event.target.value);
    };

    return (
        <GridContainer>
            <GridItem xs={12}>
                {/* {moment().format('HH:mm:ss.SSS')} */}
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <PersonAdd />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Users</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setUserParam('', '', '');

                                        setAddModal(true);
                                    }}
                                >
                                    Add User
                </Button>
                            </GridItem>
                        </GridContainer>
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
                                    Header: 'Mobile Number',
                                    accessor: 'mobile_number',
                                },
                                {
                                    Header: 'Location Coordinates',
                                    accessor: 'default_location_coordinates',
                                },
                                {
                                    Header: 'Address',
                                    accessor: 'address',
                                },
                                {
                                    Header: 'Active',
                                    accessor: 'is_active',
                                },
                                {
                                    Header: 'Firebase Uid',
                                    accessor: 'firebase_uid',
                                },
                                {
                                    Header: 'Registered On',
                                    accessor: 'registered_on',
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
                                <h5>Are you sure you want to delete this user?</h5>
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
                                        deleteUser(deleteDriverId);
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
                            scroll="body"
                            aria-labelledby="add-driver-dialog-title-modal-title"
                            aria-describedby="add-driver-dialog-modal-description"
                        >
                            <DialogTitle
                                id="add-driver-dialog-title-modal-title"
                                disableTypography
                                className={classes.modalHeader}
                            >
                                <h4 className={classes.modalTitle}>Add User</h4>
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
                                            value: newFullNameEn,
                                            onChange: (e) => setNewFullNameEn(e.target.value),
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
                                            value={gender}
                                            onChange={handleSimple}
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
                                    <CustomInput
                                        labelText="Mobile Number"
                                        id="add_mobile_number"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newMobileNumber,
                                            onChange: (e) => setNewMobileNumber(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Coordinate"
                                        id="add_coordinate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: location,
                                            onChange: (e) => setLocation(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Address Line 1"
                                        id="add_address_line_1"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: address1,
                                            onChange: (e) => setAddress1(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Address Line 2"
                                        id="add_address_line_2"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: address2,
                                            onChange: (e) => setAddress2(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="City"
                                        id="add_city"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: city,
                                            onChange: (e) => setCity(e.target.value),
                                        }}
                                    />
                                    {/* <FormControlLabel
                    control={
                      <Switch
                        checked={active}
                        onChange={(e) => setActive(e.target.value)}
                        value="Active"
                        classes={{
                          switchBase: classes.switchBase,
                          checked: classes.switchChecked,
                          thumb: classes.switchIcon,
                          track: classes.switchBar,
                        }}
                      />
                    }
                    classes={{
                      label: classes.label,
                    }}
                    label="Active"
                  /> */}

                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Active
                    </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={active}
                                            onChange={(e) => setActive(e.target.value)}
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
                                                value="Active"
                                            >
                                                Active
                      </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="In Active"
                                            >
                                                In Active
                      </MenuItem>
                                        </Select>
                                    </FormControl>

                                    <CustomInput
                                        labelText="Firebase Uid"
                                        id="add_firebase_uid"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: firebaseURL,
                                            onChange: (e) => setFirebaseURL(e.target.value),
                                        }}
                                    />
                                    {/* <CustomInput
                    labelText="Date Picker"
                    id="add_date_picker"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: registeredOn,
                      onChange: (e) => setRegisteredOn(e.target.value),
                    }}
                  /> */}
                                    <InputLabel className={classes.label}>Date Picker</InputLabel>
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'Registered On', }}
                                            onChange={(e) => setRegisteredOn(e)}
                                            value={registeredOn}
                                        />
                                    </FormControl>
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)}>Cancel</Button>
                                <Button onClick={() => addUser()} color="primary">
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
                                <h4 className={classes.modalTitle}>Edit Driver</h4>
                            </DialogTitle>
                            <DialogContent
                                id="edit-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Full Name"
                                        id="edit_full_name"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newFullNameEn,
                                            onChange: (e) => setNewFullNameEn(e.target.value),
                                        }}
                                    />
                                    {/* <CustomInput
                    labelText="Gender"
                    id="edit_gender"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: gender,
                      onChange: (e) => setGender(e.target.value),
                    }}
                  /> */}
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
                                            value={gender}
                                            onChange={handleSimple}
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
                                    <CustomInput
                                        labelText="Mobile"
                                        id="edit_mobile"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newMobileNumber,
                                            onChange: (e) => setNewMobileNumber(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Location"
                                        id="edit_location"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: location,
                                            onChange: (e) => setLocation(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Address1"
                                        id="edit_address1"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: address1,
                                            onChange: (e) => setAddress1(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Address2"
                                        id="edit_address2"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: address2,
                                            onChange: (e) => setAddress2(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="City"
                                        id="edit_city"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: city,
                                            onChange: (e) => setCity(e.target.value),
                                        }}
                                    />
                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Active
                    </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu,
                                            }}
                                            classes={{
                                                select: classes.select,
                                            }}
                                            value={active}
                                            onChange={(e) => setActive(e.target.value)}
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
                                                value="Active"
                                            >
                                                Active
                      </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected,
                                                }}
                                                value="In Active"
                                            >
                                                In Active
                      </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <CustomInput
                                        labelText="Firebase Uid"
                                        id="edit_firebase_ui"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: firebaseURL,
                                            onChange: (e) => setFirebaseURL(e.target.value),
                                        }}
                                    />
                                    {/* <CustomInput
                    labelText="Registered On"
                    id="edit_registered_on"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: registeredOn,
                      onChange: (e) => setRegisteredOn(e.target.value),
                    }}
                  /> */}
                                    <InputLabel className={classes.label}>Date Picker</InputLabel>
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            timeFormat={true}
                                            inputProps={{ placeholder: 'Registered On', }}
                                            onChange={(e) => setRegisteredOn(e)}
                                            value={registeredOn}
                                        />
                                    </FormControl>
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)}>Cancel</Button>
                                <Button onClick={() => updateDriver()} color="primary">
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
