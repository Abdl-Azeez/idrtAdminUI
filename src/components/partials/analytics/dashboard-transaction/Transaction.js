import React, { useState } from "react";
import { TransactionLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon } from "../../../Component";
import { formatNumber } from "../../../../utils/Utils";
import moment from "moment";

const Transaction = ({ dateRange, data }) => {

  const totalTnxIn = data?.reduce((sum, data) => {
    if (data && data.inCount) {
      return sum + Number(data.inCount);
    }
    return sum;
  }, 0);

  const totalTnxOut = data?.reduce((sum, data) => {
    if (data && data.outCount) {
      return sum + Number(data.outCount);
    }
    return sum;
  }, 0);

  const sortDate = (data) => {
    if (data?.length > 0) {
      data.sort((a, b) => new Date(a?.transactionDate) - new Date(b?.transactionDate));
      const midIndex = Math.floor(data.length / 2);
      const earliestDate = data[0].transactionDate;
      const midDate = data[midIndex].transactionDate;
      const latestDate = data[data.length - 1].transactionDate;

      return { earliestDate, midDate, latestDate };
    }
    return null
  }

  const getAllNoOfInTxn = (data) => {
    return data?.map(entry => entry.inCount);
  }
  const getAllNoOfOutTxn = (data) => {
    return data?.map(entry => entry.outCount);
  }
  const getAllDate = (data) => {
    return data?.map(entry => moment(entry.transactionDate).format('DD MMM, YYYY'));
  }

  let analyticData = {
    labels: getAllDate(data),
    dataUnit: "TXN",
    datasets: [
      {
        label: "TOTAL IN",
        // borderDash: [5],
        borderWidth: 2,
        // dash: 0,
        fill: false,
        borderColor: "#00f890",
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#00f890",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 4,
        data: getAllNoOfInTxn(data),
      },
      {
        label: "TOTAL OUT",
        color: "#798bff",
        borderWidth: 2,
        lineTension: 0,
        dash: 0,
        borderColor: "#00a859",
        backgroundColor: "transparent",
        borderCapStyle: "square",
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#00a859",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 4,
        data: getAllNoOfOutTxn(data),
      },
    ],
  };

  console.log(getAllNoOfInTxn(data))
  return (
    <React.Fragment>
      <div className="card-title-group pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">Transactions</h6>
          <p>Total Number of transactions for {dateRange()}</p>
        </div>

      </div>
      <div className="analytic-ov">
        <div className="analytic-data-group analytic-ov-group g-3 justify-content-center">
          <div className="analytic-data analytic-ov-data">
            <div className="title">Total</div>
            <div className="amount">{formatNumber((totalTnxIn + totalTnxOut))}</div>
            <div className="change up">
              {/* <Icon name="arrow-long-up"></Icon> {timeFrame === "Month" ? "12.31" : "5.21"}K */}
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Total In</div>
            <div className="amount">{formatNumber(totalTnxIn)}</div>
            <div className="change up">
              {/* <Icon name="arrow-long-up"></Icon> {timeFrame === "Month" ? "47.5" : "80.6"}% */}
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Total Out</div>
            <div className="amount">{formatNumber(totalTnxOut)}</div>
            <div className="change down">
              {/* <Icon name="arrow-long-down"></Icon> {timeFrame === "Month" ? "12.57" : "18.21"}% */}
            </div>
          </div>

        </div>
        <div className="analytic-ov-ck">
          {data &&
            <TransactionLineChart data={analyticData} />}
        </div>
        <div className="chart-label-group ml-5">
          <div className="chart-label">{moment(sortDate(data)?.earliestDate).format('DD MMM, YYYY')}</div>
          <div className="chart-label d-none d-sm-block">{moment(sortDate(data)?.midDate).format('DD MMM, YYYY')}</div>
          <div className="chart-label"> {moment(sortDate(data)?.latestDate).format('DD MMM, YYYY')}</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Transaction;
