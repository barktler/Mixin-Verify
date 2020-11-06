/**
 * @author WMXPY
 * @namespace Verify
 * @description Hook
 */

import { Pattern } from "@sudoo/pattern";
import { AsyncVerifyFunction } from "@sudoo/processor";
import { StringedResult, Verifier, VerifyResult } from "@sudoo/verify";

export const createStringedVerifyHook = <T>(
    getPattern: (target: T) => Pattern | undefined,
    getValueFunction: (target: T) => any,
    onFailed?: (result: VerifyResult) => any
): AsyncVerifyFunction<T> => {

    return async (value: T): Promise<boolean> => {

        const pattern: Pattern | undefined = getPattern(value);
        if (!pattern) {
            return true;
        }

        const verifier: Verifier = Verifier.create(pattern);
        const verifyResult: VerifyResult = verifier.verify(getValueFunction(value));

        if (verifyResult.succeed) {
            return true;
        }

        if (typeof onFailed === 'function') {
            onFailed(verifyResult);
        }
        return false;
    };
};

export const createMixinStringedVerifyHook = <T>(
    getPattern: (target: T) => Pattern | undefined,
    getValueFunction: (target: T) => any,
    onFailed?: (result: StringedResult) => any
): AsyncVerifyFunction<T> => {

    return async (value: T): Promise<boolean> => {

        const pattern: Pattern | undefined = getPattern(value);
        if (!pattern) {
            return true;
        }

        const verifier: Verifier = Verifier.create(pattern);
        const verifyResult: StringedResult = verifier.conclude(getValueFunction(value));

        if (verifyResult.succeed) {
            return true;
        }

        if (typeof onFailed === 'function') {
            onFailed(verifyResult);
        }
        return false;
    };
};
