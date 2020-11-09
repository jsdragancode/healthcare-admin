import React, { useEffect } from 'react';
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
import DriveEta from '@material-ui/icons/DriveEta';
import Dvr from '@material-ui/icons/Dvr';
import Close from '@material-ui/icons/Close';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardIcon from '../../components/Card/CardIcon.js';
import CardHeader from 'components/Card/CardHeader.js';
import ReactTable from '../../components/ReactTable/ReactTable.js';

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

export default function DriversTables() {
  const [data, setData] = React.useState([]);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [deleteDriverId, setDeleteDriverId] = React.useState(null);
  const classes = useStyles();

  useEffect(() => {
    axios.get('/api/drivers/').then((res) => {
      // console.log('get', res.data.drivers);

      setData(
        res.data.drivers.map((prop) => {
          return {
            id: prop.id,
            full_name_en: prop.full_name_en,
            full_name_ar: prop.full_name_ar,
            mobile_number: prop.mobile_number,
            actions: (
              <div className="actions-right">
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    let obj = data.find((o) => o.id === prop.id);
                    console.log(obj);
                  }}
                  color="warning"
                  className="edit"
                >
                  <Dvr />
                </Button>{' '}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    setDeleteDriverId(prop.id);
                    setDeleteModal(true);
                  }}
                  color="danger"
                  className="remove"
                >
                  <Close />
                </Button>{' '}
              </div>
            ),
          };
        })
      );
    });
  }, []);

  const delteDriver = (deleteId) => {
    axios.delete(`/api/drivers/${deleteId}`).then(() => {
      // console.log('delete', res);

      setData(data.filter((prop) => prop.id !== deleteId));
    });
  };

  return (
    <GridContainer>
      <GridItem xs={12}>
        {moment().format('HH:mm:ss.SSS')}
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <DriveEta />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Drivers</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
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
                  Header: 'Mobile Number',
                  accessor: 'mobile_number',
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
              aria-labelledby="small-modal-slide-title"
              aria-describedby="small-modal-slide-description"
            >
              <DialogTitle
                id="small-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
              >
                <Button
                  justIcon
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  color="transparent"
                  onClick={() => setDeleteModal(false)}
                >
                  <Close className={classes.modalClose} />
                </Button>
              </DialogTitle>
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
                    delteDriver(deleteDriverId);
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
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
