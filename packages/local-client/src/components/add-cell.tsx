
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
    nextCellId: string | null;
    forceVisible?: boolean;
}
// FEATURE: AddCell component when no comonent forceVisible is true
function AddCell({ nextCellId, forceVisible }: AddCellProps) {
    const { insertCellAfter } = useActions();
    return (
        <div className={`relative opacity-0 hover:opacity-100 transition ease-in delay-100 my-2 ${forceVisible && 'opacity-100'}`}>
            <div className='flex justify-center gap-6'>
                <button className='btn btn-accent m-2 rounded-3xl' onClick={() => { insertCellAfter(nextCellId, 'code') }}>
                    <span className="mr-1"><i className='fas fa-plus' /></span>
                    <span>Code</span></button>
                <button className='btn btn-accent m-2 rounded-3xl' onClick={() => { insertCellAfter(nextCellId, 'text') }}>
                    <span className="mr-1"><i className='fas fa-plus' /></span>

                    <span>Text</span></button>
                <div className='absolute top-1/2 bottom-1/2 right-[2.5%] left-[2.5%] border-b-2 border-b-slate-700 w-[95%] -z-10'></div>
            </div> </div>
    )
}

export default AddCell