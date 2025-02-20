export const statTypes = [
	'strength',
	'defense',
	'dexterity',
	'basic',
	'constitution',
	'weapons_tools',
	'intelligence',
	'guns',
	'wisdom',
	'energy_magic',
	'charisma',
	'ultimate'
] as const;

// export const statTypes = [
// 	'strength',
// 	'dexterity',
// 	'defense',
// 	'constitution',
// 	'intelligence',
// 	'wisdom',
// 	'charisma',
// 	'basic',
// 	'weapons_tools',
// 	'guns',
// 	'energy_magic',
// 	'ultimate'
// ] as const;

export type StatType = (typeof statTypes)[number];

export type Stats = { [key in StatType]: number };

export function getStatLabel(stat: StatType | undefined) {
	return stat?.replace('_', ' & ')?.toUpperCase();
}

export function getStatImage(stat: StatType) {
	switch (stat) {
		case 'strength':
		case 'dexterity':
		case 'constitution':
		case 'intelligence':
		case 'wisdom':
		case 'charisma':
			return 'd20.png';
		case 'defense':
			return 'def.png';
		case 'basic':
			return 'd4.png';
		case 'weapons_tools':
			return 'd6.png';
		case 'guns':
			return 'd8.png';
		case 'energy_magic':
			return 'd10.png';
		case 'ultimate':
			return 'd12.png';
	}
}

export const statDescriptionDictionary: { [key in StatType]: string } = {
	strength: `Put points into STR to create a melee fighter, a crusher, a bar-bending, 
	boulder-throwing behemoth who smashes his way through problems.`,
	dexterity: `You’ll be using DEX to make ranged attacks, like guns and bows. DEX is also
a measure of how nimble you are, so you’ll roll with that STAT when you are
trying to move silently, do back flips, or deftly run along crumbling rooftops.`,
	constitution: `CON measures how stout or tough you are. This STAT is used when recovering
HP, bracing for impact, or fighting to survive poison or terrible cold.`,
	intelligence: `Some heroes use wits over fists. Their key STAT is INT, which is used to cast
SPELLS, investigate mysteries, recall details, or operate complex machinery.`,
	wisdom: `This STAT measures an intuitive, organic kind of smarts. It isn’t so much knowing as it is feeling. How keen is your sixth sense? Place points here to be a scout,
to be in tune with nature, or to feel danger coming.`,
	charisma: `Your strength of will is measured by CHARISMA. You’ll be using this to roll for
persuasive actions, to resist fear, or drive enemies back with a battle cry.`,
	defense: ``,
	basic: `If you are only using your bare hands or your wits, roll a D4
after a successful ATTEMPT to do damage with a punch, bend
bars with raw muscle, or take time to decipher a block of coded writing.`,
	weapons_tools: `Any time you are using a standard ranged or melee weapon
to do damage, roll a D6. Also roll a D6 when using tools to
accomplish a task such as using a pry bar to open a jammed
door, using bandages to cure a wound, or using a micro torch
to seal a bulkhead hatch.`,
	guns: `Firearms are deadly. Any time you’re using a gun to attack an
enemy and do damage, roll a D8. Guns also come in many
forms, with special ways to deal devastating damage.`,
	energy_magic: `Roll a D10 for EFFORT when you are casting explosive magic or
using arcane energy. Also roll a D10 for any weapon or effect
that employs energy such as particle beams, lasers or plasma.
Healing with magical power? That would also be a D10.`,
	ultimate: `Ah, the almighty D12. When you roll a critical success on your
ATTEMPT, a natural 20 on the D20 roll, you’ll roll the type of
EFFORT above that fits, and add a D12 on top of that roll! You
have excelled at your ATTEMPT with ULTIMATE results!
`
};
