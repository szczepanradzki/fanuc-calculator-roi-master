import {getStep1} from "../graphql/queries/pl/step1";
import {getStep1En} from "../graphql/queries/en/step1";
import {getStep2} from "../graphql/queries/pl/step2";
import {getStep2En} from "../graphql/queries/en/step2";
import {getStep3} from "../graphql/queries/pl/step3";
import {getStep3En} from "../graphql/queries/en/step3";
import {getStep4} from "../graphql/queries/pl/step4";
import {getStep4En} from "../graphql/queries/en/step4";
import {getStep5} from "../graphql/queries/pl/step5";
import {getStep5En} from "../graphql/queries/en/step5";

export const nationalizations = {
    1: {
        pl: {
            query: getStep1,
            requested: "step1",
            sections: "sections"
        },
        eng: {
            query: getStep1En,
            requested: "step1En",
            sections: "sections_ens"
        }
    },
    2: {
        pl: {
            query: getStep2,
            requested: "step2",
            sections: "sections"
        },
        eng: {
            query: getStep2En,
            requested: "step2En",
            sections: "sections_ens"
        }
    },
    3: {
        pl: {
            query: getStep3,
            requested: "step3",
            sections: "sections"
        },
        eng: {
            query: getStep3En,
            requested: "step3En",
            sections: "sections_ens"
        }
    },
    4: {
        pl: {
            query: getStep4,
            requested: "step4",
            sections: "sections"
        },
        eng: {
            query: getStep4En,
            requested: "step4En",
            sections: "sections_ens"
        }
    },
    5: {
        pl: {
            query: getStep5,
            requested: "step5",
            sections: "sections"
        },
        eng: {
            query: getStep5En,
            requested: "step5En",
            sections: "sections_ens"
        }
    }
};