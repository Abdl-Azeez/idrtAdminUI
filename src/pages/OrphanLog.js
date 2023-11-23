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
    PaginationComponent,
} from "../components/Component";
import moment from "moment";
import { Alert, Card } from "reactstrap";
import { fetchOrphanLog } from "../store/actions.js";
import { useSelector, useDispatch } from "react-redux";

const OrphanLog = () => {
    const { orphanLog, transactionError } = useSelector((state) => state.Transaction);
    const [data, setData] = useState(orphanLog || []);
    const [onSearchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const dispatch = useDispatch();

    // Changing state value when searching name
    useEffect(() => {
        dispatch(fetchOrphanLog())
    }, []);

    // Changing state value when searching name
    useEffect(() => {
        if (orphanLog) {
            setData(orphanLog)
        }
    }, [orphanLog]);

    useEffect(() => {
        if (orphanLog) {
            if (onSearchText !== "") {
                const filteredObject = orphanLog?.filter((item) => {
                    return item.id.toLowerCase().includes(onSearchText.toLowerCase());
                });
                setData([...filteredObject]);
            } else {
                setData([...orphanLog]);
            }

        }

    }, [orphanLog, onSearchText]);

    // onChange function for searching name
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = orphanLog?.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <Head title="Orphan Log"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h2" className="fw-normal">Orphan Log</BlockTitle>
                            {/* <BlockDes className="text-soft">
                                <p>You have {orphanLog?.length} Orphan Logs.</p>
                            </BlockDes> */}
                        </BlockHeadContent>
                        <BlockHeadContent>
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
                                            placeholder="Search by Log ID"
                                            onChange={(e) => onFilterChange(e)}
                                        />
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
                                Orphan API Error: {transactionError}
                            </Alert>
                        }
                    </div>
                    {orphanLog &&
                        <Card className="card-bordered card-stretch">
                            <div className="card-inner-group">
                                <div className="card-inner">
                                    <div className="card-title-group">
                                        <div className="card-title">
                                            <h5 className="title">Orphan History</h5>
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
                                                    <span>Date</span>
                                                </th>
                                                <th className="">
                                                    <span>Transaction Hash</span>
                                                </th>
                                                <th className="">
                                                    <span className="">User ID</span>
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
                                                                        <div>{moment(item?.createdAt).format("DD/MM/YYYY")}</div>
                                                                        <div className="mx-1">-</div>
                                                                        <div className="">
                                                                            {" "}
                                                                            {moment(item?.createdAt).format("HH:mm ")}
                                                                        </div>
                                                                    </div>
                                                                </span>
                                                            </td>
                                                            <td className="">
                                                                <div className="text-truncate font-weight-bolder">{item?.txnHash}</div>
                                                            </td>
                                                            <td className="">
                                                                <div className="text-truncate font-weight-bolder">{item?.userId}</div>
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
                                            totalItems={orphanLog?.length}
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

export default OrphanLog;
