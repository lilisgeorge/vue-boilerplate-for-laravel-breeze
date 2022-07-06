<template>
  <div
    className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100"
  >
    <div class="sm:mx-auto w-full sm:max-w-md sm:px-6 lg:px-8">
      <slot name="header" />

      <div
        class="mt-6 bg-white overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
      >
        <div class="px-8 py-8 sm:px-10">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
