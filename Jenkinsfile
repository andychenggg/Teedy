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
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub_credentials') {
            docker.image("${env.DOCKER_IMAGE}:${env.DOCKER_TAG}").push()
            docker.image("${env.DOCKER_IMAGE}:${env.DOCKER_TAG}").push('latest')
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
