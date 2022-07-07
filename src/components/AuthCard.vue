<template>
  <div
    className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-100 border-t-2 border-blue-600"
  >
    <div class="sm:mx-auto w-full sm:max-w-lg sm:px-6 lg:px-8">
      <slot name="header" />

      <div
        class="bg-white overflow-hidden shadow-md ring-1 ring-black ring-opacity-5 sm:rounded"
      >
        <div class="p-8 sm:p-10">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
