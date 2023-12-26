import React, { useEffect, useState } from "react";
import { Card, DropdownMenu, UncontrolledDropdown, DropdownItem, Alert } from "reactstrap";
import { DataTableRow, DataTableItem, Row, Col, BlockHead, BlockHeadContent, BlockTitle, Block, Button } from "../../../Component";
import { loadMerchant, fetchWalletBalance, errorChecker } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { DashboardAnalytics } from "../dashboard-analytics";


const MainWallets = ({ role }) => {
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
                <Col lg="10" xxl="10">
                    <BlockHead size="sm" className="d-flex justify-content-between">
                        <div className="nk-block-between w-100">
                            <BlockHeadContent>
                                <BlockTitle page tag="h3">
                                    Organization Overview
                                </BlockTitle>
                            </BlockHeadContent>
                            <div className="d-flex pos-rel">
                                Last Updated:
                                <div className="d-flex ml-2" style={{ textWrap: 'nowrap' }}>
                                    <p className="mr-2 mb-0">{`Date: ${moment().format('L')}`}</p>
                                    <p className="mb-0">{`Time: ${moment().format('h:mm:ss a')}`}</p>
                                </div>
                            </div>
                        </div>
                    </BlockHead>
                    <Row>
                        {/* <Card className="h-100 justify-content-center"> */}
                        <Row className="d-flex justify-content-between ml-3 w-100 overview-cards">
                            <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow" style={{ width: '310px' }}>
                                <p style={{ fontSize: '20px' }}>Agents <br /> Total #</p>
                                <h5 className="w-80 text-dark">100</h5>
                            </Card>
                            <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow mt-0" style={{ width: '310px' }}>
                                <p style={{ fontSize: '20px' }}>Merchants <br /> Total #</p>
                                <h5 className="w-80 text-dark">2,000</h5>
                            </Card>
                            <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow mt-0" style={{ width: '310px' }}>
                                <p style={{ fontSize: '20px' }}>Users <br /> Total #</p>
                                <h5 className="w-80 text-dark">2,000,000</h5>
                            </Card>
                        </Row>
                        {role === "ADMIN" &&
                            <>
                                <BlockHeadContent className="pt-5 ml-3">
                                    <BlockTitle page tag="h3">
                                        Wallets Balance
                                    </BlockTitle>
                                </BlockHeadContent>
                                <DashboardAnalytics role={role} />
                            </>

                        }

                        {/* </Card> */}
                        <Col lg="4" xxl="4">
                            {role !== "ADMIN" &&
                                <DashboardAnalytics role={role} />
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>

        </React.Fragment>
    );
};
export default MainWallets;
