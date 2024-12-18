import React, { useState } from "react";
import { BaseButon } from "../baseButon";

export function SwitchButton({ arr, startValue, set }) {
    const [value, setValue] = useState(startValue);
    return (
        <div className="switchButton">
            {arr.map(item => (
                <BaseButon key={item}
                    text={item}
                    classname="btn__switchButton"
                    isActive={value === item}
                    onClick={() => {
                        setValue(item);
                        set(item);
                    }}
                />
            ))}
        </div>
    );
}
