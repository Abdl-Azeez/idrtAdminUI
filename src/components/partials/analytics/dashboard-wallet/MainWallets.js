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
                <Col lg="12" xxl="12">
                    <BlockHead size="sm" className="d-flex justify-content-between">
                        <div className="nk-block-between w-100">
                            <BlockHeadContent>
                                <BlockTitle page tag="h3">
                                    MAIN WALLETS
                                </BlockTitle>
                            </BlockHeadContent>
                            <div className="d-flex pos-rel" style={{ right: '50px' }}>
                                Last Updated:
                                <div className="d-flex ml-2" style={{ textWrap: 'nowrap' }}>
                                    <p className="mr-2 mb-0">{`Date: ${moment().format('L')}`}</p>
                                    <p className="mb-0">{`Time: ${moment().format('h:mm:ss a')}`}</p>
                                </div>
                            </div>
                        </div>
                    </BlockHead>
                    <Row>
                        <Col lg="8" xxl="8">
                            {/* <Block> */}
                            <Card className="h-100 justify-content-center">

                                <div className="nk-tb-list is-loose traffic-channel-table">
                                    {role === "MERCHANT" &&
                                        <DataTableItem className="nk-tb-item py-1" >
                                            <DataTableRow className="nk-tb-channel">
                                                <span>Merchant Wallet</span>
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-sessions text-info">
                                                <span>{merchantWallet?.value}</span>
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                                                {merchantWalletResponse ? (merchantWalletResponse[0]?.balance / 100)?.toLocaleString() : 0} IDRT
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-sessions">
                                                <Button size="small" color="primary">Settle</Button>
                                            </DataTableRow>
                                        </DataTableItem>
                                    }
                                    {role !== "MERCHANT" &&
                                        <DataTableItem className="nk-tb-item py-1" >
                                            <DataTableRow className="nk-tb-channel">
                                                <span>Commission Fee Wallet</span>
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-sessions text-info">
                                                <span>{commissionWallet?.value}</span>
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                                                {commissionWalletResponse ? (commissionWalletResponse[0]?.balance / 100)?.toLocaleString() : 0}  IDRT
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-sessions">
                                                <Button size="small" color="primary">Settle</Button>
                                            </DataTableRow>
                                        </DataTableItem>
                                    }
                                    {role === "ADMIN" &&
                                        <DataTableItem className="nk-tb-item py-1" >
                                            <DataTableRow className="nk-tb-channel">
                                                <span>BNB Vault Wallet</span>
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-sessions text-info">
                                                <span>{bnbWallet?.value}</span>
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                                                {bnbWalletResponse ? (bnbWalletResponse[1]?.balance / 1000000000000000000)?.toLocaleString() : 0} BNB
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-sessions">
                                                <Button size="small" color="primary">Settle</Button>
                                            </DataTableRow>
                                        </DataTableItem>
                                    }
                                </div>
                            </Card>
                            {/* </Block> */}
                        </Col>
                        <Col lg="4" xxl="4">
                            <DashboardAnalytics />
                        </Col>
                    </Row>
                </Col>
            </Row>

        </React.Fragment>
    );
};
export default MainWallets;
