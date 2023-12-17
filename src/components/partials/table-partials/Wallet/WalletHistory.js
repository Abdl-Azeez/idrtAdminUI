import React, { useState, useEffect } from "react";
import Content from "../../../../layout/content/Content.js";
import Head from "../../../../layout/head/Head.js";
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider } from '@mui/material';
import { ArrowDownward, ChevronLeft, ChevronRight, FilterList, FirstPage, LastPage } from '@mui/icons-material';
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

    const theme = createTheme();
    const columns = [
        { title: 'User', field: 'id' },
        {
            title: 'Attached At',
            field: 'attachedAt',
            render: rowData => <span className="date">
                <div className="d-flex">
                    {" "}
                    <div>{moment(rowData?.attachedAt).format("DD/MM/YYYY")}</div>

                    <div className="ml-2">
                        {" "}
                        {moment(rowData?.attachedAt).format("HH:mm ")}
                    </div>
                </div>
            </span>,
        },
        {
            title: 'Detached At',
            field: 'detachedAt',
            render: rowData => <span className="date">
                <div className="d-flex">
                    {" "}
                    <div>{moment(rowData?.detachedAt).format("DD/MM/YYYY")}</div>

                    <div className="ml-2">
                        {" "}
                        {moment(rowData?.detachedAt).format("HH:mm ")}
                    </div>
                </div>
            </span>,
        },
        { title: 'User ID', field: 'userId' },
        { title: 'Wallet ID', field: 'walletId' },
    ];



    return (
        <React.Fragment>


            <Block>
                {walletHistory &&
                    <div className="p-0">
                        <ThemeProvider theme={theme}>
                            <MaterialTable
                                title="Wallet History"
                                columns={columns}
                                // data={query =>
                                //     new Promise((resolve, reject) => {
                                //         let url = `${process.env.REACT_APP_BASE_URL}/${type === 'user' ? 'wallet/assignHistoryByUser/' : 'wallet/assignHistoryByWallet/'}${Id}`
                                //         url += 'perPage=' + query.pageSize
                                //         url += '&page=' + (query.page + 1)
                                //         query.filters.forEach((filter) => {
                                //             url += `&${filter.column.field}=${filter.value}`;
                                //         });
                                //         fetch(url)
                                //             .then(response => response.json())
                                //             .then(result => {
                                //                 resolve({
                                //                     data: result.data,
                                //                     page: result.page - 1,
                                //                     totalCount: result.totalItems,
                                //                 })
                                //             })
                                //     })
                                // }
                                data={walletHistory}
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

export default WalletHistory;
