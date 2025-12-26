declare module '@perceptinsight/percept-js' {
  interface PerceptInitOptions {
    autoTrackPageviews?: boolean;
    autoTrackRuntimeErrors?: boolean;
    autoTrackWebvitals?: boolean;
    autoTrackApiCalls?: boolean;
    autoCaptureClicks?: boolean;
    enableLogs?: boolean;
  }

  interface PerceptClient {
    init(projectToken: string, options?: PerceptInitOptions): void;
    capture(eventName: string, props?: Record<string, unknown>): void;
    timeEvent(eventName: string): void;
    setUserId(userId: string): Promise<void> | void;
    setUserProperties(props: Record<string, unknown>): void;
    setGlobalProperty(key: string, value: unknown): void;
    removeGlobalProperty(key: string): void;
    getAllGlobalProperties(): Record<string, unknown>;
    clear(): Promise<void>;
  }

  const Percept: PerceptClient;
  export default Percept;
}
