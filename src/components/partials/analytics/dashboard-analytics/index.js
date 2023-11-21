import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import {
    Block,
    Col,
} from "../../../Component";
import { useSelector, useDispatch } from "react-redux";
import { fetchWallet, errorChecker } from "../../../../store/actions";
import moment from 'moment';


export const DashboardAnalytics = () => {
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
        if (error) {
            setTimeout(() => {
                dispatch(errorChecker());
            }, 2000);
        }
        if (walletError) {
            setTimeout(() => {
                dispatch(errorChecker(walletError));
            }, 2000);
        }
        if (fetchError) {
            console.log(`Binance API Error: ${fetchError}`);
        }
    }, [error, fetchError, walletError]);


    let activeWallets = 0;
    if (wallet) {
        wallet?.forEach((wallet) => {
            if (wallet.lastAssignedAt !== null) {
                activeWallets++;
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
        <Block>
            <div className="d-flex top-cards justify-content-start">
                <Col md="4" lg="4" xxl="4" className="p-md-1">
                    <Card className="h-100 p-1 d-flex justify-content-center shadow-none">
                        <div className="d-flex">
                            <div className="d-flex align-items-center">
                                <p className="mb-0 text-uppercase font-size-12 text-center" style={{ lineHeight: '13px' }}>Wallets Summary</p>

                            </div>
                            <div className="w-100 pl-3" style={{ borderLeft: "1.5px solid #80808038" }}>
                                <div className="d-flex justify-content-between">
                                    <label className="font-weight-bolder mb-0">Total:</label>
                                    <p>{wallet ? wallet?.length : 0}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label className="font-weight-bolder mb-0">Active:</label>
                                    <p>{wallet ? activeWallets : 0}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label className="font-weight-bolder mb-0">Inactive:</label>
                                    <p>{wallet ? wallet?.length - activeWallets : 0}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label className="font-weight-bolder mb-0">IDRT:</label>
                                    <p>{totalBalance ? (totalBalance / 1000000000000000000)?.toLocaleString() : 0} </p>
                                </div>
                            </div>
                        </div>

                    </Card>
                </Col>

                <Col md="7" lg="7" xxl="7" className="p-0 d-flex flex-column">
                    <div className="text-center">-----Last Updated-----</div>
                    {/* <hr /> */}
                    <div className="d-flex h-100">
                        <Col md="6" lg="6" xxl="6" className="p-md-1">
                            <Card className="p-1 d-flex align-items-center justify-content-center shadow-none h-100 ">
                                <div className="d-flex flex-column">
                                    <div className="d-flex" style={{ textWrap: 'nowrap' }}>
                                        <p className="mr-2 mb-0">[{`Date: ${moment().format('L')}`}</p>
                                        <p className="mb-0">{`Time: ${moment().format('h:mm:ss a')}`}]</p>
                                    </div>
                                    <div>Timezone: {moment().format("Z")} hours UTC</div>
                                </div>
                            </Card>
                        </Col>
                        <Col md="6" lg="6" xxl="6" className="p-md-1">
                            <Card className="p-1 d-flex justify-content-center shadow-none h-100">
                                <div className="d-flex">
                                    <div className="d-flex align-items-center">
                                        <p className="mb-0 text-uppercase font-size-12 text-center" style={{ lineHeight: '13px' }}>Exchange Rate</p>

                                    </div>
                                    <div className="w-100 pl-3" style={{ borderLeft: "1.5px solid #80808038" }}>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <label className="font-weight-bolder mb-0">BNB</label>/USD:</div>

                                            <p>
                                                {bnbRate ? bnbRate?.price : '0'}
                                            </p>

                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <label className="font-weight-bolder mb-0">IDRT</label>/USD:</div>


                                            <p>
                                                {idrtRate ? idrtRate?.price : '0'}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </div>
                </Col>

            </div>
        </Block>
    )
}