import React from 'react';
import { MediaPersonalizator } from '../../components/mediaPersonalizator';
import { MultimediaPanel } from '../../components/multimedia-panel';

export function Multimedia({dataBase, classname = ''}) {
    const newObj = Object.keys(dataBase).reduce((c, k) => (c[k.toLowerCase()] = dataBase[k], c), {});
    MediaPersonalizator(newObj);
    const background =
        typeof newObj.multimedia_background === 'object' ? newObj.multimedia_background.url : newObj.multimedia_background;

    return (
        <MultimediaPanel background={`${process.env.REACT_APP_CONTENT_URL}${background}`}
                         classname={classname}>
            <h1 className="multimedia__content--title">{newObj.multimedia_heder}</h1>
            <h2 className="multimedia__content--subtitle">{newObj.multimedia_subtitle}</h2>
            <a href={newObj.multimedia_button_url}
               target="_blank"
               className={`btn btn__multimedia btn__multimedia--colored ${!!newObj.multimedia_button_url ? '' : 'disabled'}`}
            >
                {newObj.multimedia_button_description}
            </a>

        </MultimediaPanel>
    );
}
