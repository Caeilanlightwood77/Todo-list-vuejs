<template>
    <v-container>
      <v-card class="pa-4 mb-4">
        <ListForm @add-list="addList"></ListForm>
      </v-card>
  
      <v-row>
        <v-col
          v-for="list in lists"
          :key="list.name"
          cols="12" sm="6" md="4"
        >
          <v-card :style="{ backgroundColor: list.color }" class="pa-4">
            <v-card-title>{{ list.name }}</v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-item
                v-for="task in list.tasks"
                :key="task.title"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Schedule: {{ task.date }} | Repeat: {{ task.repeat }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import ListForm from '@/components/ListForm.vue';
  
  export default {
    components: { ListForm },
    data() {
      return {
        lists: [],
      };
    },
    methods: {
      addList(list) {
        this.lists.push(list);
      },
    },
  };
  </script>
  