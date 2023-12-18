import React from "react";
import { IDRTLineChart, TransactionLineChart } from "../../charts/analytics/AnalyticsCharts.js";
import { formatNumber } from "../../../../utils/Utils.js";
import moment from "moment";
import { Col, Row } from "../../../Component.js";
import { Card } from 'reactstrap';

const MerchantTxnSummary = ({ dateRange, data }) => {
    const totalCommission = data?.reduce((sum, data) => {
        if (data && data.inCommission) {
            return sum + Number(data.inCommission);
        }
        return sum;
    }, 0);

    const totalIDRT_Out = data?.reduce((sum, data) => {
        if (data && data.outAmount) {
            return sum + Number(data.outAmount);
        }
        return sum;
    }, 0);

    const dateFormat = (inputDateString) => {

        const year = inputDateString.substring(0, 4);
        const month = inputDateString.substring(4, 6);
        const day = inputDateString.substring(6, 8);

        return `${year}-${month}-${day}`;
    }
    const sortDate = (data) => {
        if (data?.length > 0) {
            data.sort((a, b) => new Date(dateFormat(a?.transactionDate)) - new Date(dateFormat(b?.transactionDate)));
            const midIndex = Math.floor(data.length / 2);
            const earliestDate = dateFormat(data[0].transactionDate);
            const midDate = dateFormat(data[midIndex].transactionDate);
            const latestDate = dateFormat(data[data.length - 1].transactionDate);

            return { earliestDate, midDate, latestDate };
        }
        return null
    }

    const getAllNoOfInCom = (data) => {
        return data?.map(entry => entry.inCommission / 1000000);
    }
    const getAllIDRT_Out = (data) => {
        return data?.map(entry => entry.outAmount / 1000000);
    }
    const getAllDate = (data) => {
        return data?.map(entry => moment(dateFormat(entry.transactionDate)).format('DD MMM, YYYY'));
    }



    return (
        <React.Fragment>
            <div className="pl-3 mr-auto w-75 d-flex flex-column justify-content-center" style={{ gap: '10px' }} md={12}>
                <Row className="d-flex justify-content-between">
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Total # of Users</p>
                        <h5 className="w-80 text-dark">5,000</h5>
                    </Card>
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow mt-0" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Average Deposit per User</p>
                        <h5 className="w-80 text-dark">$100</h5>
                    </Card>
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow mt-0" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Average # of Deposits per User</p>
                        <h5 className="w-80 text-dark">4</h5>
                    </Card>
                </Row>
                <Row className="d-flex justify-content-between">
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Total Deposit Amount</p>
                        <h5 className="w-80 text-dark">$20,000.00</h5>
                    </Card>
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow mt-0" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Total # of Deposits</p>
                        <h5 className="w-80 text-dark">5,000</h5>
                    </Card>
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow mt-0" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Total Commission Amount</p>
                        <h5 className="w-80 text-dark">$10,000.00</h5>
                    </Card>
                </Row>
            </div>
        </React.Fragment>
    );
};
export default MerchantTxnSummary;
