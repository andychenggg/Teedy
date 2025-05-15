# Lab13流程

1. open `shadowrocket` choose a HK-based node.
2. start jenkins
3. build a pipeline through jenkins
4. check service
    ```bash
    kubectl get services
    ```
5. Use service in browser
    ```bash
    minikube service lab13-node
    ```
6. clean up
   Remove the service and the deployment. Stop minicube.
    ```bash
    kubectl delete service lab13-node
    kubectl delete deployment lab13-node
    minikube stop
    ```
    If your don't use it again today, delete the virtual cluster.
    ```bash
    minikube delete
    ```