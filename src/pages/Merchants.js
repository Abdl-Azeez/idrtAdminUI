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
import { transactionData } from "../components/table/TableData.js";

const Merchants = () => {
    const [data, setData] = useState(transactionData.data);
    const [onSearchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const dispatch = useDispatch();




    useEffect(() => {
        if (data) {
            if (onSearchText !== "") {
                const filteredObject = data?.filter((item) => {
                    return item.id.toLowerCase().includes(onSearchText.toLowerCase());
                });
                setData([...filteredObject]);
            } else {
                setData(transactionData.data);
            }
            // console.log(data)
        }

    }, [data, onSearchText]);

    // onChange function for searching name
    const onFilterChange = (e) => {
        setSearchText(e.target.value);

    };

    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <Head title="Merchants"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h2" className="fw-normal">Merchants</BlockTitle>

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
                                            placeholder="Search by Merchants ID"
                                            onChange={(e) => onFilterChange(e)}
                                        />
                                    </div>
                                </li>

                            </ul>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>

                    {data &&
                        <Card className="card-bordered card-stretch">
                            <div className="card-inner-group">
                                <div className="card-inner">
                                    <div className="card-title-group">
                                        <div className="card-title">
                                            <h5 className="title">Merchants</h5>
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
                                                    <span>Name</span>
                                                </th>
                                                <th className="">
                                                    <span>Wallet</span>
                                                </th>
                                                <th className="">
                                                    <span className="">Total Balance</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.length > 0
                                                ? data?.map((item) => {
                                                    return (
                                                        <tr key={item.id} className="">
                                                            <td className="tb-tnx font-weight-bold">
                                                                <span>{item.id}</span>
                                                            </td>
                                                            <td className="">
                                                                {item.name}
                                                            </td>
                                                            <td className="">
                                                                <div className="text-truncate font-weight-bolder">{item?.wallet}</div>
                                                            </td>
                                                            <td className="">
                                                                <div className="text-truncate font-weight-bolder">{item?.balance?.toLocaleString()}</div>
                                                            </td>

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
                                            totalItems={data?.length}
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

export default Merchants;
