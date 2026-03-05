pipeline {
    agent any

    triggers {
        githubPush() 
    }

    options {
        disableConcurrentBuilds()
        ansiColor('xterm')
        timestamps()
    }

    environment {
        NODE_ENV = 'test'
        // Gunakan tool secara dinamis atau pastikan path ini benar di agen
        JAVA_HOME = '/opt/java/openjdk'        
    }

    tools {
        nodejs 'nodejs' // Pastikan nama ini ada di Global Tool Configuration
        allure 'allure'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    node -v
                    npm -v
                    npm ci
                    npx cypress install
                    npx cypress verify
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Gunakan || true jika ingin pipeline lanjut ke Archive meski test gagal
                sh 'npx cypress run --headless'
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Perbaikan: Ditulis dalam satu baris string
                archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            allure includeProperties: false, 
                   jdk: '', // Kosongkan jika ingin menggunakan default dari 'tools'
                   results: [[path: 'allure-results']]
            cleanWs()
        }
        failure {
            echo '❌ Cypress tests failed!'
        }
        success {
            echo '✅ Cypress tests passed!'
        }
    }

}


