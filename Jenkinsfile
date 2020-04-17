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
      name: 'ubuntu',
      image:'ubuntu:18.04',
      envVars: [
        envVar(key: 'NAME', value: 'node-template'),
      ],
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
      container('ubuntu') {
        stage('install aws cli, docker, kubectl') {
          sh 'apt-get update -y'
          sh 'apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common unzip'
          sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -'
          sh 'add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"'
          sh 'apt-get update -y'
          sh 'apt-get install -y docker-ce docker-ce-cli containerd.io'
          sh 'docker version'

          sh 'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"'
          sh 'unzip awscliv2.zip'
          sh './aws/install'
          sh 'aws --version'

          withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'hac', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
            sh 'mkdir -p ~/.aws/'
            sh 'echo "[default]" > ~/.aws/credentials'
            sh 'echo "aws_access_key_id = ${AWS_ACCESS_KEY_ID}" >> ~/.aws/credentials'
            sh 'echo "aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}" >> ~/.aws/credentials'
            sh 'cat ~/.aws/credentials'
          }

          sh 'curl -o aws-iam-authenticator https://amazon-eks.s3.us-west-2.amazonaws.com/1.15.10/2020-02-22/bin/linux/amd64/aws-iam-authenticator'
          sh 'chmod +x ./aws-iam-authenticator'
          sh 'mv ./aws-iam-authenticator /usr/local/bin/aws-iam-authenticator'
          sh 'aws-iam-authenticator help'

          sh 'curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.15.10/2020-02-22/bin/linux/amd64/kubectl'
          sh 'chmod +x ./kubectl'
          sh 'mv ./kubectl /usr/local/bin/kubectl'
          sh 'kubectl version --short --client'

          sh 'aws eks --region us-west-2 update-kubeconfig --name eks-staging'
          sh 'kubectl config get-contexts'
          sh 'kubectl get deployments -A'
        }

        stage('docker build') {
          def BUILD_TAG = sh(script: "echo `date +%Y-%m-%d-%H-%M`", returnStdout: true).trim()
          def NAME_TAG = "node-template:${BUILD_TAG}"
          docker.build("${NAME_TAG}")
          docker.withRegistry("https://978651561347.dkr.ecr.us-west-2.amazonaws.com", "ecr:us-west-2:hac") {
            docker.image("${NAME_TAG}").push()
          }
        }

        stage('kubectl rollout restart') {
          def BUILD_TAG = sh(script: "echo `date +%Y-%m-%d-%H-%M`", returnStdout: true).trim()
          sh 'kubectl set image -n ${NAME} deployment/${NAME}-deployment ${NAME}=978651561347.dkr.ecr.us-west-2.amazonaws.com/${NAME}:${BUILD_TAG}'
          sh 'kubectl rollout restart -n ${NAME} deployment/$(NAME)-deployment'
        }
      }
    }
  }
}
