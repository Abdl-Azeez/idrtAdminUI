import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, Card, Button } from "reactstrap";
import {
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle, DataTableRow, DataTableItem, Row, Col, DataTableHead
} from "../../../Component";
import { fetchTransactions } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { merchantDataForAgent } from "../../../table/TableData";

const TopMerchants = () => {
    // const { transactions, transactionError } = useSelector((state) => state.Transaction);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchTransactions({ limit: 5 }));
    // }, [dispatch]);

    return (
        <React.Fragment>
            {merchantDataForAgent?.data &&
                <Card className="px-3 py-3 mt-5">
                    <BlockHead size="sm" className="d-flex justify-content-between">
                        <div className="nk-block-between">
                            <BlockHeadContent>
                                <p className="ml-4 mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>
                                    Top Merchants Performance Overview
                                </p>
                            </BlockHeadContent>
                        </div>
                    </BlockHead>
                    <Block>
                        <Row className="g-gs d-flex flex-column">
                            <Col lg="12" xxl="12">

                                {merchantDataForAgent?.data?.length > 0 ?
                                    <div className="nk-tb-list is-loose traffic-channel-table">
                                        <DataTableHead className="">
                                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">ID</DataTableRow>
                                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Name</DataTableRow>
                                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Total Deposit</DataTableRow>
                                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Total # of Txn</DataTableRow>
                                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Total Commission</DataTableRow>


                                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Avg Daily Deposit</DataTableRow>
                                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Deposit Unsettled</DataTableRow>

                                            <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Commission %</DataTableRow>
                                        </DataTableHead>
                                        {merchantDataForAgent?.data?.map((item, i) => {
                                            if (i <= 5) {
                                                return (
                                                    <DataTableItem className="nk-tb-item L" key={item.id}>
                                                        <DataTableRow className="nk-tb-channel">
                                                            <div>Mer{item.id}</div>
                                                        </DataTableRow>
                                                        <DataTableRow className="nk-tb-sessions">
                                                            <div className="d-flex">
                                                                {item.name}
                                                            </div>
                                                        </DataTableRow>
                                                        <DataTableRow className="nk-tb-prev-sessions">
                                                            <div>${item.totalDeposit}</div>
                                                        </DataTableRow>
                                                        <DataTableRow className="nk-tb-prev-sessions">
                                                            <div >{item.totalNumberOfTxn}</div>
                                                        </DataTableRow>
                                                        <DataTableRow className="nk-tb-prev-sessions">
                                                            <div>${item.totalCommission} </div>
                                                        </DataTableRow>
                                                        <DataTableRow className="nk-tb-prev-sessions">
                                                            <div>${item.averageDailyDepositAmount}</div>
                                                        </DataTableRow>
                                                        <DataTableRow className="nk-tb-prev-sessions">
                                                            <div>${item.depositAmountUnsettled} </div>
                                                        </DataTableRow>
                                                        <DataTableRow className="nk-tb-prev-sessions">
                                                            <div>{item.commissionPercentage}% </div>
                                                        </DataTableRow>
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


                            </Col>
                            {merchantDataForAgent?.data?.length > 0 &&
                                <Link to='/merchants'>
                                    <Button size="sm" color="info" className=" font-size-10 text-center w-100"><span>VIEW ALL TRANSACTIONS</span></Button>
                                </Link>
                            }
                        </Row>

                    </Block>
                </Card>}
        </React.Fragment>
    );
};
export default TopMerchants;
