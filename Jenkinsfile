podTemplate(containers: [
    containerTemplate(name: 'pm2', image: 'keymetrics/pm2:10-jessie', ttyEnabled: true, command: 'cat')
  ]) {

    node(POD_LABEL) {
        stage('Check npm version') {
            container('pm2') {
                stage('Build a Maven project') {
                    sh 'npm --version'
                }
            }
        }
    }
}
