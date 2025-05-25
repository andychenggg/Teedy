pipeline {
  agent any
  environment {
    DOCKER_HUB_CREDENTIALS = credentials('dockerhub_credentials')
    // 你的 Docker Hub 仓库：youruser/practice12-app
    DOCKER_IMAGE = 'andycheng608/teedy2025_manual'
    DOCKER_TAG   = "${env.BUILD_NUMBER}"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build App & Docker Image') {
      steps {
        // 如果是 Maven 项目：
        sh 'mvn -B -DskipTests clean package'
        script {
          docker.build("${env.DOCKER_IMAGE}:${env.DOCKER_TAG}")
        }
      }
    }
    stage('Push to Docker Hub') {
      steps {
        script {
          try {
            sh 'docker info'
            echo "Attempting to login to Docker Hub as user: $DOCKER_HUB_CREDENTIALS_USR"
            sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
            echo "Pushing image: ${env.DOCKER_IMAGE}:${env.DOCKER_TAG}"
            sh "docker push ${env.DOCKER_IMAGE}:${env.DOCKER_TAG}"
            sh "docker push ${env.DOCKER_IMAGE}:latest"
          } catch (Exception e) {
            echo "Error during Docker push: ${e.getMessage()}"
            sh 'docker logout'
            error "Failed to push Docker image"
          } finally {
            sh 'docker logout'
          }
        }
      }
    }

    stage('Run 3 Containers') {
      steps {
        script {
          // 定义要启动的端口
          def ports = [8082, 8083, 8084]
          for (p in ports) {
            // 停止并删除旧容器（如果存在）
            sh "docker stop practice12-${p} || true"
            sh "docker rm practice12-${p} || true"
            // 启动新容器，内部应用监听 8080
            sh "docker run -d --name practice12-${p} -p ${p}:8080 ${env.DOCKER_IMAGE}:${env.DOCKER_TAG}"
          }
          // 列出所有 practice12- 前缀的容器
          sh 'docker ps --filter "name=practice12-"'
        }
      }
    }
  }
}
