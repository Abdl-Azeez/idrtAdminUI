import React, { useState, useEffect, useLayoutEffect } from "react";
import {
    Card, Alert, Modal,
    ModalHeader,
    ModalBody,
    FormGroup
} from "reactstrap";
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { Add, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';
import {
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Block,
    PaginationComponent,
    Button,
} from "../../../Component";
import { fetchIncomingTnx, errorChecker } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Content from "../../../../layout/content/Content";
import Autocomplete from "../../../Autocomplete";


const IncomingTnx = ({ }) => {
    const { incomingTnx, transactionError } = useSelector((state) => state.Transaction);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIncomingTnx({ page: currentPage, perPage: itemPerPage }));
        setData(incomingTnx?.data)
    }, [dispatch, currentPage, itemPerPage]);

    useEffect(() => {
        if (incomingTnx) {
            setData(incomingTnx?.data)
        }
    }, [incomingTnx]);

    const theme = createTheme();
    const columns = [
        { title: 'User', field: 'username' },
        { title: 'Date', field: 'createdAt' },
        { title: 'Transaction Hash', field: 'txnHash' },
        { title: 'From Wallet', field: 'fromAddress' },
        { title: 'To Wallet', field: 'walletId' },
        { title: 'Gas Fee', field: 'gasFee' },
        { title: 'Amount', field: 'amount' },
        { title: 'Currency', field: 'currencySymbol' },
        { title: 'Orphan Txn', field: 'isOrphanTxn' }
    ];


    useEffect(() => {
        if (transactionError) {
            setTimeout(() => {
                dispatch(errorChecker(transactionError));
            }, 2000);
        }
    }, [transactionError]);

    // Changing state value when searching name
    useEffect(() => {
        if (incomingTnx) {
            if (onSearchText !== "") {
                const filteredObject = incomingTnx?.data.filter((item) => {
                    return item.username.toLowerCase().includes(onSearchText.toLowerCase());
                });
                setData([...filteredObject]);
            } else {
                setData([...incomingTnx?.data]);
            }

        }

    }, [incomingTnx, onSearchText]);

    // onChange function for searching name
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };




    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    let currentItems = incomingTnx?.data?.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = ((pageNumber) => { setCurrentPage(pageNumber) });
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setItemPerPage(+event.target.value);
        // setCurrentPage(1);
    };
    return (
        <React.Fragment>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h2" className="fw-normal">Transactions</BlockTitle>
                            {/* <BlockDes className="text-soft">
                                <p>You have {incomingTnx?.totalItems} Incoming Transactions.</p>
                            </BlockDes> */}
                        </BlockHeadContent>
                        <BlockHeadContent>
                            {/* <div className="mr-2">
                                <Button size="sm" color="primary" onClick={() => setShowFilterModal(true)}>Filter By Merchant</Button>
                            </div> */}
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    {transactionError &&
                        <Alert color="danger">
                            Transaction API Error: {transactionError}
                        </Alert>
                    }
                    <div className="p-0">
                        <ThemeProvider theme={theme}>
                            <MaterialTable
                                title="Incoming Transactions"
                                columns={columns}
                                data={(query) =>
                                    new Promise((resolve, reject) => {
                                        // Assuming incomingTnx.data is an array of items
                                        const dataSlice = incomingTnx.data.slice(query.page * query.pageSize, (query.page + 1) * query.pageSize);
                                        resolve({
                                            data: data,
                                            page: query.page,
                                            totalCount: incomingTnx.totalItems, // Assuming incomingTnx.total is the total count
                                        });
                                    })
                                }
                                options={{
                                    filtering: true,
                                    pagination: true,
                                    pageSize: itemPerPage,
                                    pageSizeOptions: [5, 10, 20],
                                }}
                                totalCount={total}
                                onChangePage={(page) => setCurrentPage(page)}
                                onChangeRowsPerPage={(pageSize) => {
                                    setItemPerPage(pageSize);
                                    setCurrentPage(1); // Reset to the first page when changing items per page
                                }}
                                icons={{
                                    Add: Add,
                                    Check: Check,
                                    Clear: Clear,
                                    Delete: DeleteOutline,
                                    DetailPanel: ChevronRight,
                                    Edit: Edit,
                                    Export: SaveAlt,
                                    Filter: FilterList,
                                    FirstPage: FirstPage,
                                    LastPage: LastPage,
                                    NextPage: ChevronRight,
                                    PreviousPage: ChevronLeft,
                                    ResetSearch: Clear,
                                    Search: Search,
                                    SortArrow: ArrowDownward,
                                    ThirdStateCheck: Remove,
                                    ViewColumn: ViewColumn,
                                }}
                            />
                            {/* <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={incomingTnx?.totalItems}
                                rowsPerPage={itemPerPage}
                                page={currentPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            /> */}
                        </ThemeProvider>
                    </div>
                </Block>

                {/* <Modal
                    isOpen={showFilterModal}
                    toggle={() => setShowFilterModal(!showFilterModal)}
                >
                    <ModalHeader toggle={() => setShowFilterModal(false)}>
                        Filter By Merchant
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup className='mb-4' style={{ zIndex: '999' }}>
                            <Autocomplete setMerchant={(e) => setSelectedMerchant(e)} />
                        </FormGroup>
                        <button className='btn btn-success mr-2' type='submit' onClick={() => setShowFilterModal(false)}>
                            Submit
                        </button>
                    </ModalBody>
                </Modal> */}
            </Content>
        </React.Fragment>
    );
};

export default IncomingTnx;
