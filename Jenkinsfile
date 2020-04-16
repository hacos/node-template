pipeline {
    agent {
        docker {
            image 'node:10'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'ls -lha ${WORKSPACE}'
                sh 'npm install'
            }
        }
    }
}
