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
import WalletHistory from "../components/partials/table-partials/Wallet/WalletHistory.js";



const Wallets = () => {

    const [walletAddress, setAddress] = useState("0x0001");

    const updateAddress = (address) => {
        setAddress(address)
    }

    return (
        <React.Fragment>
            <Head title="Wallets"></Head>
            <Content>

                <IncomingWalletTnx walletAddress={walletAddress} updateAddress={updateAddress} />
                <OutgoingWalletTnx walletAddress={walletAddress} />
                <WalletHistory Id={walletAddress} />
            </Content>

        </React.Fragment>
    );
};

export default Wallets;
