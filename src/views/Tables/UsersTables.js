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
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
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

export default function UsersTables() {
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [simpleSelect, setSimpleSelect] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteDriverId, setDeleteDriverId] = useState(null);

  const [newFullNameEn, setNewFullNameEn] = useState('');
  const [gender, setGender] = useState('');
  const [newMobileNumber, setNewMobileNumber] = useState('');
  const [location, setLocation] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [firebaseURL, setFirebaseURL] = useState('');
  const [registeredOn, setRegisteredOn] = useState('');
  const [checkedA, setCheckedA] = React.useState(true);
  const [newFullNameAr, setNewFullNameAr] = useState('');

  const classes = useStyles();

  const setUserParam = (info) => {
    const {
      full_name_en,
      full_name_ar,
      gender,
      mobile_number,
      default_location_coordinates,
      default_address_line_1,
      default_address_line_2,
      firebase_uid,
      registered_on,
    } = info;

    setNewFullNameEn(full_name_en);
    setNewFullNameAr(full_name_ar);
    setNewMobileNumber(mobile_number);
    setGender(gender);
    setLocation(default_location_coordinates);
    setAddress1(default_address_line_1);
    setAddress2(default_address_line_2);
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
    axios.get('/api/users/').then((res) => {
      // console.log('get', res.data.users);
      setData(res.data.users.map((prop) => makeTableRow(prop)));
    });
  };

  useEffect(getUser, []);

  const delteUser = (deleteId) => {
    axios.delete(`/api/drivers/${deleteId}`).then(() => {
      // console.log('delete', res);
      setData(data.filter((prop) => prop.id !== deleteId));
    });
  };

  const addUser = () => {
    axios
      .post('/api/drivers/', {
        full_name_en: newFullNameEn,
        full_name_ar: newFullNameAr,
        mobile_number: newMobileNumber,
      })
      .then((res) => {
        // console.log('post', res.data.driver);
        setData([...data, makeTableRow(res.data.driver)]);
        setUserParam('', '', '');
        setAddModal(false);
      });
  };

  const updateDriver = () => {
    axios
      .patch(`/api/drivers/${deleteDriverId}`, {
        full_name_en: newFullNameEn,
        full_name_ar: newFullNameAr,
        mobile_number: newMobileNumber,
      })
      .then((res) => {
        // console.log('patch', res.data.driver);

        setData(
          data.map((prop) =>
            prop.id === deleteDriverId ? makeTableRow(res.data.driver) : prop
          )
        );
        setUserParam('', '', '');
        setEditModal(false);
      });
  };

  const handleSimple = (event) => {
    setSimpleSelect(event.target.value);
  };

  return (
    <GridContainer>
      <GridItem xs={12}>
        {moment().format('HH:mm:ss.SSS')}
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <RecordVoiceOverIcon />
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
                <h5>Are you sure you want to delete this driver?</h5>
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
                    delteUser(deleteDriverId);
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
                      value={simpleSelect}
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
                        value="2"
                      >
                        Male
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value="3"
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
                    labelText="Address Line 1"
                    id="add_address_line_1"
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
                    labelText="Address Line 2"
                    id="add_address_line_2"
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
                    labelText="City"
                    id="add_city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: newFullNameAr,
                      onChange: (e) => setNewFullNameAr(e.target.value),
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checkedA}
                        onChange={(event) => setCheckedA(event.target.checked)}
                        value="checkedA"
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
                  />
                  <CustomInput
                    labelText="Firebase Uid"
                    id="add_firebase_uid"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: newFullNameAr,
                      onChange: (e) => setNewFullNameAr(e.target.value),
                    }}
                  />
                  <InputLabel className={classes.label}>Date Picker</InputLabel>
                  <br />
                  <FormControl fullWidth>
                    <Datetime
                      timeFormat={false}
                      inputProps={{ placeholder: 'Registered On' }}
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
                    labelText="Mobile Number"
                    id="edit_mobile_number"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: newMobileNumber,
                      onChange: (e) => setNewMobileNumber(e.target.value),
                    }}
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditModal(false)}>Cancel</Button>
                <Button onClick={() => updateDriver()} color="primary">
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
