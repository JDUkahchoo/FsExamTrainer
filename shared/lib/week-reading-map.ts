export const FS_WEEK_TO_READING_IDS: Record<number, string[]> = {
  1: ['fs-d0-trig', 'fs-d0-cogo', 'fs-d0-units'],
  2: ['fs-d1-leveling', 'fs-d1-topo', 'fs-d2-leveling-comp'],
  3: ['fs-d1-angles', 'fs-d1-construction'],
  4: ['fs-d2-traverse', 'fs-d2-alta', 'fs-d3-cogo-comp'],
  5: ['fs-d2-areas', 'fs-d1-uas'],
  6: ['fs-d2-curves', 'fs-d3-curves-comp'],
  7: ['fs-d3-geodesy', 'fs-d4-advgeo'],
  8: ['fs-d3-gnss', 'fs-d4-historical'],
  9: ['fs-d4-mapping', 'fs-d6-project', 'fs-d3-photogrammetry-comp'],
  10: ['fs-d5-boundary', 'fs-d5-easements'],
  11: ['fs-d5-plss', 'fs-d5-conveyances'],
  12: ['fs-d5-corners', 'fs-d5-commonlaw', 'fs-d5-sources'],
  13: ['fs-d6-ethics', 'fs-d6-liability'],
  14: ['fs-d7-errorprop', 'fs-d7-leastsquares', 'fs-d7-hypothesis'],
  15: ['fs-std-alta', 'fs-std-fema', 'fs-std-fgcs', 'fs-std-nsps'],
};

export const PS_WEEK_TO_READING_IDS: Record<number, string[]> = {
  1: ['ps-d1-evidence', 'ps-d1-deeds'],
  2: ['ps-d1-easements', 'ps-d1-adverse'],
  3: ['ps-d1-water', 'ps-d1-recording'],
  4: ['ps-d2-standard-care', 'ps-d2-documentation'],
  5: ['ps-d2-reports', 'ps-d2-expert', 'ps-d2-survey-reports'],
  6: ['ps-d3-alta', 'ps-d3-fema', 'ps-d3-floodplain'],
  7: ['ps-d3-accuracy', 'ps-d3-mts', 'ps-d3-geodetic-control'],
  8: ['ps-d4-entities', 'ps-d4-contracts', 'ps-d4-risk'],
  9: ['ps-d5-boundary', 'ps-d5-construction', 'ps-d4-row'],
  10: ['ps-d5-subdivision', 'ps-d5-geodetic', 'ps-d4-hydrographic'],
  11: ['ps-d1-boundary-doctrines', 'ps-d2-documentation', 'ps-d5-contracts'],
  12: ['ps-d3-geodetic-control', 'ps-d4-risk', 'ps-d5-geodetic'],
};

export function getWeekInteractiveCount(examTrack: string, weekNumber: number): number {
  const map = examTrack === 'ps' ? PS_WEEK_TO_READING_IDS : FS_WEEK_TO_READING_IDS;
  return (map[weekNumber] || []).length;
}
