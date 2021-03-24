<template>
  <v-container class="pa-md-0">
    <v-row no-gutters>
      <v-col cols="12" md="7" lg="8" class="order-1 order-md-0">
        <v-row
          justify="center"
          align="center"
          v-if="!!posts || !!comments"
          no-gutters
        >
          <v-col cols="12" class="type pl-4 pt-8 pb-4">
            <v-btn
              @click.stop="tab = 0"
              :outlined="tab !== 0"
              :class="{ 'grey--text text--darken-4': tab === 0 }"
              large
              class="rounded-pill body-1 font-weight-black overline mr-2"
              color="primary"
            >
              Comments
            </v-btn>
            <v-btn
              @click.stop="tab = 1"
              :outlined="tab !== 1"
              :class="{ 'grey--text text--darken-4': tab === 1 }"
              large
              class="rounded-pill body-1 font-weight-black overline"
              color="primary"
            >
              Posts
            </v-btn>
          </v-col>
          <v-tabs-items v-model="tab" class="col transparent pr-2">
            <v-tab-item v-if="comments" key="comments">
              <v-col cols="12" v-for="comment in comments" :key="comment.id">
                <comment-card :data="comment" />
              </v-col>
            </v-tab-item>
            <v-tab-item v-if="posts" key="posts">
              <v-col cols="12" v-for="post in posts" :key="post.id">
                <post-card :data="post" />
              </v-col>
            </v-tab-item>
          </v-tabs-items>
        </v-row>
        <v-row no-gutters justify="center" align="center" v-else>
          <p>Nothing to see here</p>
        </v-row>
      </v-col>
      <v-col cols="12" md="5" lg="4" class="order-0 order-md-1">
        <filter-card class="sticky" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tab: 0,
    };
  },
  computed: {
    ...mapGetters(["posts", "comments"]),
  },
};
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 32px;
  margin-top: 32px;
  z-index: 9;
}
.type {
  position: sticky;
  top: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0), #121212);
  z-index: 9;
}
</style>
