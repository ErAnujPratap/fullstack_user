
# 🧩 Fullstack User Registration App - DevOps Project

This project is a 3-tier fullstack application with CI/CD, containerization, Kubernetes deployment, and monitoring.





## 🔧 Tech Stack

- Frontend: React.js

- Backend: Python (FastAPI)

- Database: PostgreSQL

- DevOps Tools: Docker, Jenkins, GitHub, Kubernetes, Prometheus, Grafana, SonarQube, Trivy

- Platform: Minikube (local Kubernetes), DockerHub, GitHub


## Project Structure
```
fullstack_user/
├── frontend/               # React frontend code
├── backend/                # FastAPI backend code
├── db/                     # PostgreSQL setup
├── k8s/                    # Kubernetes manifests (Deployment, Service, Ingress, etc.)
└── Jenkinsfile             # Jenkins pipeline script

```

## Setup Step By Step

1. Clone the Repository

```bash
  git clone https://github.com/ErAnujPratap/fullstack_user.git
  cd fullstack_user

```
2. Dockerize the Application
   
   - Create Dockerfiles for frontend and backend.
   - Build and push Docker images to DockerHub.


```bash
docker build -t <dockerhub-username>/frontend ./frontend
docker build -t <dockerhub-username>/backend ./backend
docker push <dockerhub-username>/frontend
docker push <dockerhub-username>/backend

```

3. Code Quality Scan with SonarQube
- Install SonarQube locally or in a container:
```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube
```

- Configure `sonar-scanner` or Jenkins SonarQube plugin.

- Add `sonar-project.properties` file in both frontend and backend folders.

Example `sonar-project.properties:`

```bash
sonar.projectKey=frontend
sonar.sources=.
sonar.host.url=http://localhost:9000
sonar.login=<your-sonarqube-token>

```
- Run Scan
```bash
sonar-scanner
```

4. CI/CD Pipeline with Jenkins

- Configure Jenkins jobs using the Jenkinsfile for automated build, test (SonarQube), Docker build, and push.

5. Kubernetes Deployment
- Start Minikube.

- Apply Kubernetes manifests:

```bash
kubectl apply -f k8s/

```
- Expose the service using Ingress or NodePort.

6. Monitoring with Prometheus & Grafana

- Install Prometheus & Grafana using Helm:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install kube-prometheus prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
```
- Add node_exporter scrape config to prometheus.yml and restart Prometheus.

7. Security Scanning
- Use Trivy to scan images:

```bash
trivy image <dockerhub-username>/frontend
trivy image <dockerhub-username>/backend

```
