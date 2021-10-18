declare type IsSupputredOptions = {
    failIfMajorPerformanceCaveat: boolean;
}

declare type isSupported = {
    webGLContextAttributes: WebGLContextAttributes;
    (
        options?: IsSupputredOptions
    ): boolean;
};

export = {
    supported: isSupported,
    notSupportedReason: (options?: IsSupputredOptions) => string
};
