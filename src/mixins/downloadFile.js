export default{
  methods:{
    async downloadFile(e){
      let download = confirm(`download ${e.target.textContent}?`)
      if(download){
        this.spinner=true
        let el = e.target.textContent
        let file = this.directoryPath.concat(el.trim())
        //download file
      }
    }
  }
}
