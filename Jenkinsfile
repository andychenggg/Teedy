pipeline {
  agent any

  environment {
    IMAGE_NAME = "andycheng608/teedy2025_manual:latest"
    DEPLOYMENT_NAME = "lab13-node"
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
          echo "Deploying ${DEPLOYMENT_NAME} with image ${IMAGE_NAME}..."

          # 创建或更新 Deployment（如果存在就更新镜像，不存在就新建）
          kubectl create deployment ${DEPLOYMENT_NAME} \
            --image=${IMAGE_NAME} \
            --dry-run=client -o yaml \
          | kubectl apply -f -

          # 等待滚动更新完成
          kubectl rollout status deployment/${DEPLOYMENT_NAME}

          # 查看 Pod 运行状态
          kubectl get pods -l app=${DEPLOYMENT_NAME}
        '''
      }
    }

    stage('Create a service') {
      steps {
        sh '''
          echo "Creating a service for ${DEPLOYMENT_NAME}..."

          # 创建或更新 Service
          kubectl expose deployment ${DEPLOYMENT_NAME} --type=LoadBalancer --port=8080

          # 查看 Service 运行状态
          kubectl get services
        '''
      }
    }
  }
}
