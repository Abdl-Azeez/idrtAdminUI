import React, { useState, useEffect, useLayoutEffect } from "react";
import {
    Card, Alert, Modal,
    ModalHeader,
    ModalBody,
    FormGroup
} from "reactstrap";
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
    const [data, setData] = useState(incomingTnx?.data);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedMerchant, setSelectedMerchant] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIncomingTnx({ page: currentPage, perPage: itemPerPage }));
        setData(incomingTnx?.data)

    }, [dispatch, currentPage]);

    console.log(selectedMerchant)

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
                            <div className="mr-2">
                                <Button size="sm" color="primary" onClick={() => setShowFilterModal(true)}>Filter By Merchant</Button>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    {transactionError &&
                        <Alert color="danger">
                            Transaction API Error: {transactionError}
                        </Alert>
                    }
                    <Card className="card-bordered card-stretch">
                        <div className="card-inner-group">
                            <div className="card-inner">
                                <div className="card-title-group">
                                    <div className="card-title">
                                        <h5 className="title">Incoming Transactions</h5>
                                    </div>

                                    <ul className="nk-block-tools g-3">
                                        <li>
                                            <div className="form-control-wrap">
                                                <div className="form-icon form-icon-right">
                                                    {/* <Icon name="search"></Icon> */}
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="default-04"
                                                    placeholder="Search by User name"
                                                    onChange={(e) => onFilterChange(e)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
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
                                            <th className="">
                                                <span className="">Orphan Tnx</span>
                                            </th>
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
                                                        <td className="tb-info">
                                                            <span className="">{item?.isOrphanTxn ? 'Yes' : 'No'}</span>
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
                                        totalItems={incomingTnx?.totalItems}
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
                </Block>

                <Modal
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
                </Modal>
            </Content>
        </React.Fragment>
    );
};

export default IncomingTnx;
