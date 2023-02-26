import React from 'react'
import { Cell } from '../state'
import ActionBar from './actionBar'
import CodeCell from './code-cell'
import TextEditor from './text-editor'

interface CellListItemProps {
    cell: Cell
}
function CellListItem({ cell }: CellListItemProps) {
    let child: JSX.Element;
    if (cell.type === 'code') {
        child = (
            <>
            <div className=' h-8 w-full bg-dark'>
            <ActionBar id={cell.id}/>

            </div>
                <CodeCell cell = {cell} />
            </>
        )
    } else {
        child = (
            <>
                <TextEditor cell= {cell} />
                <ActionBar id={cell.id}/>

            </>
        )
    }

  return (
    <div className='relative'>
        {child}</div>
  )
}

export default CellListItem