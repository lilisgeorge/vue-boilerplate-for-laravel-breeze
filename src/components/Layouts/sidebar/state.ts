import { computed, ref } from "vue";

export const collapsed = ref(false);
export const toggleSidebar = () => (collapsed.value = !collapsed.value);
export const sidebarWidthClass = computed(() =>
  collapsed.value ? "w-16" : "w-64"
);
export const contentMarginClass = computed(() =>
  collapsed.value ? "ml-16" : "ml-64"
);
