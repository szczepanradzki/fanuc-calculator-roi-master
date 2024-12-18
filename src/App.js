import React, { useState, useMemo, useEffect, useReducer } from 'react';
import {
    Router,
    Switch,
    Route
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import { LayoutContext, CalculationContext } from './context/layoutContext';
import { authenticationService } from './utils/authService';
import { history } from './utils/history';
import { PrivateRoute } from './components/privateRoute';
import { calcReducer } from './reducers/calculatorContent';
import { Header } from './components/header';
import { HomePage } from './pages/home';
import { UserDetails } from './pages/userDetails';
import { Step1 } from './pages/step1';
import { Step2 } from './pages/step2';
import { Step3 } from './pages/step3';
import { Step4 } from './pages/step4';
import { Step5 } from './pages/step5';
import { PasswordReset } from './pages/passwordReset';
import { RegisterThankYouPage } from './pages/thankYouPage';
import { ConfirmationPage } from './pages/confirmationPage';
import './App.scss';
import { customSavings } from './reducers/customSavings';
import {debug} from "./utils/debug";

function App() {
    const [langState, setLangState] = useState('pl');
    const [currency, setCurrency] = useState('ZŁ');
    const [industry, setIndustry] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(calcReducer, getStateFromLocalStorage("calc"));
    const [savedSavings, setSavedSavings] = useReducer(customSavings, getStateFromLocalStorage("savings"));

    const values = useMemo(() => ({
        langState, setLangState,
        currency, setCurrency,
        industry, setIndustry
    }), [langState, setLangState, currency, setCurrency, industry, setIndustry]);

    function getStateFromLocalStorage(key) {
        if (debug) {
            try {
                return JSON.parse(localStorage.getItem(key)) ?? [];
            } catch (e) {}
        }
        return [];
    }

    useEffect(() => {
        const savedLangState = localStorage.getItem('lang');
        const savedCurrencyState = localStorage.getItem('currency');
        savedLangState ? setLangState(savedLangState) : setLangState(langState);
        savedCurrencyState ? setCurrency(savedCurrencyState) : setCurrency(currency);
        authenticationService.currentUser.subscribe(x => setCurrentUser(x));
    }, []);

    const logout = () => {
        authenticationService.logout();
        dispatch({type: 'CLEAR'});
        setSavedSavings({type: 'CLEAR'});
        history.push('/');
    };

    return (
        <Router history={history}>
            <LayoutContext.Provider value={values}>
                <ApolloProvider client={client}>
                    <div className="App">
                        <Header logout={() => logout()} user={currentUser}/>
                        <Switch>
                            <Route exact path="/">
                                <HomePage/>
                            </Route>

                            <Route path="/password-reset">
                                <PasswordReset/>
                            </Route>
                            <Route path="/thank-you-page">
                                <RegisterThankYouPage/>
                            </Route>
                            <Route path="/confirmation-page">
                                <ConfirmationPage/>
                            </Route>
                            <CalculationContext.Provider value={{state, dispatch, savedSavings, setSavedSavings}}>
                                <Route path="/user-details">
                                    <UserDetails/>
                                </Route>
                                <PrivateRoute path="/calculator/1" component={Step1}/>
                                <PrivateRoute path="/calculator/2" component={Step2}/>
                                <PrivateRoute path="/calculator/3" component={Step3}/>
                                <PrivateRoute path="/calculator/4" component={Step4}/>
                                <PrivateRoute path="/calculator/5" component={Step5}/>
                            </CalculationContext.Provider>
                        </Switch>
                    </div>
                </ApolloProvider>
            </LayoutContext.Provider>
        </Router>
    );
}

export default App;
