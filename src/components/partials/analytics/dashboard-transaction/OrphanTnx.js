import React, { useEffect, useState } from "react";
import {
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    DataTableRow,
    DataTableItem,
    Row,
    Col,
    DataTableHead,
    DataTableBody,
} from "../../../Component";
import { Card, Button } from "reactstrap";
import { fetchOrphan } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const OrphanTnx = () => {
    const { orphanTnx } = useSelector((state) => state.Transaction);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrphan({ page: 1, perPage: 5 }));
    }, [dispatch]);

    return (
        <React.Fragment>
            {orphanTnx &&
                <>
                    <BlockHead size="sm" className="d-flex justify-content-between pb-2 pt-5">
                        <div className="nk-block-between">
                            <BlockHeadContent>
                                <BlockTitle page tag="h3">
                                    ORPHAN TRANSACTIONS
                                </BlockTitle>
                            </BlockHeadContent>
                        </div>
                    </BlockHead>
                    <Block>
                        <Row className="g-gs">
                            <Col lg="12" xxl="12">
                                <Card className="h-100">
                                    {orphanTnx?.data?.length > 0 ?
                                        <div className="nk-tb-list is-loose traffic-channel-table">
                                            <DataTableHead className="">
                                                {/* <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">ID</DataTableRow> */}
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Date</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Transaction Hash</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">From Wallet</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">To Wallet</DataTableRow>


                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Amount</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Currency</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Gas Fee</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Commission</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Orphan Tnx</DataTableRow>


                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Callback Status</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Action</DataTableRow>
                                            </DataTableHead>
                                            {orphanTnx?.data?.map((item, i) => {
                                                if (i <= 5) {
                                                    return (
                                                        <DataTableItem className="nk-tb-item L" key={item.txnHash}>
                                                            {/* <DataTableRow className="nk-tb-channel">
                                                                <div>{item.id}</div>
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
                                                                <div className="text-truncate" style={{ maxWidth: '150px' }}>{item.txnHash}</div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-prev-sessions">
                                                                <div className="text-truncate" style={{ maxWidth: '150px' }} >{item.fromAddress}</div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-prev-sessions">
                                                                <div className="text-truncate" style={{ maxWidth: '150px' }}>{item.walletId} </div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-prev-sessions">
                                                                <div>{`${item.amount / 100}`}</div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-prev-sessions">
                                                                <div>{item.currencySymbol} </div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-prev-sessions">
                                                                <div>{item.gasFee} </div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-prev-sessions">
                                                                <div>{item.commission / 100} </div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-prev-sessions">
                                                                <div>{item.isOrphanTxn ? 'Yes' : 'No'} </div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-prev-sessions">
                                                                <div>{item.callbackStatus} </div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-sessions">
                                                                <div className="d-flex justify-content-center" style={{ width: '150px' }}>
                                                                    <input type="text" style={{ borderRight: "none", width: '100px' }} />

                                                                    <Button size="sm" color="primary" style={{ right: "10px" }}>
                                                                        Submit
                                                                    </Button>
                                                                </div>
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
                                </Card>
                            </Col>
                        </Row>
                    </Block>
                </>
            }
        </React.Fragment >
    );
};
export default OrphanTnx;