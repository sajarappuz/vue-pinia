import { defineStore } from "pinia"

export const dataStore = defineStore('storeData',{
    state: () => ({
        data: [ ],
        loading: false
        
    }),
    getters:{
        favs(){
            return this.data.filter(t => t.isfav)
        },
       totalCount : (state)=>{
           return state.data.length
       }
    },
    actions : {
        async getData(){
            this.loading = true;
            const res = await fetch('http://localhost:3000/data')
            const value = await res.json()
            this.data = value
            this.loading= false;
        },
       async addItem(task){
            this.data.push(task)

            const res = await fetch('http://localhost:3000/data',{
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type' : 'application/json' }
            })

            if(res.error){
                console.log(res.error)
            }
       },
      async deleteTask(id) {
            const index = this.data.findIndex(t => t.id === id);
            if (index !== -1) {
                this.data.splice(index, 1);
            }
            const res = await fetch('http://localhost:3000/data/' + id,{
                method: 'DELETE',
            })

            if(res.error){
                console.log(res.error)
            }
        },
      async toggleFav(id){
            const favourite = this.data.find(t => t.id === id);
             favourite.isfav = !favourite.isfav

             const res = await fetch('http://localhost:3000/data/' + id,{
                method: 'PATCH',
                body: JSON.stringify({ isfav : favourite.isfav  }),
                headers: { 'Content-Type' : 'application/json' }
            })

            if(res.error){
                console.log(Error)
            }
        }
    } 
})