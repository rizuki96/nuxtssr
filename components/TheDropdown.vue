<template>
	<div>
		<div class="flex items-end justify-end mt-6">
			<div class="relative inline-block text-left">
				<div>
					<span class="rounded-md shadow-sm">
						<button
							type="button"
							class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
							id="options-menu"
							aria-haspopup="true"
							aria-expanded="true"
						>
							Categories
							<svg
								class="w-5 h-5 ml-2 -mr-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</span>
				</div>

				<!--
    Dropdown panel, show/hide based on dropdown state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
    -->
				<div
					class="absolute right-0 z-10 hidden w-56 mt-2 origin-top-right rounded-md shadow-lg"
				>
					<div class="bg-white rounded-md shadow-xs">
						<div
							class="py-1"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="options-menu"
						>
							<a
								href="#"
								class="block px-4 py-2 text-xs leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
								role="menuitem"
								@click="test(index)"
								v-for="(item, index) in data"
								:key="index"
								>{{ item.name }}</a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
		},
	},
	methods: {
		test(data) {
			alert(data)
		}
	}
};
</script>

<style lang="scss" scoped>
</style>