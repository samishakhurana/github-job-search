import { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    HAS_NEXT_PAGE: 'has-next-page'
}

const BASE_URL = "/positions.json"

function reducer (state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {
                jobs: [],
                error: false,
                loading: true
            }
        case ACTIONS.GET_DATA:
            return { ...state,
                jobs: action.payload.jobs,
                error: false,
                loading: false
            }
        case ACTIONS.ERROR:
            return {...state,
                jobs: [],
                error: action.payload.error,
                loading: false
            }
        case ACTIONS.HAS_NEXT_PAGE:
            return {...state, hasNextPage: action.payload.hasNextPage}
        default:
            return state
    }
}

export default function useFetchJobs (params, page) {
    const [state, dispatch] = useReducer(reducer, {jobs: [], error: false, loading: false})

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch({type: 'make-request'})
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: {page: page, ...params}
        }).then(res => {
            dispatch({type: 'get-data', payload: {jobs: res.data}})
        }).catch(e => {
            if(axios.isCancel(e)) return;
            dispatch({type: 'error', payload: {error: e}})
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL, {
            cancelToken: cancelToken2.token,
            params: {page: page + 1, ...params}
        }).then(res => {
            dispatch({type: 'has-next-page', payload: {hasNextPage: res.data.length > 0}})
        }).catch(e => {
            if(axios.isCancel(e)) return;
            dispatch({type: 'error', payload: {error: e}})
        })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }
    }, [params, page])

    return state
}