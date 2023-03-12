import { Link } from "react-router-dom";

const Notify = ({notify, deleNot}) => {
    if (!notify.length) return
    return ( 
        <div className="z-10 pt-16 overflow-x-hidden fixed w-screen">
            <ul>
                {
                    notify.map(n => {
                        const status = n.status === 'success' ? 'green' : n.status === 'warning' ? 'yellow' : 'rose'
                        return <div className={`bg-${status}-100 p-2 text-${status}-800 rounded flex justify-between m-1`}>
                        <li>{n.title} {n.link ? <Link to={n.link.anchor} className='font-[500] underline underline-offset-2'>{n.link.title}</Link> : null}</li><span className="pr-5 cursor-pointer" onClick={() => deleNot(n.id)}>X</span>
                    </div>
                    })
                }
            </ul>
        </div>
     );
}
 
export default Notify;