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
                         :options="FILTER_VALUES"
                         :size="SIZE.DEFAULT">
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
    <TodoForm v-if="addNew"
              :add-new="addNew"
              :handle-cancel="handleCancel"
              :handle-save="handleSave" />
    <!-- TABLE -->
    <b-row class="mb-3">
      <b-col lg="12">
        <b-table bordered
                 dark
                 hover
                 ref="todoTable"
                 :responsive="SIZE.SM"
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
            <i :title="row.detailsShowing ? CONTENT.DEFAULT.TITLE.CLOSE : CONTENT.DEFAULT.TITLE.SHOW"
               class="view-todo"
               :class="[row.detailsShowing ? 'fas fa-eye-slash close-details': 'far fa-eye view-details']"
               @click="row.toggleDetails">
            </i>
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
                  <!-- Load TodoForm -->
                  <TodoForm :todo="row.item"
                            :add-new="false"
                            :handle-save="handleUpdate"
                            :handle-cancel="handleCancelEdit" />
                </div>

              </b-tab>
              <b-tab :title="CONTENT.DEFAULT.TABS.DELETE"
                     class="mt-3">
                <div class="todo-details mt-3">
                  <div class="mb-3">
                    <h3>{{CONTENT.TODO.DELETE_CONFIRMATION}}</h3>
                  </div>

                  <div class="confirm mb-3 mt-3">
                    <b-button variant="success"
                              :size="SIZE.SM"
                              class="mr-3">
                      <i class="fa fa-thumbs-up"
                         aria-hidden="true"></i> {{CONTENT.BUTTON.YES}}
                    </b-button>

                    <b-button variant="danger"
                              :size="SIZE.SM"
                              @click="handleRowToggle(row.item)">
                      <i class="fa fa-times"
                         aria-hidden="true"></i> {{CONTENT.BUTTON.NO}}
                    </b-button>

                  </div>
                </div>
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
                      class="my-0"
                      align="fill"
                      v-model="currentPage"
                      :total-rows="ALL_TODOS.length"
                      :per-page="perPage"
                      :size="SIZE.MD">
        </b-pagination>
      </b-col>

    </b-row>

  </div>
</template>

<script lang="ts">
  import { mapGetters } from "vuex";
  import { Component, Vue } from "vue-property-decorator";

  import { validationMixin } from "vuelidate";
  // import { AddTodoValidation } from "@/validations/addTodo.validation";

  import { TodoFormValidation, VALIDATION } from "@/validations";

  import TodoForm from "@/components/Todos/TodoForm.component.vue";

  import { CONTENT, SIZE, TABLE_FIELDS } from "@/constants";
  import {
    ALL_TODOS,
    SELECTED_FILTER,
    FILTER_VALUES
  } from "@/store/modules/todos/getters";

  import {
    FETCH_TODOS_ACTION,
    DELETE_TODO_ACTION
  } from "@/store/modules/todos/actions";

  import Todo from "@/models/todo/todo";

  import { getPriority } from "@/services";

  // import { db } from "@/main";

  @Component({
    components: { TodoForm },
    mixins: [validationMixin],
    validations: TodoFormValidation,
    computed: mapGetters({ ALL_TODOS, SELECTED_FILTER, FILTER_VALUES })
  })
  export default class TodosComponent extends Vue {
    private SIZE = SIZE;
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

    private selectedItem: any = null;

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

    private handleDelete(id: any) {
      this.$store.dispatch(DELETE_TODO_ACTION, id);
    }

    private handleRowToggle(rowItem: any) {
      rowItem._showDetails = !rowItem._showDetails;
    }

    private handleCancel(value: any) {
      this.addNew = !value;
    }

    private handleCancelEdit(value: any) {
      console.log("cancel edit ", value);
    }

    private handleSave(payload: any) {
      console.log("handle save ", payload);
      this.$v.$touch();
    }

    private handleUpdate(payload: any) {
      console.log("handle update ", payload);
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_todos.scss";
</style>