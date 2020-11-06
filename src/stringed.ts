/**
 * @author WMXPY
 * @namespace Verify
 * @description Stringed
 */

import { Barktler, BarktlerMixin, IRequestConfig } from "@barktler/core";
import { StringedResult } from "@sudoo/verify";
import { createMixinStringedVerifyHook } from "./hook";

export type StringedVerifyMixinOptions = {

    readonly onFailed?: (result: StringedResult) => any;
};

export const createStringedVerifyMixin: (options?: Partial<StringedVerifyMixinOptions>) => BarktlerMixin = (options?: Partial<StringedVerifyMixinOptions>) => {

    const mergedOptions: StringedVerifyMixinOptions = {
        ...options,
    };

    return (instance: Barktler) => {

        instance.preHook.verifier.add(createMixinStringedVerifyHook(
            (request: IRequestConfig) => request.requestBodyPattern,
            (request: IRequestConfig) => request.body,
            mergedOptions.onFailed,
        ));
    };
};
