import { useFlags } from "launchdarkly-react-client-sdk";
export function useFeatureFlag(flagKey) {
  const { [flagKey]: isEnabled } = useFlags();
  return isEnabled;
}
