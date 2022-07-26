<template>
  <div style="line-height:1.8">
    <div v-loading="qLoading">
      <div class="q-topic">{{ question.topic }}</div>
      <div class="q-options">
        <span :key="item.prefix" v-for="item in question.options">
          <span class="q-item-prefix">{{ item.prefix }}. </span>
          <span class="q-item-content">{{ item.content }}</span>
        </span>
      </div>
    </div>
    <!-- <div v-if="qType == 2" v-loading="qLoading">
      <div class="q-topic" v-html="question.topic" />
      <div class="q-content">
        <span
          :key="item.id"
          v-for="item in question.items"
          class="q-item-contain"
        >
          <span class="q-item-prefix">{{ item.prefix }}</span>
          <span v-html="item.content" class="q-item-content"></span>
        </span>
      </div>
    </div>
    <div v-else-if="qType == 3" v-loading="qLoading">
      <div
        class="q-topic"
        v-html="question.topic"
        style="display: inline;margin-right: 10px"
      />
      <span>（</span>
      <span :key="item.id" v-for="item in question.items">
        <span v-html="item.content" class="q-item-content"></span>
      </span>
      <span>）</span>
    </div>
    <div v-else>哈哈哈哈哈</div> -->
  </div>
</template>

<script>
export default {
  name: "QuestionShow",
  data() {
    return {
      test: true
    };
  },
  props: {
    question: {
      type: Object,
      default: function() {
        return {};
      }
    },
    qLoading: {
      type: Boolean,
      default: false
    },
    qType: {
      type: Number,
      default: 1
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.q-options {
  display: flex;
  justify-content: space-around;
}
</style>
