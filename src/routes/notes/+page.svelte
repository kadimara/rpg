<script lang="ts">
	import { notes } from '$lib/data';

	let footer: HTMLDivElement;
	let value = '';

	const handleAddNote = () => {
		notes.update((notes) => {
			return [...notes, value];
		});
		value = '';
	};

	const handleRemoveNote = (index: number) => {
		notes.update((notes) => {
			return notes.toSpliced(index, 1);
		});
	};
</script>

{#each $notes as note, i}
	{@const rows = note.split('\n').length}
	<div class="note flex">
		<textarea {rows} bind:value={note} />
		<button on:click={() => handleRemoveNote(i)}>REMOVE</button>
	</div>
{/each}

<div style="height: {footer?.clientHeight}px" />
<div class="footer flex" bind:this={footer}>
	<textarea bind:value rows="5" />
	<button on:click={handleAddNote}>ADD</button>
</div>

<style>
	.footer {
		position: fixed;
		bottom: 48px;
		left: 0;
		right: 0;
		padding: 8px;
	}

	.footer textarea {
		resize: none;
	}

	.footer button {
		position: absolute;
		right: 4px;
		bottom: 4px;
	}

	.note {
		position: relative;
	}
	.note textarea {
		background: #222222;
		resize: none;
	}
	.note button {
		visibility: hidden;
		position: absolute;
		right: -4px;
		bottom: -4px;
	}

	.note textarea:focus + button {
		visibility: visible;
	}
</style>
