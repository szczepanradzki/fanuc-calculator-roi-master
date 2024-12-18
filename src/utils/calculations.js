import * as math from 'mathjs';
import { Finance } from 'financejs';

const inverseAlphabeticalComparison = (a, b) => {
    return ""+a < ""+b ? 1 : a === b ? 0 : -1;
}

export const calculations = (calcType, state) => {
    const finance = new Finance();
    if(calcType) {
        const mainRegExps = {
            allStates: new RegExp(Object.keys(state).sort(inverseAlphabeticalComparison).join('|'), 'gi'),
            mathsCalculations: new RegExp('^[0-9+\\-*\\/\\(\\)\\s\\.\\^]{1,}$', 'g'),
            insideBrackets: new RegExp('\\{(.*)\\}'),
            functional: new RegExp('^=>\\('),
            summary: new RegExp('^SUM\\('),
            irr: new RegExp('^IRR\\(')
        };

        if(calcType.match(mainRegExps.functional)) {
            const convertedIndex = new RegExp('(?:Number\\()([0-9\\s\\+\\-]+)', 'g');
            const calculationIndex = new RegExp('(?=(\\(Number\\([0-9\\-\\s\\)]+\\)))\\1', 'g');
            const condition = new RegExp('(\\([\\d\\.\\s\\>\\<\\=]+\\))', 'g');
            const calc = new RegExp('\\{(.*)\\}', 'g');
            let newText = ``;
            calcType.replace(calculationIndex, (matched) => {
                const equatation = matched.match(convertedIndex)[0].substr(7);
                newText = calcType.replace(calculationIndex, math.evaluate(equatation));
            });
            const eq = newText.replace(mainRegExps.allStates, (matched) => {
                return state[matched] || 0;
            });
            if(eq.match(condition)) {
                let fixed = 0;
                if(math.evaluate(eq.match(condition)[0])) {
                    const equatation = eq.match(calc)[0].substring(1, eq.match(calc)[0].length - 1);
                    const calcs = math.evaluate(equatation);
                    fixed = calcs.toFixed(2).replace(/\.?0+$/g, '');
                }
                return fixed;
            }
        }

        if(calcType.match(mainRegExps.insideBrackets)) {
            const re = calcType.match(mainRegExps.insideBrackets)[1];
            const reValue = state[re];
            const eq = calcType.replace(mainRegExps.insideBrackets, reValue);
            if(typeof state[eq] === "number") {
                return state[eq];
            }
        }

        if(calcType.match(mainRegExps.summary)) {
            const hashIndex = calcType.indexOf('#');
            const calcId = calcType.substring(calcType.indexOf('(') + 1, hashIndex + 1);
            const index = calcType.substring((hashIndex + 1), calcType.lastIndexOf(')'));
            const arr = [];
            for(let i = 0; i <= index; i++) {
                arr.push(state[`${calcId}${i}`]);
            }
            const eq = math.sum(arr);
            return eq.toFixed(2).replace(/\.?0+$/g, '');
        }

        if(calcType.match(mainRegExps.irr)) {
            const arr = [];
            const hashIndex = calcType.indexOf('#');
            const calcId = calcType.substring(calcType.indexOf('(') + 1, hashIndex + 1);
            const index = calcType.substring((hashIndex + 1), calcType.lastIndexOf(')'));
            const re = index.match(mainRegExps.insideBrackets)[1];
            const period = state[re];
            for(let i = 0; i <= period; i++) {
                const value = state[`${calcId}${i}`];
                if(!!value) {
                    arr.push(value);
                }
            }
            if(arr.length > 0) {
                let irr;
                try {
                    irr = finance.IRR.apply(this, arr);
                } catch (e) {
                    irr = 0;
                }
                return irr;
            }
        }

        const newText = calcType.replace(mainRegExps.allStates, (matched) => {
            return state[matched] || 0;
        });

        if(newText.match(mainRegExps.mathsCalculations)) {
            const eq = math.evaluate(newText);
            return eq.toFixed(2).replace(/\.?0+$/g, '');
        }
    }
};
