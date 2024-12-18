import React, { useContext } from 'react';
import { Icon } from '../icon';
import { CalculationContext, LayoutContext } from '../../context/layoutContext';
import { history } from '../../utils/history';

function IconHeder({icon, text}) {
    return (
        <Icon icon={icon}
              classname="formHeder__icons--icon"
              link="#"
              target="_blank"
        >
            <p>{text}</p>
        </Icon>
    );
}

function StepHeder({step, isActive = false}) {
    const {state, dispatch} = useContext(CalculationContext);

    const navigateToStep = (step) => {
        if(state.availableStep >= step) {
            dispatch({type: 'ADD_HELPER_STATE', content: {name: 'availableStep', value: step}});
        }
        if(step === 1) {
            history.push(`/user-details`);
        } else if(state.availableStep >= step) {
            history.push(`/calculator/${step - 1}`);
        } else {
            return false;
        }
    };

    return (
        <div className={`formHeder__steps--step ${isActive ? 'active' : ''} ${(step > state.availableStep || !state.availableStep) ? 'disabled' : ''}`}
             onClick={() => {
                 navigateToStep(step);
             }}
        >
            {step}
        </div>
    );
}

export function FormHeader({activeStep = 3, currency = null}) {
    const steps = [1, 2, 3, 4, 5, 6];
    const {langState} = useContext(LayoutContext);
    return (
        <div className="formHeder">
            <div className="formHeder__icons">
                <IconHeder icon="icon-flag" text={langState}/>
                {currency &&
                <IconHeder icon="icon-money" text={currency}/>
                }
            </div>
            <div className="formHeder__steps">
                {steps.map(step =>
                    <StepHeder key={step}
                               step={step}
                               isActive={step === activeStep}
                    />
                )}
            </div>
            <div className="formHeder__result"></div>
        </div>
    );
}
