import React, {ChangeEvent} from 'react';

type CheckBoxType = {
   isDone: boolean
   callBack: (isDone: boolean) => void
}

export const CheckBox: React.FC<CheckBoxType> = (props) => {
   const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
     props.callBack(event.currentTarget.checked)
   }

 return (
     <input type="checkbox" checked={props.isDone} onChange={changeIsDoneHandler}/>
 );
};

