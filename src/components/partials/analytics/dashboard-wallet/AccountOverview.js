import React, { useEffect, useState } from "react";
import { Card, DropdownMenu, UncontrolledDropdown, DropdownItem, Alert } from "reactstrap";
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
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(loadMerchant());
    }, [dispatch]);

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
                        <Col lg="8" xxl="8">
                            {/* <Block> */}
                            <Card className="h-100 justify-content-center">
                                <div className="card-body p-4 d-flex flex-column justify-content-between">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <p style={{ fontSize: '20px' }} className="font-weight-bold">Balance <span style={{ fontSize: '10px' }}>{`{IDRT}`}</span></p>
                                            <h5 className="w-80 text-dark">{merchantWalletResponse ? (merchantWalletResponse[0]?.balance / 100)?.toLocaleString() : 0}</h5>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '20px' }} className="font-weight-bold">Commission (Pending) <span style={{ fontSize: '10px' }}>{`{IDRT}`}</span></p>
                                            <h5 className="w-80 text-dark">{commissionWalletResponse ? (commissionWalletResponse[0]?.balance / 100)?.toLocaleString() : 0}  </h5>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-end pt-5">
                                        <p className="mb-0" style={{ fontSize: '12px' }}>Amounts in USDT</p>
                                        <Button color="info" size="md" className="text-dark font-weight-bolder px-5 mr-5" style={{ borderRadius: "8px", letterSpacing: '3px' }}>SETTLEMENT</Button>
                                    </div>
                                </div>

                            </Card>
                            {/* </Block> */}
                        </Col>
                        <Col lg="4" xxl="4" md="4" sm="4">
                            <DashboardAnalytics role={role} />
                        </Col>
                    </Row>

                    <hr className="px-5 my-4 w-50" />
                </Col>

            </Row>

        </React.Fragment>
    );
};
export default AccountOverview;
