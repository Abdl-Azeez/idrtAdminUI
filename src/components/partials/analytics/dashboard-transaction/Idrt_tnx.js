import React from "react";
import { IDRTLineChart, TransactionLineChart } from "../../charts/analytics/AnalyticsCharts.js";
import { formatNumber } from "../../../../utils/Utils.js";
import moment from "moment";

const IDRT_TXN = ({ dateRange, data }) => {
  const totalIDRT_In = data?.reduce((sum, data) => {
    if (data && data.inAmount) {
      return sum + Number(data.inAmount);
    }
    return sum;
  }, 0);

  const totalIDRT_Out = data?.reduce((sum, data) => {
    if (data && data.outAmount) {
      return sum + Number(data.outAmount);
    }
    return sum;
  }, 0);

  const calculateStepSize = (data) => {
    if (!data || data.length === 0) {
      return null;
    }

    let maxCount = -Infinity;

    data.forEach((transaction) => {
      const inAmount = parseInt(transaction.inAmount / 1000000);
      const outAmount = parseInt(transaction.outAmount / 1000000);

      if (inAmount > maxCount) {
        maxCount = inAmount;
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

  const getAllIDRT_In = (data) => {
    return data?.map(entry => entry.inAmount / 1000000);

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
        label: "TOTAL IN",
        // borderDash: [5],
        borderWidth: 2,
        // dash: 0,
        fill: false,
        borderColor: "#000000d4",
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#0e0e00",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 4,
        data: getAllIDRT_In(data),
      },
      {
        label: "TOTAL OUT",
        color: "#798bff",
        borderWidth: 2,
        lineTension: 0,
        dash: 0,
        borderColor: "#00000052",
        backgroundColor: "transparent",
        borderCapStyle: "square",
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#807f7f",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 4,
        data: getAllIDRT_Out(data),
      },
    ],
  };


  return (
    <React.Fragment>
      <div className="card-title-group align-start pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">Transaction Amount</h6>
          <p>IDRT Net for {dateRange()}.</p>
        </div>
        <div className="card-tools">
          {/* <TooltipComponent
            iconClass="card-hint"
            icon="help"
            direction="left"
            id="Tooltip-users"
            text="Users of this month"
          ></TooltipComponent> */}
        </div>
      </div>
      <div className="analytic-au">
        <div className="analytic-data-group analytic-au-group g-3">
          <div className="analytic-data analytic-au-data">
            <div className="title">IDRT Total</div>
            <div className="amount">{totalIDRT_In ? formatNumber(((totalIDRT_In + totalIDRT_Out) / 100)) : 0}</div>
            <div className="change up">
              {/* <Icon name="arrow-long-up"></Icon>4.63% */}
            </div>
          </div>
          <div className="analytic-data analytic-au-data">
            <div className="title">In</div>
            <div className="amount">{totalIDRT_In ? formatNumber((totalIDRT_In / 100)) : 0}</div>
            <div className="change down">
              {/* <Icon name="arrow-long-down"></Icon>1.92% */}
            </div>
          </div>
          <div className="analytic-data analytic-au-data">
            <div className="title">Out</div>
            <div className="amount">{totalIDRT_Out ? formatNumber((totalIDRT_Out / 100)) : 0}</div>
            <div className="change up">
              {/* <Icon name="arrow-long-up"></Icon>3.45% */}
            </div>
          </div>
        </div>
        <div className="analytic-au-ck">
          {data && <IDRTLineChart data={analyticData} stepSize={stepSize} />}

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
export default IDRT_TXN;
