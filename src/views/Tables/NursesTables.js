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
import LocalPharmacy from '@material-ui/icons/LocalPharmacy';
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

export default function NursesTables() {
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedNurseId, setSelectedNurseId] = useState(null);

  const [newFullNameEn, setNewFullNameEn] = useState('');
  const [newFullNameAr, setNewFullNameAr] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newMobileNumber, setNewMobileNumber] = useState('');
  const [newTeamOrderNo, setNewTeamOrderNo] = useState('');
  const [newIsActive, setNewIsActive] = useState('');
  const [failed, setFailed] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [updateFailed, setUpdateFailed] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const [deleteFailed, setDeleteFailed] = React.useState(false);
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);

  const classes = useStyles();

  const setNurseParam = (info) => {
    const {
      full_name_en,
      full_name_ar,
      image_url,
      mobile_number,
      team_order_no,
      is_active,
    } = info;

    setNewFullNameEn(full_name_en);
    setNewFullNameAr(full_name_ar);
    setNewImageUrl(image_url);
    setNewMobileNumber(mobile_number);
    setNewTeamOrderNo(team_order_no);
    setNewIsActive(is_active);
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
              setNurseParam(info);
              setSelectedNurseId(info.id);
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
              setSelectedNurseId(info.id);
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

  const getNurses = () => {
    axios.get('/api/nurses/').then((res) => {
      // console.log('get', res.data.nurses);
      setData(res.data.nurses.map((prop) => makeTableRow(prop)));
    });
  };

  useEffect(getNurses, []);

  const deleteNurse = (deleteId) => {
    axios
      .delete(`/api/nurses/${deleteId}`).then(() => {
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

  const addNurse = () => {
    axios
      .post('/api/nurses/', {
        full_name_en: newFullNameEn,
        full_name_ar: newFullNameAr,
        image_url: newImageUrl,
        mobile_number: newMobileNumber,
        team_order_no: newTeamOrderNo,
        is_active: newIsActive,
      })
      .then((res) => {
        // console.log('post', res.data.nurse);
        setData([...data, makeTableRow(res.data.nurse)]);
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

  const updateNurse = () => {
    axios
      .patch(`/api/nurses/${selectedNurseId}`, {
        full_name_en: newFullNameEn,
        full_name_ar: newFullNameAr,
        image_url: newImageUrl,
        mobile_number: newMobileNumber,
        team_order_no: newTeamOrderNo,
        is_active: newIsActive,
      })
      .then((res) => {
        // console.log('patch', res.data.nurse);

        setData(
          data.map((prop) =>
            prop.id === selectedNurseId ? makeTableRow(res.data.nurse) : prop
          )
        );

        setNurseParam({
          full_name_en: '',
          full_name_ar: '',
          image_url: '',
          mobile_number: '',
          team_order_no: '',
          is_active: '',
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
              <LocalPharmacy />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Nurses</h4>
          </CardHeader>
          <CardBody>
            <GridContainer justify="flex-end">
              <GridItem>
                <Button
                  color="primary"
                  onClick={() => {
                    setNurseParam({
                      full_name_en: '',
                      full_name_ar: '',
                      image_url: '',
                      mobile_number: '',
                      team_order_no: '',
                      is_active: '',
                    });

                    setAddModal(true);
                  }}
                >
                  Add Nurse
                </Button>
              </GridItem>
            </GridContainer>
            <ReactTableBottomPagination
              columns={[
                {
                  Header: 'Full Name EN',
                  accessor: 'full_name_en',
                },
                {
                  Header: 'Full Name AR',
                  accessor: 'full_name_ar',
                },
                {
                  Header: 'Image Url',
                  accessor: 'image_url',
                },
                {
                  Header: 'Mobile Number',
                  accessor: 'mobile_number',
                },
                {
                  Header: 'Team Order No',
                  accessor: 'team_order_no',
                },
                {
                  Header: 'Is Active',
                  accessor: 'is_active',
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
                <h5>Are you sure you want to delete this nurse?</h5>
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
                    deleteNurse(selectedNurseId);
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
                <h4 className={classes.modalTitle}>Add Nurse</h4>
              </DialogTitle>
              <DialogContent
                id="add-driver-dialog-modal-description"
                className={classes.modalBody + ' ' + classes.modalSmallBody}
              >
                <form>
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
                    labelText="Image Url"
                    id="add_image_url"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: newImageUrl,
                      onChange: (e) => setNewImageUrl(e.target.value),
                    }}
                  />
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
                    labelText="Team Order No"
                    id="add_team_order_no"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: newTeamOrderNo,
                      onChange: (e) => setNewTeamOrderNo(e.target.value),
                    }}
                  />
                  <CustomInput
                    labelText="Is Active"
                    id="add_is_active"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: newIsActive,
                      onChange: (e) => setNewIsActive(e.target.value),
                    }}
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setAddModal(false)}>Cancel</Button>
                <Button onClick={() => addNurse()} color="primary">
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
                <h4 className={classes.modalTitle}>Edit Nurse</h4>
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
                    labelText="Image Url"
                    id="edit_image_url"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: newImageUrl,
                      onChange: (e) => setNewImageUrl(e.target.value),
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
                  <CustomInput
                    labelText="Team Order No"
                    id="edit_team_order_no"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: newTeamOrderNo,
                      onChange: (e) => setNewTeamOrderNo(e.target.value),
                    }}
                  />
                  <CustomInput
                    labelText="Is Active"
                    id="edit_is_active"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: newIsActive,
                      onChange: (e) => setNewIsActive(e.target.value),
                    }}
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditModal(false)}>Cancel</Button>
                <Button onClick={() => updateNurse()} color="primary">
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
