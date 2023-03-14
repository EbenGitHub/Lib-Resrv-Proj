import { useState } from "react"
import eyeslash from '../assets/eye-slash-solid.svg'
import eye from '../assets/eye-solid.svg'

export const useShowHidPass = () => {
    const [text, setText] = useState('password')
    const [vis, setVis] = useState(false)

    const setVisibility = () => {
        setVis(!vis)
        setText(vis ? 'password' : 'text')
    }

    const ShowHidPass = () => {
        return (
            <span className="cursor-pointer text-sm block inline p-2"
                onClick={setVisibility}>
                    <img src={ vis ? eyeslash : eye} className='w-4 inline ' alt={ vis ? 'hide password' : 'show password'} />
            </span>
        )
    }

    return [text, ShowHidPass]
}