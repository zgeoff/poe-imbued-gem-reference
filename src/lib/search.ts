import type Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';
import type { SearchableSkill, SkillGem } from '@/types';

export async function buildSearchIndex(
  skills: SkillGem[],
  searchSupports: boolean,
): Promise<Fuse<SearchableSkill>> {
  const { default: Fuse } = await import('fuse.js');

  const searchableSkills: SearchableSkill[] = skills.map((s) => ({
    name: s.name,
    color: s.color,
    supports: [...s.supports.red, ...s.supports.green, ...s.supports.blue].join(' '),
  }));

  const keys: IFuseOptions<SearchableSkill>['keys'] = [{ name: 'name', weight: 2 }];
  if (searchSupports) {
    keys.push({ name: 'supports', weight: 1 });
  }

  return new Fuse(searchableSkills, {
    keys,
    threshold: 0.3,
    distance: 100,
    minMatchCharLength: 1,
    includeScore: true,
    shouldSort: true,
  });
}
