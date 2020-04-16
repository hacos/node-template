podTemplate(containers: [
    containerTemplate(name: 'pm2', image: 'keymetrics/pm2:10-jessie', ttyEnabled: true, command: 'cat'),
    containerTemplate(name: 'docker', image:'trion/jenkins-docker-client')
  ]) {
    node(POD_LABEL) {
        stage('Run in pm2 container') {
            container('pm2') {
                git credentialsId: 'github', url: 'https://github.com/hacos/node-template.git'
                stage('ls') {
                    sh 'ls -lha ${WORKSPACE}'
                }

                stage('npm install') {
                    sh 'npm install'
                }

                stage('npm test') {
                    sh 'npm run test --if-present'
                }
            }
        }
        stage('Build Docker Image'){
            container(‘docker’) {
                git 'https://github.com/hacos/node-template.git'
                stage('docker version') {
                    when {
                        branch 'master'
                    }

                    steps {
                        sh 'docker --version'
                    }

                }
            }
        }
    }
}
