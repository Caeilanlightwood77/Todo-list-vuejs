<template>
    <v-form>
      <v-text-field
        v-model="listName"
        label="List Name"
        required
        outlined
        class="mb-4"
      ></v-text-field>
  
      <v-row>
        <v-col cols="12" sm="6">
          <v-color-picker
            v-model="listColor"
            hide-canvas
            flat
          ></v-color-picker>
        </v-col>
        <v-col cols="12" sm="6">
          <TaskForm @add-task="addTask"></TaskForm>
        </v-col>
      </v-row>
  
      <v-btn color="success" @click="saveList">Add List</v-btn>
    </v-form>
  </template>
  
  <script>
  import TaskForm from './TaskForm.vue';
  
  export default {
    components: { TaskForm },
    data() {
      return {
        listName: '',
        listColor: '#000000',
        tasks: [],
      };
    },
    methods: {
      addTask(task) {
        this.tasks.push(task);
      },
      saveList() {
        this.$emit('add-list', {
          name: this.listName,
          color: this.listColor,
          tasks: this.tasks,
        });
        this.listName = '';
        this.listColor = '#000000';
        this.tasks = [];
      },
    },
  };
  </script>
  