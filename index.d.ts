declare type IsSuppotredOptions = {
    failIfMajorPerformanceCaveat: boolean;
}

declare type IsSupported = {
    webGLContextAttributes: WebGLContextAttributes;
    (
        options?: IsSuppotredOptions
    ): boolean;
};

declare type SupportedExportedType = {
    supported: IsSupported;
    notSupportedReason: (options?: IsSuppotredOptions) => string;
};

export default SupportedExportedType;
