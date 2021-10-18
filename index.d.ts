declare type IsSuppotredOptions = {
    failIfMajorPerformanceCaveat: boolean;
}

declare type IsSupported = {
    webGLContextAttributes: WebGLContextAttributes;
    (
        options?: IsSuppotredOptions
    ): boolean;
};

export const supported: IsSupported;
export function notSupportedReason(options?: IsSuppotredOptions): string;
