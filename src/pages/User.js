import React, { useEffect, useState } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    PreviewCard,
    ReactDataTable,
    UserAvatar,
    PaginationComponent,
} from "../components/Component";
import moment from "moment";
import { Alert, Button, Card } from "reactstrap";
import { fetchUserTransactionsError, fetchUserTransactions, fetchWalletHistory } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
import WalletHistory from "../components/partials/table-partials/Wallet/WalletHistory";

const User = () => {
    const [searchText, setSearchText] = useState("");
    const { userTransaction, userTransactionError } = useSelector((state) => state.Transaction);
    const { walletBalance, walletError } = useSelector((state) => state.Wallet);
    const [userID, setUserID] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [data, setData] = useState(userTransaction?.data);

    const dispatch = useDispatch();

    // onChange function for searching name
    const onSearchChange = (e) => {
        setSearchText(e.target.value);
    };
    const handleSearch = () => {
        if (searchText !== "") {
            setUserID(searchText)
        }
    }

    // Changing state value when searching name
    useEffect(() => {
        if (userID) {
            dispatch(fetchUserTransactions(userID));
        }
    }, [userID]);

    useEffect(() => {
        dispatch(fetchUserTransactionsError());
    }, []);


    // Changing state value when searching name
    useEffect(() => {
        if (userTransaction?.data) {

            setData(userTransaction?.data)
        }

    }, [userTransaction]);



    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    let currentItems = userTransaction?.data?.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <Head title="User" />
            <Content>
                <BlockHead size="lg">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h2" className="fw-normal">
                                User
                            </BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <ul className="nk-block-tools g-3">
                                <li>
                                    <div className="form-control-wrap d-flex align-items-center">

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="default-04"
                                            placeholder="Search User ID"
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

                <Block >
                    <div className="d-flex flex-column mb-3">
                        {userTransactionError &&
                            <Alert color="danger">
                                User Transaction API Error:  {userTransactionError}
                            </Alert>
                        }
                        {walletError &&
                            <Alert color="danger">
                                Wallet API Error: {walletError}
                            </Alert>
                        }
                    </div>
                    {userTransaction &&
                        <Card className="card-bordered card-stretch">
                            <div className="card-inner-group">
                                <div className="card-inner">
                                    <div className="card-title-group">
                                        <div className="card-title">
                                            <h5 className="title">User Transactions</h5>
                                        </div>

                                    </div>
                                </div>
                                <div className="card-inner p-o">
                                    <table className="table w-100 d-table table-hover table-responsive">
                                        <thead>
                                            <tr className="tb-tnx-head">
                                                <th className="tb-tnx-id">
                                                    <span className="">ID</span>
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
                                                <th className="">
                                                    <span className="">Orphan Tnx</span>
                                                </th>
                                                <th className="">
                                                    <span className="">CallBack Status</span>
                                                </th>



                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.length > 0
                                                ? data?.map((item) => {
                                                    return (
                                                        <tr key={item.txnHash} className="">
                                                            <td className="tb-tnx font-weight-bold">
                                                                <div className="text-success text-truncate" style={{ maxWidth: '100px' }}>{item.userId}</div>
                                                            </td>
                                                            <td className="">
                                                                <span className="date">
                                                                    <div>{moment(item?.createdAt).format("DD/MM/YYYY")}</div>
                                                                    <div className="badge badge-secondary font-size-10">
                                                                        {" "}
                                                                        {moment(item?.createdAt).format("hh:mm A")}
                                                                    </div>
                                                                </span>
                                                            </td>
                                                            <td className="">
                                                                <div className="text-truncate" style={{ maxWidth: '150px' }}>{item?.txnHash}</div>
                                                            </td>
                                                            <td className="">
                                                                <div className="text-truncate font-weight-bolder" style={{ maxWidth: '150px' }}>{item?.fromAddress}</div>
                                                            </td>
                                                            <td className="">
                                                                <div className="text-truncate font-weight-bolder" style={{ maxWidth: '150px' }}>{item?.walletId}</div>
                                                            </td>
                                                            <td className="tb-info">
                                                                <div className="text-truncate" style={{ maxWidth: '150px' }}>{(item?.amount / 100).toLocaleString()}</div>
                                                            </td>
                                                            <td className="tb-info">
                                                                <span className="">{item?.gasFee}</span>
                                                            </td>

                                                            <td className="tb-info">
                                                                <span className="">{item?.currencySymbol}</span>
                                                            </td>
                                                            <td className="tb-info">
                                                                <span className="">{item?.isOrphanTxn ? 'Yes' : 'No'}</span>
                                                            </td>
                                                            <td className="tb-info">
                                                                <span className="">{item?.callbackStatus}</span>
                                                            </td>



                                                        </tr>
                                                    );
                                                })
                                                : null}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-inner">
                                    {data?.length > 0 ? (
                                        <PaginationComponent
                                            noDown
                                            itemPerPage={itemPerPage}
                                            totalItems={userTransaction?.totalItems}
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
                        </Card>
                    }

                    <div className="mt-5">
                        <WalletHistory Id={userID} type={'user'} />
                    </div>
                </Block>
            </Content>
        </React.Fragment>
    );
};
export default User;
