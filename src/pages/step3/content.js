import React, { useContext } from 'react';
import { PageContent } from '../../components/page-content';
import { YellowHeder } from '../../components/yellow-heder';
import { FormHeader } from '../../components/formHeder';
import { NavigationButtons } from '../../components/navigationButtons';
import { LayoutContext } from '../../context/layoutContext';
import { ContentGenerator } from '../../components/contentGenerator';

export function Content({sections, classname}) {
    const {currency} = useContext(LayoutContext);
    return (
        <div className="main">
            <FormHeader activeStep={4} currency={currency}/>
            <PageContent classname={classname}>
                <div className="content__container">
                    {sections.map(section => {
                        return (
                            <div key={section.id}>
                                <YellowHeder text={section.header}/>
                                <ContentGenerator section={section.header}/>
                            </div>
                        );
                    })}
                    <NavigationButtons currentPage={3}/>
                </div>
            </PageContent>
        </div>
    );
}
