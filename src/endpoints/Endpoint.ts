
import { ObjectSchema } from "joi";
import InvalidDatasException from "../exceptions/InvalidDatasException";

export default abstract class Endpoint {

    protected isValidDatas(values: { [key: string]: any }) {
        const errors = this.getRulesValidation()
            .validate(values, { abortEarly: false, allowUnknown: true });

        if (errors.error) {
            const validationErrors: { [key: string]: any } = {};
            errors.error.details.forEach((item: { [key: string]: any }) => {
                validationErrors[item.context.label] = item.message.replace(/"/g, "");
            });

            throw new InvalidDatasException(JSON.stringify(validationErrors));
        }
    }

    abstract getRulesValidation(): ObjectSchema;
}