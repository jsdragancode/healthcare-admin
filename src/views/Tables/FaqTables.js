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
import Info from '@material-ui/icons/Info';
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

export default function FaqTables() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [deleteFaqId, setDeleteFaqId] = useState(null);

    const [newBookingId, setNewBookingId] = useState('');

    const [newQuestionEn, setNewQuestionEn] = useState('');
    const [newQuestionAr, setNewQuestionAr] = useState('');
    const [newAnswerEn, setNewAnswerEn] = useState('');
    const [newAnswerAr, setNewAnswerAr] = useState('');
    const [newOrderNo, setNewOrderNo] = useState('');


    const classes = useStyles();

    const setFaqParam = (info) => {
        const { question_en, question_ar, answer_en, answer_ar, order_no } = info;
        setNewQuestionEn(question_en);
        setNewQuestionAr(question_ar);
        setNewAnswerEn(answer_en);
        setNewAnswerAr(answer_ar);
        setNewOrderNo(order_no);
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
                            setFaqParam(info);
                            setDeleteFaqId(info.id);
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
                            setDeleteFaqId(info.id);
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

    const getFaqs = () => {
        axios.get('/api/faqs/').then((res) => {
            setData(res.data.faqs.map((prop) => makeTableRow(prop)));
        });
    };

    useEffect(getFaqs, []);

    const delteFaqs = (deleteId) => {
        axios.delete(`/api/faqs/${deleteId}`).then(() => {
            setData(data.filter((prop) => prop.id !== deleteId));
        });
    };

    const addFaqs = () => {
        axios
            .post('/api/faqs/', {
                question_en: newQuestionEn,
                question_ar: newQuestionAr,
                answer_en: newAnswerEn,
                answer_ar: newAnswerAr,
                order_no: newOrderNo,
            })
            .then((res) => {
                setData([...data, makeTableRow(res.data.faq)]);
                setAddModal(false);
            });
    };

    const updateFaqs = () => {
        axios
            .patch(`/api/faqs/${deleteFaqId}`, {
                question_en: newQuestionEn,
                question_ar: newQuestionAr,
                answer_en: newAnswerEn,
                ranswer_aresult: newAnswerAr,
                order_no: newOrderNo,
            })
            .then((res) => {
                setData(
                    data.map((prop) =>
                        prop.id === deleteFaqId ? makeTableRow(res.data.faq) : prop
                    )
                );
                setEditModal(false);
            });
    };

    return (
        <GridContainer>
            <GridItem xs={12}>
                {moment().format('HH:mm:ss.SSS')}
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <Info />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>FAQ</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setFaqParam({
                                            question_en: '',
                                            question_ar: '',
                                            answer_en: '',
                                            answer_ar: '',
                                            order_no: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add FAQ
                                </Button>
                            </GridItem>
                        </GridContainer>
                        <ReactTableBottomPagination
                            columns={[
                                {
                                    Header: 'Question EN',
                                    accessor: 'question_en',
                                },
                                {
                                    Header: 'Question AR',
                                    accessor: 'question_ar',
                                },
                                {
                                    Header: 'Answer EN',
                                    accessor: 'answer_en',
                                },
                                {
                                    Header: 'Answer AR',
                                    accessor: 'answer_ar',
                                },
                                {
                                    Header: 'Order No',
                                    accessor: 'order_no',
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
                                <h5>Are you sure you want to delete this faq?</h5>
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
                                        delteFaqs(deleteFaqId);
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
                                <h4 className={classes.modalTitle}>Add FAQ</h4>
                            </DialogTitle>
                            <DialogContent
                                id="add-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Question EN"
                                        id="add_question_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newQuestionEn,
                                            onChange: (e) => setNewQuestionEn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Question AR"
                                        id="add_question_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newQuestionAr,
                                            onChange: (e) => setNewQuestionAr(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Answer EN"
                                        id="add_answer_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAnswerEn,
                                            onChange: (e) => setNewAnswerEn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Answer AR"
                                        id="add_answer_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAnswerAr,
                                            onChange: (e) => setNewAnswerAr(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Order No"
                                        id="add_order_no"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newOrderNo,
                                            onChange: (e) => setNewOrderNo(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)}>Cancel</Button>
                                <Button onClick={() => addFaqs()} color="primary">Add</Button>
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
                                        labelText="Question EN"
                                        id="add_question_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newQuestionEn,
                                            onChange: (e) => setNewQuestionEn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Question AR"
                                        id="add_question_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newQuestionAr,
                                            onChange: (e) => setNewQuestionAr(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Answer EN"
                                        id="add_answer_en"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAnswerEn,
                                            onChange: (e) => setNewAnswerEn(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Answer AR"
                                        id="add_answer_ar"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newAnswerAr,
                                            onChange: (e) => setNewAnswerAr(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Order No"
                                        id="add_order_no"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newOrderNo,
                                            onChange: (e) => setNewOrderNo(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)}>Cancel</Button>
                                <Button onClick={() => updateFaqs()} color="primary">Update</Button>
                            </DialogActions>
                        </Dialog>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
