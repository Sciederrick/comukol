import storage from '@/components/firebaseInit'
export default{
  methods:{
    async downloadFile(e){
      this.spinner=true
      let file = this.directoryPath.concat(e.target.textContent)
      const storageRef=storage.ref()
      let fileRef=storageRef.child(file.trim())
      try{
        const url = await fileRef.getDownloadURL()
        const iframe = document.getElementById('preview')
        iframe.src = url
        this.spinner=false
      }catch(err){
        window.alert(err.code)
        console.log(err)
        this.spinner=false
      }
    }
  }
}
