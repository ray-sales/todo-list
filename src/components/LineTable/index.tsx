import React, { useState } from 'react';
import checkIcon from '../../assets/icons/check.svg'
import removeIcon from '../../assets/icons/remove.svg'
import editIcon from '../../assets/icons/editar-arquivo.svg'
import saveIcon from '../../assets/icons/diskette.svg'
import './styles.css'

interface LineTableProps {
    task: string;
    id: number;
    removeItem: any;
    editItem: any;
    status: boolean;
    changeStatus: any;
}

const LineTable: React.FC<LineTableProps> = ({id, task, removeItem, editItem, status, changeStatus}) => {
    const [readonly, setReadonly] = useState(true);
    const [taskInput, setTaskInput] = useState(task);

    function changeItem(){
        setReadonly(!readonly);
        if(!readonly){
            editItem(taskInput, id);
        }
    }

    return(
        <tr className="line-table">
            <td>
                <input type="text" className="line-task" onChange={(event) => {setTaskInput(event.target.value)}} value={taskInput} readOnly={readonly}/>
            </td>
            <td>{status ? "OK" : "Pendente"}</td>
            <td><button onClick={changeItem} disabled={status}>{readonly ? <img src={editIcon} alt="Edit" /> : <img src={saveIcon} alt="Save" />}</button></td>
            <td><button onClick={(event) => {changeStatus(id)}} disabled={status}><img src={checkIcon} alt="Check" /></button></td>
            <td><button type="button" onClick={(event)=>{removeItem(id)}}><img src={removeIcon} alt="Remove" /></button></td>
            </tr>
    )
}

export default LineTable;