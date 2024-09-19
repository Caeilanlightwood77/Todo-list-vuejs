<template>
    <v-form>
      <!-- Task Title -->
      <v-text-field
        v-model="taskTitle"
        label="Task Title"
        required
        outlined
        class="mb-4"
      ></v-text-field>
  
      <!-- Schedule Task with Date Picker -->
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-bind="attrs"
            v-on="on"
            v-model="taskDate"
            label="Schedule Task"
            readonly
            outlined
            class="mb-4"
          ></v-text-field>
        </template>
  
        <v-date-picker
          v-model="taskDateInternal"
          @input="updateDate"
          :min="minDate"
        ></v-date-picker>
      </v-menu>
  
      <!-- Repeat Option -->
      <v-select
        v-model="repeat"
        :items="repeatOptions"
        label="Repeat"
        required
        outlined
        class="mb-4"
      ></v-select>
  
      <v-btn color="primary" @click="saveTask">Add Task</v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        taskTitle: '',
        taskDate: '',
        taskDateInternal: null, // Holds the internal date object
        repeat: '',
        repeatOptions: ['Never', 'Daily', 'Weekly', 'Monthly'],
        menu: false,
        minDate: new Date().toISOString().substr(0, 10), // Minimum selectable date
      };
    },
    methods: {
      updateDate(date) {
        this.taskDateInternal = date; // Update internal date model
        this.taskDate = this.formatDate(date); // Format and update display date
        this.menu = false; // Close the date picker
      },
      formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
      },
      saveTask() {
        this.$emit('add-task', {
          title: this.taskTitle,
          date: this.taskDate,
          repeat: this.repeat,
        });
        // Reset fields
        this.taskTitle = '';
        this.taskDate = '';
        this.taskDateInternal = null;
        this.repeat = '';
      },
    },
  };
  </script>
  