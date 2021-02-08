import { Dialog, Typography, DialogContent } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { SearchAutocomplete, SearchResult } from './SearchAutocomplete';
import { AppRoutes, getAppRoute } from '../../components/Router';
import { setSearchResult } from '../../store/actions';
import { seralizePlaceBounds } from '../../sdk/models';

export const Search: React.FunctionComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const [searchResultState, setSearchResultState] = useState<SearchResult | null>(null);

    const onChange = (searchResult: SearchResult | null): void => {
        setSearchResultState(searchResult);
        dispatch(setSearchResult(searchResult));
    };

    if (searchResultState) {
        return (
            <Redirect
                to={getAppRoute(AppRoutes.SEARCH_RESULTS, { bounds: seralizePlaceBounds(searchResultState.bounds) })}
            />
        );
    }
    return (
        <Layout>
            <Dialog fullWidth={true} open={true}>
                <DialogContent>
                    <Typography>Where are you going?</Typography>
                    <SearchAutocomplete onChange={onChange}/>
                </DialogContent>
            </Dialog>
        </Layout>
    )
};