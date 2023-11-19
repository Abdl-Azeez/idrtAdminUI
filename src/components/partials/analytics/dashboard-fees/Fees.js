import React from "react";
import { TimeOnSiteData, NewUsersData, PageviewsData, BounceRateData } from "../../charts/analytics/AnalyticsData";
import { WPCharts } from "../../charts/analytics/AnalyticsCharts";
import { StoreVisitorsChart } from "../../charts/e-commerce/EcomCharts";
import { Icon, TooltipComponent } from "../../../Component";

const Fees = ({ timeFrame }) => {
  return (
    <React.Fragment>
      <div className="card-title-group align-start pb-2 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">Transaction Fees (BNB)</h6>
          <p>The fees for {timeFrame}.</p>
        </div>
        <div className="card-tools">
          <TooltipComponent
            iconClass="card-hint"
            icon="help"
            direction="left"
            id="tooltip-perfomance"
            text="Performance of this month"
          ></TooltipComponent>
        </div>
      </div>
      <div className="analytic-wp">
        <div className="analytic-wp-group g-3">
          <div className="analytic-data analytic-wp-data w-100">
            <div className="analytic-wp-graph w-100">

              <div className="analytic-wp-ck h-100">
                <StoreVisitorsChart className="analytics-line-small" data={BounceRateData} />
              </div>
            </div>
            {/* <div className="analytic-wp-text d-none">
              <div className="amount amount-sm">5,000</div>
              <div className="change up">
                <Icon name="arrow-long-up"></Icon>4.5%
              </div>
              <div className="subtitle">vs. last month</div>
            </div> */}
          </div>

        </div>
      </div>
      <div className="card-title-group align-start pt-3 pb-2 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">Commission Fees (IDRT)</h6>
        </div>
        <div className="card-tools">
          <TooltipComponent
            iconClass="card-hint"
            icon="help"
            direction="left"
            id="tooltip-perfomance"
            text="Performance of this month"
          ></TooltipComponent>
        </div>
      </div>
      <div className="analytic-wp">
        <div className="analytic-wp-group g-3">
          <div className="analytic-data analytic-wp-data w-100">
            <div className="analytic-wp-graph w-100">
              {/* <div className="title">
                Total
              </div> */}
              <div className="analytic-wp-ck h-100">
                {/* <WPCharts className="analytics-line-small" data={TimeOnSiteData}></WPCharts> */}
                <StoreVisitorsChart />
              </div>
            </div>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Fees;
