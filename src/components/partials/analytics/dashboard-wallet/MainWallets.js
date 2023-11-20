import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { DataTableRow, DataTableItem } from "../../../Component";
import { loadMerchant, fetchWalletBalance, generalToastError } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";


const MainWallets = () => {
    const { merchant, merchantError } = useSelector((state) => state.Merchant);
    const { walletBalance } = useSelector((state) => state.Wallet);
    const [merchantWalletResponse, setMerchantWalletResponse] = useState(null);
    const [commissionWalletResponse, setCommissionWalletResponse] = useState(null);
    const [bnbWalletResponse, setBnbWalletResponse] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(loadMerchant());
    }, [dispatch]);


    const merchantWallet = merchant?.configs?.find((merchant) => {
        return merchant.key === 'merchantWallet'
    })

    const commissionWallet = merchant?.configs?.find((merchant) => {
        return merchant.key === 'commissionWallet'
    })


    const bnbWallet = merchant?.configs?.find((merchant) => {
        return merchant.key === 'bnbWallet'
    })



    useEffect(() => {
        const fetchWalletData = async (walletValue, setResponse) => {
            try {
                const response = await fetch(`http://13.250.103.220:3000/wallet/balance/${walletValue}`);
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

    useEffect(() => {
        if (merchantError) {
            setTimeout(() => {
                dispatch(generalToastError(merchantError));
            }, 2000);
        }
    }, [merchantError]);


    return (
        <React.Fragment>
            <div className="nk-tb-list is-loose traffic-channel-table">


                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel">
                        <span>Merchant Wallet</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions text-info">
                        <span>{merchantWallet?.value}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        {merchantWalletResponse ? (merchantWalletResponse[0]?.balance / 1000000000000000000)?.toLocaleString() : 0} IDRT
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
                        {commissionWalletResponse ? (commissionWalletResponse[0]?.balance / 1000000000000000000)?.toLocaleString() : 0}  IDRT
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
