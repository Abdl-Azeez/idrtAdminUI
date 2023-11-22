import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Alert } from "reactstrap";
import { DataTableRow, DataTableItem } from "../../../Component";
import { loadMerchant, fetchWalletBalance, errorChecker } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";


const MainWallets = () => {
    const { merchants, merchantsError } = useSelector((state) => state.Merchant);
    const { walletBalance } = useSelector((state) => state.Wallet);
    const [merchantWalletResponse, setMerchantWalletResponse] = useState(null);
    const [commissionWalletResponse, setCommissionWalletResponse] = useState(null);
    const [bnbWalletResponse, setBnbWalletResponse] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(loadMerchant());
    }, [dispatch]);


    const merchantWallet = merchants && merchants[0]?.configs?.find((merchants) => {
        return merchants.key === 'merchantWallet'
    })

    const commissionWallet = merchants && merchants[0]?.configs?.find((merchants) => {
        return merchants.key === 'commissionWallet'
    })


    const bnbWallet = merchants && merchants[0]?.configs?.find((merchants) => {
        return merchants.key === 'bnbWallet'
    })



    useEffect(() => {
        const fetchWalletData = async (walletValue, setResponse) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/wallet/balance/${walletValue}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                setResponse(data);
            } catch (error) {
                console.error('Error fetching wallet data:', error);
            }
        };

        if (merchantWallet) {
            fetchWalletData(merchantWallet.value, setMerchantWalletResponse);
        }
        if (commissionWallet) {
            fetchWalletData(commissionWallet.value, setCommissionWalletResponse);
        }
        if (bnbWallet) {
            fetchWalletData(bnbWallet.value, setBnbWalletResponse);
        }
    }, [bnbWallet, commissionWallet, dispatch, merchantWallet]);



    return (
        <React.Fragment>
            {merchantsError &&
                <Alert color="danger">
                    Merchant Address API Error: {merchantsError}
                </Alert>
            }
            <div className="nk-tb-list is-loose traffic-channel-table">


                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel">
                        <span>Merchant Wallet</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions text-info">
                        <span>{merchantWallet?.value}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        {merchantWalletResponse ? (merchantWalletResponse[0]?.balance / 100)?.toLocaleString() : 0} IDRT
                    </DataTableRow>
                </DataTableItem>
                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel">
                        <span>Commission Fee Wallet</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions text-info">
                        <span>{commissionWallet?.value}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        {commissionWalletResponse ? (commissionWalletResponse[0]?.balance / 100)?.toLocaleString() : 0}  IDRT
                    </DataTableRow>
                </DataTableItem>
                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel">
                        <span>BNB Vault Wallet</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions text-info">
                        <span>{bnbWallet?.value}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        {bnbWalletResponse ? (bnbWalletResponse[1]?.balance / 1000000000000000000)?.toLocaleString() : 0} BNB
                    </DataTableRow>
                </DataTableItem>

            </div>
        </React.Fragment>
    );
};
export default MainWallets;
