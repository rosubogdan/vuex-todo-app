<template>
  <div class="TODOS">
    <TodosComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodosComponent from '@/components/Todos/Todos.component.vue';

@Component({
  components: {
    TodosComponent,
  },
})
export default class Todos extends Vue {
  constructor() {
    super();
  }
}
</script>

