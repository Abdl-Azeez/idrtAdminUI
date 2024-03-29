import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";
import Fees from "./Fees";
import TransactionTable from "./TransactionTable";
import IDRT_TXN from "./Idrt_tnx";
import { Alert, Card } from "reactstrap";
import {
    Block,
    Row,
    Col,
    PreviewAltCard,
    BlockHeadContent,
    BlockTitle,
} from "../../../Component";
import { fetchTransaction, errorChecker } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import MerchantTxn from "./MerchantTxn";
import MerchantTxnSummary from "./MerchantTxnSummary";

const TnxAnalytics = ({ timeFrame, date, role }) => {

    const { transaction, transactionError } = useSelector((state) => state.Transaction);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransaction('dashboardStats'));
    }, [dispatch]);

    const dateRange = () => {
        if (timeFrame === 'today') {
            return 'today'
        }
        else if (timeFrame === '7days') {
            return '7 days'
        }
        else if (timeFrame === '1month') {
            return 'one month'
        }
        else if (timeFrame === 'monthToDate') {
            return 'this month'
        }
        else if (timeFrame === '1year') {
            return 'one year'
        }
        else {
            return 'this year'
        }
    }

    const dateFormat = (inputDateString) => {

        const year = inputDateString.substring(0, 4);
        const month = inputDateString.substring(4, 6);
        const day = inputDateString.substring(6, 8);

        return `${year}-${month}-${day}`;
    }

    const filterTransactions = () => {
        const currentDate = new Date();
        const startOfDay = new Date(currentDate);
        startOfDay.setHours(0, 0, 0, 0);

        switch (timeFrame) {
            case 'today':
                return transaction?.filter((transaction) => {
                    const transactionDate = new Date(dateFormat(transaction?.transactionDate));
                    return transactionDate >= startOfDay;
                });

            case '7days':
                const sevenDaysAgo = new Date(currentDate);
                sevenDaysAgo.setDate(currentDate.getDate() - 7);
                return transaction?.filter((transaction) => {
                    const transactionDate = new Date(dateFormat(transaction?.transactionDate));
                    return transactionDate >= sevenDaysAgo;
                });

            case '1month':
                const oneMonthAgo = new Date(currentDate);
                oneMonthAgo.setMonth(currentDate.getMonth() - 1);
                return transaction?.filter((transaction) => {
                    const transactionDate = new Date(dateFormat(transaction?.transactionDate));
                    return transactionDate >= oneMonthAgo;
                });

            case 'monthToDate':
                return transaction?.filter((transaction) => {
                    const transactionDate = new Date(dateFormat(transaction?.transactionDate));
                    return transactionDate >= new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                });

            case '1year':
                const oneYearAgo = new Date(currentDate);
                oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
                return transaction?.filter((transaction) => {
                    const transactionDate = new Date(dateFormat(transaction?.transactionDate));
                    return transactionDate >= oneYearAgo;
                });

            case 'yearToDate':
                return transaction?.filter((transaction) => {
                    const transactionDate = new Date(dateFormat(transaction?.transactionDate));
                    return transactionDate >= new Date(currentDate.getFullYear(), 0, 1);
                });

            case 'customRange':
                if (date.startDate && date.endDate) {
                    return transaction?.filter((transaction) => {
                        const transactionDate = new Date(dateFormat(transaction?.transactionDate));
                        return transactionDate >= new Date(date.startDate) && transactionDate <= new Date(date.endDate);
                    });
                }
                // If start date or end date is not set, return all transaction
                return transaction;

            default:
                // If the selected time frame doesn't match any case, return all transaction
                return transaction;
        }
    };

    const filteredTransactions = filterTransactions();
    return (
        <React.Fragment>
            {transactionError &&
                <Alert color="danger">
                    Transactions API Error: {transactionError}
                </Alert>
            }
            {role === "ADMIN" ?
                <>
                    <Row className="g-gs py-4">
                        <Col md="10" lg="10" xxl="10">
                            <Card className="" style={{ width: 'fit-content' }}>
                                <TransactionTable data={filteredTransactions} />
                            </Card>
                        </Col>
                    </Row>

                    <Col lg="10" xxl="10">
                        <Row className="g-gs">
                            <Col lg="6" xxl="6">
                                <PreviewAltCard className="h-100">
                                    <Transaction dateRange={dateRange} data={filteredTransactions} />
                                </PreviewAltCard>
                            </Col>

                            <Col md="6" lg="6" xxl="6">
                                <PreviewAltCard className="h-100">
                                    <IDRT_TXN dateRange={dateRange} data={filteredTransactions} />
                                </PreviewAltCard>
                            </Col>
                        </Row>
                        <Row className="g-gs my-4">
                            <Col md="6" lg="6" xxl="6">
                                <Card className="rounded">
                                    <BlockHeadContent className="pt-4 ml-3">
                                        <BlockTitle page tag="h3">
                                            Commission <span className="ml-1 font-weight-normal" style={{ fontSize: '12px' }}>USDT</span>
                                        </BlockTitle>
                                    </BlockHeadContent>
                                    <Row className="d-flex justify-content-between w-85 mx-auto">
                                        <div className="text-center px-3 py-4 justify-content-center align-items-center" style={{ width: 'auto' }}>
                                            <p style={{ fontSize: '20px' }}>Received</p>
                                            <h5 className="text-dark">$2,0000.00</h5>
                                        </div>
                                        <div className="text-center px-3 py-4 justify-content-center align-items-center mt-0" style={{ width: 'auto' }}>
                                            <p style={{ fontSize: '20px' }}>Pending</p>
                                            <h5 className="text-dark">$150.00</h5>
                                        </div>

                                    </Row>
                                </Card>
                            </Col>
                            <Col md="6" lg="6" xxl="6">
                                <Card className="rounded" style={{ width: '200px' }}>
                                    <BlockHeadContent className="pt-4 ml-3">
                                        <BlockTitle page tag="h3">
                                            Fees Spent
                                        </BlockTitle>
                                    </BlockHeadContent>
                                    <Row className="d-flex justify-content-between w-85 mx-auto">
                                        <div className="text-center px-3 py-4 justify-content-center align-items-center w-100">
                                            <p style={{ fontSize: '20px' }}>BNB</p>
                                            <h5 className="text-dark">8.30</h5>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="g-gs">
                            <Col md="12" lg="12" xxl="12">
                                <Fees dateRange={dateRange} data={filteredTransactions} />
                            </Col>
                        </Row>
                    </Col>
                </>
                :
                <Block>
                    <Row className="g-gs py-2">
                        <Col md="9" lg="9" xxl="9">
                            {/* <Row> */}
                            <PreviewAltCard className="h-100">
                                <MerchantTxn dateRange={dateRange} data={filteredTransactions} role={role} />
                            </PreviewAltCard>
                            {/* </Row> */}
                        </Col>
                        <Col md="9" lg="9" xxl="9">
                            <MerchantTxnSummary dateRange={dateRange} data={filteredTransactions} role={role} />
                        </Col>

                    </Row>
                </Block>
            }
        </React.Fragment>
    );
};

export default TnxAnalytics;
