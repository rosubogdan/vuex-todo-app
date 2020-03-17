<template>
  <div class="wrapper">

    <Loader :is-loading="IS_LOADING" />
    <Alert v-if="HAS_ERROR"
           :variant="ALERT.DANGER"
           :position="ALERT.TOP">
      <span class="text-center"> {{ERROR_MESSAGE}} </span>
    </Alert>

    <b-row class="text-center mb-3">
      <b-col sm=12>
        <h3>
          <i class="far fa-check-circle"></i> {{TODO.HEADER}}
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
                          :placeholder="INPUT.SEARCH_PLACEHOLDER"
                          :size="SIZE.DEFAULT">
            </b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <!-- Per Page select -->
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

      <!-- Add new button -->
      <b-col sm="1">
        <b-button variant="success"
                  :title="DEFAULT.TITLE.ADD"
                  :size="SIZE.DEFAULT"
                  @click="openAddEditModal()">
          <i class="fas fa-plus"></i>
        </b-button>
      </b-col>
    </b-row>

    <!-- TABLE -->
    <b-row class="mb-3">
      <b-col lg="12">
        <b-table bordered
                 dark
                 hover
                 fixed
                 show-empty
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
              <strong> {{DEFAULT.LOADING}} </strong>
            </div>
          </template>

          <!-- <template slot="empty">
            <div class="text-center my-2">
              <strong> No results found! </strong>
            </div>
          </template> -->

          <template slot="status"
                    slot-scope="row">
            {{row.item.status ? DEFAULT.STATUS.COMPLETE: DEFAULT.STATUS.INCOMPLETE}}
          </template>

          <template slot="priority"
                    slot-scope="row">
            {{getPriority(row.item.priority) }}
          </template>

          <template slot="action"
                    slot-scope="row">
            <div class="action-buttons">
              <i :title="row.detailsShowing ? DEFAULT.TITLE.CLOSE : DEFAULT.TITLE.SHOW"
                 :class="[row.detailsShowing ? 'fas fa-eye-slash': 'far fa-eye']"
                 class="success"
                 @click="row.toggleDetails">
              </i>

              <i title="Edit details"
                 class="far fa-edit warning"
                 @click="openAddEditModal(row.item); addNew = false;">
              </i>

              <i title="Delete todo"
                 class="fa fa-trash danger"
                 @click="openDeleteModal(row.item.id)">
              </i>
            </div>
          </template>

          <template v-slot:row-details="row">
            <b-tabs active-nav-item-class="tab-active"
                    align="center">
              <b-tab :title="DEFAULT.TABS.DETAILS"
                     class="mt-3"
                     active>
                <div class="todo-details mt-3">
                  <h1>{{row.item.title}}</h1>
                  <p>{{row.item.description}}</p>
                  <p>Priority: {{getPriority(row.item.priority)}}</p>
                  <p>Status: <span :class="[row.item.status ? 'success': 'danger']">{{row.item.status ? DEFAULT.STATUS.COMPLETE: DEFAULT.STATUS.INCOMPLETE}}</span>
                  </p>
                </div>
              </b-tab>
            </b-tabs>
          </template>

        </b-table>
      </b-col>

      <!-- Add/Edit Modal -->
      <b-modal id="add-edit-modal"
               title="Your todo"
               header-bg-variant="dark"
               header-text-variant="light"
               body-bg-variant="dark"
               body-text-variant="light"
               :hide-footer="true"
               @hidden="cancelAddEditModal"
               centered>

        <TodoForm ref="todoForm"
                  :todo="todo">
          <!-- Form buttons -->
          <template v-slot:form-buttons
                    class="todo-details mt-3">
            <div class="confirm mb-3 mt-3">

              <b-button variant="success"
                        :size="SIZE.SM"
                        class="mr-3"
                        @click="handleOk">
                <i class="fa fa-thumbs-up"
                   aria-hidden="true">
                </i> {{BUTTON.SAVE}}
              </b-button>

              <b-button variant="danger"
                        :size="SIZE.SM"
                        @click="cancelAddEditModal">
                <i class="fa fa-times"
                   aria-hidden="true">
                </i> {{BUTTON.CANCEL}}
              </b-button>

            </div>
          </template>
        </TodoForm>

      </b-modal>

      <!-- Delete modal -->
      <b-modal id="delete-modal"
               title="Delete todo"
               header-bg-variant="dark"
               header-text-variant="light"
               body-bg-variant="dark"
               body-text-variant="light"
               :hide-footer="true"
               centered>

        <div class="text-center mt-3">
          <div class="mb-3">
            <p>{{TODO.DELETE_CONFIRMATION}}</p>
          </div>

          <div class="confirm mb-3 mt-3">
            <b-button variant="success"
                      class="mr-3"
                      :size="SIZE.DEFAULT"
                      @click="confirmDelete">
              <i class="fa fa-thumbs-up"
                 aria-hidden="true"></i> {{BUTTON.YES}}
            </b-button>

            <b-button variant="danger"
                      :size="SIZE.DEFAULT"
                      @click="cancelDeleteModal">
              <i class="fa fa-times"
                 aria-hidden="true"></i> {{BUTTON.NO}}
            </b-button>

          </div>
        </div>
      </b-modal>

      <!-- PAGINATION -->
      <b-col sm="12"
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

    </b-row>

  </div>
</template>

<script lang="ts">
  // * vue
  import { Component, Vue } from 'vue-property-decorator';
  import { mapGetters } from 'vuex';

  // * services
  import { getPriority } from '@/services';

  // * components
  import Loader from '@/common/Loader.component.vue';
  import Alert from '@/common/Alert.component.vue';
  import TodoForm from '@/components/Todos/TodoForm.component.vue';

  // * models
  import Todo from '@/models/todo/todo';

  // * actions
  import {
    FETCH_TODOS_ACTION,
    CHANGE_PER_PAGE_ACTION,
    ADD_TODO_ACTION,
    UPDATE_TODO_ACTION,
    DELETE_TODO_ACTION,
  } from '@/store/modules/todos/actions';

  // * getters
  import {
    ALL_TODOS,
    PER_PAGE,
    PER_PAGE_OPTIONS,
    IS_LOADING,
    HAS_ERROR,
    ERROR_MESSAGE,
  } from '@/store/modules/todos/getters';

  // * constants
  import {
    TODO,
    ALERT,
    SIZE,
    INPUT,
    BUTTON,
    DEFAULT,
    TABLE_FIELDS,
  } from '@/constants';

  // * component setup
  @Component({
    components: { TodoForm, Loader, Alert },
    computed: mapGetters({
      IS_LOADING,
      ALL_TODOS,
      PER_PAGE,
      PER_PAGE_OPTIONS,
      HAS_ERROR,
      ERROR_MESSAGE,
    }),
  })
  export default class TodosComponent extends Vue {
    // * private readonly
    private readonly TODO: {} = TODO;
    private readonly ALERT: {} = ALERT;
    private readonly SIZE: {} = SIZE;
    private readonly INPUT: {} = INPUT;
    private readonly BUTTON: {} = BUTTON;
    private readonly DEFAULT: {} = DEFAULT;
    private readonly TABLE_FIELDS: {} = TABLE_FIELDS;

    // * private
    private perPage: number = this.$store.getters[PER_PAGE];
    private searchTerm = null;
    private deleteItemId: any = null;
    private totalRows: number = 1;
    private currentPage: number = 1;
    private addNew: boolean = true;
    private showSuccessBanner: boolean = false;
    private getPriority = getPriority;
    private todo: Partial<Todo> = {};

    constructor() {
      super();
    }

    public async created(): Promise<void> {
      if (this.$store.getters[ALL_TODOS].length === 0) {
        await this.$store.dispatch(FETCH_TODOS_ACTION);
      }
    }

    private changePerPage(): void {
      this.$store.dispatch(CHANGE_PER_PAGE_ACTION, this.perPage);
    }

    // * Add/Edit Todo
    private openAddEditModal(todo: any): void {
      if (todo) { delete todo.isTrusted; }
      this.todo = { ...todo };
      this.$bvModal.show('add-edit-modal');
    }

    private cancelAddEditModal(): void {
      this.todo = {};
      this.$bvModal.hide('add-edit-modal');
    }

    private handleOk(bvModalEvt: any): void {
      bvModalEvt.preventDefault();
      const todoFormRef: any = this.$refs.todoForm;
      todoFormRef.$v.$touch();
      if (!todoFormRef.$v.$invalid) {
        this.handleSubmit();
      }
    }

    private async handleSubmit(): Promise<void> {
      if (this.addNew) {
        await this.$store.dispatch(ADD_TODO_ACTION, this.todo);
      } else {
        await this.$store.dispatch(UPDATE_TODO_ACTION, this.todo);
      }
      this.cancelAddEditModal();
    }

    // * Delete Todo
    private openDeleteModal(id: any): void {
      this.deleteItemId = id;
      this.$bvModal.show('delete-modal');

    }

    private cancelDeleteModal(): void {
      this.deleteItemId = null;
      this.$bvModal.hide('delete-modal');
    }

    private async confirmDelete(): Promise<void> {
      await this.$store.dispatch(DELETE_TODO_ACTION, this.deleteItemId);
      this.cancelDeleteModal();
    }

  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_todos.scss';
</style>