<template>
    <div class="details">
        <div>
         <h4>{{ task.title}}</h4>
        </div>
        <div>
         <button @click="storeData.toggleFav(task.id)" :class="{ active : task.isfav}">Favourite</button>
         <button @click="storeData.deleteTask(task.id)" >remove</button>
        </div>
    </div>
</template>

<script setup>
    import { dataStore } from "@/stores/DataStore";

const storeData = dataStore(); 
    const props = defineProps(['task'])  
</script>
<style setup>
  .details{
    width: 500px;
    height:40px;
    border-radius: 5px;
    border:1px solid grey;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:10px auto;
  }
  h4{
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    letter-spacing: 2px;
    padding: 9px;
  }
  button{
    height:30px;
    margin-right: 10px;
    padding:5px;
    border-radius:5px;
  }

  .active{
    background-color: red;
    color:white;
  }
</style>