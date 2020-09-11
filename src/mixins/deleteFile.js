export default{
  methods:{
    async deleteFile(e){
      let delFile = e.target.attributes.id.nodeValue
      if(delFile){
        const del = window.confirm(`Are you sure you want to delete ${delFile}?`)
        if(del){
          this.spinner=true
          let file = this.directoryPath.concat(delFile)
          const url = '/api/delete/file'
          const data = {
            file
          }
          try{
            this.spinner = false
            const res = this.$axios.post(url, data, {timeout:20000})
            this.success(res)
          }catch(err){
            this.spinner = false
            console.log(err.response.data.error)
            this.fail(err.response.data.error)
          }
        }
      }else{
        window.alert(`reference undefined, please try again`)
      }
    }
  }
}
