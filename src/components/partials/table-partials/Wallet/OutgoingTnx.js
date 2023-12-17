import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider } from '@mui/material';
import { ArrowDownward, ChevronLeft, ChevronRight, FilterList, FirstPage, LastPage } from '@mui/icons-material';
import {
    Block,
    PaginationComponent,
} from "../../../Component.js";
import moment from "moment";
import { fetchTransactionAddressError, fetchTransactionAddressOut } from "../../../../store/actions.js";
import { useSelector, useDispatch } from "react-redux";


const OutgoingWalletTnx = ({ walletAddress }) => {
    const { transactionAddressOut, transactionError } = useSelector((state) => state.Transaction);
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



    const theme = createTheme();
    const columns = [
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
        { title: 'From Wallet', field: 'walletId' },
        { title: 'To Wallet', field: 'toAddress' },
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
    ];
    return (
        <React.Fragment>
            <Block>
                {transactionAddressOut?.data &&
                    <div className="p-0">
                        <ThemeProvider theme={theme}>
                            <MaterialTable
                                title="Outgoing Transactions"
                                columns={columns}
                                data={query =>
                                    new Promise((resolve, reject) => {
                                        let url = `${process.env.REACT_APP_BASE_URL}/transactions/outgoingByWallet/${walletAddress}?`
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
            </Block>
        </React.Fragment>
    );
};

export default OutgoingWalletTnx;
