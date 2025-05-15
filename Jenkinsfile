pipeline {
  agent any

  environment {
    IMAGE_NAME = "andycheng608/teedy2025_manual:latest"
  }

  stages {
    stage('Start Minikube') {
      steps {
        sh '''
          if ! minikube status | grep -q "Running"; then
            echo "Starting Minikube..."
            minikube start
          else
            echo "Minikube already running."
          fi
        '''
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          echo "Deploying hello-node with image ${IMAGE_NAME}..."

          # 创建或更新 Deployment（如果存在就更新镜像，不存在就新建）
          kubectl create deployment hello-node \
            --image=${IMAGE_NAME} \
            --dry-run=client -o yaml \
          | kubectl apply -f -

          # 等待滚动更新完成
          kubectl rollout status deployment/hello-node

          # 查看 Pod 运行状态
          kubectl get pods -l app=hello-node
        '''
      }
    }
  }
}
