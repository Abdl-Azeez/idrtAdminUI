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
import { fetchWalletHistoryError, fetchWalletHistory } from "../../../../store/actions.js";
import { useSelector, useDispatch } from "react-redux";


const WalletHistory = ({ Id, type = "wallet" }) => {
    const { walletHistory, walletError } = useSelector((state) => state.Wallet);
    const [data, setData] = useState(walletHistory || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const dispatch = useDispatch();

    // Changing state value when searching name
    useEffect(() => {
        if (Id) {
            dispatch(fetchWalletHistory(
                { Id, type }
            ));
        }
    }, [Id, currentPage, dispatch, type]);


    useEffect(() => {
        if (!Id) {
            dispatch(fetchWalletHistoryError());
        }
    }, [dispatch, Id]);

    // Changing state value when searching name
    useEffect(() => {
        if (walletHistory) {
            setData(walletHistory)
        }
    }, [walletHistory]);



    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = walletHistory?.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>


            <Block>
                {walletHistory &&
                    <Card className="card-bordered card-stretch">
                        <div className="card-inner-group">
                            <div className="card-inner">
                                <div className="card-title-group">
                                    <div className="card-title">
                                        <h5 className="title">Wallet History</h5>
                                    </div>

                                </div>
                            </div>
                            <div className="card-inner p-0">
                                <table className="table w-100 d-table table-hover table-responsive">
                                    <thead>
                                        <tr className="tb-tnx-head">
                                            <th className="tb-tnx-id">
                                                <span className="">ID</span>
                                            </th>
                                            <th className="">
                                                <span>Attached At</span>
                                            </th>
                                            <th className="">
                                                <span>Detached At</span>
                                            </th>
                                            <th className="">
                                                <span className="">User ID</span>
                                            </th>
                                            <th className="">
                                                <span className="">Wallet ID</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.length > 0
                                            ? data?.map((item) => {
                                                return (
                                                    <tr key={item.id} className="">
                                                        <td className="tb-tnx font-weight-bold">
                                                            <span className="text-success">{item.id}</span>
                                                        </td>
                                                        <td className="">
                                                            <span className="date">

                                                                <div className="d-flex">
                                                                    {" "}
                                                                    <div>{moment(item?.attachedAt).format("DD/MM/YYYY")}</div>
                                                                    <div className="mx-1">-</div>
                                                                    <div className="">
                                                                        {" "}
                                                                        {moment(item?.attachedAt).format("HH:mm ")}
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        </td>
                                                        <td className="">
                                                            <span className="date">

                                                                <div className="d-flex">
                                                                    {" "}
                                                                    <div>{moment(item?.detachedAt).format("DD/MM/YYYY")}</div>
                                                                    <div className="mx-1">-</div>
                                                                    <div className="">
                                                                        {" "}
                                                                        {moment(item?.detachedAt).format("HH:mm ")}
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        </td>
                                                        <td className="">
                                                            <div className="text-truncate font-weight-bolder">{item?.userId}</div>
                                                        </td>
                                                        <td className="">
                                                            <div className="text-truncate font-weight-bolder">{item?.walletId}</div>
                                                        </td>
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
                                        totalItems={walletHistory?.length}
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

export default WalletHistory;
