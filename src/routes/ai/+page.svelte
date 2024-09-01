<script lang="ts">
	// import { OPENAI_API_KEY } from '$env/static/private';
	import OpenAI from 'openai';
	import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

	const openai = new OpenAI({
		apiKey: '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', // This is the default and can be omitted
		dangerouslyAllowBrowser: true
	});

	const backstory: ChatCompletionMessageParam = {
		role: 'user',
		content:
			'Your are Greta a npc in medieval times, a charismatic bartender at the Oakcroft inn, honed her skills and wisdom through her merchant family upbringing. Known for her warmth, wit, and unique concoctions, she creates a welcoming haven for travelers and locals alike, where stories are shared and friendships bloom under her care and guidance. Always stay in character and respond in a medieval way.'
	};

	let messages: ChatCompletionMessageParam[] = [];
	let input = '';

	const submit = async () => {
		messages = [...messages, { role: 'user', content: input }];
		input = '';
		const chatCompletion = await openai.chat.completions.create({
			messages: [backstory, ...messages],
			model: 'gpt-3.5-turbo-0125'
		});
		messages = [
			...messages,
			{ role: 'system', content: chatCompletion.choices[0].message.content?.toString() || '' }
		];
		console.log(messages, chatCompletion);
	};
</script>

<div class="flex-col">
	{#each messages as message, i}
		<span>
			{message.role}: {message.content}
		</span>
	{/each}
	<div class="flexible" />
	<div class="flex-row gap-1 sticky-b">
		<input class="flexible" bind:value={input} on:keydown={(e) => e.key === 'Enter' && submit()} />
		<button on:click={submit}>submit</button>
	</div>
</div>

<style>
</style>
