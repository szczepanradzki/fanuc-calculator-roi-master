import React from "react";
import ReactPlayer from "react-player";

export function VideoPopup({videoUrl, close}) {
    return (
        <div className="popup">
            <div className="popup__dialog popup__dialog--video">
                <i className="popup__dialog--close icon-close"
                   onClick={() => close()}
                />
                <ReactPlayer className="popup__video"
                             url={videoUrl}
                             width={100 + "%"}
                             height={100 + "%"}
                             volume={1}
                             muted
                             controls
                             playing
                             loop
                             config={{
                                 youtube: {
                                     fs: 0
                                 }
                             }}

                />
            </div>
        </div>
    );

}
