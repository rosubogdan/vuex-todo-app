<template>
  <div class="wrapper"
       v-if="addNew">
    <TodoForm :todo="form" :add-new="addNew" />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { mapGetters } from "vuex";

  import { CONTENT } from "@/constants";

  import { ADD_TODO_ACTION } from "@/store/modules/todos/actions";

  import { AddTodoFrom } from "@/models/forms/addTodoForm";
  import TodoForm from "@/components/Todos/TodoForm.component.vue";


  @Component({
    components: { TodoForm }
  })
  export default class AddTodoComponent extends Vue {
    @Prop() addNew: boolean;
    @Prop() todo: any;

    private CONTENT = CONTENT;

    private form: AddTodoFrom = <AddTodoFrom>{};

    constructor() {
      super();
    }
  }
</script>