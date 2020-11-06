/**
 * @author WMXPY
 * @namespace Verify
 * @description Stringed
 */

import { Barktler, BarktlerMixin, IRequestConfig, IResponseConfig } from "@barktler/core";
import { StringedResult } from "@sudoo/verify";
import { createMixinStringedVerifyHook } from "./hook";

export type StringedVerifyMixinOptions = {

    readonly onFailed?: (result: StringedResult) => any;

    readonly onRequestHeaderVerifyFailed?: (result: StringedResult) => any;
    readonly onRequestParamsVerifyFailed?: (result: StringedResult) => any;
    readonly onRequestBodyVerifyFailed?: (result: StringedResult) => any;

    readonly onResponseHeaderVerifyFailed?: (result: StringedResult) => any;
    readonly onResponseDataVerifyFailed?: (result: StringedResult) => any;
};

export const createStringedVerifyMixin: (options?: Partial<StringedVerifyMixinOptions>) => BarktlerMixin = (options?: Partial<StringedVerifyMixinOptions>) => {

    const mergedOptions: StringedVerifyMixinOptions = {
        ...options,
    };

    return (instance: Barktler) => {

        instance.preHook.verifier.add(createMixinStringedVerifyHook(
            (request: IRequestConfig) => request.requestHeadersPattern,
            (request: IRequestConfig) => request.headers,
            mergedOptions.onFailed,
            mergedOptions.onRequestHeaderVerifyFailed,
        ));

        instance.preHook.verifier.add(createMixinStringedVerifyHook(
            (request: IRequestConfig) => request.requestParamsPattern,
            (request: IRequestConfig) => request.params,
            mergedOptions.onFailed,
            mergedOptions.onRequestParamsVerifyFailed,
        ));

        instance.preHook.verifier.add(createMixinStringedVerifyHook(
            (request: IRequestConfig) => request.requestBodyPattern,
            (request: IRequestConfig) => request.body,
            mergedOptions.onFailed,
            mergedOptions.onRequestBodyVerifyFailed,
        ));

        instance.postHook.verifier.add(createMixinStringedVerifyHook(
            (response: IResponseConfig) => response.responseHeadersPattern,
            (response: IResponseConfig) => response.headers,
            mergedOptions.onFailed,
            mergedOptions.onResponseHeaderVerifyFailed,
        ));

        instance.postHook.verifier.add(createMixinStringedVerifyHook(
            (response: IResponseConfig) => response.responseDataPattern,
            (response: IResponseConfig) => response.data,
            mergedOptions.onFailed,
            mergedOptions.onResponseDataVerifyFailed,
        ));
    };
};
