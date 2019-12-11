<template>
  <div class="wrapper">

    <Loader :is-loading="IS_LOADING" />

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
                          :size="SIZE.DEFAULT">
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
                         :options="PER_PAGE_OPTIONS"
                         :size="SIZE.DEFAULT"
                         @change="changePerPage">
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="1"
             md="1"
             lg="1">
        <b-button :variant="addNew ? 'danger': 'success'"
                  :title="addNew ? CONTENT.DEFAULT.TITLE.CLOSE : CONTENT.DEFAULT.TITLE.ADD"
                  @click="addNew = !addNew"
                  :size="SIZE.DEFAULT">
          <i :class="[addNew ? 'fas fa-times no-bg': 'fas fa-plus no-bg'] "></i>
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
                 :responsive="SIZE.SM"
                 :sticky-header="true"
                 :no-border-collapse="true"
                 :busy="IS_LOADING"
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
            <i :title="row.detailsShowing ? CONTENT.DEFAULT.TITLE.CLOSE : CONTENT.DEFAULT.TITLE.SHOW"
               class="view-todo"
               :class="[row.detailsShowing ? 'fas fa-eye-slash close-details': 'far fa-eye view-details']"
               @click="row.toggleDetails"></i>

          </template>

          <template v-slot:row-details="row">
            <b-tabs active-nav-item-class="tab-active"
                    align="center">
              <b-tab :title="CONTENT.DEFAULT.TABS.DETAILS"
                     class="mt-3"
                     active>
                <div class="todo-details mt-3">
                  <h1>{{row.item.title}}</h1>
                  <p>{{row.item.description}}</p>
                  <p>Priority: {{getPriority(row.item.priority)}}</p>
                  <p>Status: {{row.item.status ? CONTENT.DEFAULT.STATUS.COMPLETE: CONTENT.DEFAULT.STATUS.INCOMPLETE}}</p>
                </div>
              </b-tab>
              <b-tab :title="CONTENT.DEFAULT.TABS.EDIT"
                     class="mt-3">
                <div class="todo-details mt-3">
                  <TodoForm :todo="row.item"
                            :add-new="false" />
                </div>

                <!-- Load TodoForm -->
              </b-tab>
              <b-tab :title="CONTENT.DEFAULT.TABS.DELETE"
                     class="mt-3">
                <div class="todo-details mt-3">
                  <div class="mb-3">
                    <h3>{{CONTENT.TODO.DELETE_CONFIRMATION}}</h3>
                  </div>

                  <div class="confirm mb-3 mt-3">
                    <b-button variant="success"
                              :size="SIZE.DEFAULT"
                              class="mr-3">
                      <i class="fa fa-thumbs-up"
                         aria-hidden="true"></i> {{CONTENT.BUTTON.YES}}
                    </b-button>

                    <b-button variant="danger"
                              :size="SIZE.DEFAULT">
                      <i class="fa fa-times"
                         aria-hidden="true"></i> {{CONTENT.BUTTON.NO}}
                    </b-button>

                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </template>

        </b-table>
      </b-col>

      <!-- PAGINATION -->
      <b-col sm="12"
             md="12"
             class="my-1">
        <b-pagination id="todosPagination"
                      align="fill"
                      class="my-0"
                      v-model="currentPage"
                      :total-rows="ALL_TODOS.length"
                      :per-page="perPage"
                      :size="SIZE.DEFAULT">
        </b-pagination>
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
  import { Component, Vue } from 'vue-property-decorator';
  import { mapGetters } from 'vuex';
  import Loader from '@/common/Loader.component.vue';


  import AddTodoComponent from '@/components/Todos/AddTodo.component.vue';
  import TodoForm from '@/components/Todos/TodoForm.component.vue';

  // import { AddTodoFrom } from '@/models/forms/addTodoForm';

  import { CONTENT, SIZE, TABLE_FIELDS } from '@/constants';

  import {
    ALL_TODOS,
    PER_PAGE,
    PER_PAGE_OPTIONS,
    IS_LOADING,
  } from '@/store/modules/todos/getters';

  import {
    CHANGE_PER_PAGE_ACTION,
    FETCH_TODOS_ACTION,
    UPDATE_TODO_ACTION,
    DELETE_TODO_ACTION,
  } from '@/store/modules/todos/actions';

  import Todo from '@/models/todo/todo';

  import { getPriority } from '@/services';

  // import { db } from '@/main';

  @Component({
    components: { AddTodoComponent, TodoForm, Loader },
    computed: mapGetters({ IS_LOADING, ALL_TODOS, PER_PAGE, PER_PAGE_OPTIONS }),
  })
  export default class TodosComponent extends Vue {
    private SIZE = SIZE;
    private CONTENT = CONTENT;
    private TABLE_FIELDS = TABLE_FIELDS;
    private perPage: number = this.$store.getters[PER_PAGE];
    private searchTerm = null;
    private deleteItemId: any = null;
    private totalRows: number = 1;
    private currentPage: number = 1;

    private addNew: boolean = false;

    private getPriority = getPriority;

    constructor() {
      super();
    }

    public async created() {
      if (this.$store.getters[ALL_TODOS].length === 0) {
        await this.$store.dispatch(FETCH_TODOS_ACTION);
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

    private changePerPage() {
      this.$store.dispatch(CHANGE_PER_PAGE_ACTION, this.perPage);
    }
    private resetModal() {
      this.deleteItemId = null;
    }
  }

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_todos.scss';
</style>