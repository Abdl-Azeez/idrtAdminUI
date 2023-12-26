import React, { useEffect, useState } from "react";
import { Alert, Card } from "reactstrap";
import {
    Block,
    Col,
    Row,
    BlockHead, BlockHeadContent, BlockTitle
} from "../../../Component";
import { useSelector, useDispatch } from "react-redux";
import { fetchWallet, errorChecker } from "../../../../store/actions";
import moment from 'moment';


export const DashboardAnalytics = ({ role }) => {
    const { error, toastMessage, toastType } = useSelector((state) => state.General);
    const { wallet, walletError } = useSelector((state) => state.Wallet);
    const dispatch = useDispatch();
    const [idrtRate, setIDRT] = useState(null);
    const [bnbRate, setBNB] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setError] = useState(null);

    useEffect(() => {
        dispatch(fetchWallet());
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response1, response2] = await Promise.all([
                    fetch('https://api.binance.com/api/v3/avgPrice?symbol=USDTIDRT'),
                    fetch('https://api.binance.com/api/v3/avgPrice?symbol=BNBUSDT'),
                ]);
                if (!response1.ok || !response2.ok) {
                    throw new Error('Error fetching data from one or more APIs');
                }
                const IDRT_RATE = await response1.json();
                const BNB_RATE = await response2.json();

                setIDRT(IDRT_RATE);
                setBNB(BNB_RATE);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (fetchError) {
            console.log(`Binance API Error: ${fetchError}`);
        }
    }, [fetchError]);


    let activeWallets = 0;
    let lockedWallets = 0;
    if (wallet) {
        wallet?.forEach((wallet) => {
            if (wallet.lastAssignedAt !== null) {
                activeWallets++;
            }
        })

        wallet?.forEach((wallet) => {
            if (wallet.isLocked) {
                lockedWallets++;
            }
        })
    }

    const totalBalance = wallet?.reduce((sum, wallet) => {
        if (wallet.balances && wallet.balances.balance) {
            return sum + Number(wallet.balances.balance);
        }
        return sum;
    }, 0);



    return (
        <Block className={`h-100 ${role === "ADMIN" && "w-100"}`}>

            {role === "ADMIN" ?
                // <div className="top-cards justify-content-start col-md-12">
                //     <Col className="mb-1">
                //         <Card className="p-1 d-flex justify-content-center shadow-none h-100">
                //             {walletError &&
                //                 <Alert color="danger">
                //                     Wallet Summary API Error: {walletError}
                //                 </Alert>
                //             }
                //             <div className="d-flex">
                //                 <div className="d-flex align-items-center">
                //                     <p className="mb-0 text-uppercase font-size-12 text-center" style={{ lineHeight: '13px', marginLeft: '0.74rem', marginRight: '0.74rem' }}>Exchange Rate</p>

                //                 </div>
                //                 <div className="w-100 pl-3" style={{ borderLeft: "1.5px solid #80808038" }}>
                //                     <div className="d-flex justify-content-between">
                //                         <div>
                //                             <label className="font-weight-bolder mb-0">BNB</label>/USD:</div>

                //                         <p className="mr-3">
                //                             {bnbRate ? bnbRate?.price : '0'}
                //                         </p>

                //                     </div>
                //                     <div className="d-flex justify-content-between">
                //                         <div>
                //                             <label className="font-weight-bolder mb-0">IDRT</label>/USD:</div>
                //                         <p className="mr-3">
                //                             {idrtRate ? idrtRate?.price : '0'}
                //                         </p>

                //                     </div>
                //                 </div>
                //             </div>
                //         </Card>
                //     </Col>
                //     <Col className="">
                //         <Card className="h-100 p-1 d-flex justify-content-center shadow-none">
                //             <div className="d-flex">
                //                 <div className="d-flex align-items-center">
                //                     <p className="mb-0 text-uppercase font-size-12 text-center" style={{ lineHeight: '13px' }}>Wallets Summary</p>

                //                 </div>
                //                 <div className="w-100 pl-3" style={{ borderLeft: "1.5px solid #80808038" }}>
                //                     <div className="d-flex justify-content-between">
                //                         <label className="font-weight-bolder mb-0">Total:</label>
                //                         <p className="mr-3">{wallet ? wallet?.length : 0}</p>
                //                     </div>
                //                     <div className="d-flex justify-content-between">
                //                         <label className="font-weight-bolder mb-0">Active:</label>
                //                         <p className="mr-3">{wallet ? activeWallets : 0}</p>
                //                     </div>
                //                     <div className="d-flex justify-content-between">
                //                         <label className="font-weight-bolder mb-0">Inactive:</label>
                //                         <p className="mr-3">{wallet ? wallet?.length - activeWallets : 0}</p>
                //                     </div>
                //                     <div className="d-flex justify-content-between">
                //                         <label className="font-weight-bolder mb-0">Locked:</label>
                //                         <p className="mr-3">{wallet ? lockedWallets : 0}</p>
                //                     </div>
                //                     <div className="d-flex justify-content-between">
                //                         <label className="font-weight-bolder mb-0">IDRT:</label>
                //                         <p className="mr-3">{totalBalance ? (totalBalance / 1000000000000000000)?.toLocaleString() : 0} </p>
                //                     </div>
                //                 </div>
                //             </div>

                //         </Card>
                //     </Col>


                // </div>
                <div className="overview-cards">

                    <Row className="d-flex justify-content-between ml-3 w-100 py-4">
                        <Card className="text-left px-3 py-4 justify-content-center align-items-start shadow" style={{ width: '310px' }}>
                            <p style={{ fontSize: '20px' }}>Aggregated Wallets</p>
                            <h5 className="w-80 text-dark">$10,000.00 <span className="ml-1 font-weight-normal" style={{ fontSize: '12px' }}>USDT</span></h5>
                        </Card>
                        <Card className="text-left px-3 py-4 justify-content-center align-items-start shadow mt-0" style={{ width: '310px' }}>
                            <p style={{ fontSize: '20px' }}>Commission Wallets</p>
                            <h5 className="w-80 text-dark">$2,000.00 <span className="ml-1 font-weight-normal" style={{ fontSize: '12px' }}>USDT</span></h5>
                            <div className="text-left mt-1">
                                <p className="mb-0" style={{ fontSize: '12px' }}>Settlement Wallet Address:</p>
                                <p style={{ marginTop: '-5px', fontSize: '12px' }}>0x6AFf28f88A85D17aA04EeCCa83611b6eaB6d987a</p>
                            </div>
                        </Card>
                        <Card className="text-left px-3 py-4 justify-content-center align-items-start shadow mt-0" style={{ width: '310px' }}>
                            <p style={{ fontSize: '20px' }}>BNB Vaults</p>
                            <h5 className="w-80 text-dark">10.875 <span className="ml-1 font-weight-normal" style={{ fontSize: '12px' }}>BNB</span></h5>
                            <div className="text-left mt-1">
                                <p className="mb-0" style={{ fontSize: '12px' }}>Settlement Wallet Address:</p>
                                <p style={{ marginTop: '-5px', fontSize: '12px' }}>0x6AFf28f88A85D17aA04EeCCa83611b6eaB6d987a</p>
                            </div>
                        </Card>
                    </Row>
                    <div>
                        <BlockHeadContent className="pt-4 ml-3">
                            <BlockTitle page tag="h3">
                                Aggregation Wallets Summary
                            </BlockTitle>
                        </BlockHeadContent>
                        <Card className="mt-4 ml-3 w-100">
                            <Row className="d-flex justify-content-between w-85 mx-auto">
                                <div className="text-center px-3 py-4 justify-content-center align-items-center" style={{ width: 'auto' }}>
                                    <p style={{ fontSize: '20px' }}>Total</p>
                                    <h5 className="text-dark">10000</h5>
                                </div>
                                <div className="text-center px-3 py-4 justify-content-center align-items-center mt-0" style={{ width: 'auto' }}>
                                    <p style={{ fontSize: '20px' }}>Active</p>
                                    <h5 className="text-dark">2000</h5>
                                </div>
                                <div className="text-center px-3 py-4 justify-content-center align-items-center mt-0" style={{ width: 'auto' }}>
                                    <p style={{ fontSize: '20px' }}>Inactive</p>
                                    <h5 className="text-dark">8000</h5>
                                </div>
                                <div className="text-center px-3 py-4 justify-content-center align-items-center mt-0" style={{ width: 'auto' }}>
                                    <p style={{ fontSize: '20px' }}>Locked</p>
                                    <h5 className="text-dark">4000</h5>
                                </div>
                            </Row>
                        </Card>
                    </div>
                </div>

                :
                <Card className="h-100 justify-content-center shadow" style={{ marginLeft: '-15px' }}>
                    {walletError &&
                        <Alert color="danger">
                            Wallet Summary API Error: {walletError}
                        </Alert>
                    }
                    <div className="card-body p-4">
                        <div className="text-center">
                            <p style={{ fontSize: '20px' }} className="font-weight-bold">Exchange Rate</p>
                        </div>
                        <div className={`pt-3 mx-auto ${role === "AGENT" ? "w-100" : "w-80"}`}>
                            <div className="d-flex mb-3">
                                <h6 className="text-dark font-weight-bolder mb-0 mr-3">BNB/USD:</h6>
                                <h6 className="text-dark font-weight-bolder mb-0 w-50 text-truncate">{bnbRate ? bnbRate?.price : '0'}</h6>
                            </div>
                            <div className="d-flex">
                                <h6 className="text-dark font-weight-bolder mb-0 mr-3">IDRT/USD:</h6>
                                <h6 className="text-dark font-weight-bolder mb-0">{idrtRate ? idrtRate?.price : '0'}</h6>
                            </div>
                        </div>
                    </div>
                </Card>
            }
        </Block>
    )
}