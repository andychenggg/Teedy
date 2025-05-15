pipeline {
agent any
environment {
DEPLOYMENT_NAME = "lab13-deployment"
CONTAINER_NAME = "lab13-container"
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
stage('Set Image') {
steps {
sh '''
echo "Setting image for deployment..."
kubectl set image deployment/${DEPLOYMENT_NAME} ${CONTAINER_NAME}=${IMAGE_N
'''
}
}
stage('Verify') {
steps {
sh 'kubectl rollout status deployment/${DEPLOYMENT_NAME}'
sh 'kubectl get pods'
}
}
}
}
