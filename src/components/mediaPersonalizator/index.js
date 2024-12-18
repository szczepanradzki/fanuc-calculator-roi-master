import React, { useContext } from 'react';
import { LayoutContext } from '../../context/layoutContext';

function GetPersonalizedValue(context) {
    switch (context.__typename) {
        case 'ComponentPersonalizationBackgrand':
            return {key: 'multimedia_background', value: context.media.url};
        case 'ComponentPersonalizationHeader':
            return {key: 'multimedia_title', value: context.CategoryHeder};
        case 'ComponentPersonalizationSubtitle':
            return {key: 'multimedia_subtitle', value: context.Subtitle};
        case 'ComponentPersonalizationVideoUrl':
            return {key: 'multimedia_video_url', value: context.VideoCategories};
        default: {
            console.log('This element is have unsupported persolalization ' + context.__typename);
        }
    }
}

function MultimediaPersonalizer(newObj, currentCategory) {
    let personalizedMedia = [];
    newObj.multimedia_personalization.map(obj => {
        const filteredCategory =
            obj.categories.filter(c => c.value.toLowerCase().replace(/\s/g, '') === currentCategory.toLowerCase().replace(/\s/g, ''));
        if(filteredCategory.length > 0) {
            personalizedMedia = [...personalizedMedia, GetPersonalizedValue(obj)];
        }
    });
    return personalizedMedia;
}

// context is all data from backend
export function MediaPersonalizator(context) {
    const {industry} = useContext(LayoutContext);
    if(context.multimedia_personalization) {
        const personalizedList = MultimediaPersonalizer(context, industry);
        personalizedList.map(personalizedValues => {
            if(Object.keys(context).includes(personalizedValues.key)) {
                context[personalizedValues.key] = personalizedValues.value;
            }
        });
    }
}
