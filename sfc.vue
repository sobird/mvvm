<!--
 * SFC 测试
 * 
 * @author  Yang,junlong at 2019-07-05 17:00:30 build.
 * @version $Id$
-->

<template lang="zh">
  <div class="example">{{ msg }}</div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style lang="scss" scoped>
.example {
  color: red;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>

<test>
 This is test tag;
</test>