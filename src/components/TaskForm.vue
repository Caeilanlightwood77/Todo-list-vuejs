<template>
  <v-form>
    <v-text-field
      v-model="taskTitle"
      label="Task Title"
      required
      outlined
      class="mb-4"
    ></v-text-field>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-bind="attrs"
          v-on="on"
          v-model="taskDate"
          label="Due Date"
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

    <v-select
      v-model="repeat"
      :items="repeatOptions"
      label="Repeat"
      outlined
      class="mb-4"
    ></v-select>

    <v-select
      v-model="priority"
      :items="priorityOptions"
      label="Priority"
      required
      outlined
      class="mb-4"
    ></v-select>

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

    <!-- Priority Level -->
    <v-select
      v-model="priority"
      :items="['Low', 'Medium', 'High']"
      label="Priority Level"
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
      taskTitle: "",
      taskDate: "",
      taskDateInternal: null,
      repeat: "",
      priority: "",
      repeatOptions: ["Never", "Daily", "Weekly", "Monthly"],
      priorityOptions: ["Low", "Medium", "High"],
      
      menu: false,
      minDate: new Date().toISOString().substr(0, 10),
      reminderTime: null,
    };
  },
  methods: {
    updateDate(date) {
      this.taskDateInternal = date;
      this.taskDate = this.formatDate(date);
      this.menu = false;
    },
    formatDate(date) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
    },
    saveTask() {
      this.$emit("add-task", {
        title: this.taskTitle,
        date: this.taskDate,
        repeat: this.repeat,
        priority: this.priority,
        reminderTime: this.reminderTime, // Include reminder time
      });
      // Reset fields
      this.taskTitle = "";
      this.taskDate = "";
      this.taskDateInternal = null;
      this.repeat = "";
      this.priority = "";
      this.reminderTime = null; // Reset reminder time
    },
  },
};
</script>
