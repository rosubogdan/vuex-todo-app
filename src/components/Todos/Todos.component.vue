<template>
  <div class="wrapper">
    <b-row class="text-center mb-3">
      <b-col sm=12>
        <h3>
          <i class="far fa-check-circle"></i> {{CONTENT.HEADER}}
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
            <b-form-input v-model="searchTerm"
                          type="search"
                          id="filterInput"
                          size="lg"
                          placeholder="Type to filter items"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="6"
             md="2"
             lg="2">
        <b-form-group class="mb-3">
          <b-form-select v-model="perPage"
                         id="perPageSelect"
                         size="lg"
                         title="Per page"
                         :options="FILTER_VALUES"></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="1"
             md="1"
             lg="1">
        <b-button variant="success"
                  size="lg"
                  alt="Add new todo"
                  title="Add new todo"
                  @click="addNew = !addNew">
          <i class="fas fa-plus add"></i>
        </b-button>
      </b-col>
    </b-row>

    <!-- ADD NEW TODO -->
    <!-- <AddTodoComponent :add-new="addNew" /> -->

    <!-- TABLE -->
    <b-row class="mb-3">
      <b-col lg="12">
        <b-table bordered
                 dark
                 hover
                 :busy="isBusy"
                 :items="ALL_TODOS"
                 :fields="TABLE_FIELDS"
                 :per-page="perPage"
                 :current-page="currentPage"
                 :filter="searchTerm">

          <template v-slot:table-busy>
            <div class="text-center my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong> Loading... </strong>
            </div>
          </template>

          <template slot="action"
                    slot-scope="row">

            <i class="view-todo"
               :class="[row.detailsShowing ? 'fas fa-eye-slash': 'far fa-eye']"
               @click="row.toggleDetails"
               title="View"></i>

            <i class="far fa-edit edit-todo"
               title="Edit"></i>

            <i class="fas fa-trash-alt delete-todo"
               @click="showConfirmationModal(row.item.id)"
               title="Delete"></i>

            <!-- <b-form-checkbox class="toggle-state"
                             v-bind:id="'status-' + row.item.id"
                             v-model="row.item.completed"
                             @change="toggleTodo(row.item)">
            </b-form-checkbox> -->

          </template>

          <template v-slot:row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item"
                    :key="key">{{ key }}: {{ value }}</li>
              </ul>
            </b-card>
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

  // import AddTodoComponent from "@/components/Todos/AddTodo.component.vue";

  import { CONTENT, TABLE_FIELDS, STORE_TODOS_MODULE } from "@/constants";
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

  import { db } from "@/main";

  @Component({
    components: {},
    computed: mapGetters({ ALL_TODOS, SELECTED_FILTER, FILTER_VALUES })
  })
  export default class TodosComponent extends Vue {
    private CONTENT = CONTENT.TODOS;
    private TABLE_FIELDS = TABLE_FIELDS;
    private perPage: number = this.$store.getters[SELECTED_FILTER];
    private searchTerm = null;
    private deleteItemId: any = null;
    private totalRows: number = 1;
    private currentPage: number = 1;

    private isBusy: boolean = true;
    private addNew: boolean = false;

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

    private filterTodos() {
      this.$store.dispatch(FILTER_TODOS_ACTION, this.perPage);
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