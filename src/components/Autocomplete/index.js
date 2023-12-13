import React, { useState, useEffect } from 'react';
import { Label, Input, FormGroup } from 'reactstrap';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { merchantData } from '../table/TableData';

const Autocomplete = ({
    title = 'Select Merchant',
    setMerchant,
    loading
}) => {
    const [searchMerchant, setMerchantSearch] = useState('');
    const [selectedMerchant, setSelectedMerchant] = useState(null);
    const [merchantInfo, setMerchantData] = useState([]);

    const onChangeHandler = (e) => {
        setSelectedMerchant(e);
        setMerchant(e);
    };

    useEffect(() => {
        if (searchMerchant.length !== 0) {
            const filteredObject = merchantData?.data?.filter((item) => {
                return item.name.toLowerCase().includes(searchMerchant.toLowerCase());
            });
            setMerchantData([...filteredObject])
        }
    }, [searchMerchant]);



    // useEffect(() => {
    //     if (merchantData) {
    //         const usersOption = merchantData?.data?.map((data) => {
    //             return {
    //                 id: data.id,
    //                 name: `${data.name}`,
    //                 balance: data.balance,
    //             };
    //         });

    //         setMerchantData(usersOption);
    //     }

    // }, [merchantData]);



    return (
        <>
            {/* <FormGroup> */}
            {/* Input here  */}
            {/* <Label className='text-capitalize'> {title} </Label> */}
            <ReactSearchAutocomplete
                name='merchant'
                // defaultValue={selectedMerchant}
                value={selectedMerchant}
                isLoading={loading}
                items={merchantInfo}
                onSearch={(e) => setMerchantSearch(e)}
                onSelect={onChangeHandler}
                showNoResultsText={loading ? 'Loading...' : 'No result found'}
                autoFocus
                inputDebounce={1000}
                required={true}
                placeholder={`Please type the merchant's name`}
                fuseOptions={{ keys: ['name', 'balance'] }}
                resultStringKeyName='name'
                styling={{
                    alignItems: 'center',
                    backgroundColor: 'hsl(0,0%,100%)',
                    borderColor: ' hsl(0,0%,80%)',
                    borderRadius: '4px',
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    cursor: 'default',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    minHeight: '38px',
                    outline: '0 !important',
                    position: 'relative',
                    transition: 'all 100ms',
                    boxSizing: 'border-box',
                }}
            />
            {/* </FormGroup > */}
        </>
    );
};



export default Autocomplete;
