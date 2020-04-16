pipeline {
    agent { docker { image 'keymetrics/pm2:10-jessie' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
