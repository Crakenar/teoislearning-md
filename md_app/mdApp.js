import requiredParam from "../helpers/required-param.js";
import {InvalidPropertyError} from "../helpers/error.js";

export default function makeMD(
    md = requiredParam('md')
) {
    {
        const validMD = validate(md);
        return Object.freeze(validMD);
    }

    //need ...otherinfo for if I have an id (for example)
    function validate({
        title = requiredParam('title'),
        descriptionMD = requiredParam('descriptionMD'),
        language = requiredParam('language'),
        typeMD = requiredParam('typeMD'),
        date_work = requiredParam('date_work'),
      ...otherInfo
      } = {}){
        validateTitle('title', title)
        validateDescriptionMD('descriptionMD', descriptionMD)
        validateLanguage('language', language)
        validateTypeMD('typeMD', typeMD)
        validateDateWork('date_work', date_work)
        return {...otherInfo, title, descriptionMD, language, typeMD, date_work}
    };

    function validateTitle(label, title){
        const regex = /^[A-Za-z0-9]*$/;
        if (title.length < 4 && regex.test(title)){
            throw new InvalidPropertyError(
                `A ${label} must be at least 4 characters long and not strange characters.`
            )
        }
    }
    function validateDescriptionMD(label, descriptionMD){
        if (descriptionMD.length < 4){
            throw new InvalidPropertyError(
                `A ${label} must be at least 4 characters long.`
            )
        }
    }
    function validateLanguage(label, language){
        if (language !== 'fr' && language !== 'en'){
            throw new InvalidPropertyError(
                `A ${label} must be either french (fr) or english (en).`
            )
        }
    }
    function validateTypeMD(label, typeMD){
        if (typeMD !== 'projects' && typeMD !== 'experiences'){
            throw new InvalidPropertyError(
                `A ${label} must be either projects or experiences.`
            )
        }
    }
    function validateDateWork(label, date_work){
        if (date_work.length < 4){
            throw new InvalidPropertyError(
                `A ${label} must be at least 4 characters long.`
            )
        }
    }

}
