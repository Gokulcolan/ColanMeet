import React, { useState } from 'react';
export const AccessRoll = React.createContext();
export default function Context(props) {

    const [roll, setRoll] = useState("");

    const updRoll = (value) => {
        setRoll(value);
    };

    return (
        <AccessRoll.Provider
            value={{
                roll,
                updRoll
            }}
        >
            {props.children}
        </AccessRoll.Provider>
    );
};
