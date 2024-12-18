import React, { useState } from 'react';
import { MediaPersonalizator } from '../../components/mediaPersonalizator';
import { MultimediaPanel } from '../../components/multimedia-panel';
import { VideoPopup } from '../../components/popup/videoPopup';

export function Multimedia({dataBase, className = ''}) {
    const [showPopup, setShowPopup] = useState(false);
    let newObj = Object.keys(dataBase).reduce((c, k) => (c[k.toLowerCase()] = dataBase[k], c), {});
    MediaPersonalizator(newObj);
    const background =
        typeof newObj.multimedia_background === 'object' ? newObj.multimedia_background.url : newObj.multimedia_background;

    return (
        <MultimediaPanel background={`${process.env.REACT_APP_CONTENT_URL}${background}`}
                         classname="step1">
            <div className="multimedia__content--wrapper">
                <h2 className="multimedia__content--title">{newObj.multimedia_title}</h2>
                <h3 className="multimedia__content--subtitle">{newObj.multimedia_subtitle}</h3>
                <p className="multimedia__content--caption">{newObj.multimedia_caption}</p>
                <div className="multimedia__content--icon"
                     onClick={() => {
                         setShowPopup(true);
                     }}
                >
                    <i className="icon icon-play_circle_filled"/>
                </div>
            </div>
            {showPopup &&
            <VideoPopup close={() => setShowPopup(false)}
                        videoUrl={newObj.multimedia_video_url}
            />
            }
        </MultimediaPanel>
    );
}
