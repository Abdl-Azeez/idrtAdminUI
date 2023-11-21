import React, { useState, useEffect } from "react";
import Content from "../layout/content/Content.js";
import Head from "../layout/head/Head";
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
} from "../components/Component";
import moment from "moment";
import { Alert, Button, Card } from "reactstrap";
import { fetchTransactionAddressError, fetchWalletBalance, fetchTransactionAddress } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";

const Wallets = () => {
    const [searchText, setSearchText] = useState("");
    const { transactionAddress, transactionError } = useSelector((state) => state.Transaction);
    const { walletBalance, walletError } = useSelector((state) => state.Wallet);
    const [data, setData] = useState(transactionAddress?.incomingTxns || []);
    const [walletAddress, setAddress] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const dispatch = useDispatch();

    const onSearchChange = (e) => {
        setSearchText(e.target.value);
    };
    const handleSearch = () => {
        if (searchText !== "") {
            setAddress(searchText)
        }
    }

    // Changing state value when searching name
    useEffect(() => {
        dispatch(fetchTransactionAddressError());
        if (walletAddress) {
            dispatch(fetchTransactionAddress(walletAddress));
            dispatch(fetchWalletBalance(walletAddress));
        }
    }, [walletAddress]);


    // Changing state value when searching name
    useEffect(() => {
        if (transactionAddress?.incomingTxns) {

            setData(transactionAddress?.incomingTxns)
        }

    }, [transactionAddress]);



    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    console.log(walletBalance, transactionAddress)

    return (
        <React.Fragment>
            <Head title="Wallets"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Wallets</BlockTitle>
                            <BlockDes className="text-soft">
                                <p>You have total {data.length} Wallets.</p>
                            </BlockDes>
                        </BlockHeadContent>
                        <BlockHeadContent>
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
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <div className="d-flex flex-column">
                        {transactionError &&
                            <Alert color="danger">
                                {transactionError}
                            </Alert>
                        }
                        {walletError &&
                            <Alert color="danger">
                                {walletError}
                            </Alert>
                        }
                    </div>
                    {transactionAddress &&
                        <Card className="card-bordered card-stretch">
                            <div className="card-inner-group">
                                <div className="card-inner">
                                    <div className="card-title-group">
                                        <div className="card-title">
                                            <h5 className="title">All Wallets</h5>
                                        </div>
                                        <div className="card-title d-flex align-items-center">
                                            <h5 className="title mr-2 mb-0">Balance Wallet: </h5>
                                            <span>{walletBalance ? walletBalance[0]?.balance / 100 : 0}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-inner p-0">
                                    <table className="table table-tranx">
                                        <thead>
                                            <tr className="tb-tnx-head">
                                                <th className="tb-tnx-id">
                                                    <span className="">#</span>
                                                </th>
                                                <th className="tb-tnx-info">
                                                    <span className="tb-tnx-desc d-none d-sm-inline-block">
                                                        <span>Bill For</span>
                                                    </span>
                                                    <span className="tb-tnx-date d-md-inline-block d-none">
                                                        <span className="d-md-none">Date</span>
                                                        <span className="d-none d-md-block">
                                                            <span>Issue Date</span>
                                                            <span>Due Date</span>
                                                        </span>
                                                    </span>
                                                </th>
                                                <th className="tb-tnx-amount is-alt">
                                                    <span className="tb-tnx-total">Total</span>
                                                    <span className="tb-tnx-status d-none d-md-inline-block">Status</span>
                                                </th>
                                                <th className="tb-tnx-action">
                                                    <span>&nbsp;</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.length > 0
                                                ? currentItems.map((item) => {
                                                    return (
                                                        <tr key={item.id} className="tb-tnx-item">
                                                            <td className="tb-tnx-id">
                                                                <a
                                                                    href="#ref"
                                                                    onClick={(ev) => {
                                                                        ev.preventDefault();
                                                                    }}
                                                                >
                                                                    <span>{item.ref}</span>
                                                                </a>
                                                            </td>
                                                            <td className="tb-tnx-info">
                                                                <div className="tb-tnx-desc">
                                                                    <span className="title">{item.bill}</span>
                                                                </div>
                                                                <div className="tb-tnx-date">
                                                                    <span className="date">{item.issue}</span>
                                                                    <span className="date">{item.due}</span>
                                                                </div>
                                                            </td>
                                                            <td className="tb-tnx-amount is-alt">
                                                                <div className="tb-tnx-total">
                                                                    <span className="amount">${item.total}</span>
                                                                </div>
                                                                <div className="tb-tnx-status">
                                                                    <span
                                                                        className={`badge badge-dot badge-${item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                                                                            }`}
                                                                    >
                                                                        {item.status}
                                                                    </span>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    );
                                                })
                                                : null}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-inner">
                                    {currentItems.length > 0 ? (
                                        <PaginationComponent
                                            noDown
                                            itemPerPage={itemPerPage}
                                            totalItems={data.length}
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



            </Content>
        </React.Fragment>
    );
};

export default Wallets;
