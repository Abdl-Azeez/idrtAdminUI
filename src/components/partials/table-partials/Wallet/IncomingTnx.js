import React, { useState, useEffect } from "react";
import Content from "../../../../layout/content/Content.js";
import Head from "../../../../layout/head/Head.js";
import {
    Block,
    PaginationComponent,
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
} from "../../../Component.js";
import moment from "moment";
import { Alert, Button, Card } from "reactstrap";
import { fetchTransactionAddressError, fetchWalletBalance, fetchTransactionAddress } from "../../../../store/actions.js";
import { useSelector, useDispatch } from "react-redux";


const IncomingWalletTnx = ({ updateAddress }) => {
    const { transactionAddress, transactionError } = useSelector((state) => state.Transaction);
    const { walletBalance, walletBalanceError } = useSelector((state) => state.Wallet);
    const [data, setData] = useState(transactionAddress?.data || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [walletAddress, setAddress] = useState(null);
    const dispatch = useDispatch();

    const onSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        if (searchText !== "") {
            setAddress(searchText)
            updateAddress(searchText)
        }
    }
    // Changing state value when searching name
    useEffect(() => {
        if (walletAddress) {
            dispatch(fetchTransactionAddress({
                walletAddress,
                page: currentPage, perPage: itemPerPage,
                type: 'in'
            }));
            dispatch(fetchWalletBalance(walletAddress));
        }
    }, [walletAddress, currentPage]);

    useEffect(() => {
        dispatch(fetchTransactionAddressError());
    }, []);


    // Changing state value when searching name
    useEffect(() => {
        if (transactionAddress?.data) {
            setData(transactionAddress?.data)
        }
    }, [transactionAddress]);



    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = transactionAddress?.data?.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <BlockHead size="sm">
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle tag="h2" className="fw-normal">Wallets</BlockTitle>

                    </BlockHeadContent>
                    {/* <BlockHeadContent>
                           
                        </BlockHeadContent> */}
                </BlockBetween>
            </BlockHead>
            <div className="d-flex justify-content-center position-relative" style={{ height: `${transactionAddress ? 'auto' : '400px'} `, top: `${transactionAddress ? '-70px' : 'auto'} ` }}>
                <ul className="nk-block-tools g-3">
                    <li>
                        <div className="form-control-wrap d-flex align-items-center">

                            <input
                                type="text"
                                className="form-control"
                                id="default-04"
                                placeholder="Search Wallet Address"
                                style={{ width: '400px' }}
                                onChange={(e) => onSearchChange(e)}
                            />
                            <Button size="sm" color="secondary" style={{ right: '70px' }} onClick={handleSearch}>
                                Search
                            </Button>
                        </div>
                    </li>

                </ul>
            </div>



            <Block>
                <div className="d-flex flex-column mb-3">
                    {transactionError &&
                        <Alert color="danger">
                            Transaction API Error: {transactionError}
                        </Alert>
                    }
                    {walletBalanceError &&
                        <Alert color="danger">
                            Wallet Balance API Error: {walletBalanceError}
                        </Alert>
                    }
                </div>
                {transactionAddress &&
                    <Card className="card-bordered card-stretch position-relative" style={{ top: `${transactionAddress ? '-25px' : 'auto'} ` }}>
                        <div className="card-inner-group">
                            <div className="card-inner">
                                <div className="card-title-group">
                                    <div className="card-title">
                                        <h5 className="title">Incoming Transactions</h5>
                                    </div>
                                    <div className="card-title d-flex align-items-center">
                                        <h5 className="title mr-2 mb-0">Balance Wallet: </h5>
                                        <span>{walletBalance ? walletBalance[0]?.balance / 100 : 0}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-inner p-0">
                                <table className="table w-100 d-table table-hover table-responsive">
                                    <thead>
                                        <tr className="tb-tnx-head">
                                            <th className="tb-tnx-id">
                                                <span className="">User</span>
                                            </th>
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
                                                        <td className="tb-tnx font-weight-bold">
                                                            <span>{item.username}</span>
                                                        </td>
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
                                                            <div className="text-truncate font-weight-bolder" style={{ maxWidth: '200px' }}>{item?.fromAddress}</div>
                                                        </td>
                                                        <td className="">
                                                            <div className="text-truncate font-weight-bolder" style={{ maxWidth: '200px' }}>{item?.walletId}</div>
                                                        </td>
                                                        <td className="tb-info">
                                                            <span className="">{item?.gasFee}</span>
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
                                        totalItems={transactionAddress?.totalItems}
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

export default IncomingWalletTnx;
