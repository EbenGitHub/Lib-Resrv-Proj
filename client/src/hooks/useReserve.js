import { useMutation } from "@apollo/client"
import { RESERVE_BOOK} from "../gql/mutations"
import { ME } from '../gql/queries'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useReserve = (setNot, token) => {
    const navigate = useNavigate()
    const [reserve, resResult] =  useMutation(RESERVE_BOOK, {
        onError: (error) => {
          setNot({title: error.graphQLErrors[0].message})
        },
        refetchQueries: [{query: ME}],
    //     update: (cache, response) => {
    // //     cache.updateQuery({ query: ALL_BOOKS}, ({ books }) => {
    // //     return {
    // //     books: books.map(b => {
    // //         if (b.id === response.data.reserveBook.id) {
    // //             return response.data.reserveBook
    // //         } else {
    // //             return b
    // //         }
    // //     }),
    // //     }
    // // })
    // //     cache.updateQuery({ query: ME}, ({ me }) => {
    // //     return {
    // //     me: {...me, reservedBooks: me.reservedBooks.map(b => {
    // //         if (b.id === response.data.reserveBook.id) {
    // //             return response.data.reserveBook
    // //         } else {
    // //             return b
    // //         }
    // //     }), reservedBookCounts: me.reservedBookCounts + 1},
    // //     }
    // // })
    // //     cache.updateQuery({ query: ME}, ({ me }) => {
    // //     return {
    // //     me: {...me, reservedBooks: me.reservedBooks.concat(response.data.reserveBook), reservedBookCounts: me.reservedBookCounts + 1},
    // //     }
    // // })
    //     // cache.updateQuery({ query: gql`
    //     // query {
    //     //     book(id: "${response.data.reserveBook.id}") {
    //     //         ...MyBooks
    //     //     }
    //     //     }
            
    //     //     ${MY_BOOKS}
    //     //     `}, ({ book }) => {
    //     //     return {
    //     //     book: response.data.reserveBook,
    //     //     }
    //     // })
    // },
    })

    useEffect(() => {
        if ( resResult.data ) {
            resResult.data && resResult.data.reserveBook ? 
                setNot({title: 'reservation was successful', status: 'success'}) : 
                setNot({title: 'something went wrong. Please refersh the page!', status: 'danger'})
        }
      }, [resResult.data]) // eslint-disable-line

      const reserveBook = (id) => {
        if (!token) {
            setNot({title: 'You need to sign in first to reserve a book. Already have an account? ', link: {title: 'click here to sign in', anchor: '/login'}})
            navigate('/signup')
            return
        }
        reserve({
            variables: {
                id
            }
        })
    }

    const reserveButton = (id) => <div className='flex items-center relative' onClick={() => reserveBook(id)}>
        <div className='text-sm text-white animate-bounce mt-5 bg-green-500 p-1 rounded drop-shadow-xl cursor-pointer font-[600]'>Reserve Now</div>
        </div>

    return reserveButton
}