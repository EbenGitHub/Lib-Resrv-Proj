import { Link } from "react-router-dom";

const setStatusNot = (s) => {
    switch(s) {
        case 'success':
            return 'green';
        case 'warning':
            return 'yellow';
        default:
            return 'red'
    }
}

const Notify = ({notify, deleNot}) => {
    if (!notify.length) return
    return ( 
        <div className="z-10 pt-16 overflow-x-hidden fixed w-screen">
            <ul>
                {
                    notify.map(n => {
                        const statusColor = setStatusNot(n.status)
                        return <div key={n.id} className={`bg-${statusColor}-100 relative p-2 text-${statusColor}-800 rounded-lg flex justify-between m-1 mx-3 mr-6 border-2 border-gray-400`}>
                        <li className="w-10/12">{n.title} {n.link ? <Link to={n.link.anchor} className='font-[500] underline underline-offset-2'>{n.link.title}</Link> : null}</li><span className={`absolute right-5 pt-0.5 top-1 w-7 h-7 drop-shadow cursor-pointer ${statusColor === 'green' ? 'hover:bg-green-500' : statusColor === 'yellow' ? 'hover:bg-yellow-500' : 'hover:bg-red-500'} hover:text-white rounded-full text-center`} onClick={() => deleNot(n.id)}>X</span>
                    </div>
                    })
                }
            </ul>
        </div>
     );
}
 
export default Notify;