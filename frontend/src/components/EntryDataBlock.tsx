import '../styles/entryDataBlock.css';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit, FaShoppingCart } from "react-icons/fa";


function EntryDataBlock(props: any) {
    const { entry, handleEdit, handleDelete } = props;
  return (
    <div className='data-container'>
        <div className='data-container-header'>
            <h4>{entry.expenditureDate}</h4>
            <div>Total: {entry.totalAmount.toLocaleString('en-IN')}</div>
        </div>
        <div className='data-container-body'>
            {entry.data.map((entryData: any) => {
            return <div className='data-entry-block'>
                <div className='data-entry-block-body'>
                    <h5>{entryData.spentOn}</h5>
                    <div className='quantity'>₹{entryData.amount.toLocaleString('en-IN')}</div>
                </div>
                <div className='data-entry-block-body'>
                    <button onClick={() => handleEdit(entryData)}><FaEdit /></button>
                    <button onClick={() => handleDelete(entryData)}><MdDeleteOutline /></button>
                </div>
            </div>
            })}
        </div>
    </div>
  )
}

export default EntryDataBlock;