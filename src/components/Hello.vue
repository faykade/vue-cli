<template>
  <div>
    <form action="#" method="GET" @submit.prevent="onSubmit" >
      <input type="input" name="search" id="search" v-model="searchText">
      <button type="submit">Search</button>
    </form>
    <div v-if="currentCoupon">
      <!-- <coupon data="currentCoupon"></coupon> -->
      <ul>
        <li v-text="currentCoupon.id"/>
        <li v-text="currentCoupon.details.name"/>
        <li v-text="currentCoupon.details.description"/>
        <li v-text="currentCoupon.details.expiration"/>
      </ul>
      <button @click="toggleEditing">Edit/Add</button>
      <div v-if="isEditing">
        <!-- <edit data="couponClicked"></edit> -->
        <form action="#" method="POST" @submit.prevent="onEditComplete">
          <input type="text" placeholder="new name">
          <input type="text" placeholder="new description">
          <button type="submit">Finish Editing</button>
        </form>

      </div>
    </div>
    <div v-if="!currentCoupon">No Results Found</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'hello',
  data () {
    return {
      searchText: '',
      currentCoupon: null,
      isEditing: false
    }
  },

  methods: {
    onSubmit(){
      axios.get('http://localhost:3000/coupons/' + this.searchText)
        .then(response => this.currentCoupon = response.data.success ? response.data.data : null)
        .catch(error => this.currentCoupon = null);
    },

    toggleEditing(){
      this.isEditing = !this.isEditing;
    },

    onEditComplete(){
      this.toggleEditing();
      console.log("Save new values now");
      // axios.post('http://localhost:3000/coupons/' + this.currentCoupon.id);
    }
  }
}
</script>
