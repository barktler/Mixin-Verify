/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { Barktler, BarktlerMixin, IRequestConfig } from "@barktler/core";
import { Verifier, VerifyResult } from "@sudoo/verify";

export type VerifyMixinOptions = {

    readonly onFailed?: (result: VerifyResult) => any;
};

export const createVerifyMixin: (options?: Partial<VerifyMixinOptions>) => BarktlerMixin = (options?: Partial<VerifyMixinOptions>) => {

    const mergedOptions: VerifyMixinOptions = {
        ...options,
    };

    return (instance: Barktler) => {

        instance.preHook.verifier.add(async (request: IRequestConfig): Promise<boolean> => {

            if (!request.requestBodyPattern) {
                return true;
            }

            const verifier: Verifier = Verifier.create(request.requestBodyPattern);
            const verifyResult: VerifyResult = verifier.verify(request.body);

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
