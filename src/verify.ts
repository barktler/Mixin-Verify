/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { Barktler, BarktlerMixin, IRequestConfig, IResponseConfig } from "@barktler/core";
import { VerifyResult } from "@sudoo/verify";
import { createMixinVerifyHook } from "./hook";

export type VerifyMixinOptions = {

    readonly onFailed?: (result: VerifyResult) => any;

    readonly onRequestHeaderVerifyFailed?: (result: VerifyResult) => any;
    readonly onRequestParamsVerifyFailed?: (result: VerifyResult) => any;
    readonly onRequestBodyVerifyFailed?: (result: VerifyResult) => any;

    readonly onResponseHeaderVerifyFailed?: (result: VerifyResult) => any;
    readonly onResponseDataVerifyFailed?: (result: VerifyResult) => any;
};

export const createVerifyMixin: (options?: Partial<VerifyMixinOptions>) => BarktlerMixin = (options?: Partial<VerifyMixinOptions>) => {

    const mergedOptions: VerifyMixinOptions = {
        ...options,
    };

    return (instance: Barktler) => {

        instance.preHook.verifier.add(createMixinVerifyHook(
            (request: IRequestConfig) => request.requestHeadersPattern,
            (request: IRequestConfig) => request.headers,
            mergedOptions.onFailed,
            mergedOptions.onRequestHeaderVerifyFailed,
        ));

        instance.preHook.verifier.add(createMixinVerifyHook(
            (request: IRequestConfig) => request.requestParamsPattern,
            (request: IRequestConfig) => request.params,
            mergedOptions.onFailed,
            mergedOptions.onRequestParamsVerifyFailed,
        ));

        instance.preHook.verifier.add(createMixinVerifyHook(
            (request: IRequestConfig) => request.requestBodyPattern,
            (request: IRequestConfig) => request.body,
            mergedOptions.onFailed,
            mergedOptions.onRequestBodyVerifyFailed,
        ));

        instance.postHook.verifier.add(createMixinVerifyHook(
            (response: IResponseConfig) => response.responseHeadersPattern,
            (response: IResponseConfig) => response.headers,
            mergedOptions.onFailed,
            mergedOptions.onResponseHeaderVerifyFailed,
        ));

        instance.postHook.verifier.add(createMixinVerifyHook(
            (response: IResponseConfig) => response.responseDataPattern,
            (response: IResponseConfig) => response.data,
            mergedOptions.onFailed,
            mergedOptions.onResponseDataVerifyFailed,
        ));
    };
};
