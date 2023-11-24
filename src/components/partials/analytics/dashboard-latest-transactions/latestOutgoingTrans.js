import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, Card, Button } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle, DataTableRow, DataTableItem, Row, Col, DataTableHead
} from "../../../Component";
import { fetchTransactions, errorChecker } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LatestOutgoingTrans = () => {
  const { transactions, transactionError } = useSelector((state) => state.Transaction);


  return (
    <React.Fragment>
      {transactions?.latestOutgoingTransactions &&
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
                <Card className="">
                  {transactions?.latestOutgoingTransactions?.length > 0 ?
                    <div className="nk-tb-list is-loose traffic-channel-table">
                      <DataTableHead className="">
                        {/* <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">User ID</DataTableRow> */}
                        <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Date</DataTableRow>
                        <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Transaction Hash</DataTableRow>
                        <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">From Wallet</DataTableRow>
                        <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">To Wallet</DataTableRow>


                        <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Amount</DataTableRow>
                        <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Currency</DataTableRow>
                        <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Gas Fee</DataTableRow>
                        {/* <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Commission</DataTableRow> */}
                        <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Orphan Tnx</DataTableRow>


                        {/* <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Callback Status</DataTableRow> */}
                      </DataTableHead>
                      {transactions?.latestOutgoingTransactions?.map((item, i) => {
                        if (i <= 5) {
                          return (
                            <DataTableItem className="nk-tb-item L" key={item.txnHash}>
                              {/* <DataTableRow className="nk-tb-channel">
                                <div>{item.userId}</div>
                              </DataTableRow> */}
                              <DataTableRow className="nk-tb-sessions">
                                <div className="d-flex">
                                  {" "}
                                  <div>{moment(item?.createdAt).format("DD/MM/YYYY")}</div>
                                  <div className="mx-1">-</div>
                                  <div className="">
                                    {" "}
                                    {moment(item?.createdAt).format("HH:mm ")}
                                  </div>
                                </div>
                              </DataTableRow>
                              <DataTableRow className="nk-tb-prev-sessions">
                                <div className="text-truncate" style={{ maxWidth: '200px' }}>{item.txnHash}</div>
                              </DataTableRow>
                              <DataTableRow className="nk-tb-prev-sessions">
                                <div className="text-truncate" style={{ maxWidth: '200px' }} >{item.walletId}</div>
                              </DataTableRow>
                              <DataTableRow className="nk-tb-prev-sessions">
                                <div className="text-truncate" style={{ maxWidth: '200px' }}>{item.toAddress} </div>
                              </DataTableRow>
                              <DataTableRow className="nk-tb-prev-sessions">
                                <div>{`${item.amount / 100}`}</div>
                              </DataTableRow>
                              <DataTableRow className="nk-tb-prev-sessions">
                                <div>{item.currencySymbol} </div>
                              </DataTableRow>
                              <DataTableRow className="nk-tb-prev-sessions">
                                <div>{item.gasFee ? item?.gasFee / 1000000000000000000 : 0} </div>
                              </DataTableRow>
                              {/* <DataTableRow className="nk-tb-prev-sessions">
                                <div>{item.commission / 100} </div>
                              </DataTableRow> */}
                              <DataTableRow className="nk-tb-prev-sessions">
                                <div>{item.isOrphanTxn ? 'Yes' : 'No'} </div>
                              </DataTableRow>
                              {/* <DataTableRow className="nk-tb-prev-sessions">
                                <div>{item.callbackStatus} </div>
                              </DataTableRow> */}

                            </DataTableItem>
                          );
                        }
                        return null;
                      })}



                    </div>
                    :


                    (
                      <>
                        <div className="nk-tb-list is-loose traffic-channel-table">
                          <DataTableHead className="text-center">
                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">ID</DataTableRow>
                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Date</DataTableRow>
                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">From</DataTableRow>
                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">To</DataTableRow>
                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Amount IDRT</DataTableRow>
                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Action</DataTableRow>
                          </DataTableHead>
                        </div>
                        <div className="card text-center p-3">
                          <div className="font-weight-bold" style={{ fontSize: '16px' }}>No data to display</div>
                        </div>






                      </>
                    )}
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
