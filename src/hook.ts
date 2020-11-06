/**
 * @author WMXPY
 * @namespace Verify
 * @description Hook
 */

import { Pattern } from "@sudoo/pattern";
import { AsyncVerifyFunction } from "@sudoo/processor";
import { StringedResult, Verifier, VerifyResult } from "@sudoo/verify";

export const createMixinVerifyHook = <T>(
    getPattern: (target: T) => Pattern | undefined,
    getValueFunction: (target: T) => any,
    ...onFailedFunctions: Array<(result: VerifyResult) => any>
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
            onFailedFunction(verifyResult);
        }
        return false;
    };
};

export const createMixinStringedVerifyHook = <T>(
    getPattern: (target: T) => Pattern | undefined,
    getValueFunction: (target: T) => any,
    ...onFailedFunctions: Array<(result: StringedResult) => any>
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
            onFailedFunction(verifyResult);
        }
        return false;
    };
};
