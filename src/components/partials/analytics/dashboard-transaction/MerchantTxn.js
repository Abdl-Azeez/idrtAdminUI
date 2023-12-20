import React from "react";
import { IDRTLineChart, TransactionLineChart } from "../../charts/analytics/AnalyticsCharts.js";
import { formatNumber } from "../../../../utils/Utils.js";
import moment from "moment";

const MerchantTxn = ({ dateRange, data, role }) => {
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
    //ALL "/ 1000000" is to limit the number length on the chart
    const calculateStepSize = (data) => {
        if (!data || data.length === 0) {
            return null;
        }

        let maxCount = -Infinity;

        data.forEach((transaction) => {
            const inCommission = parseInt(transaction.inCommission / 1000000);
            const outAmount = parseInt(transaction.outAmount / 1000000);

            if (inCommission > maxCount) {
                maxCount = inCommission;
            }

            if (outAmount > maxCount) {
                maxCount = outAmount;
            }
        });

        // Calculate the step size to have 4 rows on the y-axis
        const stepSize = Math.ceil(maxCount / 3);

        return stepSize;
    };

    const stepSize = calculateStepSize(data);

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

    let analyticData = {
        labels: getAllDate(data),
        dataUnit: "TXN",
        datasets: [
            {
                label: "DEPOSIT",
                color: "#000000d4",
                borderWidth: 2,
                lineTension: 0,
                dash: 0,
                borderColor: "grey",
                backgroundColor: "transparent",
                borderCapStyle: "square",
                pointBorderColor: "transparent",
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#0e0e00",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 4,
                data: getAllIDRT_Out(data),
            },
            {
                label: "COMMISSION",
                // borderDash: [5],
                borderWidth: 2,
                // dash: 0,
                fill: false,
                borderColor: "#00000052",
                backgroundColor: "transparent",
                pointBorderColor: "transparent",
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#807f7f",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 4,
                data: getAllNoOfInCom(data),
            },

        ],
    };

    return (
        <React.Fragment>
            <div className="analytic-au">
                <div className="analytic-data-group analytic-au-group g-3 pl-5 align-items-end justify-content-around">
                    <div className="analytic-data analytic-au-data">
                        <div className="title font-weight-bold" style={{ fontSize: '20px' }} >Total {role === "AGENT" && "Merchants "}Deposits</div>
                        <h5 className="text-dark">{totalIDRT_Out ? formatNumber((totalIDRT_Out / 100)) : 0}</h5>
                    </div>
                    <div className="analytic-data analytic-au-data">
                        <div className="title font-weight-bold" style={{ fontSize: '20px' }} >Total Commissions</div>
                        <h5 className="text-dark">{totalCommission ? formatNumber((totalCommission / 100)) : 0}</h5>
                    </div>
                    <p className="mb-0" style={{ fontSize: '12px' }}>Amounts in USDT</p>
                </div>
                <div className="analytic-au-ck">
                    {data && <IDRTLineChart data={analyticData} stepSize={stepSize} />}

                </div>
                <div className="chart-label-group ml-5">
                    <div className="chart-label">{moment(sortDate(data)?.earliestDate).format('DD MMM, YYYY')}</div>
                    <div className="chart-label d-none d-sm-block">{moment(sortDate(data)?.midDate).format('DD MMM, YYYY')}</div>
                    <div className="chart-label"> {moment(sortDate(data)?.latestDate).format('DD MMM, YYYY')}</div>
                </div>
            </div >
        </React.Fragment >
    );
};
export default MerchantTxn;
