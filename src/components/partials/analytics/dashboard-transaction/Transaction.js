import React, { useState } from "react";
import { TransactionLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon } from "../../../Component";

const Transaction = ({ timeFrame }) => {

  return (
    <React.Fragment>
      <div className="card-title-group pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">Transactions</h6>
          <p>Total # transaction for {timeFrame}</p>
        </div>

      </div>
      <div className="analytic-ov">
        <div className="analytic-data-group analytic-ov-group g-3 justify-content-center">
          <div className="analytic-data analytic-ov-data">
            <div className="title">Total</div>
            <div className="amount">{timeFrame === "Month" ? "2.57" : "1.21"}K</div>
            <div className="change up">
              {/* <Icon name="arrow-long-up"></Icon> {timeFrame === "Month" ? "12.31" : "5.21"}K */}
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Transfer In</div>
            <div className="amount">{timeFrame === "Month" ? "3.98" : "1.6"}K</div>
            <div className="change up">
              {/* <Icon name="arrow-long-up"></Icon> {timeFrame === "Month" ? "47.5" : "80.6"}% */}
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Transfer Out</div>
            <div className="amount">{timeFrame === "Month" ? "28.25" : "10.25"}K</div>
            <div className="change down">
              {/* <Icon name="arrow-long-down"></Icon> {timeFrame === "Month" ? "12.57" : "18.21"}% */}
            </div>
          </div>

        </div>
        <div className="analytic-ov-ck">
          <TransactionLineChart state={timeFrame} />
        </div>
        <div className="chart-label-group ml-5">
          <div className="chart-label">01 Jan, 2020</div>
          <div className="chart-label d-none d-sm-block">{timeFrame === "Month" ? "15" : "4"} Jan, 2020</div>
          <div className="chart-label"> {timeFrame === "Month" ? "30" : "7"} Jan, 2020</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Transaction;
