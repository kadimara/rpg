<script lang="ts">
	import { info } from '$lib/data';
	import Dialog from './Dialog.svelte';

	let dialogElement: HTMLDialogElement;

	const handleChangeHp = () => {
		if ($info.hp == 0) {
			dialogElement.showModal();
		}
	};

	const handleChangeHearts = (hearts: number) => {
		const multiplier = hearts / $info.hearts;
		$info.hp = Math.floor($info.hp * multiplier);
		$info.hearts = hearts;
	};
</script>

<div class="flex-row gap-1">
	<div class="heart-value" style="background-image: url(./heart2.png);">{$info.hp}</div>
	<div class="flex-col flexible">
		<div style="align-self: flex-end;">
			<img src="./heart.png" alt="heart" width="10" />
			<small>= 10 hp</small>
		</div>
		<div class="flex-row align-items-center gap-1">
			<input
				class="flexible"
				type="range"
				min="0"
				max={$info.hearts * 10}
				step="1"
				bind:value={$info.hp}
				on:change={handleChangeHp}
			/>
			{#each { length: 3 } as _, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<img
					class="heart"
					class:active={$info.hearts > i}
					src="./heart.png"
					alt="heart"
					on:click={() => {
						handleChangeHearts(i + 1);
					}}
				/>
			{/each}
		</div>
	</div>
</div>
<Dialog bind:dialog={dialogElement}>
	<strong>ROLL FOR DYING!</strong>
	On your NEXT TURN roll a 1D4. Pray you roll high, because in that many ROUNDS, without help or a MIRACLE,
	your character will die.
</Dialog>

<style>
	.heart {
		width: 24px;
		height: 24px;
		padding: 2px;
		border: 2px solid transparent;
		border-radius: 55% 35% 60% 35%;
	}
	.heart.active {
		border-color: #c23530;
	}

	.heart-value {
		font-size: 20px;
		font-weight: bold;
		align-content: center;
		text-align: center;

		position: relative;
		width: 48px;
		height: 56px;

		background-size: contain;
		background-position-y: 8px;
		background-repeat: no-repeat;
	}

	input[type='range'] {
		appearance: none;
		-webkit-appearance: none;
		outline: none;
		padding: 0;
		cursor: pointer;
		overflow: hidden;

		height: 16px;
		background: #c9c9c9;
		border-radius: 8px;
	}

	/* Thumb: webkit */
	input[type='range']::-webkit-slider-thumb {
		/* removing default appearance */
		-webkit-appearance: none;
		appearance: none;
		/* creating a custom design */
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background-color: #c9c9c9;
		border: 2px solid #c23530;
	}

	/* Thumb: Firefox */
	input[type='range']::-moz-range-thumb {
		height: 15px;
		width: 15px;
		background-color: #c9c9c9;
		border: 1px solid #c23530;
	}

	/* Thumb: webkit */
	input[type='range']::-webkit-slider-thumb {
		/*  ...  */
		/*  slider progress trick  */
		box-shadow: -407px 0 0 400px #c23530;
	}

	/* Thumb: Firefox */
	input[type='range']::-moz-range-thumb {
		/*  ...  */
		/*  slider progress trick  */
		box-shadow: -407px 0 0 400px #c23530;
	}
</style>
