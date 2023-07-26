<script lang="ts">
	import * as z from 'zod';
	import { enhance } from '$app/forms';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import Step4 from './Step4.svelte';
	import { fade, fly } from 'svelte/transition';
	import ErrorMessage from './ErrorMessage.svelte';
	import type { ActionData } from '../../routes/$types';
	import { writable } from 'svelte/store';

	export let form: ActionData;

	export let step = 0;
	let root;

	let isim;
	let email;
	let input1;
	let input2;
	let password;

	const multiForm = writable([]);

	let hatalar: string[] | null = [];

	$: props = {
		determinate: true,
		value: 0,
		max: 100,
		step: 10,
		height: 'h-5'
	};

	const transitionOptions = {
		x: 400,
		duration: 700
	};

	let fieldErrors: z.ZodIssue[] = [];

	$: Step1 = {
		isim,
		email
	};

	$: Step2 = {
		input1,
		input2
	};

	$: Step3 = {
		password
	};

	$: steps = [Step1, Step2, Step3, Step4];

	const validationSchemas = [
		z.object({
			isim: z
				.string({
					required_error: 'Lütfen isim giriniz',
					invalid_type_error: 'Name must be a string'
				})
				.min(2, { message: 'en az 2 karakter olmalı' }),
			email: z
				.string({
					required_error: 'E-mail alanı zorunludur'
				})
				.email({ message: 'email alanı zorunludur' })
		}),
		z.object({
			input1: z
				.string({
					required_error: 'zorunlu',
					invalid_type_error: 'invalid zorunlu'
				})
				.min(2, { message: '2 karakterden fazla olmalı' }),
			input2: z
				.string({
					required_error: 'zorunlu',
					invalid_type_error: 'invalid zorunlu'
				})
				.min(3, { message: '3 karakterden fazla olmalı' })
		}),
		z.object({
			password: z
				.string({
					required_error: 'zorunlu'
				})
				.min(6, { message: 'en az 6 karakterli şifre giriniz' })
		})
	];

	const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

	function handlePrev() {
		step--;
		props.value -= 100 / (steps.length - 1);
		if (step == 0) {
			props.value = 0;
		}
		$multiForm.pop();
		console.log($multiForm);
	}

	async function handleNext() {
		try {
			const res = await validationSchemas[step].parseAsync(steps[step]);
			fieldErrors = [];
			await sleep(400);

			$multiForm = [...$multiForm, steps[step]];
			$multiForm = $multiForm;

			console.log($multiForm);
			step += 1;
			props.value += 100 / (steps.length - 1);
		} catch (err) {
			if (err instanceof z.ZodError) {
				fieldErrors = err.issues;

				const xpath = fieldErrors.map((x) => x.path);
				hatalar = xpath;

				hatalar = [].concat(...hatalar);

				await sleep(50);
				const hasErr: HTMLInputElement | null = document.querySelector('.has-err');
				hasErr?.focus();
				return fieldErrors;
			}
		}
	}
</script>

<div class="bg-white px-5 py-10 h-auto md:h-[400px] grid grid-flow-row items-center">
	<ProgressBar
		meter="bg-primary-400"
		label="Progress Bar"
		bind:value={props.value}
		max={props.max}
		class="!h-8 border-primary-50 !bg-primary-50 border-solid border-spacing-1 border-4"
	/>

	<!-- 
	<div>
		multiform : {$multiForm}

		-
		{#each $multiForm as formelement, index}
			<div class="text-red-600">{formelement.isim} ve {formelement.email}</div>
		{/each}
	</div> -->
	<form
		use:enhance
		method="POST"
		action="?/multistep"
		class="transition-container"
		on:submit|preventDefault
	>
		<!-- 0 -->
		<div
			class="opacity-0 transition-opacity duration-700 delay-500 bg-white transition__inner"
			class:!z-10={step == 0}
			class:!opacity-100={step == 0}
		>
			<div class="flex flex-col">
				<label for="isim">isim</label>
				<input
					id="isim"
					type="text"
					name="isim"
					class="w-full flex-grow"
					bind:value={isim}
					class:has-err={hatalar?.includes('isim')}
				/>

				{#each fieldErrors as fError}
					{#if fError.path == 'isim'}
						<ErrorMessage {fError} />
					{/if}
				{/each}

				<label for="email">email</label>
				<input
					id="email"
					type="text"
					name="email"
					bind:value={email}
					class:has-err={hatalar?.includes('email')}
				/>
				{#each fieldErrors as fError}
					{#if fError.path == 'email'}
						<ul class="list-inside list-disc ml-5">
							<li in:fly={{ y: 20, duration: 600 }} out:fade>
								{fError.message}
							</li>
						</ul>
					{/if}
				{/each}
			</div>
		</div>
		<!-- 1 -->
		<div
			class="opacity-0 transition-opacity duration-700 delay-500 bg-white transition__inner"
			class:!z-10={step == 1}
			class:!opacity-100={step == 1}
		>
			<div class="flex flex-col">
				<label for="input1">input1</label>
				<input
					id="input1"
					type="text"
					name="input1"
					bind:value={input1}
					class:has-err={hatalar?.includes('input1')}
				/>
				{#each fieldErrors as fError}
					{#if fError.path == 'input1'}
						<ul class="list-inside list-disc ml-5">
							<li transition:fly={{ y: 20, duration: 600 }}>{fError.message}</li>
						</ul>
					{/if}
				{/each}

				<label for="input2">input2</label>
				<input
					id="input2"
					type="text"
					name="input2"
					bind:value={input2}
					class:has-err={hatalar?.includes('input2')}
				/>
				{#each fieldErrors as fError}
					{#if fError.path == 'input2'}
						<ul class="list-inside list-disc ml-5">
							<li transition:fly={{ y: 20, duration: 600 }}>{fError.message}</li>
						</ul>
					{/if}
				{/each}
			</div>
		</div>
		<!-- 2 -->
		<div
			class="opacity-0 transition-opacity duration-700 delay-500 bg-white transition__inner"
			class:!z-10={step == 2}
			class:!opacity-100={step == 2}
		>
			<div class="flex flex-col">
				<label for="password">şifre</label>
				<input
					type="text"
					name="password"
					bind:value={password}
					class:has-err={hatalar?.includes('password')}
				/>
				{#each fieldErrors as fError}
					{#if fError.path == 'password'}
						<ul class="list-inside list-disc ml-5">
							<li in:fly={{ y: 20, duration: 600 }} out:fly={{ y: 20, duration: 600 }}>
								{fError.message}
							</li>
						</ul>
					{/if}
				{/each}
			</div>
		</div>
		<!-- 3 -->
		<div
			class="opacity-0 transition-opacity duration-700 delay-500 bg-white transition__inner"
			class:!z-10={step == 3}
			class:!opacity-100={step == 3}
		>
			<div class="flex flex-col">
				<p>teşekkürler</p>
			</div>
		</div>

		<!-- {#if step !== 0 && step !== 3}
		<button type="button" on:click={handlePrev}>Geri</button>
	{/if} -->
		<div class="relative w-full">
			{#if step !== 0}
				<button
					type="button"
					class="mt-5 float-left btn variant-filled-primary !rounded-md"
					on:click={handlePrev}>Geri</button
				>
			{/if}
			{#if step !== steps.length - 1}
				<button
					type="button"
					class="mt-5 float-right btn variant-filled-primary !rounded-md"
					on:click={handleNext}>ileri</button
				>
			{:else}
				<button type="submit" class="mt-5 float-right btn variant-filled-primary !rounded-md"
					>Gönder</button
				>
			{/if}
		</div>
	</form>
</div>

<style>
	:global(.progress-bar-meter) {
		@apply transition-all duration-200 ease-out;
	}

	.transition-container {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
	}

	.transition-container .transition__inner {
		grid-row: 1;
		grid-column: 1;
	}
</style>
