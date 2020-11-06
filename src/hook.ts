/**
 * @author WMXPY
 * @namespace Verify
 * @description Hook
 */

import { Pattern } from "@sudoo/pattern";
import { AsyncVerifyFunction } from "@sudoo/processor";
import { StringedResult, Verifier, VerifyResult } from "@sudoo/verify";

export type FailedFunction = (result: VerifyResult) => any;
export type StringedFailedFunction = (result: StringedResult) => any;

export const createMixinVerifyHook = <T>(
    getPattern: (target: T) => Pattern | undefined,
    getValueFunction: (target: T) => any,
    ...onFailedFunctions: Array<FailedFunction | undefined>
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

        for (const onFailedFunction of onFailedFunctions) {
            if (typeof onFailedFunction === 'function') {
                onFailedFunction(verifyResult);
            }
        }
        return false;
    };
};

export const createMixinStringedVerifyHook = <T>(
    getPattern: (target: T) => Pattern | undefined,
    getValueFunction: (target: T) => any,
    ...onFailedFunctions: Array<StringedFailedFunction | undefined>
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

        for (const onFailedFunction of onFailedFunctions) {
            if (typeof onFailedFunction === 'function') {
                onFailedFunction(verifyResult);
            }
        }
        return false;
    };
};
