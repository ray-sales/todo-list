import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import LineTable from '../../components/LineTable';

function Main(){
    const [newTask, setNewTask] = useState("");
    
    let allTasksStorage: any = localStorage.getItem("tasks") != null  ? localStorage.getItem("tasks"): [];
    const [allTasks, setAllTasks] = useState([...JSON.parse(allTasksStorage)]);

    const renderAllItems = () => {  
        return allTasks.map( (e: any, i: number) => {            
            return (
            <LineTable key={e.id}
                task={e.task} 
                id={e.id} 
                removeItem={removeItem} 
                editItem={editItem} 
                status={e.completed}
                changeStatus={changeStatus}
                />
            )
        });
    }

    function addNewItem(){
        let id = allTasks.length > 0 ? allTasks[allTasks.length - 1]["id"] + 1 : 0;
        const newItem = {
            id,
            task: newTask,
            completed: false
        }

        localStorage.setItem("tasks", JSON.stringify([
            ...JSON.parse(allTasksStorage),
            newItem
        ]));
        allTasksStorage = localStorage.getItem("tasks");
        setAllTasks([
            ...JSON.parse(allTasksStorage)
        ])



    }

    function editItem(task:string, id:number){
        const editIndex = allTasks.findIndex((e:any) => e.id === id);
        allTasks[editIndex].task = task;
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        setAllTasks([...allTasks])
    }

    function removeItem(id: number){
        const removeIndex = allTasks.findIndex((e:any) => e.id === id);
        allTasks.splice(removeIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        setAllTasks([
            ...allTasks
        ])

    }

    function changeStatus(id: number) {
        const editIndex = allTasks.findIndex((e:any) => e.id === id);
        allTasks[editIndex].completed = true;
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        setAllTasks([...allTasks])
 
    }

    function blurNewTask(task: string){
        setNewTask(task)
    }
    return(
        <div id="page-main">
            <Header title="ToDo List">
                <input type="text" className="input-task" id="task" onChange={(event) => {blurNewTask(event.target.value)}} placeholder="New Task..."/>
                <button type="button" id="btn-add" onClick={addNewItem}>Add</button>
            </Header>
            <main>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {renderAllItems()}
                </tbody>
            </table>
            </main>
        </div>
    );
}

export default Main;