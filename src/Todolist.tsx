import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import classes from './AppTodoList.module.css'
import {CheckBox} from "./components/CheckBox";

type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   filter: FilterValuesType
   title: string
   tasks: Array<TaskType>
   removeTask: (taskId: string) => void
   changeIsDone: (taskID: string, isDoneValue: boolean) => void
   changeFilter: (value: FilterValuesType) => void
   addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

   let [title, setTitle] = useState("")
   const [error, setError] = useState< null | string >(null)

   const addTask = () => {
      if (title.trim() !== '') {
         props.addTask(title)
         setTitle('')
      } else {
         setError('Title is required')
      }
   }

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
      setError(null)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.charCode === 13) {
         addTask();
      }
   }

   const onAllClickHandler = () => props.changeFilter("all");
   const onActiveClickHandler = () => props.changeFilter("active");
   const onCompletedClickHandler = () => props.changeFilter("completed");

   const changeIsDoneHandler = (tID: string, isDone: boolean) => {
      props.changeIsDone(tID, isDone)
   }

   return <div>
      <h3>{props.title}</h3>
      <div>
         <input
            className={error ? classes.error : ''}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
         />
         <button onClick={addTask}>+</button>
         {error && <div className={classes.errorMessage}>{error}</div>}
      </div>
      <ul>
         {
            props.tasks.map(t => {

               const onClickHandler = () => props.removeTask(t.id)

               // const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
               //    // props.changeIsDone(t.id, e.currentTarget.checked)
               // }

               return <li className={t.isDone ? classes.isDone : ''} key={t.id}>
                  <CheckBox isDone={t.isDone} callBack={(isDone) => changeIsDoneHandler(t.id, isDone)} />
                  {/*<input type="checkbox" checked={t.isDone} onChange={changeIsDoneHandler}/>*/}
                  <span>{t.title}</span>
                  <button onClick={onClickHandler}>x</button>
               </li>
            })
         }
      </ul>
      <div>
         <button className={props.filter === 'all' ? classes.activeFilter : ''} onClick={onAllClickHandler}>All</button>
         <button className={props.filter === 'active' ? classes.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
         <button className={props.filter === 'completed' ? classes.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
      </div>
   </div>
}
