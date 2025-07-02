import { atom, selector } from 'recoil';
export const userSegmentState = atom<string>({
  key: 'userSegment',
  default: 'general',
});
export const segmentRecommendations = selector({
  key: 'segmentRecommendations',
  get: async ({ get }) => {
    const seg = get(userSegmentState);
    const res = await fetch(`/api/segment/${seg}/recs`);
    return res.json();
  },
});
