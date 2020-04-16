podTemplate {
    node(POD_LABEL) {
        stage('Run shell') {
            sh 'echo hello world'
        }
        stage('Check npm') {
            sh 'npm --version'
        }
    }
}
