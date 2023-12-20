import React, { useEffect, useState } from "react";
import { Card, Modal, ModalBody, ModalHeader, Alert } from "reactstrap";
import { DataTableRow, DataTableItem, Row, Col, BlockHead, BlockHeadContent, BlockTitle, Block, Button } from "../../../Component";
import { loadMerchant, fetchWalletBalance, errorChecker } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { DashboardAnalytics } from "../dashboard-analytics";


const AccountOverview = ({ role }) => {
    const { merchants, merchantsError } = useSelector((state) => state.Merchant);
    const { walletBalance } = useSelector((state) => state.Wallet);
    const [merchantWalletResponse, setMerchantWalletResponse] = useState(null);
    const [commissionWalletResponse, setCommissionWalletResponse] = useState(null);
    const [bnbWalletResponse, setBnbWalletResponse] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(loadMerchant());
    }, [dispatch]);


    useEffect(() => {
        if (showSuccessModal) {
            setShowModal(false)
        }
    }, [showSuccessModal]);

    const merchantWallet = merchants && merchants[0]?.configs?.find((merchants) => {
        return merchants.key === 'merchantWallet'
    })

    const commissionWallet = merchants && merchants[0]?.configs?.find((merchants) => {
        return merchants.key === 'commissionWallet'
    })


    const bnbWallet = merchants && merchants[0]?.configs?.find((merchants) => {
        return merchants.key === 'bnbWallet'
    })



    useEffect(() => {
        const fetchWalletData = async (walletValue, setResponse) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/wallet/balance/${walletValue}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                setResponse(data);
            } catch (error) {
                console.error('Error fetching wallet data:', error);
            }
        };

        if (merchantWallet) {
            fetchWalletData(merchantWallet.value, setMerchantWalletResponse);
        }
        if (commissionWallet) {
            fetchWalletData(commissionWallet.value, setCommissionWalletResponse);
        }
        if (bnbWallet) {
            fetchWalletData(bnbWallet.value, setBnbWalletResponse);
        }
    }, [bnbWallet, commissionWallet, dispatch, merchantWallet]);



    return (
        <React.Fragment>
            {merchantsError &&
                <Alert color="danger">
                    Merchant Address API Error: {merchantsError}
                </Alert>
            }
            <Row className="g-gs pb-4">
                <Col lg="9" xxl="9">
                    <BlockHead size="sm" className="d-flex justify-content-between">
                        <div className="nk-block-between w-100">
                            <BlockHeadContent>
                                <BlockTitle page tag="h3">
                                    Account Overview
                                </BlockTitle>
                            </BlockHeadContent>
                            <div className="d-flex pos-rel mr-3" >
                                Last Updated:
                                <div className="d-flex ml-2" style={{ textWrap: 'nowrap' }}>
                                    <p className="mr-2 mb-0">{`Date: ${moment().format('L')}`}</p>
                                    <p className="mb-0">{`Time: ${moment().format('h:mm:ss a')}`}</p>
                                </div>
                            </div>
                        </div>
                    </BlockHead>

                    <Row className="overview-cards">
                        <Col lg={role === "AGENT" ? "6" : "8"} xxl={role === "AGENT" ? "6" : "8"} >
                            {/* <Block> */}
                            <Card className="h-100 justify-content-center">
                                <div className="card-body p-4 d-flex flex-column justify-content-between">
                                    <div className="d-flex justify-content-between">
                                        {role === "MERCHANT" &&
                                            <div>
                                                <p style={{ fontSize: '20px' }} className="font-weight-bold">Balance <span style={{ fontSize: '10px' }}>{`{IDRT}`}</span></p>
                                                <h5 className="w-80 text-dark">{merchantWalletResponse ? (merchantWalletResponse[0]?.balance / 100)?.toLocaleString() : 0}</h5>
                                            </div>
                                        }
                                        <div>
                                            <p style={{ fontSize: '20px' }} className="font-weight-bold">Commission (Pending) <span style={{ fontSize: '10px' }}>{`{IDRT}`}</span></p>
                                            <h5 className="w-80 text-dark">{commissionWalletResponse ? (commissionWalletResponse[0]?.balance / 100)?.toLocaleString() : 0}  </h5>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-end pt-5">
                                        <p className="mb-0" style={{ fontSize: '12px' }}>Amounts in USDT</p>
                                        <Button color="info" size="md" className="text-dark font-weight-bolder px-5 mr-5" style={{ borderRadius: "8px", letterSpacing: '3px' }} onClick={() => {
                                            setShowModal(true);
                                        }}>SETTLEMENT</Button>
                                    </div>
                                </div>

                            </Card>
                            {/* </Block> */}
                        </Col>
                        {role === "AGENT" &&
                            <Col xs="6" sm="4" md="3" lg="3" xl="3" className="pl-0">
                                <Card className="h-100 text-center justify-content-center">
                                    <div className="card-body p-4 ">
                                        <p style={{ fontSize: '20px' }} className="font-weight-bold">Total Commission</p>
                                        <h5 className="mt-5 text-dark">$20,000.00</h5>
                                    </div>
                                </Card>
                            </Col>
                        }
                        <Col lg={role === "MERCHANT" ? "4" : "3"} xxl={role === "MERCHANT" ? "4" : "3"} md="4" sm="4">
                            <DashboardAnalytics role={role} />
                        </Col>
                    </Row>

                    <hr className="px-5 my-4 w-50" />
                </Col>

            </Row>
            <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)} className="modal-dialog-centered" size="md">
                <ModalHeader toggle={() => setShowModal(false)} className="font-weight-bolder">
                    Balance Settlement
                </ModalHeader>
                <ModalBody>
                    <div className="pt-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <p style={{ fontSize: '20px' }}>Balance:</p>
                            <p style={{ fontSize: '20px' }}>{merchantWalletResponse ? (merchantWalletResponse[0]?.balance / 100)?.toLocaleString() : 0}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p style={{ fontSize: '20px' }}>Commission:</p>
                            <p style={{ fontSize: '20px' }}>-{commissionWalletResponse ? (commissionWalletResponse[0]?.balance / 100)?.toLocaleString() : 0}</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="font-weight-bold">Settlement Total:</h5>
                            <h5 className="text-dark">{merchantWalletResponse && commissionWalletResponse ? ((merchantWalletResponse[0]?.balance / 100) - (commissionWalletResponse[0]?.balance / 100)).toLocaleString() : 0}  </h5>
                        </div>
                        <div className="mt-3 text-left">
                            <p className="mb-0">Settlement Wallet Address:</p>
                            <p>{merchantWallet?.value}</p>
                        </div>

                        <Button color="info" size="md" className="text-dark float-right font-weight-bolder my-3 " style={{ borderRadius: "8px", letterSpacing: '3px' }} onClick={() => {
                            setShowSuccessModal(true);
                        }}>CONFIRM</Button>
                    </div>
                </ModalBody>
            </Modal>


            <Modal isOpen={showSuccessModal} toggle={() => setShowSuccessModal(!showSuccessModal)} className="modal-dialog-centered" size="md">
                <ModalHeader toggle={() => setShowSuccessModal(false)} className="font-weight-bolder" style={{ border: 'none' }}>

                </ModalHeader>
                <ModalBody>
                    <div className="pt-3 w-80 mx-auto">
                        <h3 className="text-dark text-center">
                            <i className="fa-solid fa-handshake-angle mr-2"></i>
                            Congratulations!
                        </h3>
                        <div className="d-flex justify-content-between align-items-center mt-5">
                            <h5 className="font-weight-bold text-dark mb-0">You have settled</h5>
                            <h5 className="text-dark">{merchantWalletResponse && commissionWalletResponse ? ((merchantWalletResponse[0]?.balance / 100) - (commissionWalletResponse[0]?.balance / 100)).toLocaleString() : 0}  </h5>
                        </div>
                        <div className="mt-5 text-left">
                            <p className="mb-0">Settlement Wallet Address:</p>
                            <p>{merchantWallet?.value}</p>
                        </div>

                        <Button color="info" size="md" className="float-right text-dark font-weight-bolder my-3" style={{ borderRadius: "8px", letterSpacing: '3px' }} onClick={() => {
                            setShowSuccessModal(false);
                        }}>CLOSE</Button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};
export default AccountOverview;
