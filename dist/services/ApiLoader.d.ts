export declare type ApiVariantType = 'full' | 'simple';
export declare type ApiConfig = {
    key?: string;
    jak?: boolean;
    poi?: boolean;
    pano?: boolean;
    suggest?: boolean;
    api?: ApiVariantType;
};
declare class ApiLoader {
    private static status;
    private static loadingPromise;
    private static appendScript;
    private static runInitialLoad;
    private static load;
    static init(config?: ApiConfig): Promise<true | void>;
}
export default ApiLoader;
