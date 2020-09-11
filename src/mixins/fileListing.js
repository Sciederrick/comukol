export default{
  methods:{
    async fileListing(toolkit){
      this.spinner=true
      const url = '/api/list/files'
      const data = {
        toolkit
      }
      try{
        this.spinner = false
        const res = await this.$axios.post(url, data, {timeout:20000})
        res.data.forEach((datum, index)=>{
          if(index !== 0) this.files.push(datum.Key)
        })
      }catch(err){
        this.spinner = false
        console.log(err.response.data.error)
      }
    }
  }
}
