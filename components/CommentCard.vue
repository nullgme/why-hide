<template>
  <v-card class="pa-1">
    <v-card-title>
      <v-row no-gutters justify="space-between"
        ><span>{{ data.author }}</span>
        <a
          :href="`https://reddit.com/${data.permalink}`"
          target="_blank"
          class="caption"
          >Permalink</a
        ></v-row
      ></v-card-title
    >
    <v-card-subtitle
      >Posted to:
      <a :href="`https://reddit.com/r/${data.subreddit}`"
        >/r/{{ data.subreddit }}</a
      >
      @ {{ convertDate(data.created_utc) }}</v-card-subtitle
    >
    <v-card-text>{{ data.body }}</v-card-text>
  </v-card>
</template>
<script>
import { format } from "date-fns";
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    convertDate(date) {
      return format(new Date(date * 1000), "PPPppp");
    },
  },
};
</script>