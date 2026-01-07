import {validationResult} from 'express-validator';
import {ApiError} from '../utils/api-error.js';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
}
 