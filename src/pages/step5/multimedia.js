import React from 'react';
import { BaseButon } from '../../components/baseButon';
import { MediaPersonalizator } from '../../components/mediaPersonalizator';
import { MultimediaPanel } from '../../components/multimedia-panel';

export function Multimedia({dataBase, classname = ''}) {
    const newObj = Object.keys(dataBase).reduce((c, k) => (c[k.toLowerCase()] = dataBase[k], c), {});
    MediaPersonalizator(newObj);
    const background =
        typeof newObj.multimedia_background === 'object' ? newObj.multimedia_background.url : newObj.multimedia_background;

    return (
        <MultimediaPanel shader background={`${process.env.REACT_APP_CONTENT_URL}${background}`}
                         classname={classname}>
            <p className="multimedia__content--smallTitle">{newObj.multimedia_small_title}</p>
            <h1 className="multimedia__content--title">{newObj.multimedia_title}</h1>
            <h2 className="multimedia__content--subtitle">{newObj.multimedia_subtitle}</h2>
            <div className="multimedia__content__subtitle">
                <div className="multimedia__content__subtitle--container">
                    <h1>{newObj.multimedia_subtitle_column1_header}</h1>
                    <p> {newObj.multimedia_subtitle_column1_text}</p>
                </div>
                <div className="multimedia__content__subtitle--container">
                    <h1>{newObj.multimedia_subtitle_column2_header}</h1>
                    <p> {newObj.multimedia_subtitle_column2_text}</p>
                </div>
                <div className="multimedia__content__subtitle--container">
                    <h1>{newObj.multimedia_subtitle_column3_header}</h1>
                    <p> {newObj.multimedia_subtitle_column3_text}</p>
                </div>
            </div>
            <a href={newObj.document_file && process.env.REACT_APP_CONTENT_URL + newObj.document_file.url}
               target="_blank"
               className={`btn btn__multimedia btn__multimedia--colored ${newObj.document_file ? '' : 'disabled'}`}
            >
                {newObj.multimedia_button_description}
            </a>
        </MultimediaPanel>
    );
}
