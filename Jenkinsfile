podTemplate(
  containers: [
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
    ),
    containerTemplate(
      name: 'kubectl',
      image:'bitnami/kubectl:latest',
      ttyEnabled: true,
      command: 'cat'
    )
  ],
  volumes: [
    hostPathVolume(
      hostPath: '/var/run/docker.sock',
      mountPath: '/var/run/docker.sock'
    )
  ]
) {
  node(POD_LABEL) {
    stage('Install, Build, and Test') {
      container('pm2') {
        git credentialsId: 'github', url: 'https://github.com/hacos/node-template.git'
        stage('Prep .env file') {
          sh 'echo "NODE_ENV=${NODE_ENV}" > .env'
          sh 'echo "ACCESS_TOKEN=${ACCESS_TOKEN}" >> .env'
        }

        stage('npm install, build, and test') {
          sh 'npm install'
          sh 'npm run build --if-present'
          sh 'npm run test --if-present'
        }
      }
    }

    stage('Build Docker Image') {
      container('docker') {
        stage('docker build') {
          def BUILD_TAG = sh(script: "echo `date +%Y-%m-%d-%H-%M`", returnStdout: true).trim()
          def NAME = "node-template:${BUILD_TAG}"
          docker.build("${NAME}")
          docker.withRegistry("https://978651561347.dkr.ecr.us-west-2.amazonaws.com", "ecr:us-west-2:hac") {
            docker.image("${NAME}").push()
          }
        }
      }
    }

    stage('kubectl rollout') {
      container('kubectl') {
        stage('kubectl') {
          withKubeConfig([credentialsId: '2c82afb6-5164-43fa-9074-733eb40cf60c', serverUrl: 'https://kubernetes.default']) {
            sh 'kubectl set image -n node-template deployment/${NAME}-deployment ${NAME}=978651561347.dkr.ecr.us-west-2.amazonaws.com/${NAME}:latest'
            sh 'kubectl rollout restart -n node-template deployment/$(NAME)-deployment'
          }
        }
      }
    }
  }
}
