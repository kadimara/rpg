<script lang="ts">
	export let dialog: HTMLDialogElement;

	const handleClick = (e: MouseEvent & { currentTarget: EventTarget & HTMLDialogElement }) => {
		dialog.close();
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close on:click={handleClick}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="inner flex-col gap-1" on:click|stopPropagation>
		<slot />
	</div>
</dialog>

<style>
	dialog {
		color: #c9c9c9;
		background-color: #222222;
		font-size: 1.8rem;
		line-height: 1.618;
		padding: 0;
		outline: none;
	}

	.inner {
		padding: 16px;
	}

	.inner :global(> :first-child) {
		margin-top: 0;
	}
	.inner :global(> :last-child) {
		margin-bottom: 0;
	}

	dialog::backdrop {
		background-color: #22222280;
	}
</style>
