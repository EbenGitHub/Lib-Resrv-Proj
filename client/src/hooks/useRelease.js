import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import { RELEASE_BOOK } from "../gql/mutations"
import {ME} from '../gql/queries'
import { useNavigate } from "react-router-dom"

export const useRelease = (setNot, token) => {
    const navigate = useNavigate()
    const [release, relResult] =  useMutation(RELEASE_BOOK, {
        onError: (error) => {
            setNot({title: error.graphQLErrors[0].message})
        },
        refetchQueries: [{query: ME}],
        // update: (cache, response) => {
        // //     cache.updateQuery({ query: ALL_BOOKS}, ({ books }) => {
        // //     return {
        // //       books: books.map(b => {
        // //           if (b.id === response.data.releaseBook.id) {
        // //               return response.data.releaseBook
        // //           } else {
        // //               return b
        // //           }
        // //       }),
        // //     }
        // //   })
        // //   cache.updateQuery({ query: ME}, ({ me }) => {
        // //     return {
        // //     me: {...me, reservedBooks: me.reservedBooks.map(b => {
        // //         if (b.id === response.data.releaseBook.id) {
        // //             return response.data.releaseBook
        // //         } else {
        // //             return b
        // //         }
        // //     }), reservedBookCounts: me.reservedBookCounts - 1},
        // //     }
        // // })
        // //   cache.updateQuery({ query: ME}, ({ me }) => {
        // //     return {
        // //     me: {...me, reservedBooks: me.reservedBooks.filter(b => b.id !== response.data.reserveBook.id), reservedBookCounts: me.reservedBookCounts - 1},
        // //     }
        // // })
        // //     cache.updateQuery({ query: gql`
        // //     query {
        // //         book(id: "${response.data.releaseBook.id}") {
        // //         ...MyBooks
        // //         }
        // //     }
            
        // //     ${MY_BOOKS}
        // //     `}, ({ book }) => {
        // //         return {
        // //         book: response.data.releaseBook,
        // //         }
        // //     })
        // },
      })

      useEffect(() => {
        if ( relResult.data ) {
            relResult.data && relResult.data.releaseBook ? 
                setNot({title: 'releasing the book was successful', status: 'success'}) : 
                setNot({title: 'something went wrong. Please refresh the page!', status: 'danger'})
        }
      }, [relResult.data]) // eslint-disable-line

      const releaseBook = (id) => {
        if (!token) {
            setNot({title: 'You need to sign in first to reserve a book. Already have an account? ', link: {title: 'click here to sign in', anchor: '/login'}})
            navigate('/signup')
            return
        }
        release({
            variables: {
                id
            }
        })
    }

    const releaseButton = (id) => <div className='flex items-center relative' onClick={() => releaseBook(id)}>
        <div className='text-sm text-white mt-5 bg-rose-500 p-1 rounded drop-shadow-xl cursor-pointer'>Release Book</div>
        </div>

    return releaseButton
}