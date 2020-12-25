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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/icons
import Dvr from '@material-ui/icons/Dvr';
import Close from '@material-ui/icons/Close';
import AirportShuttle from '@material-ui/icons/AirportShuttle';
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

export default function TrackVansTables() {
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedVanId, setSelectedVanId] = useState(null);

  const [id, setId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newIsDeleted, setNewIsDeleted] = useState('');
  const [failed, setFailed] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [updateFailed, setUpdateFailed] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const [deleteFailed, setDeleteFailed] = React.useState(false);
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);

  const classes = useStyles();

  const setVanParam = (info) => {
    const { id, title, is_deleted } = info;

    setId(id);
    setNewTitle(title);
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
              setVanParam(info);
              setSelectedVanId(info.id);
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
              setSelectedVanId(info.id);
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

  const getVans = () => {
    axios.get('/api/vans/').then((res) => {
      // console.log('get', res.data.vans);
      setData(res.data.vans.map((prop) => makeTableRow(prop)));
    });
  };

  useEffect(getVans, []);

  const deleteVan = (deleteId) => {
    axios
      .delete(`/api/vans/${deleteId}`).then(() => {
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

  const addVan = () => {
    axios
      .post('/api/vans/', {
        title: newTitle,
        is_deleted: newIsDeleted,
      })
      .then((res) => {
        // console.log('post', res.data.van);
        setData([...data, makeTableRow(res.data.van)]);
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

  const updateVan = () => {
    axios
      .patch(`/api/vans/${selectedVanId}`, {
        title: newTitle,
        is_deleted: newIsDeleted,
      })
      .then((res) => {
        // console.log('patch', res.data.van);

        setData(
          data.map((prop) =>
            prop.id === selectedVanId ? makeTableRow(res.data.van) : prop
          )
        );

        setVanParam({
          title: '',
          is_deleted: '',
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
              <AirportShuttle />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Track Vans</h4>
          </CardHeader>
          <CardBody>
            <GridContainer justify="flex-end">
              <GridItem>
                <Button
                  color="primary"
                  onClick={() => {
                    setVanParam({
                      title: '',
                      is_deleted: '',
                    });

                    setAddModal(true);
                  }}
                >
                  Add Track Van
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
                  Header: 'Title',
                  accessor: 'title',
                },
                {
                  Header: 'Is Deleted',
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
                <h5>Are you sure you want to delete this track van?</h5>
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
                    deleteVan(selectedVanId);
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
                <h4 className={classes.modalTitle}>Add Track Van</h4>
              </DialogTitle>
              <DialogContent
                id="add-driver-dialog-modal-description"
                className={classes.modalBody + ' ' + classes.modalSmallBody}
              >
                <form>
                  <CustomInput
                    labelText="Title"
                    id="add_title"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: newTitle,
                      onChange: (e) => setNewTitle(e.target.value),
                    }}
                  />
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}
                    >
                      Is Deleted
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
                <Button onClick={() => setAddModal(false)}>Cancel</Button>
                <Button onClick={() => addVan()} color="primary">
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
                <h4 className={classes.modalTitle}>Edit Track Van</h4>
              </DialogTitle>
              <DialogContent
                id="edit-driver-dialog-modal-description"
                className={classes.modalBody + ' ' + classes.modalSmallBody}
              >
                <form>
                  <CustomInput
                    labelText="Title"
                    id="edit_title"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: newTitle,
                      onChange: (e) => setNewTitle(e.target.value),
                    }}
                  />
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}
                    >
                      Is Deleted
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
                <Button onClick={() => setEditModal(false)}>Cancel</Button>
                <Button onClick={() => updateVan()} color="primary">
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
