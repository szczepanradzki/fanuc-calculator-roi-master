import React, {useContext, useEffect, useState, Fragment} from 'react';
import {useMutation} from '@apollo/client';
import {history} from '../utils/history';
import axios from 'axios';
import {CalculationContext, LayoutContext} from '../context/layoutContext';
import {Query} from '../graphql/query-component';
import {MultimediaPanel} from '../components/multimedia-panel';
import {PageContent} from '../components/page-content';
import {Input} from '../components/input';
import {FormHeader} from '../components/formHeder';
import {validateForm} from '../utils/formValidation';
import {client} from '../graphql/client';
import {getUserDetailsPagePL} from '../graphql/queries/pl/user-details';
import {getUserDetailsPageEN} from '../graphql/queries/en/user-details';
import {GetUserDetails} from '../graphql/queries/getUser';
import {RegisterUser} from '../graphql/mutations/register';
import {UpdateUser} from '../graphql/mutations/updateUser';
import {DeleteUser} from '../graphql/mutations/deleteUser';
import {authenticationService} from '../utils/authService';
import {Select} from '../components/select';
import {getCategoriesPL} from '../graphql/queries/pl/categories';
import {getPrivacyPolicyPL} from '../graphql/queries/pl/privacyPolicy';
import pl from '../translations/pl.json';
import en from '../translations/en.json';
import {CheckBox} from '../components/checkBox';
import {getPrivacyPolicyEN} from '../graphql/queries/en/privacyPolicy';
import {getCategoriesEN} from '../graphql/queries/en/categories';
import {ContentPopup} from '../components/popup/privacyPopup';
import {usePopup} from "../components/popup/popup";
import moment from 'moment';
import {GetUserSavedOffers} from "../graphql/queries/getUserSavedOffers";
import {GetUserSavedState} from "../graphql/queries/getUserSavedState";
import {loadSavings} from "../utils/uploadPdf";

const loader = require("../assets/images/loader.svg");

const nationalization = {
    pl: {
        query: getUserDetailsPagePL,
        selectQuery: getCategoriesPL,
        privacyPolicyQuery: getPrivacyPolicyPL,
        requested: 'registration',
        requestedCategories: 'categories',
        requestedPrivacy: 'privacyPolicy',
        translations: pl
    },
    eng: {
        query: getUserDetailsPageEN,
        selectQuery: getCategoriesEN,
        privacyPolicyQuery: getPrivacyPolicyEN,
        requested: 'registrationEn',
        requestedCategories: 'categoriesEns',
        requestedPrivacy: 'privacyPolicyEn',
        translations: en
    }
};

const Form = ({
                  registerUserDetails,
                  translations,
                  submitHandler,
                  industryOptions,
                  handleInputChange,
                  loadedSavedOffers,
                  user,
                  disabled,
                  setEdit,
                  setDisabled
              }) => {
    const [ready, setReady] = useState(false);
    const [shouldLayoutBePresented, setShouldLayoutBePresented] = useState(false);
    useEffect(() => {
        if (typeof registerUserDetails?.username !== 'undefined'
            || typeof registerUserDetails === 'object'
            && Object.keys(registerUserDetails).length === 0) {
            setReady(true);
        }
    }, [registerUserDetails]);

    useEffect(() => {
        setTimeout(() => setShouldLayoutBePresented(true), 1000);
        setTimeout(() => setReady(true), 10000);
    }, []);

    if (ready) {
        return <form onSubmit={(e) => submitHandler(e)} noValidate>
            <Input type="text"
                   classname="form__labeled"
                   name="username"
                   label={`${translations.fullName}*`}
                   value={registerUserDetails.username}
                   onChange={(e) => handleInputChange(e)}
                   disabled={disabled}
                   required_text={translations.required}
                   required
            />
            <Input type="text"
                   classname="form__labeled"
                   name="company_name"
                   label={`${translations.companyName}*`}
                   value={registerUserDetails.company_name}
                   onChange={(e) => handleInputChange(e)}
                   disabled={disabled}
                   required_text={translations.required}
                   required
            />
            <Select classname="form__labeled"
                    name="industry"
                    label={`${translations.industry}*`}
                    placeholder={translations.industryPlaceholder}
                    options={industryOptions}
                    value={registerUserDetails.industry}
                    onChange={(e) => handleInputChange(e)}
                    disabled={disabled}
                    required_text={translations.required}
                    required
            />
            <Input type="text"
                   classname="form__labeled"
                   name="position"
                   label={`${translations.position}*`}
                   value={registerUserDetails.position}
                   onChange={(e) => handleInputChange(e)}
                   disabled={disabled}
                   required_text={translations.required}
                   required
            />
            <Input type="email"
                   classname="form__labeled"
                   name="email"
                   label={`${translations.login}*`}
                   value={registerUserDetails.email}
                   onChange={(e) => handleInputChange(e)}
                   disabled={disabled}
                   invalid_text={translations.invalid}
                   required
            />
            <Input type="text"
                   classname="form__labeled"
                   name="phone"
                   label={translations.phone}
                   value={registerUserDetails.phone}
                   onChange={(e) => handleInputChange(e)}
                   disabled={disabled}
            />
            <Input type="password"
                   classname="form__labeled"
                   name="password"
                   label={`${user ? translations.password : translations.create_password}*`}
                   value={registerUserDetails.password}
                   onChange={(e) => handleInputChange(e)}
                   disabled={disabled}
                   required_text={translations.required}
                   required
            />
            {user ?
                <button type="button"
                        className="btn btn__edit"
                        onClick={() => {
                            setEdit(true);
                            setDisabled(false);
                        }}
                >
                    {translations.edit}&nbsp;<i className="icon icon-edit"/>
                </button> :
                <Fragment>
                    <p className="agreement"
                       dangerouslySetInnerHTML={{__html: translations.agreement.policyAgreement}}
                    />
                    <CheckBox name="rodo"
                              classname="agreement"
                              label={translations.agreement.rodo}
                              onchange={(e) => handleInputChange(e)}
                              required_text={translations.agreement.agreement}
                              defaultChecked
                              required
                    />
                    <CheckBox name="offerties"
                              classname="agreement"
                              label={translations.agreement.offerties}
                              onchange={(e) => handleInputChange(e)}
                              required_text={translations.agreement.agreement}
                              defaultChecked
                              required
                    />
                    <CheckBox name="phones_agreement"
                              classname="agreement"
                              label={translations.agreement.phones}
                              onchange={(e) => handleInputChange(e)}
                    />
                </Fragment>
            }
            <button type="submit"
                    className="btn btn__action btn__action--register"
            >
                {!loadedSavedOffers &&
                <img src={loader} width="24" height="12" alt={'loading'}/>
                }
                {translations.next}
            </button>
        </form>
    }
    return <>
        {shouldLayoutBePresented &&
        <>
            <h3 className="content__header">
                {translations.profileStillLoading}
            </h3>
            <img src={loader} width="100" height="100" alt={'loading'}/>
        </>
        }
    </>;
}


const getState = async (stateId) => {
    const response = await client.query({
        query: GetUserSavedState,
        variables: {
            id: stateId
        }
    });
    if (typeof response?.data?.savedStates === 'undefined') {
        return undefined;
    }

    return response?.data?.savedStates[0];
};

export function UserDetails() {
    const {langState} = useContext(LayoutContext);
    const {Popup, close, open} = usePopup(false);
    const {state, dispatch, setSavedSavings} = useContext(CalculationContext);
    const [registerUser] = useMutation(RegisterUser);
    const [updateUser] = useMutation(UpdateUser);
    const [deleteUser] = useMutation(DeleteUser);
    const [registerUserDetails, setRegisterUserDetails] = useState({});
    const [savedOffers, setSavedOffers] = useState([]);
    const [usedUser, setUsedUser] = useState(null);
    const [savedUsers, setSavedUsers] = useState([]);
    const [loadedSavedOffers, setLoadedSavedOffers] = useState(false);
    const [editedUserDetails, setEditedUserDetails] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [industryOptions, setIndustryOptions] = useState([]);
    const [edit, setEdit] = useState(false);
    const [privacyPopup, setPrivacyPopup] = useState(false);
    const user = authenticationService.currentUserValue;
    const {
        query,
        requested,
        translations,
        selectQuery,
        privacyPolicyQuery,
        requestedCategories,
        requestedPrivacy
    } = nationalization[langState];

    useEffect(() => {
        getIndustryBranches();
    }, []);

    useEffect(() => {
        if (user) {
            getUserDetails();
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [user]);

    const downloadSavedOffers = async () => {
        if (user === null) {
            setLoadedSavedOffers(true);
            return;
        }
        if (typeof registerUserDetails.email === 'undefined') {
            return;
        }
        let email = user.user.email;
        if (user.user.role.type === 'moderator') {
            email = '';
        }
        const response = await client.query({
            query: GetUserSavedOffers, variables: {email}
        });
        const savedOffers = response?.data?.savedOffers.filter(row => row?.stateId?.length > 0);
        const emails = [...new Set(savedOffers.map(row => row.email))];
        setSavedOffers(savedOffers);
        emails.sort();
        if (emails.length > 1) {
            setSavedUsers(emails);
        }
        setLoadedSavedOffers(true);
    }

    useEffect(() => {
        downloadSavedOffers();
    }, [registerUserDetails]);

    const getUserDetails = async () => {
        const request = await client.query({
            query: GetUserDetails,
            fetchPolicy: "network-only",
            variables: {
                id: user.user.id
            }
        });
        let maskedPassword = '';
        for (let i = 0; i <= 2; i++) {
            maskedPassword += Math.random().toString(36).substring(7);
        }
        sessionStorage.setItem('customer', JSON.stringify(request.data.user));
        setRegisterUserDetails({...request.data.user, password: maskedPassword});
    };

    const getIndustryBranches = async () => {
        const request = await client.query({
            query: selectQuery
        });
        setIndustryOptions(request.data[requestedCategories]);
    };

    const handleInputChange = (e) => {
        if (edit) {
            if (e.target.name === 'industry') {
                setRegisterUserDetails({
                    ...registerUserDetails,
                    [e.target.name]: e.target.value
                });
            }
            setEditedUserDetails({
                ...editedUserDetails,
                [e.target.name]: e.target.value
            });
        } else {
            if (e.target.type === 'checkbox') {
                setRegisterUserDetails({
                    ...registerUserDetails,
                    [e.target.name]: e.target.checked
                });
            } else {
                setRegisterUserDetails({
                    ...registerUserDetails,
                    [e.target.name]: e.target.value
                });
            }
        }
    };

    const openPopupOrNextStep = () => {
        if (!state.availableStep) {
            dispatch({type: 'ADD_HELPER_STATE', content: {name: 'availableStep', value: 2}});
        }
        if (savedOffers.length > 0) {
            open();
        } else {
            history.push('/calculator/1');
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (user && disabled && !edit) {
            openPopupOrNextStep();
        }
        if (!user && !disabled && !edit) {
            handleRegisterUser(e);
        }
        if (user && !disabled && edit) {
            handleEditUser(e);
        }
    };

    const handleRegisterUser = async (e) => {
        if (validateForm(e)) {
            let register;
            try {
                register = await registerUser({
                    variables: {
                        username: registerUserDetails.username,
                        email: registerUserDetails.email,
                        password: registerUserDetails.password,
                        phone: registerUserDetails.phone,
                        position: registerUserDetails.position,
                        industry: registerUserDetails.industry,
                        company_name: registerUserDetails.company_name,
                        phones_agreement: registerUserDetails.phones_agreement
                    }
                });
            } catch (e) {
                alert(translations.formValidation.exist)
                return;
            }
            const sendConfirmationEmail = await axios.post(`${process.env.REACT_APP_CONTENT_URL}/auth/send-email-confirmation`, {
                email: register.data.createUser.user.email
            });
            if (sendConfirmationEmail.data.sent) {
                history.push('/thank-you-page');
            } else {
                await deleteUser({
                    variables: {
                        id: register.data.createUser.user.id
                    }
                });
                alert(translations.formValidation.error);
            }
        }
    };

    const handleEditUser = async (e) => {
        if (validateForm(e)) {
            const edit = await updateUser({
                variables: {
                    id: user.user.id,
                    username: editedUserDetails.username,
                    email: editedUserDetails.email,
                    password: editedUserDetails.password,
                    phone: editedUserDetails.phone,
                    position: editedUserDetails.position,
                    industry: editedUserDetails.industry,
                    company_name: editedUserDetails.company_name
                }
            });
            if (edit) {

                let storage = JSON.parse(sessionStorage.getItem('customer'));
                Object.keys(storage).map(item => {
                    if (editedUserDetails[item]) {
                        storage[item] = editedUserDetails[item];
                    }
                });

                sessionStorage.setItem('customer', JSON.stringify(storage));
                openPopupOrNextStep();
            }
        }
    };


    const PopupLoadData = () => {
        const [value, setValue] = useState(null);
        const offers = savedOffers.filter(offer => savedUsers.length ? usedUser === offer.email : true)
        const onOfferSelected = (e) => {
            const offer = savedOffers[e.target.value];
            if (typeof offer !== 'undefined') {
                setValue(offer);
            }
        }
        const onUserSelected = (e) => {
            setUsedUser(e.target.value);
        }

        const castValue = (value) => {
            if (!isNaN(parseFloat(value))) {
                return parseFloat(value);
            }
            if (!isNaN(value)) {
                return parseInt(value);
            }
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        }

        useEffect(() => {
            if (savedUsers && !usedUser && typeof savedUsers[0] !== 'undefined') {
                const indexOf = savedUsers.indexOf(user.user.email);
                setUsedUser(savedUsers[indexOf < 0 ? 0 : indexOf]);
            }
            if (typeof offers[0] !== 'undefined') {
                setValue(offers[0])
            }
        }, [offers, savedUsers])

        const popupActions = [
            {
                actionText: translations.load,
                disabled: savedUsers.length ? !usedUser : false,
                action: async () => {
                    const newState = {};
                    const savedState = await getState(value.stateId);
                    if (!savedState) {
                        alert('Nie udało się zaktualizować stanu');
                        close();
                    }
                    const state = savedState.state;
                    const savings = loadSavings(savedState.savings);
                    state.forEach(row => {
                        newState[row.calculate_id] = castValue(row.value);
                    })
                    dispatch({type: 'REPLACE_STATE', content: newState});
                    setSavedSavings({type: 'SET_SAVINGS', content: savings});
                    history.push('/calculator/1');
                    close();
                }
            },
            {
                actionText: translations.continueWOLoading,
                action: () => {
                    history.push('/calculator/1');
                    close();
                }
            },
        ]
        return <Popup actions={popupActions}>
            {translations.previousCalcPrompt}
            <div className={'form__labeled'}>
                {!!savedUsers.length &&
                <select onChange={onUserSelected} style={{marginLeft: 0, marginTop: '15px', marginBottom: '15px'}}>
                    {(savedUsers).map((email, index) => {
                        return <option key={index} value={email} selected={usedUser===email}>{email}</option>
                    })}
                </select>
                }
                <select onChange={onOfferSelected} style={{marginLeft: 0, marginTop: '15px'}}>
                    {(offers).map((offer, index) => {
                        const time = moment(offer.createdAt);
                        const timeFormatted = time.format('YYYY-MM-DD HH:mm');
                        const name = (offer.calculationName || translations.noName) + ` (${timeFormatted})`;
                        return <option key={index} value={index}>{name}</option>
                    })}
                </select>
            </div>
        </Popup>
    }

    return (
        <Query query={query}>
            {(response) => {
                return (
                    <main className="flex align__center">
                        <MultimediaPanel
                            background={`${process.env.REACT_APP_CONTENT_URL}${response.data[requested].multimedia_background.url}`}
                            classname="user-details"
                        >
                            <h1 className="multimedia__content--title">
                                {response.data[requested].multimedia_title}
                            </h1>
                            <h2 className="multimedia__content--subtitle">
                                {response.data[requested].multimedia_subtitle}
                            </h2>
                            <a href={response.data[requested].document_file ?
                                process.env.REACT_APP_CONTENT_URL + response.data[requested].document_file.url : ''
                            }
                               target="_blank"
                               className={`btn btn__multimedia btn__multimedia--colored ${response.data[requested].document_file ? '' : 'disabled'}`}
                            >
                                {response.data[requested].active_button_text}
                            </a>
                            <a href={response.data[requested].button_url ? response.data[requested].button_url : ''}
                               target="_blank"
                               className={`btn btn__multimedia ${!!response.data[requested].button_url ? '' : 'disabled'}`}
                            >
                                {response.data[requested].button_text}
                            </a>
                        </MultimediaPanel>
                        <div className="main">
                            <FormHeader activeStep={1}/>
                            <PageContent classname="user-details">
                                {typeof registerUserDetails?.username !== 'undefined' &&
                                <>
                                    <h3 className="content__header">
                                        {response.data[requested].register_title}
                                    </h3>
                                    <p className="content__description">
                                        {response.data[requested].register_description}
                                    </p>
                                </>
                                }
                                <Form
                                    disabled={disabled}
                                    handleInputChange={handleInputChange}
                                    setDisabled={setDisabled}
                                    user={user}
                                    industryOptions={industryOptions}
                                    registerUserDetails={registerUserDetails}
                                    loadedSavedOffers={loadedSavedOffers}
                                    setEdit={setEdit}
                                    submitHandler={submitHandler}
                                    translations={translations}
                                />
                                <PopupLoadData/>
                            </PageContent>
                        </div>
                        {privacyPopup &&
                        <ContentPopup close={() => setPrivacyPopup(false)}
                                      query={privacyPolicyQuery}
                                      response={requestedPrivacy}
                        />
                        }
                    </main>
                );
            }}
        </Query>
    );
}
