<script lang="ts">
	import type { StatType } from '$lib/stat';
	import { getStatImage, getStatLabel } from '$lib/stat';

	export let stat: StatType;
	export let baseValue: number;
	export let lootValue: number;
	export let value: number;
</script>

<div class="flex-col">
	<div class="stat">{getStatLabel(stat)}</div>
	<div class="flex-row gap-1 align-items-center">
		<div class="value" style="background-image: url({getStatImage(stat)});">
			{value}
		</div>
		<div class="flex-col">
			<div class="align-items-baseline small input">
				{#if stat !== 'defence'}
					BASE <input
						type="number"
						style="color: {baseValue ? 'currentColor' : '#222'}"
						min="0"
						max="9"
						bind:value={baseValue}
					/>
				{:else}
					CON + LOOT = DEF
				{/if}
			</div>
			<div class="align-items-baseline small input">
				LOOT
				<input
					type="number"
					style="color: {lootValue ? 'currentColor' : '#222'}"
					min="0"
					max="9"
					value={lootValue}
					disabled
				/>
			</div>
		</div>
	</div>
	{#if stat === 'defence'}
		<div class="small">10 + DEF = ENEMY TO HIT ROLL</div>
	{/if}
</div>

<style>
	.stat {
		font-weight: bold;
	}
	.small {
		color: gray;
		font-size: 10px;
		font-weight: bold;
	}
	.input {
		border-bottom: 1px solid;
	}

	input {
		background: transparent;
		border: none;
		text-align: center;
		width: 32px;
		padding: 2px;
	}

	.value {
		font-size: 20px;
		font-weight: bold;
		color: #222222;
		position: relative;
		width: 48px;
		height: 48px;
		align-content: center;
		text-align: center;
		background-size: cover;
		filter: invert(0.89);
	}
</style>
