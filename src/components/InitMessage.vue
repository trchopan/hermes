<template>
  <div id="initial-loading">
    <img src="/images/bloody-smile.jpg" alt="initializing image" />
    <p>...Cười phát sống thêm ít phút nào</p>
  </div>  
</template>

<script>
export default {
  name: "InitMessage"
};
</script>


<style lang="scss" scoped>
#initial-loading {
  font-family: Roboto;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 6rem;
    height: auto;
    border-radius: 50%;
  }
}
</style>
