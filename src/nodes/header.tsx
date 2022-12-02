

export function HeaderNode(props: {label: string}) {

    return (
        <div className='flex flex-row bg-slate-700 rounded-md'>
            <span className="text-sm font-semibold inline-block m-2 py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200 uppercase">
                {props.label}
            </span>
        </div>
    );
}