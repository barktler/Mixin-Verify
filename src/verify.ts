/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { Barktler, BarktlerMixin, IRequestConfig, IResponseConfig } from "@barktler/core";

export type VerifyMixinOptions = {
};

export const createVerifyMixin: (options?: Partial<VerifyMixinOptions>) => BarktlerMixin = (options?: Partial<VerifyMixinOptions>) => {

    const mergedOptions: VerifyMixinOptions = {
        ...options,
    };

    return (instance: Barktler) => {

        instance.preHook.verifier.add(async (request: IRequestConfig): Promise<boolean> => {

            return true;
        });
    };
};
