import React, { useState, useEffect } from "react";

import {
    Card,
} from "reactstrap";
import {
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    Block,
    PaginationComponent,
} from "../../../Component";

import moment from "moment";
import Content from "../../../../layout/content/Content";


const OutgoingTnx = ({ transactions }) => {
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [sort, setSortState] = useState("");
    const [data, setData] = useState(transactions?.outgoingTxns);

    console.log(transactions)


    const sortingFunc = (params) => {
        let defaultData = data;
        if (params === "asc") {
            let sortedData = [...defaultData].sort((a, b) => parseFloat(a.ref) - parseFloat(b.ref));
            setData([...sortedData]);
        } else if (params === "dsc") {
            let sortedData = [...defaultData].sort((a, b) => parseFloat(b.ref) - parseFloat(a.ref));
            setData([...sortedData]);
        }
    };

    // Changing state value when searching name
    useEffect(() => {
        if (transactions) {
            if (onSearchText !== "") {
                const filteredObject = transactions?.outgoingTxns.filter((item) => {
                    return item.userId.toLowerCase().includes(onSearchText.toLowerCase());
                });
                setData([...filteredObject]);
            } else {
                setData([...transactions?.outgoingTxns]);
            }
        }
    }, [transactions, onSearchText]);

    // onChange function for searching name
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };




    // // function to load detail data
    // const loadDetail = (id) => {
    //     let index = data.findIndex((item) => item.id === id);
    //     setDetail(data[index]);
    // };

    // function to toggle the search option


    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <React.Fragment>

            <Content>
                <BlockHead size="sm">
                    {/* <BlockHeadContent>
                            <BlockTitle page>Transactions</BlockTitle>
                            <BlockDes className="text-soft">
                                <p>You have total {transactions?.length} Transactions.</p>
                            </BlockDes>
                        </BlockHeadContent> */}
                    <BlockHeadContent>
                        <ul className="nk-block-tools g-3 justify-content-end">
                            <li>
                                <div className="form-control-wrap">
                                    <div className="form-icon form-icon-right">
                                        <Icon name="search"></Icon>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="default-04"
                                        placeholder="Search by transaction ID"
                                        onChange={(e) => onFilterChange(e)}
                                    />
                                </div>
                            </li>

                        </ul>
                    </BlockHeadContent>

                </BlockHead>
                <Block>
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
                                <table className="table table-tranx">
                                    <thead>
                                        <tr className="tb-tnx-head">
                                            <th className="tb-tnx-id">
                                                <span className="">#</span>
                                            </th>

                                            <th className="tb-tnx-amount is-alt">
                                                <span className="tb-tnx-total">Wallet</span>
                                            </th>
                                            <th className="tb-tnx-amount is-alt">
                                                <span className="tb-tnx-total d-md-inline-block"></span>
                                            </th>
                                            <th className="tb-tnx-info">
                                                <span className="tb-tnx-desc d-none d-sm-inline-block">
                                                    <span>Transaction Hash</span>
                                                </span>
                                            </th>
                                            <th className="tb-tnx-info">
                                                <span className=" d-md-inline-block d-none">
                                                    <span>Date</span>
                                                </span>
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems?.length > 0
                                            ? currentItems?.map((item) => {
                                                return (
                                                    <tr key={item.txnHash} className="tb-tnx-item">
                                                        <td className="tb-tnx font-weight-bold">

                                                            <span className="text-success">{item.userId?.substring(0, 7)}</span>


                                                        </td>

                                                        <td className="tb-tnx-amount is-alt">
                                                            {/* <div className="">
                                <span className="amount title">{item?.fromAddress}</span>
                              </div> */}
                                                            <div className="d-flex flex-column amount title">
                                                                <div className="d-flex justify-content-start ml-2">
                                                                    <span>From: </span>
                                                                    <span className="ml-2 tb-lead font-weight-bolder">{item?.fromAddress}</span>
                                                                </div>
                                                                <div className="d-flex justify-content-start ml-5">
                                                                    <span>To: </span>
                                                                    <span className="ml-2 tb-lead font-weight-bolder badge badge-dot badge-info title">{item?.walletId}</span>
                                                                </div>

                                                            </div>
                                                        </td>
                                                        <td className="tb-tnx-amount is-alt">
                                                            <div className="tb-tnx-total">
                                                                <span
                                                                    className={`badge badge-dot badge-info title`}
                                                                >
                                                                    {/* {item?.walletId} */}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="tb-tnx-info">
                                                            <div className="tb-tnx-desc w-100">
                                                                <span className="title">{item.txnHash}</span>
                                                            </div>
                                                        </td>
                                                        <td className="tb-tnx-info">
                                                            <div className="">
                                                                <span className="date"><div>{moment(item?.createdAt).format("DD/MM/YYYY")}</div>
                                                                    <div className="badge badge-secondary font-size-10">
                                                                        {" "}
                                                                        {moment(item?.createdAt).format("hh:mm A")}
                                                                    </div></span>
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
                                {currentItems?.length > 0 ? (
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
                    </Card>
                </Block>
            </Content>
        </React.Fragment>
    );
};

export default OutgoingTnx;
