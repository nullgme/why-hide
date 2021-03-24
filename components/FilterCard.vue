<template>
  <v-card class="pa-4">
    <v-row justify="center">
      <v-col cols="12">
        <h2>Search</h2>
      </v-col>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" @submit.prevent="search">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="filters.data.author"
                label="Username (required)"
                :rules="[(v) => !!v || 'Username is required']"
                hide-details="auto"
                outlined
                clearable
                validate-on-blur
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="filters.keyword"
                label="Keywords or title (optional)"
                outlined
                hide-details="auto"
                clearable
                validate-on-blur
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <span class="body-2 font-weight-bold"
                >Submission type (required)</span
              >
              <v-row no-gutters>
                <v-col cols="6">
                  <v-checkbox
                    v-model="filters.types"
                    class="mt-1"
                    label="Posts"
                    value="posts"
                    hide-details="auto"
                    :rules="[
                      () =>
                        (!!filters.types && filters.types.length > 0) ||
                        'Choose a submission type',
                    ]"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="filters.types"
                    class="mt-1"
                    label="Comments"
                    value="comments"
                    hide-details
                    :rules="[
                      () =>
                        (!!filters.types && filters.types.length > 0) ||
                        'Choose a submission type',
                    ]"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12">
              <span class="body-2 font-weight-bold"
                >Additional filters (optional)</span
              >
              <v-row no-gutters>
                <v-col cols="6">
                  <v-checkbox
                    v-model="filters.deleted"
                    class="mt-1"
                    label="Deleted"
                    hide-details
                    :value="true"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="filters.data.edited"
                    class="mt-1"
                    label="Edited"
                    hide-details
                    :value="true"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="filters.data.sort"
                label="Sort by (optional)"
                outlined
                hide-details="auto"
                :items="[
                  { text: 'Date (oldest first)', value: 'asc' },
                  { text: 'Date (newest first)', value: 'desc' },
                ]"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <v-btn
                    block
                    tile
                    large
                    color="secondary"
                    outlined
                    class="mr-4 rounded-pill black--text overline"
                    @click="reset"
                    :disabled="!valid"
                  >
                    Reset
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    block
                    :class="{ 'grey--text text--darken-4': valid }"
                    large
                    class="rounded-pill body-1 font-weight-black overline"
                    color="primary"
                    type="submit"
                    :disabled="!valid"
                  >
                    Search
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import * as qs from "querystring";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: false,
      filters: {
        types: [],
        deleted: null,
        data: {
          size: 250,
          sort: "desc",
          sort_key: "created_utc",
        },
      },
    };
  },
  watch: {
    "filters.deleted": function (value) {
      this.filters.data.author_removed = value;
      this.filters.data.mod_removed = value;
    },
  },
  methods: {
    ...mapActions(["getComments", "getPosts"]),
    search() {
      for (const type of this.filters.types) {
        console.log("type", type);
        if (type === "comments") {
          if (this.filters.keyword) {
            this.filters.data.q = this.filters.keyword;
          }
          this.getComments(qs.encode(this.filters.data));
        } else if (type === "posts") {
          if (this.filters.keyword) {
            this.filters.data.title = this.filters.keyword;
          }
          this.getPosts(qs.encode(this.filters.data));
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>