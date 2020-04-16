podTemplate(containers: [
    containerTemplate(name: 'pm2', image: 'keymetrics/pm2:10-jessie', ttyEnabled: true, command: 'cat')
  ]) {

    node(POD_LABEL) {
        stage('Run in pm2 container') {
            container('pm2') {
                stage('npm install') {
                    sh 'npm install'
                }

                stage('npm test') {
                    sh 'npm run test --if-present'
                }
            }
        }
    }
}
