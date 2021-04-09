import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap'
import Job from './Job'
import JobsPagination from './JobsPagination'
import SearchForm from './SearchForm'

function App () {
    const [params, setParams] = useState({})
    const [page, setPage] = useState(1)
    const {jobs, loading, error, hasNextPage} = useFetchJobs(params, page)

    function handleSearchEvent (e) {
        let value = e.target.value
        setPage(1)
        setParams({...params, [e.target.id]: value})
    }

    return (
        <Container className="my-4">
            <h1>Github Jobs</h1>
            {loading && <h1>Getting results...</h1>}
            {error && <h1>Error! Please refresh to try again</h1>}
            <SearchForm params={params} handleSearchEvent={handleSearchEvent}/>
            {!loading && !error && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>}
            {jobs.map(job => {
                return <Job key={job.id} job={job} />
            })}
        </Container>
    )
}

export default App;