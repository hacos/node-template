podTemplate(containers: [
  containerTemplate(
    name: 'pm2',
    image: 'keymetrics/pm2:10-jessie',
    envVars: [
      envVar(key: 'NODE_ENV', value: 'staging'),
      envVar(key: 'ACCESS_TOKEN', value: '8ff79b1e-8d1f-42fc-bafa-9aa05a7898fa')
    ],
    ttyEnabled: true,
    command: 'cat'
  ),
  containerTemplate(
    name: 'docker',
    image:'trion/jenkins-docker-client:latest',
    ttyEnabled: true,
    command: 'cat'
  )
]) {
  node(POD_LABEL) {
    stage('Run in pm2 container') {
      container('pm2') {
        git credentialsId: 'github', url: 'https://github.com/hacos/node-template.git'
        stage('Prep .env file') {
          sh 'echo "NODE_ENV=$(NODE_ENV)" > .env'
          sh 'echo "ACCESS_TOKEN=$(ACCESS_TOKEN)" >> .env'
          sh 'cat .env'
        }

        stage('npm install') {
          sh 'npm install'
        }

        stage('npm test') {
          sh 'npm run test --if-present'
        }
      }
    }

    stage('Build Docker Image') {
      container('docker') {
        git credentialsId: 'github', url: 'https://github.com/hacos/node-template.git'
        stage('docker version') {
          steps {
            sh 'docker --version'
          }
        }
      }
    }
  }
}
