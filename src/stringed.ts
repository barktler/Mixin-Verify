/**
 * @author WMXPY
 * @namespace Verify
 * @description Stringed
 */

import { Barktler, BarktlerMixin, IRequestConfig } from "@barktler/core";
import { StringedResult, Verifier } from "@sudoo/verify";

export type StringedVerifyMixinOptions = {

    readonly onFailed?: (result: StringedResult) => void;
};

export const createStringedVerifyMixin: (options?: Partial<StringedVerifyMixinOptions>) => BarktlerMixin = (options?: Partial<StringedVerifyMixinOptions>) => {

    const mergedOptions: StringedVerifyMixinOptions = {
        ...options,
    };

    return (instance: Barktler) => {

        instance.preHook.verifier.add(async (request: IRequestConfig): Promise<boolean> => {

            if (!request.requestBodyPattern) {
                return true;
            }

            const verifier: Verifier = Verifier.create(request.requestBodyPattern);
            const verifyResult: StringedResult = verifier.conclude(request.body);

            if (verifyResult.succeed) {
                return true;
            }

            if (typeof mergedOptions.onFailed === 'function') {
                mergedOptions.onFailed(verifyResult);
            }
            return false;
        });
    };
};
