import { useQuery } from "@apollo/client"
import { BOOK } from "../gql/queries"

export const useBook = (id) => {
    return useQuery(BOOK, {
        variables: {
            id
        }
    })
}