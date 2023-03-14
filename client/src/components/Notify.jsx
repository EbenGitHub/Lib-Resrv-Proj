import { Link } from "react-router-dom";

const setStatusNot = (status) => {
    switch(status) {
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
                        const status = setStatusNot(n.status)
                        return <div key={n.id} className={`bg-${status}-100 p-2 text-${status}-800 rounded-lg flex justify-between m-1 mx-3 mr-6 border-2 border-gray-400`}>
                        <li>{n.title} {n.link ? <Link to={n.link.anchor} className='font-[500] underline underline-offset-2'>{n.link.title}</Link> : null}</li><span className={`mr-3 px-2 cursor-pointer hover:bg-${status}-500 hover:text-white rounded-full text-center`} onClick={() => deleNot(n.id)}>X</span>
                    </div>
                    })
                }
            </ul>
        </div>
     );
}
 
export default Notify;