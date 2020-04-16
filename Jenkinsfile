def POD_LABEL = "worker-${UUID.randomUUID().toString()}"

podTemplate {
    node(POD_LABEL) {
        stage('Run shell') {
            sh 'echo hello world'
        }
    }
}
