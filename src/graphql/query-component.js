import React from 'react';
import { useQuery } from '@apollo/client';

export function Query({query, children, ignoreError}) {
    const {loading, error, data} = useQuery(query);
    if(loading) {
        return <p>Loading...</p>;
    }
    if (!ignoreError && error) {
        return <p>Error: {JSON.stringify(error)}</p>;
    }
    return children({data});
}
