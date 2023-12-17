import React, { useEffect, useState } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider } from '@mui/material';
import { ArrowDownward, ChevronLeft, ChevronRight, FilterList, FirstPage, LastPage } from '@mui/icons-material';
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
    const { userTransaction, userTransactionError } = useSelector((state) => state.Transaction);
    const { walletBalance, walletError } = useSelector((state) => state.Wallet);
    const [userID, setUserID] = useState('clp8hu68t0000ncvh03fi48pw');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [data, setData] = useState(userTransaction?.data || ['']);

    const dispatch = useDispatch();



    // Changing state value when searching name
    useEffect(() => {
        if (userID) {
            dispatch(fetchUserTransactions({ id: userID, page: currentPage, perPage: itemPerPage }));
        }
    }, [dispatch, userID, currentPage]);

    useEffect(() => {
        if (!userID) {
            dispatch(fetchUserTransactionsError());
        }
    }, [dispatch, userID]);


    // Changing state value when searching name
    useEffect(() => {
        if (userTransaction?.data) {
            setData(userTransaction?.data)
        }
    }, [userTransaction]);


    const theme = createTheme();
    const columns = [
        { title: 'ID', field: 'username' },
        {
            title: 'Date',
            field: 'createdAt',
            render: rowData => <span className="date">
                <div className="d-flex">
                    {" "}
                    <div>{moment(rowData?.createdAt).format("DD/MM/YYYY")}</div>

                    <div className="ml-2">
                        {" "}
                        {moment(rowData?.createdAt).format("HH:mm ")}
                    </div>
                </div>
            </span>,
        },
        { title: 'Transaction Hash', field: 'txnHash' },
        { title: 'From Wallet', field: 'fromAddress' },
        { title: 'To Wallet', field: 'walletId' },
        {
            title: 'Gas Fee',
            field: 'gasFee',
            render: rowData => <span>{Number(rowData?.gasFee ? rowData?.gasFee / 1000000000000000000 : 0)}</span>,
        },
        {
            title: 'Amount',
            field: 'amount',
            render: rowData => <span>{Number(rowData.amount / 100).toLocaleString()}</span>,
        },
        { title: 'Currency', field: 'currencySymbol' },
        { title: 'Orphan Txn', field: 'isOrphanTxn' },
        { title: 'CallBack Status', field: 'callbackStatus' },
    ];

    return (
        <React.Fragment>
            <Head title="Users" />
            <Content>
                <BlockHead size="lg">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h2" className="fw-normal">
                                Users
                            </BlockTitle>
                        </BlockHeadContent>

                    </BlockBetween>
                </BlockHead>

                <Block >
                    <div className="d-flex flex-column">
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
                        <div className="p-0">
                            <ThemeProvider theme={theme}>
                                <MaterialTable
                                    title="User Transactions"
                                    columns={columns}
                                    data={query =>
                                        new Promise((resolve, reject) => {
                                            let url = `${process.env.REACT_APP_BASE_URL}/transactions/byUser/${userID}?`
                                            url += 'perPage=' + query.pageSize
                                            url += '&page=' + (query.page + 1)
                                            query.filters.forEach((filter) => {
                                                url += `&${filter.column.field}=${filter.value}`;
                                            });
                                            fetch(url)
                                                .then(response => response.json())
                                                .then(result => {
                                                    resolve({
                                                        data: result.data,
                                                        page: result.page - 1,
                                                        totalCount: result.totalItems,
                                                    })
                                                })
                                        })
                                    }
                                    options={{
                                        filtering: true,
                                        pagination: true,
                                        pageSize: itemPerPage,
                                        pageSizeOptions: [10, 25, 50, 100],
                                        // initialPage: 1,
                                        search: false
                                    }}
                                    onChangePage={(page) => { setCurrentPage(page); }}
                                    onChangeRowsPerPage={(pageSize) => {
                                        setItemPerPage(pageSize);
                                        setCurrentPage(1);
                                    }}
                                    icons={{
                                        Filter: FilterList,
                                        FirstPage: FirstPage,
                                        LastPage: LastPage,
                                        NextPage: ChevronRight,
                                        PreviousPage: ChevronLeft,
                                        SortArrow: ArrowDownward,
                                    }}
                                />

                            </ThemeProvider>
                        </div>
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
