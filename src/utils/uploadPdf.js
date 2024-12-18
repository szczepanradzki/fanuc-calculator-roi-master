import React from 'react';
import axios from 'axios';

export const saveToFile = async (url, name, stateId) => {
    const yyyy = new Date().getFullYear();
    const mm = new Date().getMonth() + 1;
    const dd = new Date().getDate();
    const hh = new Date().getHours();
    const MM = new Date().getMinutes();

    const filename = `kalkulacjaROI-${yyyy}-${mm}-${dd}-${hh}-${MM}.pdf`;
    const req = await axios.get(url, {
        responseType: 'blob'
    });
    const resp = await req.data;
    const file = await new File([resp], filename, {type: resp.type});
    return uploadPdf(file, name, stateId);
};

export const parseState = (state, stateContext) => {
    const flattened = {};
    stateContext.forEach((row) => flattened[row.calculateId] = row.fieldName);
    return Object.entries(state).map(([calculateId, value]) => {
        return {
            calculate_id: calculateId,
            value: typeof value === 'object' ? JSON.stringify(value) : ""+value,
            text: flattened[calculateId] ?? calculateId,
        }
    });
}

export const parseSavings = (savings) => {
    return savings.map(row => {
        return {
            name: row.header,
            value: ""+row.default_value
        }
    });
}

export const loadSavings = (savings) => {
    return savings.map(row => {
        return {
            header: row.name,
            default_value: JSON.parse(row.value),
            unit: "#currency"
        }
    });
}

const uploadPdf = async (file, name, stateId) => {
    const formData = new FormData();
    const {jwt, user} = JSON.parse(sessionStorage.getItem('currentUser'));
    const {email, phones_agreement, username, company_name} = JSON.parse(sessionStorage.getItem('customer'));
    const body = {
        email: email,
        phones_agreement: phones_agreement,
        name: username,
        company_name: company_name,
        document: file,
        user: user.id,
        calculationName: name ?? '',
        stateId: stateId
    };

    const newData = {};
    Object.keys(body).map(item => {
        if(item === 'document') {
            formData.append(`files.document`, file, file.name);
        } else {
            newData[item] = body[item];
        }
    });
    formData.append('data', JSON.stringify(newData));

    const req = await axios.post(`${process.env.REACT_APP_CONTENT_URL}/saved-offers`, formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    });

    return req.status === 200;
};
