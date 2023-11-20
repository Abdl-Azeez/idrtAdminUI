import React, { useEffect, useState } from "react";
import {
  latestTransData,
} from "../../charts/analytics/AnalyticsData";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon, DataTableHead, DataTableRow, DataTableItem } from "../../../Component";
import { fetchTransactions, generalToastError } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const LatestTrans = () => {
  const { transactions, transactionError } = useSelector((state) => state.Transaction);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (transactionError) {
      setTimeout(() => {
        dispatch(generalToastError(transactionError));
      }, 2000);
    }
  }, [transactionError]);

  return (
    <React.Fragment>

      <div className="nk-tb-list is-loose traffic-channel-table">
        {/* <DataTableHead>
          <DataTableRow className="nk-tb-channel">

          </DataTableRow>
          <DataTableRow className="nk-tb-sessions">

          </DataTableRow>
          <DataTableRow className="nk-tb-prev-sessions">
            <span>Prev Sessions</span>
          </DataTableRow>
          <DataTableRow className="nk-tb-change">
            <span>Change</span>
          </DataTableRow>
          <DataTableRow className="nk-tb-trend tb-col-sm text-right">
            <span>Trend</span>
          </DataTableRow>
        </DataTableHead> */}
        {transactions && transactions?.incomingTxns?.map((item, i) => {
          if (i <= 5) {
            return (
              <DataTableItem className="nk-tb-item L" key={item.txnHash} >
                <DataTableRow className="nk-tb-channel">
                  {/* <span className="tb-lead">{item.channel}</span> */}
                  <div className="d-flex flex-column">
                    <span className="tb-lead">ID</span>
                    <span>{item.userId?.substring(0, 7)}</span>
                  </div>
                </DataTableRow>
                <DataTableRow className="nk-tb-sessions">
                  <div className="d-flex flex-column">
                    <span className="tb-lead">Date</span>
                    <div>
                      {" "}
                      <div>{moment(item?.createdAt).format("DD/MM/YYYY")}</div>
                      <div className="badge badge-soft-secondary font-size-10">
                        {" "}
                        {moment(item?.createdAt).format("hh:mm A")}
                      </div>
                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow className="nk-tb-prev-sessions">
                  <div className="d-flex flex-column" style={{ maxWidth: 'fit-content' }}>
                    <span className="tb-lead">Transaction Hash</span>
                    <span>{item.txnHash}</span>
                    <div className="d-flex flex-column">
                      <div className="d-flex justify-content-end">
                        <span>From: </span>
                        <span className="ml-2 tb-lead font-weight-bolder"><span className="mr-2">[external]</span>{item?.fromAddress}</span>
                      </div>
                      <div className="d-flex justify-content-end">
                        <span>To: </span>
                        <span className="ml-2 tb-lead font-weight-bolder text-info"><span className="mr-2 text-dark">[internal]</span>{item?.walletId}</span>
                      </div>

                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow className="nk-tb-prev-sessions">
                  <div className="d-flex flex-column" style={{ gap: '15px' }}>
                    <span className="tb-lead">Amount/Currency/in USD</span>
                    <span className="font-weight-bolder">{`${item.amount}  ${item.currencySymbol}`}</span>
                  </div>
                </DataTableRow>
                {/* <DataTableRow className="nk-tb-prev-sessions">
                <div className="d-flex flex-column" style={{ gap: '15px' }}>
                  <span className="tb-lead">Transaction Fee (BNB)</span>
                  <span className="font-weight-bolder">{item.fee}</span>
                </div>
              </DataTableRow> */}
                <DataTableRow className="nk-tb-prev-sessions">
                  <div className="d-flex flex-column" style={{ gap: '15px' }}>
                    <span className="tb-lead">Orphan Tnx</span>
                    <span className="font-weight-bolder">{item?.isOrphanTxn ? 'Yes' : 'No'}</span>
                  </div>
                </DataTableRow>

              </DataTableItem>
            );
          }
          return null
        })}
      </div>
    </React.Fragment>
  );
};
export default LatestTrans;
