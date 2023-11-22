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
    console.log(orphanTnx)
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
                                            <DataTableHead className="text-center">
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">ID</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Date</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">From</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">To</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Amount IDRT</DataTableRow>
                                                <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">Action</DataTableRow>
                                            </DataTableHead>
                                            {orphanTnx?.data?.map((item, i) => {
                                                if (i <= 5) {
                                                    return (
                                                        <DataTableItem className="nk-tb-item L" key={item.txnHash}>
                                                            <DataTableRow className="nk-tb-channel">
                                                                {/* <span className="tb-lead">{item.channel}</span> */}
                                                                <div>{item.id}</div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-sessions">
                                                                <div>
                                                                    {" "}
                                                                    <div>{moment(item?.createdAt).format("DD/MM/YYYY")}</div>
                                                                    <div className="badge badge-soft-secondary font-size-10">
                                                                        {" "}
                                                                        {moment(item?.createdAt).format("hh:mm A")}
                                                                    </div>
                                                                </div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-prev-sessions">
                                                                <div>{item.fromAddress}</div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-prev-sessions">
                                                                <div>{item.walletId} </div>
                                                            </DataTableRow>
                                                            <DataTableRow className="nk-tb-prev-sessions">
                                                                <div>{`${item.amount / 100}`}</div>
                                                            </DataTableRow>

                                                            <DataTableRow className="nk-tb-sessions">
                                                                <div className="d-flex justify-content-center">
                                                                    <input type="text" style={{ borderRight: "none" }} />

                                                                    <Button size="sm" color="danger" style={{ right: "10px" }}>
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
