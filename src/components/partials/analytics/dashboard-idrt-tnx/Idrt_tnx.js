import React from "react";
import { Icon, TooltipComponent } from "../../../Component";
import { IDRTLineChart } from "../../charts/analytics/AnalyticsCharts";
import { DefaultSalesStatistics } from "../../charts/default/DefaultCharts.js";
import { LineChart } from "../../charts/default/Charts.js";

const IDRT_TXN = ({ timeFrame }) => {
  return (
    <React.Fragment>
      <div className="card-title-group align-start pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">IDRT Transfers</h6>
          <p>IDRT Net in {timeFrame}.</p>
        </div>
        <div className="card-tools">
          <TooltipComponent
            iconClass="card-hint"
            icon="help"
            direction="left"
            id="Tooltip-users"
            text="Users of this month"
          ></TooltipComponent>
        </div>
      </div>
      <div className="analytic-au">
        <div className="analytic-data-group analytic-au-group g-3">
          <div className="analytic-data analytic-au-data">
            <div className="title">IDRT Net</div>
            <div className="amount">9.28K</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon>4.63%
            </div>
          </div>
          <div className="analytic-data analytic-au-data">
            <div className="title">IDRT In</div>
            <div className="amount">2.69K</div>
            <div className="change down">
              <Icon name="arrow-long-down"></Icon>1.92%
            </div>
          </div>
          <div className="analytic-data analytic-au-data">
            <div className="title">IDRT Out</div>
            <div className="amount">0.94K</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon>3.45%
            </div>
          </div>
        </div>
        <div className="analytic-au-ck">
          {/* <IDRTLineChart state={timeFrame} /> */}
          {/* <DefaultSalesStatistics state={timeFrame} /> */}
          <LineChart state={timeFrame} />
        </div>
        <div className="chart-label-group">
          <div className="chart-label">01 Jan, 2020</div>
          <div className="chart-label">30 Jan, 2020</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default IDRT_TXN;
