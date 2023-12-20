import React, { useEffect, useState } from "react";
import { Alert, Card } from "reactstrap";
import {
    Block,
    Col,
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
        <Block className="h-100">

            {role === "ADMIN" ?
                <div className="top-cards justify-content-start col-md-12">
                    <Col className="mb-1">
                        <Card className="p-1 d-flex justify-content-center shadow-none h-100">
                            {walletError &&
                                <Alert color="danger">
                                    Wallet Summary API Error: {walletError}
                                </Alert>
                            }
                            <div className="d-flex">
                                <div className="d-flex align-items-center">
                                    <p className="mb-0 text-uppercase font-size-12 text-center" style={{ lineHeight: '13px', marginLeft: '0.74rem', marginRight: '0.74rem' }}>Exchange Rate</p>

                                </div>
                                <div className="w-100 pl-3" style={{ borderLeft: "1.5px solid #80808038" }}>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <label className="font-weight-bolder mb-0">BNB</label>/USD:</div>

                                        <p className="mr-3">
                                            {bnbRate ? bnbRate?.price : '0'}
                                        </p>

                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <label className="font-weight-bolder mb-0">IDRT</label>/USD:</div>
                                        <p className="mr-3">
                                            {idrtRate ? idrtRate?.price : '0'}
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col className="">
                        <Card className="h-100 p-1 d-flex justify-content-center shadow-none">
                            <div className="d-flex">
                                <div className="d-flex align-items-center">
                                    <p className="mb-0 text-uppercase font-size-12 text-center" style={{ lineHeight: '13px' }}>Wallets Summary</p>

                                </div>
                                <div className="w-100 pl-3" style={{ borderLeft: "1.5px solid #80808038" }}>
                                    <div className="d-flex justify-content-between">
                                        <label className="font-weight-bolder mb-0">Total:</label>
                                        <p className="mr-3">{wallet ? wallet?.length : 0}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <label className="font-weight-bolder mb-0">Active:</label>
                                        <p className="mr-3">{wallet ? activeWallets : 0}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <label className="font-weight-bolder mb-0">Inactive:</label>
                                        <p className="mr-3">{wallet ? wallet?.length - activeWallets : 0}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <label className="font-weight-bolder mb-0">Locked:</label>
                                        <p className="mr-3">{wallet ? lockedWallets : 0}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <label className="font-weight-bolder mb-0">IDRT:</label>
                                        <p className="mr-3">{totalBalance ? (totalBalance / 1000000000000000000)?.toLocaleString() : 0} </p>
                                    </div>
                                </div>
                            </div>

                        </Card>
                    </Col>


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