import React, { useState, useEffect } from "react";
import Content from "../../../../layout/content/Content.js";
import Head from "../../../../layout/head/Head.js";
import {
    Block,
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    Col,
    PaginationComponent,
} from "../../../Component.js";
import moment from "moment";
import { Alert, Button, Card } from "reactstrap";
import { fetchTransactionAddressError, fetchTransactionAddressOut } from "../../../../store/actions.js";
import { useSelector, useDispatch } from "react-redux";


const OutgoingWalletTnx = ({ walletAddress }) => {
    const { transactionAddressOut, transactionError } = useSelector((state) => state.Transaction);
    const [data, setData] = useState(transactionAddressOut?.data || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const dispatch = useDispatch();

    // Changing state value when searching name
    useEffect(() => {
        if (walletAddress) {
            dispatch(fetchTransactionAddressOut({
                walletAddress,
                page: currentPage, perPage: itemPerPage,
                type: 'out'
            }));
        }
    }, [walletAddress, currentPage]);

    useEffect(() => {
        dispatch(fetchTransactionAddressError());
    }, []);


    // Changing state value when searching name
    useEffect(() => {
        if (transactionAddressOut?.data) {
            setData(transactionAddressOut?.data)
        }
    }, [transactionAddressOut]);



    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = transactionAddressOut?.data?.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>


            <Block>
                <div className="d-flex flex-column">
                    {transactionError &&
                        <Alert color="danger">
                            Transaction API Error: {transactionError}
                        </Alert>
                    }
                </div>
                {transactionAddressOut &&
                    <Card className="card-bordered card-stretch">
                        <div className="card-inner-group">
                            <div className="card-inner">
                                <div className="card-title-group">
                                    <div className="card-title">
                                        <h5 className="title">Outgoing Transactions</h5>
                                    </div>

                                </div>
                            </div>
                            <div className="card-inner p-0">
                                <table className="table w-100 d-table table-hover table-responsive">
                                    <thead>
                                        <tr className="tb-tnx-head">
                                            {/* <th className="tb-tnx-id">
                                                <span className="">User</span>
                                            </th> */}
                                            <th className="">
                                                <span>Date</span>
                                            </th>
                                            <th className="">
                                                <span>Transaction Hash</span>
                                            </th>
                                            <th className="">
                                                <span className="">From Wallet</span>
                                            </th>

                                            <th className="">
                                                <span className="">To Wallet</span>
                                            </th>
                                            <th className="">
                                                <span className="">Gas Fee</span>
                                            </th>
                                            <th className="">
                                                <span className="">Amount</span>
                                            </th>
                                            <th className="">
                                                <span className="">Currency</span>
                                            </th>
                                            {/* <th className="">
                                                <span className="">Orphan Tnx</span>
                                            </th> */}



                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.length > 0
                                            ? data?.map((item) => {
                                                return (
                                                    <tr key={item.txnHash} className="">
                                                        {/* <td className="tb-tnx font-weight-bold">
                                                            <span>{item.username}</span>
                                                        </td> */}
                                                        <td className="">
                                                            <span className="date">
                                                                <div className="d-flex">
                                                                    {" "}
                                                                    <div>{moment(item?.createdAt).format("DD/MM/YYYY")}</div>

                                                                    <div className="ml-2">
                                                                        {" "}
                                                                        {moment(item?.createdAt).format("HH:mm ")}
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        </td>
                                                        <td className="">
                                                            <div className="text-truncate" style={{ maxWidth: '200px' }}>{item?.txnHash}</div>
                                                        </td>

                                                        <td className="">
                                                            <div className="text-truncate font-weight-bolder" style={{ maxWidth: '200px' }}>{item?.walletId}</div>
                                                        </td>
                                                        <td className="">
                                                            <div className="text-truncate font-weight-bolder" style={{ maxWidth: '200px' }}>{item?.toAddress}</div>
                                                        </td>
                                                        <td className="tb-info">
                                                            <span className="">{item?.gasFee ? item?.gasFee / 1000000000000000000 : 0}</span>
                                                        </td>
                                                        <td className="tb-info">
                                                            <span className="">{(item?.amount / 100).toLocaleString()}</span>
                                                        </td>
                                                        <td className="tb-info">
                                                            <span className="">{item?.currencySymbol}</span>
                                                        </td>
                                                        {/* <td className="tb-info">
                                                            <span className="">{item?.isOrphanTxn ? 'Yes' : 'No'}</span>
                                                        </td> */}
                                                    </tr>
                                                );
                                            })
                                            : null}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-inner">
                                {data.length > 0 ? (
                                    <PaginationComponent
                                        noDown
                                        itemPerPage={itemPerPage}
                                        totalItems={transactionAddressOut?.totalItems}
                                        paginate={paginate}
                                        currentPage={currentPage}
                                    />
                                ) : (
                                    <div className="text-center">
                                        <span className="text-silent">No data found</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>}
            </Block>
        </React.Fragment>
    );
};

export default OutgoingWalletTnx;
