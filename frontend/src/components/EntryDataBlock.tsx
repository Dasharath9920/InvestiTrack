import React, { useState } from 'react';
import '../styles/entryDataBlock.css';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AMOUNT_CATEGORY_ICONS, TIME_CATEGORY_ICONS } from "../constants/constants";
import { formatTime } from '../helper';
import ConfirmationModal from '../modals/ConfirmationModal';

function EntryDataBlock(props: any) {
    const { entry, handleEdit, handleDelete, type } = props;
    const [modalContent, setModalContent] = useState({});

    const handleDeleteEntry = (entryData: any) => {
        let props: any = {
            showModal: true,
            title: `Delete ${type === "amount" ? entryData.spentOn : entryData.investedIn} data?`,
            content: `Once you delete ${type === "amount" ? entryData.spentOn : entryData.investedIn} data, it will be deleted Permanently`,
            cancelText: 'Cancel',
            okText: 'Delete',
            onOk: function(){
                handleDelete(entryData);
            }
        }
        setModalContent(props);
    }

    return (
        <div className='data-container'>
            <ConfirmationModal props={modalContent}/>
            <div className='data-container-header'>
                <div>{type === "amount" ? entry.expenditureDate : entry.activityDate}</div>
                {type === "amount" && <div>Total: ₹{entry.totalAmount.toLocaleString('en-IN')}</div>}
                {/* TODO: Add max average time spent on any category in a week */}
            </div>
            <div className='data-container-body'>
                {entry.data.map((entryData: any) => {
                    return <div className='data-entry-block'>
                        <div className='data-entry-block-body'>
                            <div className='icon-container'>{React.createElement(type === "amount" ? AMOUNT_CATEGORY_ICONS[entryData.spentOn] : TIME_CATEGORY_ICONS[entryData.investedIn])}</div>
                            <div className='data-entry-block-body-text'>{type === "amount" ? entryData.spentOn : entryData.investedIn}</div>
                            <div className={type === "amount" ? "quantity quantity-amount" : "quantity quantity-time"}>{type === "amount" ? `₹${entryData.amount.toLocaleString('en-IN')}` : `${formatTime(entryData.time)  }`}</div>
                        </div>
                        <div className='data-entry-block-body button-container'>
                            <button className='button' onClick={() => handleEdit(entryData)}><FaEdit /></button>
                            <button className='button' onClick={() => handleDeleteEntry(entryData)}><MdDeleteOutline /></button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default EntryDataBlock;