import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, Card, Button } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle, DataTableRow, DataTableItem, Row, Col
} from "../../../Component";
import { fetchTransactions, errorChecker } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LatestOutgoingTrans = () => {
  const { transactions, transactionError } = useSelector((state) => state.Transaction);


  return (
    <React.Fragment>
      {transactions?.latestOutgoingTransactions?.length > 0 &&
        <div className="py-5">
          <BlockHead size="sm" className="d-flex justify-content-between pt-5">
            <div className="nk-block-between">
              <BlockHeadContent>
                <BlockTitle page tag="h3">
                  LATEST OUTGOING TRANSACTIONS
                </BlockTitle>
              </BlockHeadContent>
            </div>
          </BlockHead>
          <Block>
            <Row className="g-gs">
              <Col lg="12" xxl="12">
                <Card className="h-100">
                  <div className="nk-tb-list is-loose traffic-channel-table">
                    {transactions && transactions?.latestOutgoingTransactions?.map((item, i) => {
                      if (i <= 5) {
                        return (
                          <DataTableItem className="nk-tb-item L" key={item.txnHash} >
                            <DataTableRow className="nk-tb-channel">
                              {/* <span className="tb-lead">{item.channel}</span> */}
                              <div className="d-flex flex-column">
                                <span className="tb-lead">User</span>
                                <span>{item.username}</span>
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
                                <span className="font-weight-bolder">{`${item.amount / 100} ${item.currencySymbol}`}</span>
                              </div>
                            </DataTableRow>
                            <DataTableRow className="nk-tb-prev-sessions">
                              <div className="d-flex flex-column" style={{ gap: '15px' }}>
                                <span className="tb-lead">Gas Fee</span>
                                <span className="font-weight-bolder">{item.gasFee}</span>
                              </div>
                            </DataTableRow>
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
                </Card>
                <Link to='/transactions'>
                  <Button size="sm" color="" className="btn-light font-size-10 text-center w-100"><span>VIEW ALL TRANSACTIONS</span></Button>
                </Link>
              </Col>
            </Row>

          </Block>
        </div>}
    </React.Fragment>
  );
};
export default LatestOutgoingTrans;
