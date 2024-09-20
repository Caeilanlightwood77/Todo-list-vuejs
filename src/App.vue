<template>
  <v-app>
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <!-- Sidebar with Task Lists -->
        <v-col cols="12" md="3" class="sidebar">
          <v-toolbar flat color="primary" dark class="mb-2">
            <v-toolbar-title>My Lists</v-toolbar-title>
          </v-toolbar>

          <v-list nav dense>
            <v-list-item
              v-for="(list, index) in taskLists"
              :key="index"
              @click="selectList(index)"
              class="list-item"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip
                    class="list-color"
                    :style="{ backgroundColor: list.color }"
                  ></v-chip>
                  {{ list.name }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon @click.stop="deleteList(index)" class="delete-icon">
                  mdi-delete
                </v-icon>
                <v-icon @click.stop="editList(index)">mdi-pencil</v-icon>
                <!-- Edit List Icon -->
              </v-list-item-action>
            </v-list-item>

            <v-btn block color="secondary" @click="openNewListDialog">
              + Add New List
            </v-btn>
          </v-list>
        </v-col>

        <!-- Main Content Area with Tasks -->
        <v-col cols="12" md="9" class="content-area">
          <v-toolbar flat color="primary" dark class="mb-2">
            <v-toolbar-title>{{
              selectedList.name || "Select a List"
            }}</v-toolbar-title>
          </v-toolbar>

          <v-container v-if="selectedList.name">
            <v-row>
              <!-- Task Input Form -->
              <v-col cols="12">
                <v-text-field
                  v-model="newTaskTitle"
                  label="Add a new task"
                  outlined
                  dense
                  @keyup.enter="addTask"
                ></v-text-field>
              </v-col>

              <!-- Task List -->
              <v-col cols="12">
                <v-list>
                  <v-list-item
                    v-for="(task, index) in selectedList.tasks"
                    :key="index"
                    class="task-item"
                  >
                    <v-list-item-action>
                      <v-checkbox
                        v-model="task.completed"
                        class="ma-0"
                      ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title
                        :class="{ 'completed-task': task.completed }"
                      >
                        {{ task.title }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-icon
                        @click.stop="deleteTask(index)"
                        class="delete-icon"
                      >
                        mdi-delete
                      </v-icon>
                      <v-icon @click.stop="editTask(index)">mdi-pencil</v-icon>
                      <!-- Edit Task Icon -->
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>

          <v-container v-else>
            <v-row>
              <v-col cols="12" class="text-center">
                <p>Select a list to start adding tasks.</p>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <!-- New List Dialog -->
    <v-dialog v-model="newListDialog" max-width="500px">
      <v-card>
        <v-card-title>{{
          editMode ? "Edit List" : "Add New List"
        }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newListName"
            label="List Name"
            outlined
            dense
          ></v-text-field>
          <v-color-picker
            v-model="newListColor"
            label="Pick List Color"
            flat
            hide-canvas
          ></v-color-picker>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="editMode ? updateList() : createNewList()"
          >
            {{ editMode ? "Update" : "Create" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Task Edit Dialog -->
    <v-dialog v-model="taskEditDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Task</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="taskToEdit.title"
            label="Task Title"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="taskToEdit.date"
            label="Task Date"
            outlined
            dense
          ></v-text-field>
          <v-select
            v-model="taskToEdit.repeat"
            :items="['Never', 'Daily', 'Weekly', 'Monthly']"
            label="Repeat"
            outlined
            dense
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="updateTask">Save Task</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      taskLists: [],
      selectedList: {},
      newTaskTitle: "",
      newListDialog: false,
      newListName: "",
      newListColor: "#FF5722",
      editMode: false,
      selectedListIndex: null,
      taskEditDialog: false,
      editingTaskIndex: null,
      taskToEdit: {},
    };
  },
  methods: {
    selectList(index) {
      this.selectedList = this.taskLists[index];
    },
    addTask() {
      if (this.newTaskTitle) {
        const task = {
          title: this.newTaskTitle,
          completed: false,
          date: this.taskDate,
          repeat: this.repeat,
          priority: this.priority,
          reminderTime: this.reminderTime, // New property for reminder time
        };
        this.selectedList.tasks.push(task);

        // Calculate the reminder time in milliseconds
        const reminderTimeMs = task.reminderTime * 60 * 1000; // Convert minutes to milliseconds
        const dueDate = new Date(task.date);
        const currentDate = new Date();

        // Check if the due date is in the future
        if (dueDate > currentDate) {
          const timeUntilReminder =
            dueDate.getTime() - currentDate.getTime() - reminderTimeMs;

          // Set a timeout for the reminder
          if (timeUntilReminder > 0) {
            setTimeout(() => {
              alert(`Reminder: Task "${task.title}" is due soon!`);
            }, timeUntilReminder);
          }
        }

        // Reset task fields
        this.newTaskTitle = "";
        this.reminderTime = null;
      }
    },
    deleteTask(index) {
      this.selectedList.tasks.splice(index, 1);
    },
    deleteList(index) {
      const removedList = this.taskLists.splice(index, 1)[0];
      if (this.selectedList === removedList) {
        this.selectedList = {};
      }
    },
    openNewListDialog() {
      this.newListDialog = true;
      this.editMode = false;
      this.newListName = "";
      this.newListColor = "#FF5722";
    },
    createNewList() {
      if (this.newListName) {
        this.taskLists.push({
          name: this.newListName,
          color: this.newListColor,
          tasks: [],
        });
        this.newListDialog = false;
        this.selectedList = this.taskLists[this.taskLists.length - 1];
      }
    },
    editList(index) {
      this.selectedListIndex = index;
      this.newListName = this.taskLists[index].name;
      this.newListColor = this.taskLists[index].color;
      this.newListDialog = true;
      this.editMode = true;
    },
    updateList() {
      if (this.selectedListIndex !== null) {
        this.taskLists[this.selectedListIndex].name = this.newListName;
        this.taskLists[this.selectedListIndex].color = this.newListColor;
        this.newListDialog = false;
        this.selectedListIndex = null;
      }
    },
    editTask(taskIndex) {
      this.editingTaskIndex = taskIndex;
      this.taskToEdit = { ...this.selectedList.tasks[taskIndex] };
      this.taskEditDialog = true;
    },
    updateTask() {
      if (this.editingTaskIndex !== null) {
        this.selectedList.tasks[this.editingTaskIndex] = this.taskToEdit;
        this.taskEditDialog = false;
        this.editingTaskIndex = null;
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #f5f5f5;
  height: 100vh;
  border-right: 1px solid #e0e0e0;
}

.list-item {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
}

.list-color {
  width: 12px;
  height: 12px;
  margin-right: 8px;
}

.completed-task {
  text-decoration: line-through;
  color: gray;
}

.content-area {
  background-color: #ffffff;
  height: 100vh;
}

.v-toolbar {
  background-color: #0078d7 !important;
  /* Microsoft To Do-like blue */
}

.v-btn {
  margin-top: 8px;
}

.v-list-item {
  cursor: pointer;
}

.v-list-item:hover {
  background-color: #e0f7fa;
}

.task-item {
  display: flex;
  align-items: center;
  position: relative;
}

.task-item .v-list-item-action {
  margin-left: auto;
}

.delete-icon {
  cursor: pointer;
  color: red;
  /* Red color for delete icon */
}
</style>
