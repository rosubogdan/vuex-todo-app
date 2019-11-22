<template>
  <div class="wrapper">
    <b-row class="text-center mb-3">
      <b-col sm=12>
        <h3>
          <i class="far fa-check-circle"></i> {{CONTENT.TODO.HEADER}}
        </h3>
      </b-col>
    </b-row>

    <b-row class="text-center mb-3"
           align-h="center">
      <!-- SEARCH FILTER -->
      <b-col sm="12"
             md="9"
             lg="9"
             class="mb-3">
        <b-form-group class="mb-0">
          <b-input-group>
            <b-form-input id="filterInput"
                          type="search"
                          v-model.trim="searchTerm"
                          :placeholder="CONTENT.INPUT.SEARCH_PLACEHOLDER"
                          :size="SIZE">
            </b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="6"
             md="2"
             lg="2">
        <b-form-group class="mb-3">
          <b-form-select id="perPageSelect"
                         title="Per page"
                         v-model="perPage"
                         :options="FILTER_VALUES"
                         :size="SIZE">
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="1"
             md="1"
             lg="1">
        <b-button variant="success"
                  alt="Add new todo"
                  title="Add new todo"
                  @click="addNew = !addNew"
                  :size="SIZE">
          <i class="fas fa-plus add"></i>
        </b-button>
      </b-col>
    </b-row>

    <!-- ADD NEW TODO -->
    <AddTodoComponent :add-new="addNew" />

    <!-- TABLE -->
    <b-row class="mb-3">
      <b-col lg="12">
        <b-table bordered
                 dark
                 hover
                 responsive="sm"
                 :sticky-header="true"
                 :no-border-collapse="true"
                 :busy="isBusy"
                 :items="ALL_TODOS"
                 :fields="TABLE_FIELDS"
                 :per-page="perPage"
                 :current-page="currentPage"
                 :filter="searchTerm">

          <template v-slot:table-busy>
            <div class="text-center my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong> {{CONTENT.DEFAULT.LOADING}} </strong>
            </div>
          </template>

          <template slot="status"
                    slot-scope="row">
            {{row.item.status ? CONTENT.DEFAULT.STATUS.COMPLETE: CONTENT.DEFAULT.STATUS.INCOMPLETE}}
          </template>

          <template slot="priority"
                    slot-scope="row">
            {{getPriority(row.item.priority) }}
          </template>

          <template slot="action"
                    slot-scope="row">

            <i title="View"
               class="view-todo"
               :class="[row.detailsShowing ? 'fas fa-eye-slash': 'far fa-eye']"
               @click="row.toggleDetails"></i>

            <i title="Edit"
               class="far fa-edit edit-todo"></i>

            <i title="Delete"
               class="fas fa-trash-alt delete-todo"
               @click="showConfirmationModal(row.item.id)"></i>

          </template>

          <template v-slot:row-details="row">
            <!-- <b-card bg-variant="light"
                    text-variant="white"
                    no-body> -->
              <b-tabs active-nav-item-class="text-success"
                      fill>
                <b-tab title="Details"
                       active>
                  <h1>{{row.item.title}}</h1>
                  <p>{{row.item.description}}</p>
                  <p>Priority: {{getPriority(row.item.priority)}}</p>
                  <p>Status: {{row.item.status ? CONTENT.DEFAULT.STATUS.COMPLETE: CONTENT.DEFAULT.STATUS.INCOMPLETE}}</p>
                </b-tab>
                <b-tab title="Edit">
                  <p>Edit tab</p>
                  <TodoForm :todo="row.item"
                            :add-new="false" />

                  <!-- Load TodoForm -->
                </b-tab>
                <b-tab title="Delete">
                  <p>I'm the tab with the very, very long title</p>
                </b-tab>
              </b-tabs>
            <!-- </b-card> -->
          </template>

        </b-table>
      </b-col>

      <!-- PAGINATION -->
      <b-col sm="12"
             md="12"
             class="my-1">
        <b-pagination id="todosPagination"
                      v-model="currentPage"
                      :total-rows="ALL_TODOS.length"
                      :per-page="perPage"
                      align="fill"
                      size="md"
                      class="my-0"></b-pagination>
      </b-col>

      <!-- Info modal -->
      <b-modal id="deleteConfirmation"
               :title="CONTENT.MODAL_TITLE"
               @hidden="resetModal"
               @ok="handleOk">
        <p class="my-4">{{CONTENT.DELETE_CONFIRMATION}}</p>
      </b-modal>

    </b-row>

  </div>
</template>

<script lang="ts">
  import { mapGetters } from "vuex";
  import { Component, Vue } from "vue-property-decorator";

  import AddTodoComponent from "@/components/Todos/AddTodo.component.vue";
  import TodoForm from "@/components/Todos/TodoForm.component.vue";

  import { AddTodoFrom } from "@/models/forms/addTodoForm";

  import { CONTENT, SIZE, TABLE_FIELDS } from "@/constants";
  import {
    ALL_TODOS,
    SELECTED_FILTER,
    FILTER_VALUES
  } from "@/store/modules/todos/getters";

  import {
    FILTER_TODOS_ACTION,
    FETCH_TODOS_ACTION,
    UPDATE_TODO_ACTION,
    DELETE_TODO_ACTION
  } from "@/store/modules/todos/actions";

  import Todo from "@/models/todo/todo";

  import { getPriority } from "@/services";

  // import { db } from "@/main";

  @Component({
    components: { AddTodoComponent, TodoForm },
    computed: mapGetters({ ALL_TODOS, SELECTED_FILTER, FILTER_VALUES })
  })
  export default class TodosComponent extends Vue {
    private SIZE = SIZE.DEFAULT;
    private CONTENT = CONTENT;
    private TABLE_FIELDS = TABLE_FIELDS;
    private perPage: number = this.$store.getters[SELECTED_FILTER];
    private searchTerm = null;
    private deleteItemId: any = null;
    private totalRows: number = 1;
    private currentPage: number = 1;

    private isBusy: boolean = true;
    private addNew: boolean = false;

    private getPriority = getPriority;

    constructor() {
      super();
    }

    public async created() {
      if (this.$store.getters[ALL_TODOS].length === 0) {
        await this.$store.dispatch(FETCH_TODOS_ACTION);
        this.isBusy = false;
      } else {
        this.isBusy = false;
      }
    }

    public toggleTodo(todo: Todo): void {
      todo.completed = !todo.completed;
      this.$store.dispatch(UPDATE_TODO_ACTION, todo);
    }

    private handleOk() {
      this.$store.dispatch(DELETE_TODO_ACTION, this.deleteItemId);
      this.deleteItemId = null;
    }

    private resetModal() {
      this.deleteItemId = null;
    }

    private showConfirmationModal(id: number) {
      this.deleteItemId = id;
      this.$bvModal.show("deleteConfirmation");
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_todos.scss";
</style>