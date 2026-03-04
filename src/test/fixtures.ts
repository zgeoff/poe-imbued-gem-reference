import type { GemData } from '@/types';

export const testGemData: GemData = {
  red: {
    Cleave: [
      { name: 'Melee Physical Damage Support', color: 'red' },
      { name: 'Ruthless Support', color: 'red' },
      { name: 'Multistrike Support', color: 'green' },
    ],
    'Shield Charge': [
      { name: 'Faster Attacks Support', color: 'green' },
      { name: 'Fortify Support', color: 'red' },
    ],
    Automation: [],
  },
  green: {
    Cyclone: [
      { name: 'Melee Physical Damage Support', color: 'red' },
      { name: 'Multistrike Support', color: 'green' },
      { name: 'Faster Attacks Support', color: 'green' },
    ],
    Poisonstrike: [
      { name: 'Added Chaos Damage Support', color: 'blue' },
      { name: 'Void Manipulation Support', color: 'green' },
    ],
    'Rain of Arrows': [
      { name: 'Added Lightning Damage Support', color: 'blue' },
      { name: 'Faster Attacks Support', color: 'green' },
    ],
  },
  blue: {
    Arc: [
      { name: 'Added Lightning Damage Support', color: 'blue' },
      { name: 'Spell Echo Support', color: 'blue' },
      { name: 'Faster Casting Support', color: 'blue' },
      { name: 'Inspiration Support', color: 'blue' },
      { name: 'Controlled Destruction Support', color: 'blue' },
      { name: 'Lightning Penetration Support', color: 'blue' },
    ],
    'Ball Lightning': [
      { name: 'Spell Echo Support', color: 'blue' },
      { name: 'Slower Projectiles Support', color: 'green' },
      { name: 'Controlled Destruction Support', color: 'blue' },
    ],
    'Maelstr\u00f6m': [{ name: 'Concentrated Effect Support', color: 'blue' }],
    Frostbolt: [
      { name: 'Faster Casting Support', color: 'blue' },
      { name: 'Greater Multiple Projectiles Support', color: 'green' },
    ],
  },
};
