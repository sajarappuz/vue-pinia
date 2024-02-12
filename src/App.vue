<style scoped>
 .toggler{
   width:200px;
 height:40px;
 margin:10px auto;
  }
  .form-field{
    width:400px;
    height:60px;
    margin:20px auto;
  }
  input{
    width:300px;
    height: 40px;
    padding-left:6px;
    font-size:16px;
    font-family: 'Courier New', Courier, monospace;
  }
  .add-item{
    height:40px;
    width:60px;
    margin-left:10px;
  }
  input::placeholder{
    padding-left: 20px;
    font-size:16px;
    font-family:'Courier New', Courier, monospace;
  }
  h2{
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    letter-spacing: 3px;
    font-size: 20px;
    margin:20px auto;
  }
  .loading{
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    letter-spacing: 3px;
    font-size: 20px;
    margin:20px auto;
  }
  .rst{
    width:200px;
    height:40px;
    margin-left:40px;
  }
</style>

<template>
  <div >
      <Header/>
      <!--input section-->
      <div class="form-field">
        <form @submit.prevent="handleSubmit">
          <input type="text" placeholder="i have to .." v-model="newTask">
          <button class="add-item">ADD</button>
        </form>
      </div>
      <!--toggler section-->
      <nav class="toggler">
        <button @click="setFilter('all')">All</button>
        <button @click="setFilter('favs')">Favourite</button>
      </nav>

      <!--loading-->
        <div class="loading" v-if="loading">Loading tasks....</div>

      <!--all task-->
      <div v-if=" filter === 'all'">
        <h2>You have {{ totalCount}} tasks to do ...</h2>
     <ul>
    <li v-for="task in data" :key="task.id">
       <UserDetails :task="task"/>
    </li>
  </ul>
</div>
<button @click="storeData.$reset" class="rst">Reset Tasks</button>
  </div>
  <!--fav task-->
  <div v-if="filter === 'favs'">
    <h2>You have {{ favs.length }} favourite tasks to do ...</h2>
    <ul>
    <li v-for="task in favs" :key="task.id" >
       <UserDetails :task="task"/>
    </li>
  </ul>
  </div>
  
</template>

<script setup>
import { ref  } from 'vue';
import UserDetails from './components/UserDetails.vue';
import Header from "@/components/Header.vue"
import { storeToRefs } from 'pinia';
import { dataStore } from "@/stores/DataStore";

const storeData = dataStore(); 

const { data, loading, totalCount, favs } = storeToRefs(storeData)

const filter = ref('all')

storeData.getData()

const newTask = ref('')

const setFilter = (value) => {
  filter.value = value;
};

const handleSubmit =() =>{
  if(newTask.value.length > 0){
    storeData.addItem({
      id: Math.floor(Math.random()*1000),
      title: newTask.value ,
      isfav : false,
    })
  }
  newTask.value = ''
}

// onMounted(() => {
//   // You can perform any additional setup here if needed
// });
</script>
