import type { GemColor, GemData, SkillGem } from '@/types';

export function flattenGemData(data: GemData): SkillGem[] {
  const skills: SkillGem[] = [];
  for (const color of ['red', 'green', 'blue'] as GemColor[]) {
    const colorData = data[color];
    if (colorData) {
      for (const [name, supportGems] of Object.entries(colorData)) {
        const supports: Record<GemColor, string[]> = { red: [], green: [], blue: [] };
        for (const sg of supportGems) {
          supports[sg.color].push(sg.name);
        }
        for (const c of ['red', 'green', 'blue'] as GemColor[]) {
          supports[c].sort((a, b) => a.localeCompare(b));
        }
        skills.push({ name, color, supports });
      }
    }
  }
  skills.sort((a, b) => a.name.localeCompare(b.name));
  return skills;
}

export async function loadGemData(): Promise<SkillGem[]> {
  const cacheBuster = typeof __BUILD_TIME__ !== 'undefined' ? `?v=${__BUILD_TIME__}` : '';
  const res = await fetch(`${import.meta.env.BASE_URL}data.json${cacheBuster}`);
  const data: GemData = await res.json();
  return flattenGemData(data);
}
