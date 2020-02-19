<template>
  <div>
    <h2>Package: <b>{{ $attrs.className }}</b></h2>
  </div>
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      default: 'Vue!'
    }
  },
  data: () => {
    return {
    }
  }

}
</script>
