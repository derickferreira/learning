import { setLocale } from "yup";

setLocale({
    mixed: {
        required: "Ce champ est obligatoire",
        notType: "Le format saisi est invalide",
        defined: "Ce champ doit avoir une valeur définie",
        oneOf: "Doit être l’une des valeurs suivantes : ${values}",
        notOneOf: "Ne peut pas être l’une des valeurs suivantes : ${values}",
    },
    string: {
        lowercase: "Doit être en minuscule",
        uppercase: "Doit être en majuscule",
        url: "Doit avoir un format d'URL valide",
        max: "Doit avoir au maximum ${max} caractères",
        min: "Doit avoir au moins ${min} caractères",
        email: "Le format de l'e-mail saisi n'est pas valide",
        length: "Doit avoir exactement ${length} caractères",
        uuid: "La valeur saisie ne correspond pas à un UUID valide",
        trim: "Ne doit pas contenir d'espaces au début ou à la fin.",
        matches: "La valeur doit correspondre au modèle : ${regex}",
    },
    number: {
        min: "Doit être au minimum ${min}",
        max: "Doit être au maximum ${max}",
        integer: "Doit être un nombre entier",
        lessThan: "Doit être inférieur à ${less}",
        moreThan: "Doit être supérieur à ${more}",
        positive: "Doit être un nombre positif",
        negative: "Doit être un nombre négatif",
    },
    date: {
        min: "Doit être postérieur à la date ${min}",
        max: "Doit être antérieur à la date ${max}",
    },
    array: {
        min: "Doit contenir au minimum ${min} éléments",
        max: "Doit contenir au maximum ${max} éléments",
        length: "Doit contenir exactement ${length} éléments",
    },
    object: {
        noUnknown: "Doit être passé une valeur définie",
    },
});
