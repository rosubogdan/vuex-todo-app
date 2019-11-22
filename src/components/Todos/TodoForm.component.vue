<template>
  <div class="wrapper">

    <b-row class="text-center mb-3"
           align-h="center">
      <b-col sm="12"
             md="8"
             lg="8">
        <div class="">

          <b-form @submit.prevent="handleSubmit"
                  novalidate>

            <!-- Title -->
            <section class="title">
              <b-input id="title"
                       class="mb-3"
                       type="text"
                       v-model="form.title"
                       :placeholder="CONTENT.INPUT.TITLE_PLACEHOLDER"
                       :size="SIZE">
              </b-input>
              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">
                <span class="danger"
                      v-if="!$v.form.title.required">{{VALIDATION.FIELD_REQUIRED_ERROR(CONTENT.INPUT.TITLE)}}</span>
              </div>
            </section>

            <!-- Description -->
            <section class="description">
              <b-form-textarea id="description"
                               class="mb-3"
                               rows="6"
                               max-rows="6"
                               type="text"
                               v-model="form.description"
                               :placeholder="CONTENT.INPUT.DESCRIPTION_PLACEHOLDER"
                               :size="SIZE">
              </b-form-textarea>
              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">
                <span class="text-left danger"
                      v-if="!$v.form.description.maxLength">
                  {{VALIDATION.MAX_LENGTH_ERROR(CONTENT.INPUT.DESCRIPTION,$v.form.description.$params.maxLength.max)}}
                </span>
              </div>
            </section>

            <!-- Priority -->
            <section class="priority mb-3">
              <b-form-select id="priority"
                             v-model="form.priority"
                             :size="SIZE">
                <template v-slot:first>
                  <option value="" disabled
                          >
                    {{CONTENT.INPUT.PRIORITY_PLACEHOLDER}}
                  </option>
                </template>

                <option v-for="priority in priorities"
                        :key="priority.value"
                        :value="priority.value">
                  {{priority.name}}
                </option>
              </b-form-select>
              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">
                <span class="text-left danger"
                      v-if="!$v.form.priority.required">
                  {{VALIDATION.FIELD_REQUIRED_ERROR(CONTENT.INPUT.PRIORITY)}}
                </span>
              </div>
            </section>

            <!-- Status -->
            <section class="status mb-3">
              <b-form-select id="status"
                             v-model="form.status"
                             :size="SIZE">
                <template v-slot:first>
                  <option :value="null"
                          disabled>
                    {{CONTENT.INPUT.STATUS_PLACEHOLDER}}
                  </option>
                </template>

                <option :value="false">{{CONTENT.DEFAULT.STATUS.INCOMPLETE}}</option>
                <option :value="true">{{CONTENT.DEFAULT.STATUS.COMPLETE}}</option>
              </b-form-select>
              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">
                <span class="text-left danger"
                      v-if="!$v.form.priority.required">
                  {{VALIDATION.FIELD_REQUIRED_ERROR(CONTENT.INPUT.STATUS)}}
                </span>
              </div>
            </section>

            <!-- Submit ADD-->
            <b-button variant="success"
                      type="submit">
              {{addNew ? CONTENT.BUTTON.ADD : CONTENT.BUTTON.SAVE}}
            </b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { mapGetters } from "vuex";
  import { validationMixin } from "vuelidate";
  import { AddTodoValidation } from "@/validations/addTodo.validation";

  import { TodoFormValidation, VALIDATION } from "@/validations";

  import { CONTENT, SIZE } from "@/constants";
  import { Priorities } from "@/models/todo/priorities";
  import { AddTodoFrom } from "@/models/forms/addTodoForm";

  import {
    ADD_TODO_ACTION,
    UPDATE_TODO_ACTION
  } from "@/store/modules/todos/actions";

  @Component({
    mixins: [validationMixin],
    validations: TodoFormValidation
  })
  export default class TodoForm extends Vue {
    @Prop() addNew: boolean;
    @Prop() todo: any;

    private SIZE = SIZE.DEFAULT;
    private CONTENT = CONTENT;
    private VALIDATION = VALIDATION;

    private form: AddTodoFrom = <AddTodoFrom>this.todo;
    public priorities = Priorities;

    constructor() {
      super();
    }

    private async handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.addNew) {
          await this.$store.dispatch(ADD_TODO_ACTION, this.form);
        } else {
          let test = Object.assign(this.form);
          test._showDetails = false;
          await this.$store.dispatch(UPDATE_TODO_ACTION, test);
        }
      }
    }
  }
</script>