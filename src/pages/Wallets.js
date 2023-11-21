import React, { useState, useEffect } from "react";
import Content from "../layout/content/Content.js";
import {
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
} from "../components/Component.js";
import Head from "../layout/head/Head";
import IncomingWalletTnx from "../components/partials/table-partials/Wallet/IncomingTnx.js";
import OutgoingWalletTnx from "../components/partials/table-partials/Wallet/OutgoingTnx.js";
import { Button } from "reactstrap";



const Wallets = () => {
    const [searchText, setSearchText] = useState("");
    const [walletAddress, setAddress] = useState(null);
    const onSearchChange = (e) => {
        setSearchText(e.target.value);
    };
    const handleSearch = () => {
        if (searchText !== "") {
            setAddress(searchText)
        }
    }

    return (
        <React.Fragment>
            <Head title="Wallets"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Wallets</BlockTitle>
                            <BlockDes className="text-soft">
                                {/* <p>You have total {transactionAddress?.totalCount} Wallets.</p> */}
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
                <IncomingWalletTnx walletAddress={walletAddress} />
                <OutgoingWalletTnx walletAddress={walletAddress} />
            </Content>

        </React.Fragment>
    );
};

export default Wallets;
