def POD_LABEL = "worker-${UUID.randomUUID().toString()}"

podTemplate(containers: [
    containerTemplate(name: 'pm2', image: 'keymetrics/pm2:10-jessie', ttyEnabled: true, command: 'cat'),
  ]) {
    node(POD_LABEL) {
      stage('Run shell') {
        container('mycontainer') {
          sh 'echo hello world'
        }
      }
    }
}
